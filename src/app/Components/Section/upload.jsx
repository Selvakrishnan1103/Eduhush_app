'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Upload() {
  const { data: session } = useSession();
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError('');
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleAddKeyword = () => {
    const word = keywordInput.trim();
    if (!word) return;

    if (keywords.length >= 5) {
      setError('You can add up to 5 keywords only.');
      return;
    }

    if (keywords.includes(word)) {
      setError('Keyword already added.');
      return;
    }

    setKeywords([...keywords, word]);
    setKeywordInput('');
    setError('');
  };

  const handleRemoveKeyword = (word) => {
    setKeywords(keywords.filter((k) => k !== word));
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a video file first.');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title for your video.');
      return;
    }

    if (!thumbnail) {
      setError('Please select a thumbnail image.');
      return;
    }

    if (keywords.length === 0) {
      setError('Please enter at least one keyword.');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    try {
      setLoading(true);
      setError('');

      const classifyRes = await fetch('http://127.0.0.1:5000/classify', {
        method: 'POST',
        body: formData,
      });

      if (!classifyRes.ok) throw new Error('Classification failed');

      const { prediction } = await classifyRes.json();
      setResult(prediction);

      if (prediction === 1) {
        const cloudForm = new FormData();
        cloudForm.append('file', file);

        const uploadRes = await fetch('/api/upload-video', {
          method: 'POST',
          body: cloudForm,
        });

        if (!uploadRes.ok) throw new Error('Cloudinary video upload failed');

        const { url: videoUrl } = await uploadRes.json();

        const thumbForm = new FormData();
        thumbForm.append('file', thumbnail);
        thumbForm.append('upload_preset', 'eduhush-thumbnails');

        const thumbRes = await fetch('https://api.cloudinary.com/v1_1/dv3ggy4va/image/upload', {
          method: 'POST',
          body: thumbForm,
        });

        if (!thumbRes.ok) throw new Error('Thumbnail upload failed');

        const thumbData = await thumbRes.json();
        const thumbnailUrl = thumbData.secure_url;

        const saveRes = await fetch('/api/save-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            videoUrl,
            thumbnailUrl,
            title,
            keywords,
            uploadedBy: session?.user?.name || 'anonymous',
          }),
        });

        if (!saveRes.ok) throw new Error('MongoDB save failed');

        alert('Video and thumbnail successfully uploaded!');
        setFile(null);
        setThumbnail(null);
        setTitle('');
        setKeywords([]);
      }

    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload & Classify Video</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Video Title</label>
          <input
            type="text"
            placeholder="Enter video title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Keywords (max 5)</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add keyword..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              +
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((word, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {word}
                <button
                  onClick={() => handleRemoveKeyword(word)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Classify & Upload'}
        </button>

        {result !== null && (
          <p className="mt-6 text-center text-lg font-semibold text-green-600">
            Prediction: {result === 1 ? 'Educational 📘' : 'Not Educational ❌'}
          </p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">Error: {error}</p>
        )}
      </div>
    </div>
  );
}
