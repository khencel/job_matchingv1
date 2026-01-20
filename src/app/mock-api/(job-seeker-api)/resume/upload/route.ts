// app/api/mock-api/resume/upload/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Force Nodejs runtime to handle larger Formdata better

export async function POST(request: Request) {
  try {
    // 1. Check if the body is already used (Disturbed)
    if (request.bodyUsed) {
      return NextResponse.json(
        { message: "Request body already consumed" },
        { status: 500 },
      );
    }

    // 2. Clone the request if you're worried about logs/middleware touching it
    const clonedRequest = request.clone();
    const formData = await clonedRequest.formData();

    const file = formData.get("resume_file");

    if (!file) {
      return NextResponse.json({ message: "No file found" }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Success",
        fileUrl: "https://mock-storage.com/resume.pdf",
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("DETAILED ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
