import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IGNOU Grade Card Check 2026 | Result, Status, Percentage Calculator",
  description: "Check IGNOU grade card, result status and percentage instantly for BCA, MCA and other programs.",
  icons:{
    icon:{url:"/IGNOU.png", sizes: "32x32", type: "image/png"}
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-gray-50">

        <Header />
        <main className="flex-1">
          {children}

        </main>

        <Footer />
      </body>
    </html>
  );
}
