import {Bookmark, Clock } from "lucide-react"
import { Button } from "../ui/button"

const CompanionCard = () => {
  return (
    <div className="border-rounded flex flex-col justify-around space-y-3 px-6 py-4 min-h-[280px]">
        <div className="flex-between">
            <h1 className="rounded-bg text-[14px]">category</h1>
            <div className="bg-black rounded-full text-white p-2">
                <Bookmark className="cursor-pointer" size={20}/>
            </div>
        </div>

        <div className="space-y-3">
            <h1 className="font-bold text-lg">Lorem ipsum dolor sit amet consectetur adipisicing.</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing </p>
            <div className="flex-items !space-x-2">
                <Clock size={16}/>
                <p className="text-sm font-medium text-zinc-800">mins duration</p>
            </div>
        </div>

        
        <Button className="w-full cursor-pointer bg-orange-500">Lunch Lesson</Button>
    </div>
  )
}

export default CompanionCard