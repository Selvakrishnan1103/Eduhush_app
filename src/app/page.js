import Footer from "./Components/Section/Footer";
import Header from "./Components/Section/Header";
import VideoList from "./Components/Section/Home";

export const metadata = {
  title: "EduHush | Distraction-Free Learning Platform",
  description:
    "EduHush is a distraction-free educational video platform powered by AI that filters only study-related content.",
  keywords: [
    "EduHush",
    "educational videos",
    "learning platform",
    "AI content filtering",
    "distraction-free education",
    "study videos only",
    "AI-powered learning"
  ],
  openGraph: {
    title: "EduHush | Learn Without Distractions",
    description:
      "AI-powered educational platform designed to help you focus on learning — no entertainment, only education.",
    url: "https://eduhush.vercel.app",
    siteName: "EduHush",
    images: [
      {
        url: "https://eduhush.vercel.app/Eduhush_Logo.png",
        width: 1200,
        height: 630,
        alt: "EduHush - Distraction-Free Learning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduHush | Distraction-Free Learning Platform",
    description:
      "Watch educational videos only — powered by AI that blocks distractions.",
    images: ["https://eduhush.vercel.app/Eduhush_Logo.png"],
  },
};

export default function HomePage() {
  return (
    <div className="mt-20 mb-20">
      <Header />
      <VideoList />
      <Footer />
    </div>
  );
}
