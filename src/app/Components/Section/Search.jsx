"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/videos?search=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="bg-white min-h-screen text-[#3C7BAA]">
      <Header />
      <div className="pt-28 px-4">
        <h1 className="text-xl font-bold mb-4">
          Search Results for <span className="text-[#3C7BAA]">"{query}"</span>
        </h1>

        {loading ? (
          // 🔹 Skeleton Loader Section
          <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="border border-[#3C7BAA]/20 rounded-lg p-4 bg-[#f9fcff] shadow-sm animate-pulse"
              >
                <div className="h-44 bg-[#3C7BAA]/20 rounded-md mb-3"></div>
                <div className="h-4 bg-[#3C7BAA]/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-[#3C7BAA]/10 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          // 🔹 Search Results Grid
          <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((video) => (
              <div
                key={video._id}
                className="cursor-pointer group"
                onClick={() => router.push(`/video/${video._id}`)}
              >
                <div className="overflow-hidden rounded-lg shadow-md border-2 border-[#3C7BAA]">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-lg font-semibold truncate text-[#3C7BAA]">
                    {video.title}
                  </h2>
                  <p className="text-sm text-[#3C7BAA]/80">{video.uploadedBy}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 🔹 No Results Message
          <p className="text-center text-[#3C7BAA]/80 mt-10 text-lg">
            No results found for "{query}".
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
