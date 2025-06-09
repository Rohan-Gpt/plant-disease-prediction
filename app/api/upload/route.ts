// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
// import { parseFormData } from "@/utils/parseFormData"; // your helper
import fs from "fs";
import path from "path";
import { getFile, parseFormData } from "@/utils/helpers";
import { IncomingMessage } from "http";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in body parser
  },
};

export async function POST(req: NextRequest) {
  try {
    // parseFormData expects IncomingMessage, so cast req:
    const [fields, parsedFiles] = await parseFormData(req);

    const imageFile = getFile(parsedFiles, "image"); // must match frontend <input name="image" />

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file found" },
        { status: 400 }
      );
    }

    // Depending on formidable version, filepath or path:
    const tempPath = imageFile.filepath;
    const fileName = imageFile.originalFilename || `uploaded-${Date.now()}.jpg`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const destPath = path.join(uploadDir, fileName);
    fs.renameSync(tempPath, destPath);

    // Return relative path for frontend use:
    const relativePath = "/uploads/" + fileName;

    return NextResponse.json({ path: relativePath });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
