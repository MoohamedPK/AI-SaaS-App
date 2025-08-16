"use client";

import { ChevronRight, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Companion } from "@prisma/client";
import Link from "next/link";
import CompanionBookmark from "../profile/CompanionBookmark";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CompanionCard = ({ companion }: { companion: Companion }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll animation
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Hover animation
      const animateHover = () => {
        gsap.to(cardRef.current, {
          scale: 1.03,
          boxShadow: "0 20px 25px -5px rgba(192, 132, 252, 0.2)",
          duration: 0.3,
        });
      };
      const animateLeave = () => {
        gsap.to(cardRef.current, {
          scale: 1,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
        });
      };

      cardRef.current?.addEventListener("mouseenter", animateHover);
      cardRef.current?.addEventListener("mouseleave", animateLeave);

      return () => {
        cardRef.current?.removeEventListener("mouseenter", animateHover);
        cardRef.current?.removeEventListener("mouseleave", animateLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col justify-between p-4 sm:p-6 md:p-8 min-h-[280px] md:min-h-[320px] rounded-2xl
        bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 overflow-hidden
        transition-all duration-300 hover:border-white/20 group"
    >
      {/* Floating light effect */}
      <div className="absolute top-1/4 -right-8 md:-right-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-600/20
        blur-[60px] md:blur-[80px] group-hover:blur-[90px] transition-all duration-700" />

      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs md:text-sm font-medium 
          bg-purple-500/10 text-purple-400 border border-purple-500/20">
          {companion.subject}
        </span>
        <CompanionBookmark companionId={companion.id} />
      </div>

      {/* Content */}
      <div className="space-y-2 md:space-y-3 z-10 mt-2">
        <h2 className="font-bold text-lg md:text-xl text-white">{companion.name}</h2>
        <p className="text-white/80 text-sm md:text-base line-clamp-2">{companion.topic}</p>
        <div className="flex items-center gap-2 text-white/60">
          <Clock size={16} className="text-purple-400" />
          <span className="text-sm md:text-base font-medium">{companion.duration} mins</span>
        </div>
      </div>

      {/* Button */}
      <Link href={`/companion-library/${companion.id}`} className="z-10 mt-4">
        <Button
          variant="ghost"
          className="cursor-pointer w-full bg-white/10 hover:bg-white/20 border border-white/10
            text-white backdrop-blur-md transition-all duration-300
            group-hover:bg-purple-600/30 group-hover:border-purple-600/50 group-hover:text-white
            group-hover:shadow-lg group-hover:shadow-purple-600/20 flex items-center justify-between"
        >
          Launch Companion
          <ChevronRight />
        </Button>
      </Link>
    </div>
  );
};

export default CompanionCard;
