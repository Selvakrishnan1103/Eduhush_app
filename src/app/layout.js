import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: {
    default: "EduHush | A Study-Based Video Platform for Learners",
    template: "%s | EduHush",
  },
  description:
    "EduHush is a distraction-free study-based video platform designed for learners and educators. Watch, share, and explore educational content that helps you grow academically and professionally.",
  keywords: [
    "EduHush",
    "study platform",
    "educational videos",
    "learning community",
    "student resources",
    "online learning",
    "academic content",
    "study-based content",
    "education platform",
    "knowledge sharing",
  ],
  metadataBase: new URL("https://eduhush.vercel.app"),
  alternates: {
    canonical: "https://eduhush.vercel.app",
  },
  openGraph: {
    title: "EduHush | A Study-Based Video Platform for Learners",
    description:
      "Join EduHush — a dedicated educational video platform connecting learners and educators worldwide. Explore study-focused content, discussions, and resources in one place.",
    url: "https://eduhush.vercel.app",
    siteName: "EduHush",
    images: [
      {
        url: "https://eduhush.vercel.app/Eduhush_Logo.png",
        width: 1200,
        height: 630,
        alt: "EduHush Educational Video Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduHush | A Study-Based Video Platform for Learners",
    description:
      "EduHush empowers learners through educational videos and study-based discussions. Join our growing community today.",
    creator: "@EduHushOfficial",
    images: ["https://eduhush.vercel.app/Eduhush_Logo.png"],
  },
  icons: {
    icon: "/favicon_edu_v3.png",
    apple: "/favicon_edu_v3.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// ✅ Move themeColor here
export const viewport = {
  themeColor: "#00b4d8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
