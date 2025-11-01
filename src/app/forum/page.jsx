import Footer from "../Components/Section/Footer";
import Forum from "../Components/Section/Forum";
import Header from "../Components/Section/Header";

export const metadata = {
  title: "EduHush Forum | Connect & Discuss with Learners",
  description:
    "Join the EduHush Forum to share knowledge, ask questions, and discuss educational topics with learners worldwide — all in a distraction-free environment powered by AI.",
  keywords: [
    "EduHush forum",
    "education discussion",
    "student community",
    "learning forum",
    "AI learning platform",
    "distraction-free education",
    "study discussions",
  ],
  openGraph: {
    title: "EduHush Forum | Connect & Discuss with Learners",
    description:
      "Engage with the EduHush learning community. Share insights, explore study topics, and grow together in a distraction-free space.",
    url: "https://eduhush.vercel.app/forum",
    siteName: "EduHush",
    images: [
      {
        url: "https://eduhush.vercel.app/Eduhush_Logo.png",
        width: 800,
        height: 600,
        alt: "EduHush Forum Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduHush Forum | Connect & Discuss with Learners",
    description:
      "Join the EduHush Forum and interact with passionate learners worldwide in a clean, distraction-free space.",
    images: ["https://eduhush.vercel.app/Eduhush_Logo.png"],
  },
  alternates: {
    canonical: "https://eduhush.vercel.app/forum",
  },
};

export default function ForumPage() {
  return (
    <div className="mt-20 mb-20">
      <Header />
      <main>
        <Forum />
      </main>
      <Footer />
    </div>
  );
}
