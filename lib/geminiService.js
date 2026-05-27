export async function fileToBase64(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = () => {

      resolve({
        base64: reader.result.split(",")[1],
        mimeType: file.type
      });

    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}


export async function analyzeWaste(
  base64,
  mimeType
) {

  const response = await fetch(
    "/api/analyze",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        base64,
        mimeType
      })
    }
  );

  const data = await response.json();

  if (data.error) {

    throw new Error(data.error);
  }

  return data;
}