import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("resume_file");
  if (!file)
    return NextResponse.json({ message: "No file found" }, { status: 400 });

  // Return the success response
  return NextResponse.json(
    {
      message: "Resume saved successfully",
      fileUrl: "https://mock-storage.com/user-123/resume.pdf", // Fake URL
      savedAt: new Date().toISOString(),
    },
    { status: 201 }
  );
}
