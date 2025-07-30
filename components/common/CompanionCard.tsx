import { Clock } from "lucide-react"
import { Button } from "../ui/button"
import { Companion } from "@prisma/client"
import Link from "next/link"
import CompanionBookmark from "../profile/CompanionBookmark"

const CompanionCard = ({companion}: {companion: Companion}) => {

  return (
    <div className="border-rounded relative flex flex-col justify-around space-y-3 px-6 py-4 min-h-[280px] bg-white/40">
        
        <div className="neon absolute top-0 size-50 bg-purple-600 blur-[200px] "/>

        <div className="flex-between">
            <h1 className="rounded-bg text-[13px] font-semibold">{companion.subject}</h1>
            <CompanionBookmark companionId={companion.id}/>
        </div>

        <div className="space-y-3 text-zinc-900">
            <h1 className="font-bold text-lg">{companion.name}</h1>
            <p>{companion.topic}</p>
            <div className="flex-items !space-x-2">
                <Clock size={16}/>
                <p className="text-sm font-medium text-zinc-800">{companion.duration} mins</p>
            </div>
        </div>

        
        <Link href={`/companion-library/${companion.id}`}>
            <Button className="w-full cursor-pointer btn-hover hover:text-white bg-white/50 text-zinc-900 transition-all duration-300">
                Lunch Companion
            </Button>
            </Link>
    </div>
  )
}

export default CompanionCard