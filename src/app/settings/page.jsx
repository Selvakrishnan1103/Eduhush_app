import Footer from "../Components/Section/Footer";
import Header from "../Components/Section/Header";
import Settings from "../Components/Section/Settings";

export const metadata = {
  title: "Settings | EduHush",
  description:
    "Manage your EduHush account settings, preferences, and privacy options. Customize your learning experience easily.",
  keywords: [
    "EduHush settings",
    "account management",
    "user preferences",
    "privacy options",
    "EduHush user profile",
  ],
  openGraph: {
    title: "Settings | EduHush",
    description:
      "Update and manage your EduHush profile and learning preferences.",
    url: "https://eduhush.vercel.app/settings",
    siteName: "EduHush",
    images: [
      {
        url: "https://eduhush.vercel.app/Eduhush_Logo.png",
        width: 800,
        height: 600,
        alt: "EduHush Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function SettingsPage() {
  return (
    <div className="mb-22">
      <Header />
      <Settings />
      <Footer />
    </div>
  );
}
