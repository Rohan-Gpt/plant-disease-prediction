// app/api/predict/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    // const body = await req.text(); // Read raw text body
    // // If the body is JSON, parse it

    // if (!body) {
    //   return NextResponse.json({ error: "Missing file path" }, { status: 400 });
    // }

    // // Safe resolution for local public folder
    // const absolutePath = path.join(
    //   process.cwd(),
    //   "public",
    //   body.replace(/^\/+/, "")
    // );
    // const base64Image = fs.readFileSync(absolutePath, "base64");

    const body = await req.json();

    const base64Image = body.image?.split(",")[1]; // Extract base64 data only

    if (!base64Image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const imageBuffer = Buffer.from(base64Image, "base64");

    // Resize using Sharp
    const resizedBuffer = await sharp(imageBuffer)
      .resize({ width: 720 }) // Change dimensions as needed
      .toFormat("jpeg")
      .toBuffer();

    // Convert resized image to base64
    const resizedBase64Image = resizedBuffer.toString("base64");

    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: resizedBase64Image,
        },
      },
      {
        text: `Identify the plant and plant disease in this image. 
Respond in strict JSON format like:
{
  "plantName": "Name of the plant"
  "disease": "Name of disease or 'healthy'",
  "confidence": 9.5(on a scale of 1-10),
  "remedy": "short remedy or 'none'"
}
  and if it is not a plant, respond with:
{
  error: "Not a plant"
  }`,
      },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });

    // console.log("this is result text", result.text);

    const text = result.text as string;

    let cleanedText = text.trim();

    // If Gemini wrapped the response in a Markdown code block
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (e) {
      parsed = { rawOutput: text }; // fallback
    }

    return NextResponse.json(parsed);
  } catch (error) {
    // console.error("Prediction failed:", error);
    return NextResponse.json({ error: "Prediction failed" }, { status: 500 });
  }
}
