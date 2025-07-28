"use client"

import { pricing } from "@/consonants"
import PricingCard from "../common/PricingCard"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
    const cardRef = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current.length || !containerRef.current) return;

        // Hide all cards initially
        gsap.set(cardRef.current, { opacity: 0, y: 50 });

        // Create a timeline for sequential animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none "
            }
        });

        // Add each card animation to the timeline sequentially
        cardRef.current.forEach((card) => {
            tl.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.3
            });
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section className="container min-h-screen w-full flex flex-col text-white/60 py-20 overflow-hidden">
            <div className="text-center mb-20 space-y-6 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold">Choose Your Learning Journey</h1>
                <p className="text-lg accent-color">
                    Start free, upgrade anytime. Unlock smarter Conversations, deeper insights, 
                    and unlimited potential with a plan that fits your goals.
                </p>
            </div>

            <div ref={containerRef} className="w-full px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricing.map((price, index) => (
                        <div 
                            ref={el => { cardRef.current[index] = el; }}
                            key={price.title}
                            className="relative"
                        >
                            <span className="absolute top-0 left-0 bg-purple-600/70 size-60 blur-[150px]"/>
                            <PricingCard content={price}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Pricing;