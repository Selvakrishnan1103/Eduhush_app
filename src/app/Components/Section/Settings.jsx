"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Settings() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const settings = [
    { name: "Profile", path: "/dashboard" },
    { name: "Help & Support", path: "/settings/help-support" },
    { name: "User Feedback", path: "/settings/user-feedback" },
    { name: "Notifications", path: "/settings/notification" },
  ];

  const handleAuthAction = () => {
    if (session) {
      signOut();
    } else {
      signIn("google");
    }
  };

  // Skeleton Loader
  if (status === "loading") {
    return (
      <div className="pt-28 px-4 max-w-xl mx-auto animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded shadow-sm"
            ></div>
          ))}
          <div className="h-12 bg-gray-300 rounded shadow-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 max-w-xl mx-auto text-[#3C7BAA] font-semibold">
      <h1 className="text-2xl font-bold mb-6 text-[#3C7BAA]">Settings</h1>
      <div className="space-y-4">
        {settings.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.path)}
            className="cursor-pointer bg-white shadow p-4 rounded hover:bg-gray-50 border border-gray-100 transition"
          >
            {item.name}
          </div>
        ))}

        <div
          onClick={handleAuthAction}
          className={`cursor-pointer shadow p-4 rounded text-center font-semibold transition ${
            session
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {session ? "Logout" : "Login"}
        </div>
      </div>
    </div>
  );
}
