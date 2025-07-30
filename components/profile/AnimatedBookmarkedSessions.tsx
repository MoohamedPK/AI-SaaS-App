"use client";

import { Bookmarks } from "@/ts.definitions/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const AnimatedBookmarkedSessions = ({ bookmarks }: { bookmarks: Bookmarks[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const chevronRef = useRef<SVGSVGElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleBookmarks = () => setIsOpen(prev => !prev);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(".bookmark");
            const tl = gsap.timeline();

            // Animate Chevron with bounce effect
            gsap.to(chevronRef.current, {
                rotate: isOpen ? 0 : -90,
                duration: 0.4,
                ease: "elastic.out(1, 0.5)"
            });

            if (isOpen) {
                gsap.set(items, { 
                    opacity: 0, 
                    y: 15, 
                    scale: 0.95,
                    filter: "blur(2px)"
                });

                tl.to(items, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    stagger: {
                        each: 0.08,
                        from: "random"
                    }
                });
            } else {
                tl.to(items, {
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                    filter: "blur(2px)",
                    duration: 0.3,
                    ease: "power2.in",
                    stagger: 0.05
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [isOpen, bookmarks]);

    return (
        <div 
            className="mt-10 z-90 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            ref={containerRef}
        >
            {/* Header with subtle gradient and interactive feedback */}
            <div
                className="flex items-center justify-between p-5 cursor-pointer select-none group"
                onClick={toggleBookmarks}
            >
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400/80 shadow-[0_0_8px_2px_rgba(45,212,191,0.3)]"></div>
                    <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        Bookmarked Sessions
                    </h2>
                </div>
                <ChevronDown
                    ref={chevronRef}
                    className="h-5 w-5 text-gray-300 transition-all duration-300 group-hover:text-white"
                />
            </div>

            {/* Smooth height toggle with subtle glow effect */}
            <div
                className={`overflow-hidden transition-all duration-500`}
                style={{
                    height: isOpen && bookmarks.length > 0 ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <ul ref={listRef} className="px-3 pb-4 space-y-3">
                    {bookmarks.map((bookmark) => (
                        <li
                            key={bookmark.id}
                            className="bookmark p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 group/item"
                        >
                            <Link
                                href={`/companion-library/${bookmark.companion.id}`}
                                className="block"
                            >
                                <div className="font-medium text-white group-hover/item:text-teal-300  transition-colors duration-200">
                                    {bookmark.companion.name}
                                </div>
                                <div className="text-sm text-white/60 group-hover/item:text-white/80 transition-colors duration-200">
                                    {bookmark.companion.subject}
                                </div>
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-400/10 to-purple-400/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Empty state */}
            {bookmarks.length === 0 && isOpen && (
                <div className="px-5 pb-5 text-center text-white/50 italic">
                    No bookmarked sessions yet
                </div>
            )}
        </div>
    );
};

export default AnimatedBookmarkedSessions;