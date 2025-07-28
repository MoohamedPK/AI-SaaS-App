"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
// import { useRef, useEffect } from "react";

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { companions } from "@/consonants";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger)


const CompanionsCrousel = () => {

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const prevCard = () => {
        setActiveIndex((prev) => (prev - 1) % companions.length);
    }

    const nextCard = () => {
        setActiveIndex((prev) => (prev + 1) % companions.length )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % companions.length);
        }, 3000)

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
  // Animate cards when activeIndex changes
    gsap.to(".companion-card", {
        duration: 0.5,
        ease: "power3.out",
        x: (i) => {
        const position = (i - activeIndex + companions.length) % companions.length;
        return position === 0 ? 0 : position === 1 ? -40 : -80;
        },
        scale: (i) => {
        const position = (i - activeIndex + companions.length) % companions.length;
        return position === 0 ? 1 : position === 1 ? 0.9 : 0.8;
        },
        opacity: (i) => {
        const position = (i - activeIndex + companions.length) % companions.length;
        return position === 0 ? 1 : position === 1 ? 0.8 : 0.6;
        },
        zIndex: (i) => {
        const position = (i - activeIndex + companions.length) % companions.length;
        return 30 - (position * 10);
        }
    });
    }, [activeIndex]);

    return (
        <section className="h-[120dvh] w-full flex flex-col text-white/60 py-12 relative overflow-hidden">
        
        <div className="text-center text-[30px] font-bold pt-20">
            <h1>Companions Carousel</h1>
        </div>

         <div className="w-full absolute">
            <div className="size-[25rem] bg-purple-500 blur-[200px] top-1/2 left-0 -translate-x-52  translate-y-1/2 rotate-90
                rounded-tl-full rounded-tr-full ">

            </div>
        </div>

        <div className="w-full absolute">
            <div className="size-[25rem] bg-purple-500 blur-[200px] top-1/2 right-0 translate-x-[90rem]  translate-y-1/2 rotate-90
                rounded-tl-full rounded-tr-full ">

            </div>
        </div>

        <main className="grid grid-cols-2 size-full container z-90">
            <section className="left flex flex-col justify-center space-y-6">
                <h1 className="text-[3rem]">Meet Your Study Buddies</h1>
                <p className="max-w-[35rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <Link href={"/companion-library"}>
                    <Button className="cursor-pointer btn-hover ">Start Lesson</Button>
                </Link>
            </section>

            <section className="right">
                <div className="wrapper size-full relative flex flex-col justify-end ">
                    {companions.map((companion, index) => {

                    // Calculate position in stack
                    const position = (index - activeIndex + companions.length) % companions.length;
                    
                    return (
                        <div 
                        key={companion.id}
                        className={`absolute transition-all duration-500 ease-in-out rounded-lg bg-color border border-white/30 shadow-xl p-5
                            ${position === 0 ? 'z-30 scale-100 opacity-100' : 
                            position === 1 ? 'z-20 scale-90 opacity-80 -translate-x-10' : 
                            'z-10 scale-80 opacity-60 -translate-x-20'}`}
                        style={{
                            transform: position === 0 ? 'translateX(0)' : 
                                    position === 1 ? 'translateX(-10%) scale(0.9)' : 
                                    'translateX(-20%) scale(0.8)',
                            cursor: position === 0 ? 'pointer' : 'default'
                        }}
                        >
                        <div className="flex justify-between items-center">
                            <div className="relative">
                            <div className="animate-pulse before:w-full before:h-full before:bg-purple-500/60 before:absolute before:bottom-0 before:-left-2 before:blur-[60px]">
                                <h1 className="text-purple-600 text-shadow-2xs text-shadow-purple-400 text-[2.5rem] font-bold">
                                {companion.name}
                                </h1>
                                <h3>{companion.subject}</h3>
                            </div>
                            </div>
                            <div className="avatar translate-x-10 -translate-y-20">
                            <Image src={companion.image} alt="avatar" width={200} height={200}/>
                            </div>
                        </div>
                        <i className="text-[1.3rem]">{companion.tagline}</i>
                        </div>
                    );
                    })}

                    <div className="flex-items justify-center gap-x-4"> 
                        <Button className="rounded-full bg-purple-600 btn-hover cursor-pointer" onClick={prevCard}><ArrowLeft/></Button>
                        <Button className="bg-purple-700 rounded-full btn-hover cursor-pointer" onClick={nextCard}><ArrowRight/></Button>
                    </div>
                </div>

            {/* Navigation buttons */}
            </section>
        </main>
        </section>
    );
};


export default CompanionsCrousel