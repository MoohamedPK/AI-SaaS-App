import CompanionForm from "@/components/companion/CompanionForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Metadata } from "next"

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Create New AI Companion | Freelance Boost AI",
    description: "Build your custom AI companion for learning and productivity. Create personalized AI assistants tailored to your specific needs and subjects.",
    keywords: [
      "AI companion",
      "custom AI",
      "AI builder",
      "learning assistant",
      "productivity AI",
      "personalized AI",
      "AI tutor",
      "freelance tools"
    ],
    openGraph: {
      title: "Create New AI Companion | Freelance Boost AI",
      description: "Build your custom AI companion for learning and productivity. Create personalized AI assistants tailored to your specific needs and subjects.",
      type: "website",
      url: "/companion-library/new",
      siteName: "Freelance Boost AI",
      images: [
        {
          url: "/logo.svg",
          width: 1200,
          height: 630,
          alt: "Freelance Boost AI - Create AI Companion"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Create New AI Companion | Freelance Boost AI",
      description: "Build your custom AI companion for learning and productivity.",
      images: ["/logo.svg"]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    alternates: {
      canonical: "/companion-library/new"
    }
  }
}

const NewCompanion = async () => {

  const {userId} = await auth()

  if (!userId) return redirect("/sign-in")
  return (
    <div className="container space-y-8">

      <div className="">
        <h1 className="text-xl font-bold">Companion Builder</h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <CompanionForm/>
      </div>
    </div>
  )
}

export default NewCompanion