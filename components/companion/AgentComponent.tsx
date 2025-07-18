"use client";

import { vapi } from "@/vapi.sdk";
import { CallStatus } from "@/ts.definitions/types";
import { useEffect, useRef, useState } from "react";
import { LucideIcon, Mic, Repeat, User } from "lucide-react";
import { Button } from "../ui/button";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/public/Sound Wave Loop.json"
import {
    Calculator,
    Atom,
    FlaskConical,
    Dna,
    BookOpen,
    ScrollText,
    Monitor,
    Globe,
    Paintbrush,
    Music
    } from "lucide-react";
import { cn } from "@/lib/utils";

    const iconMap: Record<string, LucideIcon> = {
    Calculator,
    Atom,
    FlaskConical,
    Dna,
    BookOpen,
    ScrollText,
    Monitor,
    Globe,
    Paintbrush,
    Music,
    };

const AgentComponent = ({iconName}: {iconName?: string}) => {

    const Icon = iconMap[iconName ?? ""];
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.ACTIVE);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

    const lottieRef = useRef<LottieRefCurrentProps>(null)

    useEffect(() => {

        if (lottieRef ) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {

        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
        const onMessage = () => {}
        const onError = (error: Error) => console.log("ERROR",error);
        const onSpeakingStart = () => setIsSpeaking(true);
        const onSpeakingEnd = () => setIsSpeaking(false);

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("error", onError);
        vapi.on("speech-start", onSpeakingStart);
        vapi.on("speech-end", onSpeakingEnd);
        
        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("error", onError);
            vapi.off("speech-start", onSpeakingStart);
            vapi.off("speech-end", onSpeakingEnd);
        }


    }, [])

  return (
    <section className="grid grid-cols-4 gap-6">
        <div className="col-span-3 space-y-8">
            <div className={cn("border-rounded !border-orange-500 p-8 flex flex-col justify-center items-center min-h-full", callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? "opacity-100" : "opacity-0",  callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse")}>
                {Icon && <Icon size={62} className="text-primary" />}
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            <div className={cn("transition-all duration-100", callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0")}>
                <Lottie lottieRef={lottieRef} animationData={soundwaves} autoPlay={false} className="bg-black"/>
            </div>

          <div className="min-w-full text-center">
            <p>translation</p>
          </div>
        </div>

        <div className="col-span-1">
            <div>
                <div className="space-y-5"> 
                    <div className="user center-items p-8 border-rounded">
                        {/* user image  */}
                        <User size={50} className="bg-neutral-400 rounded-full"/>
                        <p className="text-lg font-bold">user name</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <Button  className="mic border-rounded center-items py-3 min-h-full cursor-pointer">
                            <Mic size={28}/>
                            <p>Turn off mic</p>
                        </Button>

                        <Button className="repeat border-rounded center-items py-3 h-full cursor-pointer">
                            <Repeat size={28}/>
                            <p>Repeat</p>
                        </Button>
                    </div>

                    <Button className="w-full bg-orange-500 cursor-pointer">End Lesson</Button>
                </div>

            </div>
        </div>
      </section>
  )
}

export default AgentComponent