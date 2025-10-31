'use client';

import Footer from '@/app/Components/Section/Footer';
import Header from '@/app/Components/Section/Header';
import { useEffect, useState } from 'react';
import { Loader2, UploadCloud, CheckCircle } from 'lucide-react';

export default function EditProfilePage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    profilePicture: '',
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/users/profile');
      const data = await res.json();
      setUserData(data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'EduHush_Profile_Picture');

    setUploading(true);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dv3ggy4va/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUserData({ ...userData, profilePicture: data.secure_url });
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    await fetch('/api/users/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex justify-center items-center py-16 px-4">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#3C7BAA]">
            Edit Me
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <div className="relative inline-block">
                {userData.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="Profile"
                    className="w-28 h-28 rounded-full border-4 border-[#3C7BAA] shadow-md object-cover mx-auto"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 mx-auto">
                    <img
                      src='/proAvatar.png'
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-[#3C7BAA] text-white p-2 rounded-full cursor-pointer hover:bg-[#326b96]">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <UploadCloud size={16} />
                </label>
              </div>
              {uploading && (
                <p className="mt-2 text-sm text-gray-500 flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" size={16} /> Uploading...
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block font-semibold text-[#3C7BAA] mb-1">Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                placeholder="Tell something about yourself..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C7BAA] resize-none"
                rows="4"
              />
            </div>

            {/* Buttons */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#3C7BAA] hover:bg-[#326b96] text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>

              {success && (
                <p className="mt-3 text-green-600 flex justify-center items-center gap-2">
                  <CheckCircle size={18} /> Profile Updated Successfully!
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
