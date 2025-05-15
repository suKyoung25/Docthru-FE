import "./globals.css";

import localFont from "next/font/local";
import DevNavigation from "@/components/DevNavigation";

const pretendard = localFont({
  src: "../assets/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const quanticoRegular = localFont({
  src: '../assets/font/QuanticoRegular.ttf',
  display: 'swap',
  weight: '400',
  variable: '--font-quantico-regular',
});

const quanticoBold = localFont({
  src: '../assets/font/QuanticoBold.ttf',
  display: 'swap',
  weight: '700',
  variable: '--font-quantico-bold',
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
