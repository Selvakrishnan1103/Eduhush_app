'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ProfileCard from './Components/ProfileCard';
import VideoCard from './Components/VideoCard';
import Header from '../Components/Section/Header';
import Footer from '../Components/Section/Footer';
import { FiVideo, FiEye } from 'react-icons/fi';
import StatsCard from './Components/StatsCard';
import { useRouter } from 'next/navigation';

// Skeleton Loader Component
function DashboardSkeleton() {
  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto p-6 mt-22 mb-22 text-[#3C7BAA] animate-pulse">
        {/* Welcome Section */}
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-24 bg-gray-200 rounded mb-8"></div>

        {/* Overview Section */}
        <div className="h-7 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded"></div>
                <div className="flex flex-col space-y-2 w-full">
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* My Content Section */}
        <div className="h-7 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-100 p-4 rounded shadow-md">
              <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchUserVideos = async () => {
        try {
          const res = await fetch('/api/videos/me');
          const data = await res.json();
          setVideos(data.videos || []);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };
      fetchUserVideos();
    }
  }, [status]);

  const handleDelete = (deletedId) => {
    setVideos(prev => prev.filter(video => video._id !== deletedId));
  };

  // ✅ Show skeleton while loading
  if (status === 'loading') {
    return <DashboardSkeleton />;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto p-6 mt-22 mb-22 text-[#3C7BAA]">
        <h1 className="text-3xl font-bold text-[#3C7BAA] mb-6">
          Hey, {session.user.name} 👋
        </h1>
        <ProfileCard user={session.user} />

        <h2 className="text-2xl mt-8 mb-4 text-[#3C7BAA]">🎯 Overview</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Total Videos" value={videos.length} icon={<FiVideo />} color="blue" />
          <StatsCard
            title="Total Views"
            value={videos.reduce((acc, video) => acc + (video.views || 0), 0)}
            icon={<FiEye />}
            color="purple"
          />
        </div>

        <h2 className="text-2xl mt-8 mb-4 text-[#3C7BAA]">🎞️ My Content</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {videos.length > 0 ? (
            videos.map(video => (
              <VideoCard key={video._id} video={video} onDelete={handleDelete} />
            ))
          ) : (
            <p className="text-gray-500">No videos uploaded yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
