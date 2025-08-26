import { fetchCompanionById } from "@/actions/companion/fetchCompanionById"
// import BackButton from "@/components/common/BackButton"
import AgentComponent from "@/components/companion/AgentComponent"
import { subjects } from "@/constants/index"
import { Companion } from "@prisma/client"
import { Metadata } from "next"

export const generateMetadata = async ({params}: {params: Promise<{id: string}>}): Promise<Metadata> => {
  const companionId = ((await params).id)
  const companion = await fetchCompanionById(companionId) as Companion

  if (!companion) {
    return {
      title: "Companion Not Found | Freelance Boost AI",
      description: "The requested AI companion could not be found."
    }
  }



  return {
    title: `${companion.name} - ${companion.subject} | Freelance Boost AI`,
    description: `Learn ${companion.topic} with ${companion.name}, your AI companion for ${companion.subject}. Interactive ${companion.duration}-minute session designed to boost your learning and productivity.`,
    keywords: [
      companion.name,
      companion.subject,
      companion.topic,
      "AI companion",
      "learning assistant",
      "interactive learning",
      "AI tutor",
      "freelance tools",
      "productivity AI"
    ],
    openGraph: {
      title: `${companion.name} - ${companion.subject} | Freelance Boost AI`,
      description: `Learn ${companion.topic} with ${companion.name}, your AI companion for ${companion.subject}. Interactive ${companion.duration}-minute session designed to boost your learning and productivity.`,
      type: "website",
      url: `/companion-library/${companionId}`,
      siteName: "Freelance Boost AI",
      images: [
        {
          url: "/logo.svg",
          width: 1200,
          height: 630,
          alt: `${companion.name} - ${companion.subject} AI Companion`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${companion.name} - ${companion.subject} | Freelance Boost AI`,
      description: `Learn ${companion.topic} with ${companion.name}, your AI companion for ${companion.subject}.`,
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
      canonical: `/companion-library/${companionId}`
    },
    other: {
      "subject": companion.subject,
      "topic": companion.topic,
      "duration": `${companion.duration} minutes`
    }
  }
}

const CompanionSession = async ({params}: {params: Promise<{id: string}>}) => {

  const companionId = ((await params).id)
  const companion = await fetchCompanionById(companionId) as Companion

  // Find the icon based on subject
  const subjectData = subjects.find((s) => s.name === companion.subject);
  const iconName = subjectData?.iconName;
  const color = subjectData?.color || "";

  return (
    <main className="md:px-15 md:py-6 mx-6 md:mx-0 space-y-12">
      {/* <BackButton/> */}
      <section className="rounded-lg px-7 py-10 flex-between shadow-2xl" style={{backgroundColor: color}}>
        <div className="flex-items ">
          {/* {Icon && <iconName size={32} className="text-primary" />} */}

          <div className="space-y-2">
            <div className="flex-items">
              <h1 className="text-xl font-bold">{companion.name}</h1>
              <span className="text-[13px] font-semibold rounded-bg">{companion.subject}</span>
            </div>

            <p className="accent-color">Topic: {companion.topic}</p>
          </div>
        </div>

        <p className="font-semibold accent-color text-lg">{companion.duration} mins</p>
      </section>

      <AgentComponent companion= {companion} iconName={iconName}/>

    </main>
  )
}

export default CompanionSession