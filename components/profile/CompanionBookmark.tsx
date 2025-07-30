"use client";

import { Bookmark } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { toggleBookmark } from "@/actions/companion/Bookmarking/toggleBookmark";

const CompanionBookmark = ({companionId}: {companionId: string}) => {

  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleBookmarking = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300)

    startTransition(() => {
      toggleBookmark(companionId).then((res) => {
        setIsBooked(res.bookmarked)
      })
    } )
  }

  return (
    <Button disabled={isPending} onClick={handleBookmarking} className={`rounded-full text-black p-2 cursor-pointer btn-hover transition duration-300 ${isClicked ? "scale-5" : 'scale-100'} ${isBooked ? 'bg-zinc-800 text-white' : 'bg-white/60'}`}>
      <Bookmark className="" size={20}/>
    </Button>
  )
}

export default CompanionBookmark