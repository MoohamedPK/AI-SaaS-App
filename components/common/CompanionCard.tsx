"use client";

import { ChevronRight, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Companion } from "@prisma/client";
import Link from "next/link";
import CompanionBookmark from "../profile/CompanionBookmark";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CompanionCard = ({ companion }: { companion: Companion }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Hover animation
      gsap.to(cardRef.current, {
        scale: 1,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        duration: 0.3
      });

      cardRef.current?.addEventListener("mouseenter", () => {
        gsap.to(cardRef.current, {
          scale: 1.03,
          boxShadow: "0 20px 25px -5px rgba(192, 132, 252, 0.2)",
          duration: 0.3
        });
      });

      cardRef.current?.addEventListener("mouseleave", () => {
        gsap.to(cardRef.current, {
          scale: 1,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          duration: 0.3
        });
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col justify-between p-6 min-h-[300px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20 group"
    >
      {/* Animated gradient background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" /> */}
      
      {/* Floating light effect */}
      <div className="absolute top-1/4 -right-10 w-32 h-32 rounded-full bg-purple-600/20 blur-[80px] group-hover:blur-[100px] transition-all duration-700" />

      {/* Header section */}
      <div className="flex justify-between items-start z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
          {companion.subject}
        </span>
        <CompanionBookmark companionId={companion.id} />
      </div>

      {/* Content section */}
      <div className="space-y-4 z-10">
        <h2 className="font-bold text-xl text-white mt-2">{companion.name}</h2>
        <p className="text-white/80 text-sm line-clamp-2">{companion.topic}</p>
        <div className="flex items-center gap-2 text-white/60">
          <Clock size={16} className="text-purple-400" />
          <span className="text-sm font-medium">{companion.duration} mins</span>
        </div>
      </div>

      {/* Button section */}
      <Link href={`/companion-library/${companion.id}`} className="z-10">
        <Button
          variant="ghost"
          className="cursor-pointer w-full mt-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-purple-600/30 group-hover:border-purple-600/50 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-600/20"
        >
          Launch Companion
          <ChevronRight/>
        </Button>
      </Link>
    </div>
  );
};

export default CompanionCard;