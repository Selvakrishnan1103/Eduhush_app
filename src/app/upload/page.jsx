import Footer from "../Components/Section/Footer";
import Header from "../Components/Section/Header";
import Upload from "../Components/Section/upload";

export const metadata = {
  title: "EduHush | Upload Educational Videos",
  description:
    "Upload your educational videos to EduHush — an AI-powered, distraction-free learning platform that accepts only study-focused content.",
  keywords: [
    "EduHush upload",
    "upload educational video",
    "AI learning platform",
    "educational content upload",
    "distraction free education",
    "study videos only",
    "AI moderation",
    "EduHush AI",
  ],
  openGraph: {
    title: "EduHush | Upload Educational Videos",
    description:
      "Share your knowledge on EduHush — the AI-powered platform that accepts only educational, distraction-free videos.",
    url: "https://eduhush.vercel.app/upload",
    siteName: "EduHush",
    images: [
      {
        url: "https://eduhush.vercel.app/Eduhush_Logo.png",
        width: 1200,
        height: 630,
        alt: "EduHush - Upload Educational Content",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduHush | Upload Educational Videos",
    description:
      "Upload your study videos on EduHush — where AI ensures distraction-free educational content only.",
    images: ["https://eduhush.vercel.app/Eduhush_Logo.png"],
  },
};

export default function UploadPage() {
  return (
    <div className="mt-20 mb-20 lg:mt-0 lg:mb-0">
      <Header />
      <Upload />
      <Footer />
    </div>
  );
}
