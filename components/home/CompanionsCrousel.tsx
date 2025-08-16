"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companions } from "@/constants";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CompanionsCarousel = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const prevCard = () => {
        setActiveIndex((prev) => (prev - 1 + companions.length) % companions.length);
    };

    const nextCard = () => {
        setActiveIndex((prev) => (prev + 1) % companions.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % companions.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Only run GSAP animation on md+ screens
        if (window.innerWidth >= 768) {
        gsap.to(".companion-card", {
            duration: 0.5,
            ease: "power3.out",
            x: (i) => {
            const pos = (i - activeIndex + companions.length) % companions.length;
            return pos === 0 ? 0 : pos === 1 ? -40 : -80;
            },
            scale: (i) => {
            const pos = (i - activeIndex + companions.length) % companions.length;
            return pos === 0 ? 1 : pos === 1 ? 0.9 : 0.8;
            },
            opacity: (i) => {
            const pos = (i - activeIndex + companions.length) % companions.length;
            return pos === 0 ? 1 : pos === 1 ? 0.8 : 0.6;
            },
            zIndex: (i) => {
            const pos = (i - activeIndex + companions.length) % companions.length;
            return 30 - pos * 10;
            },
        });
        }
    }, [activeIndex]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <section className="min-h-screen w-full flex flex-col text-white/70 py-12 relative overflow-hidden">
        {/* Title */}
        <div className="text-center text-2xl md:text-4xl font-bold pt-12 md:pt-20">
            <h1>Companions Carousel</h1>
        </div>

        {/* Background glows */}
        <div className="absolute">
            <div className="size-[15rem] md:size-[25rem] bg-purple-500 blur-[120px] md:blur-[200px] top-1/2 left-0 -translate-x-40 translate-y-1/2 rotate-90 rounded-tl-full rounded-tr-full" />
        </div>
        <div className="absolute">
            <div className="size-[15rem] md:size-[25rem] bg-purple-500 blur-[120px] md:blur-[200px] top-1/2 right-0 translate-x-[40vw] md:translate-x-[90rem] translate-y-1/2 rotate-90 rounded-tl-full rounded-tr-full" />
        </div>

        {/* Content */}
        <main className="container size-full flex flex-col md:grid md:grid-cols-2 gap-y-12 md:gap-0 z-10">
            {/* Left text */}
            <section className="flex flex-col justify-center items-center md:items-start space-y-4 md:space-y-6 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-[3rem] font-bold">
                Meet Your Study Buddies
            </h1>
            <p className="max-w-md md:max-w-[35rem] text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <Link href={"/companion-library"}>
                <Button className="cursor-pointer btn-hover text-sm md:text-base px-4 py-2 md:px-6 md:py-3">
                Start Lesson
                </Button>
            </Link>
            </section>

            {/* Right cards */}
            <section className="relative flex flex-col items-center justify-center w-full">
            <div className="wrapper w-full flex flex-col items-center relative">
                {companions.map((companion, index) => {
                const pos = (index - activeIndex + companions.length) % companions.length;

                return (
                    <div
                    key={companion.id}
                    className={`companion-card transition-all duration-500 ease-in-out rounded-lg bg-color border border-white/30 shadow-xl p-4 md:p-5
                    ${
                        pos === 0
                        ? "z-30 scale-100 opacity-100"
                        : pos === 1
                        ? "z-20 scale-90 opacity-80 -translate-x-4 md:-translate-x-10"
                        : "z-10 scale-80 opacity-60 -translate-x-6 md:-translate-x-20"
                    } 
                    ${isMobile ? "relative mb-6 w-[90%]" : "absolute"}`}
                    >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative text-center md:text-left">
                        <h1 className="text-purple-600 text-xl md:text-[2.5rem] font-bold">
                            {companion.name}
                        </h1>
                        <h3 className="text-sm md:text-base">{companion.subject}</h3>
                        </div>
                        <div className="avatar">
                        <Image
                            src={companion.image}
                            alt="avatar"
                            width={120}
                            height={120}
                            className="w-24 h-24 md:w-[200px] md:h-[200px] object-cover"
                        />
                        </div>
                    </div>
                    <i className="text-sm md:text-[1.3rem] block mt-2">
                        {companion.tagline}
                    </i>
                    </div>
                );
                })}

                {/* Navigation buttons */}
                <div className="flex justify-center gap-x-4 mt-6 relative z-40">
                <Button
                    className="rounded-full bg-purple-600 btn-hover cursor-pointer size-10 md:size-12"
                    onClick={prevCard}
                >
                    <ArrowLeft />
                </Button>
                <Button
                    className="rounded-full bg-purple-700 btn-hover cursor-pointer size-10 md:size-12"
                    onClick={nextCard}
                >
                    <ArrowRight />
                </Button>
                </div>
            </div>
            </section>
        </main>
        </section>
    );
};

export default CompanionsCarousel;
