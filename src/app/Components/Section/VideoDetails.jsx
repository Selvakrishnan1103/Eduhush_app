'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShareNodes,
  FaFlag,
  FaWhatsapp,
  FaFacebook,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";


export default function VideoDetails() {
  const { data: session } = useSession();
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (id) {
      trackView();
      fetchVideo();
    }
  }, [id]);

  const trackView = async () => {
    await fetch(`/api/videos/${id}/view`, { method: 'PATCH' });
  };

  const fetchVideo = async () => {
    const res = await fetch(`/api/videos/${id}`);
    const data = await res.json();
    setVideo(data);
    setComments(data.comments || []);
    setLoading(false);
  };

  const handleLike = async () => {
    await fetch(`/api/videos/${id}/like`, { method: 'PATCH' });
    setLiked(true);
    setDisliked(false);
    fetchVideo();
  };

  const handleDislike = async () => {
    await fetch(`/api/videos/${id}/dislike`, { method: 'PATCH' });
    setDisliked(true);
    setLiked(false);
    fetchVideo();
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    await fetch(`/api/videos/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: comment,
        author: session?.user?.name || 'Anonymous',
      }),
    });
    setComment('');
    fetchVideo();
  };

  const handleReport = async () => {
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: video._id,
          reportedBy: session?.user?.email, 
          uploadedBy: video.uploadedBy,  
          uploadedByEmail: video.uploadedByEmail,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Report submitted successfully");
      } else {
        alert(data.message || "Failed to submit report");
      }
    } catch (err) {
      console.error("Error submitting report:", err);
    }
  };



  const handleShareClick = () => {
    setShowShareModal(true);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md animate-pulse space-y-6">
        <div className="h-8 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="w-full h-[200px] lg:h-[400px] bg-gray-300 rounded-lg" />
        <div className="flex gap-3 flex-wrap">
          <div className="h-10 w-24 bg-gray-300 rounded" />
          <div className="h-10 w-28 bg-gray-300 rounded" />
          <div className="h-10 w-24 bg-gray-300 rounded" />
        </div>
        <div className="h-6 bg-gray-300 rounded w-1/3" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-1 text-[#3C7BAA]">{video.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        👁️ {video.views || 0} views • Uploaded on{' '}
        {new Date(video.createdAt).toLocaleDateString()}
      </p>

      <div className="w-full h-[200px] lg:h-[400px] bg-black rounded-lg overflow-hidden mb-4 border-2 border-solid border-blue-600">
        <video
          src={video.videoUrl}
          controls
          className="w-full h-full object-cover bg-black"
          poster={video.thumbnailUrl}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center w-full max-w-sm mx-auto mt-4">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 w-16 md:w-auto h-16 md:h-12 px-2 md:px-4 rounded-full transition-all duration-300 ${
            liked
              ? 'bg-[#1b3f5e] text-white'
              : 'text-[#3C7BAA] hover:bg-[#3C7BAA]/10 md:hover:bg-[#3C7BAA]/20'
          }`}
        >
          <FaThumbsUp className="text-xl md:text-base" />
          <span className="text-[11px] md:text-sm mt-1 md:mt-0 flex items-center gap-1">
            {video.likes || 0}
            <span className="hidden md:inline">Likes</span>
          </span>
        </button>

        {/* Dislike Button */}
        <button
          onClick={handleDislike}
          className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 w-16 md:w-auto h-16 md:h-12 px-2 md:px-4 rounded-full transition-all duration-300 ${
            disliked
              ? 'bg-[#5b0d0d] text-white'
              : 'text-[#5b0d0d] hover:bg-[#5b0d0d]/10 md:hover:bg-[#5b0d0d]/20'
          }`}
        >
          <FaThumbsDown className="text-xl md:text-base" />
          <span className="text-[11px] md:text-sm mt-1 md:mt-0 flex items-center gap-1">
            {video.dislikes || 0}
            <span className="hidden md:inline">Dislikes</span>
          </span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 w-16 md:w-auto h-16 md:h-12 px-2 md:px-4 rounded-full text-[#3C7BAA] hover:bg-[#3C7BAA]/10 md:hover:bg-[#3C7BAA]/20 transition-all duration-300"
        >
          <FaShareNodes className="text-xl md:text-base" />
          <span className="text-[11px] md:text-sm mt-1 md:mt-0">Share</span>
        </button>

        {/* Report Button */}
        
        <button
          onClick={handleReport}
          className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 w-16 md:w-auto h-16 md:h-12 px-2 md:px-4 rounded-full text-red-600 hover:bg-red-600/10 md:hover:bg-red-600/20 transition-all duration-300"
        >
          <FaFlag className="text-xl md:text-base" />
          <span className="text-[11px] md:text-sm mt-1 md:mt-0">Report</span>
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-2xl p-6 w-80 md:w-[420px] shadow-lg relative min-h-[250px]">
            {/* Close Button */}
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-600"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-10 text-center text-[#3C7BAA]">
              Share this video
            </h2>

            {/* Share Icons */}
            <div className="flex justify-around items-center mb-10">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-green-600 hover:opacity-80"
              >
                <FaWhatsapp className="text-4xl" />
                <span className="text-xs mt-1">WhatsApp</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-blue-600 hover:opacity-80"
              >
                <FaFacebook className="text-4xl" />
                <span className="text-xs mt-1">Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-black hover:opacity-80"
              >
                <FaXTwitter className="text-4xl" />
                <span className="text-xs mt-1">X</span>
              </a>

              <a
                href={`mailto:?subject=Check this out&body=${encodeURIComponent(window.location.href)}`}
                className="flex flex-col items-center text-gray-700 hover:opacity-80"
              >
                <FaEnvelope className="text-4xl" />
                <span className="text-xs mt-1">Email</span>
              </a>
            </div>

            {/* Copy Link */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
              />
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="ml-2 bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mb-6 mt-6">
        <h2 className="text-2xl font-semibold mb-2 text-[#3C7BAA]">Comments</h2>
        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 bg-white text-blue-600 focus:outline-blue-600"
          placeholder="Write a comment..."
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleComment}
          className="bg-[#3C7BAA] hover:bg-[#2d5d89] text-white px-4 py-2 rounded transition"
        >
          Add Comment
        </button>
      </div>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((cmt, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 bg-[#3C7BAA] text-white"
            >
              <p>{cmt.text}</p>
              <p className="text-sm mt-1">
                by {cmt.author || 'Anonymous'} •{' '}
                {new Date(cmt.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
