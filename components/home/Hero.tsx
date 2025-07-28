'use client';

import { useRef, useEffect } from 'react';
import { Button } from '../ui/button'
import Link from 'next/link'
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const Hero = () => {

  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroTextSplit = SplitText.create(heroTextRef.current, {type: "words, chars, lines"});

  useEffect(() => {

    if (!heroTextRef.current) return;

    gsap.from(heroTextSplit.lines, {
      y: 100,
      autoAlpha: 0,
      duration: 1.5,
      stagger: 0.3
    })


  }, [heroTextSplit.lines]);


  return (
    <section className='bg-color accent-color h-[120dvh] w-full flex flex-col pt-32 relative'>

        <div className="size-full absolute">
            <p className="neon-circle animate-[wiggle_0.2s_ease-in-out_infinite] bg-violet-400/70 size-[400px] rounded-full blur-[130px]" />
            <span className="neon-circle  absolute bg-violet-400/70 size-[400px] rounded-full blur-[130px]" />
        </div>

        <div className='center-items text-center space-y-6 z-30'>
            <h1 ref={heroTextRef} className='text-[60px] uppercase font-bold w-3/4 text-shadow-sm text-shadow-white/40'>Learn Smarter, Not Harder — With Your AI Study Companion.</h1>
            <p className='w-1/2 text-white/60'>Say goodbye to boring study routines. Converse with AI companions that adapt to your level, track your progress, and make learning stick.</p>

            <div className='space-x-6'>
              <Link href={'/subscription'}>
                <Button className="bg-zinc-900 shadow-2xl shadow-violet-400/70 text-white/70 cursor-pointer btn-hover">
                Get Started
                
                </Button>
              </Link>

              <Link href={'#guide'}>
                <Button className="bg- shadow-2xl shadow-violet-400/70 text-white/70 cursor-pointer btn-hover">
                See How It Works
                
                </Button>
              </Link>
            </div>
        </div>
    </section>
  )
}

export default Hero