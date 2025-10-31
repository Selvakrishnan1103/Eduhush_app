'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function VideoCard({ video, onDelete, loading = false }) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow animate-pulse">
        <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="flex gap-3">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    router.push(`/dashboard/edit-video/${video._id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this video?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/videos/${video._id}`, { method: 'DELETE' });

      if (res.ok) {
        onDelete(video._id);
      } else {
        const errorData = await res.json();
        alert(`Failed to delete video: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the video.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-all duration-200">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold text-[#3C7BAA] truncate">{video.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        Uploaded on {new Date(video.createdAt).toLocaleDateString()}
      </p>

      <div className="flex gap-3 mt-3">
        <button
          onClick={handleEdit}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
