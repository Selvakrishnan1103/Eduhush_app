import Footer from "@/app/Components/Section/Footer";
import Header from "@/app/Components/Section/Header";
import HelpSupport from "@/app/Components/Section/HelpSupport";

export const metadata = {
  title: "EduHush | Help & Support",
  description:
    "Need help? Get assistance from the EduHush support team. Find answers, contact support, and resolve your queries about uploading and watching educational videos.",
  keywords: [
    "EduHush support",
    "EduHush help",
    "EduHush contact",
    "AI learning platform support",
    "educational video help",
    "EduHush FAQ",
    "EduHush assistance",
    "EduHush contact us",
  ],
  openGraph: {
    title: "EduHush | Help & Support",
    description:
      "We're here to help! Contact the EduHush support team for any issues or questions related to educational videos, uploads, or AI moderation.",
    url: "https://eduhush.vercel.app/help-support",
    siteName: "EduHush",
    images: [
      {
        url: "https://eduhush.vercel.app/Eduhush_Logo.png",
        width: 1200,
        height: 630,
        alt: "EduHush - Help & Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduHush | Help & Support",
    description:
      "Need assistance? The EduHush support team is ready to help with your educational video uploads and platform issues.",
    images: ["https://eduhush.vercel.app/Eduhush_Logo.png"],
  },
};

export default function HelpSupportPage() {
  return (
    <div className="mt-20 mb-20">
      <Header />
      <HelpSupport />
      <Footer />
    </div>
  );
}
