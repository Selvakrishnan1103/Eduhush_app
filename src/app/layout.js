import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "EduHush",
  description: "A study-based video platform",
  icons: {
    icon: "/favicon_edu_v3.png",
  },
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
