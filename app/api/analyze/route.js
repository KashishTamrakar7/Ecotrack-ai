import { NextResponse } from "next/server";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function POST(req) {

  try {

    const body = await req.json();

    const { base64, mimeType } = body;

    const apiKey =
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    const prompt = `
Analyze this waste image.

Return ONLY valid JSON.

{
  "wasteType":"item name",
  "material":"material",
  "recyclable":true,
  "binColor":"blue",
  "ecoPoints":20,
  "carbonImpact":0.05,
  "confidence":0.95,
  "disposalSteps":[
    "step 1",
    "step 2",
    "step 3"
  ]
}
`;

    const response = await fetch(
      `${GEMINI_URL}?key=${apiKey}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
                {
                  inlineData: {
                    mimeType,
                    data: base64,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("GEMINI:", data);

    const raw =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!raw) {

      return NextResponse.json({
        error: "No AI response"
      });
    }

    // CLEAN JSON
    const clean = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);

  } catch (err) {

    console.error(err);

    return NextResponse.json({
      error: err.message
    });
  }
}