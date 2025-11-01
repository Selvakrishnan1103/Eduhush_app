import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongoDb";
import Report from "@/models/Report";
import User from "@/models/User";  // ✅ import User model

export async function POST(request) {
  try {
    await connectToMongoDb();
    const body = await request.json();

    const { videoId, reportedBy, uploadedBy, uploadedByEmail } = body;

    if (!videoId || !reportedBy || !uploadedBy || !uploadedByEmail) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: reportedBy });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const report = await Report.create({
      videoId,
      reportedBy: user._id,
      uploadedBy,
      uploadedByEmail,
    });

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
