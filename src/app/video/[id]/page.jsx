import Footer from "@/app/Components/Section/Footer";
import Header from "@/app/Components/Section/Header";
import VideoDetails from "@/app/Components/Section/VideoDetails";

export const metadata = {
  title: "EduHush | Video Details - Learn Without Distractions",
  description:
    "Dive deeper into your learning journey with EduHush — explore detailed insights, concepts, and related educational videos powered by AI content filtering.",
  keywords: [
    "EduHush video details",
    "educational video",
    "AI learning platform",
    "study content",
    "online education",
    "video learning",
    "distraction free platform",
    "EduHush AI",
  ],
  openGraph: {
    title: "EduHush | Learn Without Distractions",
    description:
      "Explore educational video details on EduHush — a distraction-free learning platform powered by AI that filters out non-educational content.",
    url: "https://eduhush.vercel.app/video",
    siteName: "EduHush",
    images: [
      {
        url: "https://eduhush.vercel.app/Eduhush_Logo.png",
        width: 1200,
        height: 630,
        alt: "EduHush - Educational Video Details",
      },
    ],
    locale: "en_US",
    type: "video.other",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduHush | Educational Video Details",
    description:
      "Watch, learn, and explore meaningful educational content on EduHush — powered by AI to keep you focused.",
    images: ["https://eduhush.vercel.app/Eduhush_Logo.png"],
  },
};

export default function VideoDetailsPage() {
  return (
    <div className="mt-20 mb-20">
      <Header />
      <VideoDetails />
      <Footer />
    </div>
  );
}
