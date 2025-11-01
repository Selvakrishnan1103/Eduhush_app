import Image from "next/image";
import LoginButton from "../Components/Button/LoginButton";
import Header from "../Components/Section/Header";
import Footer from "../Components/Section/Footer";

export const metadata = {
  title: "Login | EduHush",
  description:
    "Login to EduHush and start your distraction-free learning journey. Access educational videos curated just for you.",
  keywords: [
    "EduHush login",
    "education platform login",
    "study videos login",
    "distraction-free learning",
    "EduHush account",
  ],
  openGraph: {
    title: "Login | EduHush",
    description:
      "Sign in to EduHush — a distraction-free platform offering only educational videos powered by AI filtering.",
    url: "https://eduhush.vercel.app/login",
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
  twitter: {
    card: "summary_large_image",
    title: "Login | EduHush",
    description:
      "Sign in to EduHush and continue your focused learning experience with AI-curated educational content.",
    images: ["https://eduhush.vercel.app/Eduhush_Logo.png"],
  },
};

export default function LoginPage() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-150">
        <div className="flex flex-col gap-5 justify-center items-center h-100">
          <div className="rounded-full overflow-hidden border-2 border-blue-300">
            <Image
              src="/Eduhush.png"
              alt="EduHush Logo"
              width={250}
              height={250}
              priority={true}
            />
          </div>
          <LoginButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}
