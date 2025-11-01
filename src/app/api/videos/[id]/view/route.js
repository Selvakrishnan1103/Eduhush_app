import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongoDb";
import Video from "@/models/Video";
import View from "@/models/View";

export async function PATCH(req, { params }) {
  await connectToMongoDb();
  const param = await params;
  const { id } = param.id;

  const ip = req.headers.get("x-forwarded-for") || "unknown";

  try {
    const alreadyViewed = await View.findOne({ videoId: id, ip });
    if (alreadyViewed) {
      return NextResponse.json({ message: "Already viewed" }, { status: 200 });
    }

    await View.create({ videoId: id, ip });
    await Video.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return NextResponse.json({ message: "View counted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
