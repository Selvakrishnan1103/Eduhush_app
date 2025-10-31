import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  reportedBy: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: String, 
    required: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Report || mongoose.model("Report", reportSchema);
