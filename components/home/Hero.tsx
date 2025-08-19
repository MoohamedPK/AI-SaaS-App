'use client';

import { useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText);

const Hero = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !heroTextRef.current) return;

    const heroTextSplit = SplitText.create(heroTextRef.current, {
      type: "words, chars, lines"
    });

    gsap.from(heroTextSplit.lines, {
      y: 100,
      autoAlpha: 0,
      duration: 1.5,
      stagger: 0.3
    });

    return () => {
      if (heroTextSplit) {
        heroTextSplit.revert();
      }
    };
  }, []);

  return (
    <section className='bg-color accent-color min-h-screen w-full flex flex-col pt-24 md:pt-32 relative overflow-hidden'>
      {/* Background circles */}
      <div className="size-full absolute inset-0">
        <p className="neon-circle animate-[wiggle_0.2s_ease-in-out_infinite] bg-violet-400/70 size-[300px] md:size-[400px] rounded-full blur-[100px] md:blur-[130px]" />
        <span className="neon-circle absolute bg-violet-400/70 size-[300px] md:size-[400px] rounded-full blur-[100px] md:blur-[130px]" />
      </div>

      {/* Hero content */}
      <div className='center-items text-center space-y-6 z-30 px-4'>
        <h1
          ref={heroTextRef}
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[60px] uppercase font-bold w-full mx-auto text-shadow-sm text-shadow-white/40 leading-tight'
        >
          Learn Smarter, Not Harder — With Your AI Study Companion.
        </h1>

        <p className='max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/70 px-2'>
          Say goodbye to boring study routines. Converse with AI companions that adapt to your level,
          track your progress, and make learning stick.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center'>
          <Link href={'#subscription'}>
            <Button className="bg-zinc-900 shadow-2xl shadow-violet-400/70 text-white/80 cursor-pointer btn-hover w-full sm:w-auto">
              Get Started
            </Button>
          </Link>

          <Link href={'#guide'}>
            <Button className="bg-zinc-800 shadow-2xl shadow-violet-400/70 text-white/80 cursor-pointer btn-hover w-full sm:w-auto">
              See How It Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
