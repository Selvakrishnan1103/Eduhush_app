import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  ip: String, // or userId if authenticated
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.View || mongoose.model('View', viewSchema);
