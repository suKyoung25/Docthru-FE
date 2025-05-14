import "./globals.css";

import localFont from "next/font/local";
import DevNavigation from "@/components/DevNavigation";

const pretendard = localFont({
  src: "../assets/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} font-pretendard flex min-h-screen flex-col antialiased`}
      >
        <main className="flex-grow pb-16">{children}</main>
        <DevNavigation />
      </body>
    </html>
  );
}
