import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import MouseFollower from "@/components/common/MouseFollower";

const soraFont = Sora({
  subsets: ["latin"],
  display: "swap"
})


export const metadata: Metadata = {
  title: "AI Learning Agent",
  icons: {
    icon: "/logo.svg",
    apple: "/apple-touch-icon.png",
    
  },
  description: "AI Learning Agent is a platform that allows you to interact with AI companions for learning and productivity.",
  keywords: ["AI Learning Agent", "AI Learning", "AI Companions", "AI Learning Companions", "AI Learning Companions for Learning", "AI Learning Companions for Productivity"],
  openGraph: {
    title: "AI Learning Agent",
    description: "AI Learning Agent is a platform that allows you to interact with AI companions for learning and productivity.",
    images: ["/images/og-image.png"],
    url: "https://learningagent.vercel.app/",
    type: "website",
    locale: "ar-MA",
    siteName: "AI Learning Agent",
    countryName: "Morocco",
    
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Learning Agent",
    description: "AI Learning Agent is a platform that allows you to interact with AI companions for learning and productivity.",
    images: ["/images/og-image.png"],
    
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={` ${soraFont.className} bg-color text-white/60 relative`}
        >
        <ClerkProvider>
          <Toaster/>
          <MouseFollower/>
          <Navbar/>
        {/* <div className="neon absolute top-0 left-0 size-[45rem] bg-purple-500 blur-[20rem]"/> */}
          
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
