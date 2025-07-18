import {Bookmark, Clock } from "lucide-react"
import { Button } from "../ui/button"
import { Companions } from "@prisma/client"
import Link from "next/link"

const CompanionCard = ({companion}: {companion: Companions}) => {
  return (
    <div className="border-rounded flex flex-col justify-around space-y-3 px-6 py-4 min-h-[280px]">
        <div className="flex-between">
            <h1 className="rounded-bg text-[13px] font-semibold">{companion.subject}</h1>
            <div className="bg-black rounded-full text-white p-2 cursor-pointer btn-hover">
                <Bookmark className="" size={20}/>
            </div>
        </div>

        <div className="space-y-3">
            <h1 className="font-bold text-lg">{companion.name}</h1>
            <p>{companion.topic}</p>
            <div className="flex-items !space-x-2">
                <Clock size={16}/>
                <p className="text-sm font-medium text-zinc-800">{companion.duration} mins</p>
            </div>
        </div>

        
        <Button className="w-full cursor-pointer btn-hover bg-orange-500 transition-all duration-300">
            <Link href={`/companion-library/${companion.id}`}>Lunch Companion</Link>
        </Button>
    </div>
  )
}

export default CompanionCard