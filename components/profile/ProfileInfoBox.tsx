"use client";

import { CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ProfileInfoBox = ({ value, text }: { value: number; text: string }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in and slide-up animation
      gsap.from(boxRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "back.out(1.2)"
      });

      // Counter animation for the numeric value
      gsap.fromTo(
        valueRef.current,
        { innerText: 0 },
        {
          innerText: value,
          duration: 1.5,
          snap: { innerText: 1 },
          ease: "power2.out"
        }
      );

      // Hover scale and background effect
      const hoverIn = () =>
        gsap.to(boxRef.current, {
          scale: 1.03,
          background: "rgba(255, 255, 255, 0.08)",
          duration: 0.3
        });

      const hoverOut = () =>
        gsap.to(boxRef.current, {
          scale: 1,
          background: "rgba(255, 255, 255, 0.03)",
          duration: 0.3
        });

      boxRef.current?.addEventListener("mouseenter", hoverIn);
      boxRef.current?.addEventListener("mouseleave", hoverOut);
    }, boxRef);

    return () => ctx.revert();
  }, [value]);

  return (
    <div
      ref={boxRef}
      className="relative w-full md:w-fit rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-orange-500/20"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />

      {/* Value and icon */}
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <CheckCircle size={20} className="text-orange-400" />
        </div>
        <span
          ref={valueRef}
          className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400"
        >
          {value}
        </span>
      </div>

      <p className="text-sm font-medium text-white/80">{text}</p>

      {/* Subtle glow effect */}
      <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-orange-500/10 blur-xl pointer-events-none" />
    </div>
  );
};

export default ProfileInfoBox;
