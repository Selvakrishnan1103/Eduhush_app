import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongoDb";
import Report from "@/models/Report";

export async function POST(request) {
  try {
    await connectToMongoDb();
    const body = await request.json();

    const { videoId, reportedBy, uploadedBy } = body;

    if (!videoId || !reportedBy || !uploadedBy) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const report = await Report.create({ videoId, reportedBy, uploadedBy });

    return NextResponse.json(
      { success: true, message: "Report submitted", report },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting report:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
