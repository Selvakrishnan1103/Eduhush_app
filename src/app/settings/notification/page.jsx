import Footer from "@/app/Components/Section/Footer";
import Header from "@/app/Components/Section/Header";
import Notification from "@/app/Components/Section/Notification";

export const metadata = {
  title: "EduHush | Notifications",
  description:
    "Stay updated with EduHush notifications — get alerts about new educational videos, uploads, and important updates from our AI-powered learning platform.",
  keywords: [
    "EduHush notifications",
    "EduHush alerts",
    "AI learning updates",
    "educational video updates",
    "EduHush announcements",
    "EduHush news",
    "learning notifications",
    "EduHush AI platform",
  ],
  openGraph: {
    title: "EduHush | Notifications",
    description:
      "Stay informed with the latest updates, announcements, and educational video alerts from EduHush — your distraction-free learning platform.",
    url: "https://eduhush.vercel.app/notification",
    siteName: "EduHush",
    images: [
      {
        url: "https://eduhush.vercel.app/Eduhush_Logo.png",
        width: 1200,
        height: 630,
        alt: "EduHush - Notifications",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduHush | Notifications",
    description:
      "Get the latest updates and educational alerts from EduHush — stay connected with the learning community.",
    images: ["https://eduhush.vercel.app/Eduhush_Logo.png"],
  },
};

export default function NotificationPage() {
  return (
    <div className="mt-20 mb-20">
      <Header />
      <Notification />
      <Footer />
    </div>
  );
}
