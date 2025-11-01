import Footer from "../Components/Section/Footer";
import Header from "../Components/Section/Header";
import News from "../Components/Section/News";

export const metadata = {
  title: "Latest News | EduHush",
  description:
    "Stay updated with the latest educational news, announcements, and trending topics on EduHush.",
  keywords: [
    "EduHush news",
    "education updates",
    "student announcements",
    "learning trends",
    "EduHush latest news",
  ],
  openGraph: {
    title: "Latest News | EduHush",
    description:
      "Get the latest updates and educational news from EduHush. Stay informed and inspired.",
    url: "https://eduhush.vercel.app/news",
    siteName: "EduHush",
    images: [
      {
        url: "https://eduhush.vercel.app/Eduhush_Logo.png",
        width: 800,
        height: 600,
        alt: "EduHush News Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function NewsPage() {
  return (
    <div className="mt-20 mb-20">
      <Header />
      <News />
      <Footer />
    </div>
  );
}
