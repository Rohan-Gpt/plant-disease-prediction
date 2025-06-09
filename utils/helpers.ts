import formidable from "formidable";
import { IncomingMessage } from "http";
import { Readable } from "stream";
import fs from "fs";
import { NextRequest } from "next/server";

export async function parseFormData(
  req: NextRequest
): Promise<[Record<string, any>, Record<string, any>]> {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  const arrayBuffer = await req.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const incomingMessage = new Readable() as IncomingMessage;
    incomingMessage.headers = Object.fromEntries(req.headers.entries());
    incomingMessage.headers["content-length"] = buffer.length.toString();
    incomingMessage._read = () => {}; // No-op
    incomingMessage.push(buffer);
    incomingMessage.push(null); // End of stream

    form.parse(incomingMessage, (err, fields, files) => {
      if (err) reject(err);
      resolve([fields, files]);
    });
  });
}

export function getFile(
  files: Record<string, any>,
  fieldName: string
): formidable.File | undefined {
  return Array.isArray(files[fieldName])
    ? files[fieldName][0]
    : files[fieldName];
}

export async function cleanupFiles(files: (formidable.File | undefined)[]) {
  const promises = files.filter(Boolean).map(
    (file) =>
      new Promise<void>((resolve) => {
        if (!file || !file.filepath) {
          resolve();
          return;
        }

        fs.unlink(file.filepath, (err) => {
          if (err)
            console.error(
              `Error deleting temporary file ${file.filepath}:`,
              err
            );
          resolve();
        });
      })
  );

  await Promise.all(promises);
}
