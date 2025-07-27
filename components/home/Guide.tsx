"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, MessagesSquare, ChartSpline } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Guide = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sectionsRef.current) return;

    const sections = gsap.utils.toArray<HTMLDivElement>(".horizontal-panel");
    const totalWidth = sections.length * 100;

    // Set the width of the scrolling container
    gsap.set(sectionsRef.current, {
      width: `${totalWidth}vw`,
    });

    // Horizontal scroll animation
    gsap.to(sectionsRef.current, {
      x: () => -(totalWidth - 100) + "vw",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => "+=" + (totalWidth - 105) + "vw",
        scrub: 2,
        pin: true,
        // invalidateOnRefresh: true,
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="guide" ref={containerRef} className="h-screen w-full bg-color text-white/60 relative overflow-hidden">

    <div className="neon-dot animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[15rem] bg-purple-600/60 blur-[100px]"/>

      <div className="text-center text-[30px] font-bold pt-20">
        <h1>How It Works</h1>
      </div>

      <main ref={sectionsRef} className="h-screen flex gap-x-6 relative snap-x">
        <div className="horizontal-panel flex justify-around items-center w-screen h-full flex-shrink-0 snap-center">
          <h3 className="text-[15rem] text-shadow-lg text-shadow-purple-800">1</h3>
          <div className="flex flex-col items-center text-start space-y-5">
            <h1 className="text-[4rem] font-bold">Choose Your Companion</h1>
            <p>Pick a companion based on the topic or subject you want to learn.</p>
          </div>
          <div className="shadow-2xl shadow-purple-800 blur-xs">
            <Bot size={"15rem"} className="main-color" />
          </div>
        </div>

        <div className="horizontal-panel flex justify-around items-center w-screen h-full flex-shrink-0 snap-center">
          <h3 className="text-[15rem] text-shadow-lg text-shadow-purple-800">2</h3>
          <div className="flex flex-col items-center text-start space-y-5">
            <h1 className="text-[4rem] font-bold">Start the Conversation</h1>
            <p>Chat in real-time — ask questions, get explanations, learn by doing.</p>
          </div>
          <div className="shadow-2xl shadow-purple-800 blur-xs">
            <MessagesSquare size={"15rem"} className="main-color" />
          </div>
        </div>

        <div className="horizontal-panel flex justify-around items-center w-screen h-full flex-shrink-0 snap-center">
          <h3 className="text-[15rem] text-shadow-lg text-shadow-purple-800">3</h3>
          <div className="flex flex-col items-center text-start space-y-5">
            <h1 className="text-[4rem] font-bold">Track Your Progress</h1>
            <p>Completed lessons, time spent, and topics mastered — all tracked.</p>
          </div>
          <div className="shadow-2xl shadow-purple-800 blur-xs">
            <ChartSpline size={"15rem"} className="main-color" />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Guide;