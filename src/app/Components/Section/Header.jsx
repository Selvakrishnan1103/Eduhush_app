"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    setIsSearchActive(false);
  };

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) setSearchTerm("");
  };

  // ✅ Skeleton loader while session or header loads
  if (status === "loading") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#3C7BAA] shadow-md p-4">
        <div className="flex justify-between items-center animate-pulse">
          <div className="w-40 h-10 bg-blue-300 rounded-md"></div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-blue-300 rounded-full"></div>
            <div className="w-6 h-6 bg-blue-300 rounded-full"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#3C7BAA] shadow-md p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className={`${isSearchActive ? "hidden" : "flex"} lg:flex w-40 h-10 relative`}>
          <Link href="/" className="block w-full h-full relative">
            <Image
              src="/EduHushTextLogo.png"
              alt="Logo"
              fill
              className="object-contain cursor-pointer"
              priority
            />
          </Link>
        </div>

        {/* Search and Settings */}
        <div className="flex items-center w-full justify-between gap-4">
          <div className="flex items-center ml-auto space-x-4">
            {!isSearchActive ? (
              <button onClick={handleSearchToggle} className="p-2">
                <FaSearch className="w-6 h-6 text-white cursor-pointer" />
              </button>
            ) : (
              <form onSubmit={handleSearch} className="flex items-center mx-4 text-white">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-full focus:outline-none placeholder:text-white border-1"
                />
                <button type="button" onClick={handleSearchToggle} className="ml-2">
                  <IoClose className="w-6 h-6 text-white cursor-pointer" />
                </button>
              </form>
            )}

            <button
              onClick={() => router.push("/settings")}
              className="p-2"
              title="Settings"
            >
              <FiSettings className="w-6 h-6 text-white cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
