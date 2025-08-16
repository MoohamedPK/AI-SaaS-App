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

    // Only apply horizontal scroll on md+ screens
    if (window.innerWidth >= 768) {
      const sections = gsap.utils.toArray<HTMLDivElement>(".horizontal-panel");
      const totalWidth = sections.length * 100;

      gsap.set(sectionsRef.current, {
        width: `${totalWidth}vw`,
      });

      gsap.to(sectionsRef.current, {
        x: () => -(totalWidth - 100) + "vw",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + (totalWidth - 105) + "vw",
          scrub: 2,
          pin: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="guide"
      ref={containerRef}
      className="min-h-screen w-full bg-color text-white/60 relative overflow-hidden"
    >
      <div className="neon-dot animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[15rem] bg-purple-600/60 blur-[100px]" />

      <div className="text-center text-3xl md:text-4xl font-bold pt-20">
        <h1>How It Works</h1>
      </div>

      {/* Wrapper */}
      <main
        ref={sectionsRef}
        className="h-auto md:h-screen flex md:flex-row flex-col gap-x-6 relative"
      >
        {/* Panel 1 */}
        <div className="horizontal-panel flex flex-col md:flex-row justify-around items-center w-full md:w-screen h-auto md:h-full flex-shrink-0 p-6 text-center md:text-left">
          <h3 className="text-6xl md:text-[15rem] text-shadow-lg text-shadow-purple-800">
            1
          </h3>
          <div className="flex flex-col items-center md:items-start space-y-5 max-w-md">
            <h1 className="text-2xl md:text-[4rem] font-bold">
              Choose Your Companion
            </h1>
            <p className="text-sm md:text-base">
              Pick a companion based on the topic or subject you want to learn.
            </p>
          </div>
          <div className="shadow-2xl shadow-purple-800">
            <Bot size={100} className="md:w-[15rem] md:h-[15rem] main-color" />
          </div>
        </div>

        {/* Panel 2 */}
        <div className="horizontal-panel flex flex-col md:flex-row justify-around items-center w-full md:w-screen h-auto md:h-full flex-shrink-0 p-6 text-center md:text-left">
          <h3 className="text-6xl md:text-[15rem] text-shadow-lg text-shadow-purple-800">
            2
          </h3>
          <div className="flex flex-col items-center md:items-start space-y-5 max-w-md">
            <h1 className="text-2xl md:text-[4rem] font-bold">
              Start the Conversation
            </h1>
            <p className="text-sm md:text-base">
              Chat in real-time — ask questions, get explanations, learn by
              doing.
            </p>
          </div>
          <div className="shadow-2xl shadow-purple-800">
            <MessagesSquare
              size={100}
              className="md:w-[15rem] md:h-[15rem] main-color"
            />
          </div>
        </div>

        {/* Panel 3 */}
        <div className="horizontal-panel flex flex-col md:flex-row justify-around items-center w-full md:w-screen h-auto md:h-full flex-shrink-0 p-6 text-center md:text-left">
          <h3 className="text-6xl md:text-[15rem] text-shadow-lg text-shadow-purple-800">
            3
          </h3>
          <div className="flex flex-col items-center md:items-start space-y-5 max-w-md">
            <h1 className="text-2xl md:text-[4rem] font-bold">
              Track Your Progress
            </h1>
            <p className="text-sm md:text-base">
              Completed lessons, time spent, and topics mastered — all tracked.
            </p>
          </div>
          <div className="shadow-2xl shadow-purple-800">
            <ChartSpline
              size={100}
              className="md:w-[15rem] md:h-[15rem] main-color"
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Guide;
