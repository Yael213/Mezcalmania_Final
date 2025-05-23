import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  //   const filePath = `/tmp/${file.name}`
  const filePath = path.join(process.cwd(), "public/Images/Mezcales/", file.name);
  await writeFile(filePath, buffer);
  console.log(`open ${filePath} to see the uploaded file`);

  return NextResponse.json({ success: true });
}