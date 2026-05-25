/**
 * geminiService.js
 * Production Gemini Vision API integration.
 * Replace GEMINI_API_KEY in .env.local before deploying.
 *
 * .env.local:
 *   NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
 */

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const WASTE_ANALYSIS_PROMPT = `
Analyze this waste/recyclable item image carefully.
Respond ONLY with a valid JSON object — no markdown fences, no extra text:
{
  "wasteType":     "string — specific item name",
  "material":      "string — material composition",
  "recyclable":    true | false,
  "binColor":      "blue | green | red | yellow | black",
  "disposalSteps": ["step 1", "step 2", "step 3", "step 4"],
  "carbonImpact":  0.00,
  "ecoPoints":     0,
  "confidence":    0.00
}
`.trim();

/**
 * Converts a File object to a base64 string.
 * @param {File} file
 * @returns {Promise<{ base64: string, mimeType: string }>}
 */
export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve({
      base64:   reader.result.split(",")[1],
      mimeType: file.type || "image/jpeg",
    });
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

/**
 * Sends an image to the Gemini Vision API and returns structured waste data.
 * @param {string} base64     - Base64-encoded image data
 * @param {string} mimeType   - e.g. "image/jpeg"
 * @returns {Promise<Object>} - Parsed JSON response from Gemini
 */
export async function analyzeWaste(base64, mimeType = "image/jpeg") {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GEMINI_API_KEY not set in .env.local");

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inlineData: { mimeType, data: base64 } },
          { text: WASTE_ANALYSIS_PROMPT },
        ],
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const clean   = rawText.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean);
  } catch {
    throw new Error("Gemini returned non-JSON response: " + clean);
  }
}