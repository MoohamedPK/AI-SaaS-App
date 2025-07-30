"use client";

import { CompletedLessons } from "@/ts.definitions/types";
import { BottleWine } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCompletedLessonsTable = ({ completedSessions }: { completedSessions: CompletedLessons[] }) => {
    const tableRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<HTMLTableRowElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Animate table rows on enter
        gsap.from(rowsRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.2)",
            scrollTrigger: {
            trigger: tableRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
            }
        });

        // Hover animations for rows
        rowsRef.current.forEach(row => {
            gsap.to(row, {
            scale: 1,
            background: "transparent",
            duration: 0.3
            });

            row.addEventListener("mouseenter", () => {
            gsap.to(row, {
                scale: 1.02,
                background: "rgba(255, 255, 255, 0.05)",
                duration: 0.3
            });
            });

            row.addEventListener("mouseleave", () => {
            gsap.to(row, {
                scale: 1,
                background: "transparent",
                duration: 0.3
            });
            });
        });
        }, tableRef);

        return () => ctx.revert();
    }, [completedSessions]);

    return (
        <div 
        ref={tableRef}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg border border-white/10 shadow-lg py-6 px-6 space-y-6 z-90 transition-all duration-300 hover:shadow-xl"
        >
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-400/10 border border-teal-400/20">
            <BottleWine className="h-5 w-5 text-teal-400" />
            </div>
            <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Completed Lessons
            </h1>
        </div>

        {completedSessions.length === 0 ? (
            <div className="py-8 text-center">
            <p className="text-white/60 italic">No completed lessons yet</p>
            </div>
        ) : (
            <div className="overflow-hidden custom-scrollbar">
            <table className="w-full">
                <thead>
                <tr className="border-b border-white/10 text-white/80 text-sm">
                    <th className="px-6 py-4 text-left font-medium">Lesson</th>
                    <th className="px-6 py-4 text-left font-medium">Subject</th>
                    <th className="px-6 py-4 text-left font-medium">Duration</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                {completedSessions.map((session, index) => (
                    <tr
                    key={index}
                    ref={el => {
                        if (el) rowsRef.current[index] = el;
                    }}
                    className="transition-all duration-300 hover:bg-white/5 cursor-pointer"
                    >
                    <td className="px-6 py-4">
                        <Link href={`/companion-library/${session.companion.id}`}>
                            <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                <BottleWine size={20} className="text-purple-400" />
                            </div>
                            <div className="space-y-1">
                                <h2 className="font-medium text-white">
                                {session.companion.name}
                                </h2>
                                <p className="text-sm text-white/60">
                                Topic: {session.companion.topic}
                                </p>
                            </div>
                            </div>
                        </Link>
                        </td>
                    <td className="px-6 py-4 text-white/80">
                        {session.companion.subject}
                    </td>
                    <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-400/10 text-xs font-medium text-teal-400">
                        {session.companion.duration} mins
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default AnimatedCompletedLessonsTable;