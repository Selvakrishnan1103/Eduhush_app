'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Loader2,
  UploadCloud,
  Brain,
  Image,
  Database,
  Sparkles,
  XCircle,
} from 'lucide-react';

export default function Upload() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [loadingStep, setLoadingStep] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [finished, setFinished] = useState(false); // shows final success/failure screen

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  const resetForm = () => {
    setFile(null);
    setThumbnail(null);
    setTitle('');
    setKeywords([]);
    setKeywordInput('');
    setError('');
    setSuccess(false);
    setResult(null);
    setLoadingStep('');
    setFinished(false);
  };

  const handleAddKeyword = () => {
    const word = keywordInput.trim();
    if (!word) return;
    if (keywords.length >= 5) return setError('Max 5 keywords.');
    if (keywords.includes(word)) return setError('Already added.');
    setKeywords([...keywords, word]);
    setKeywordInput('');
    setError('');
  };

  const handleRemoveKeyword = (word) => {
    setKeywords(keywords.filter((k) => k !== word));
  };

  const handleUpload = async () => {
    setError('');
    setSuccess(false);
    setFinished(false);

    if (!file || !title.trim() || !thumbnail || keywords.length === 0) {
      setError('Please fill all fields.');
      return;
    }

    try {
      setLoadingStep('classify');
      const formData = new FormData();
      formData.append('video', file);
      const classifyRes = await fetch(
        'https://selva1103-eduhush-classify.hf.space/classify',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!classifyRes.ok) throw new Error('Classification failed');
      const { prediction } = await classifyRes.json();
      setResult(prediction);

      if (prediction !== 1) {
        setError('❌ This video is not educational.');
        setLoadingStep('');
        setFinished(true);
        return;
      }

      setLoadingStep('video');
      const cloudForm = new FormData();
      cloudForm.append('file', file);
      const uploadRes = await fetch('/api/upload-video', {
        method: 'POST',
        body: cloudForm,
      });
      if (!uploadRes.ok) throw new Error('Cloudinary upload failed');
      const { url: videoUrl } = await uploadRes.json();

      setLoadingStep('thumbnail');
      const thumbForm = new FormData();
      thumbForm.append('file', thumbnail);
      thumbForm.append('upload_preset', 'eduhush-thumbnails');
      const thumbRes = await fetch(
        'https://api.cloudinary.com/v1_1/dv3ggy4va/image/upload',
        {
          method: 'POST',
          body: thumbForm,
        }
      );
      if (!thumbRes.ok) throw new Error('Thumbnail upload failed');
      const thumbData = await thumbRes.json();
      const thumbnailUrl = thumbData.secure_url;

      setLoadingStep('database');
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
      if (!saveRes.ok) throw new Error('Database save failed');

      setLoadingStep('done');
      setSuccess(true);
      setFinished(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setLoadingStep('');
      setFinished(true);
    }
  };

  const steps = [
    { id: 'classify', label: 'Analyzing Video...', icon: Brain, color: 'text-blue-500' },
    { id: 'video', label: 'Uploading Video...', icon: UploadCloud, color: 'text-indigo-500' },
    { id: 'thumbnail', label: 'Uploading Thumbnail...', icon: Image, color: 'text-purple-500' },
    { id: 'database', label: 'Saving Data...', icon: Database, color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-10 px-4">
      <motion.div
        className="bg-white border border-gray-200 shadow-xl p-10 rounded-2xl w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Upload Your Educational Video 🎓
        </h1>

        <AnimatePresence>
          {!loadingStep && !finished && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Enter video title"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Keywords</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add keyword..."
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddKeyword}
                        className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((word, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {word}
                          <button
                            onClick={() => handleRemoveKeyword(word)}
                            className="ml-2 text-red-500 font-bold"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Thumbnail Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnail(e.target.files[0])}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleUpload}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Upload & Classify
              </button>

              {error && <p className="text-center text-red-600 mt-3">{error}</p>}
            </motion.div>
          )}

          {loadingStep && !finished && (
            <motion.div key="steps" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {steps.map((step) => {
                const Icon = step.icon;
                const isDone =
                  loadingStep === 'done' ||
                  steps.findIndex((s) => s.id === step.id) < steps.findIndex((s) => s.id === loadingStep);

                return (
                  <div
                    key={step.id}
                    className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    {loadingStep === step.id ? (
                      <Loader2 className={`animate-spin ${step.color}`} />
                    ) : isDone ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <Icon className="text-gray-400" />
                    )}
                    <span
                      className={`font-medium ${
                        isDone ? 'text-green-700' : 'text-gray-700'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}

          {finished && (
            <motion.div
              key="result"
              className="text-center space-y-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {success ? (
                <>
                  <Sparkles className="mx-auto w-16 h-16 text-green-500" />
                  <h2 className="text-2xl font-bold text-green-600">
                    Upload Complete 🎉
                  </h2>
                  <p className="text-gray-600">
                    Your educational video has been uploaded successfully!
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="mx-auto w-16 h-16 text-red-500" />
                  <h2 className="text-2xl font-bold text-red-600">Upload Failed ❌</h2>
                  <p className="text-gray-600">{error || 'Something went wrong.'}</p>
                </>
              )}
              <button
                onClick={resetForm}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                OK
              </button>
            </motion.div>
          )}
          
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
