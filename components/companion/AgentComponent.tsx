"use client";

import { vapi } from "@/vapi.sdk";
import { CallStatus, SavedMessage } from "@/ts.definitions/types";
import { useEffect, useRef, useState } from "react";
import { LucideIcon, Mic, MicOff, Repeat, User } from "lucide-react";
import { Button } from "../ui/button";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/public/Sound Wave Loop.json"
import { useUser } from "@clerk/nextjs";

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
import Image from "next/image";
import { Companion } from "@prisma/client";
import { assistantConfig, cn } from "@/lib/utils";
import { addCompanionToHistory, insertSessionToHistory, updatedSession } from "@/actions/companion/companionHistory/companionHistory";

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

const AgentComponent = ({companion, iconName}: {companion: Companion ,iconName?: string}) => {

    const {topic, style, subject, name, duration} = companion 
    const {user} = useUser()
    const Icon = iconMap[iconName ?? ""];
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(true);
    const [isMuted, setIsMuted] = useState<boolean>(false)
    const [messages, setMessages] = useState<SavedMessage[]>([]);

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
        const onCallEnd = () => {
          setCallStatus(CallStatus.FINISHED)

          addCompanionToHistory(user!.id, companion.id)
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onMessage = (message: any) => {
  if (!message?.transcript) return;

  setMessages((prev) => {
    const last = prev[prev.length - 1];

    if (last && last.role === message.role) {
      // Replace the last message
      const updated = [...prev];
      updated[updated.length - 1] = {
        role: message.role,
        text: message.transcript,
      };
      return updated;
    }

    // Otherwise, add new message
    return [...prev, { role: message.role, text: message.transcript }];
  });
};
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

    }, [companion.id, user])

    const toggleMicrophone = () => {
      if (callStatus === CallStatus.ACTIVE) {

        const isMuted = vapi.isMuted()
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
      }
    }

    const handleDisconnect = () => {
        vapi.stop()
        setMessages([])
    }

    const handleCall = async () => {
      
        setCallStatus(CallStatus.CONNECTING);

        const assistantOverrides = {
            variableValues:  {subject, topic, style},
        }
        
        vapi.start(assistantConfig, assistantOverrides);

        await insertSessionToHistory(companion.id, user?.id)
        const durationInMillsecond = duration * 60 * 1000;

        setTimeout(async () => {
          vapi.stop()
          await updatedSession(companion.id, user!.id)
        }, durationInMillsecond)
    }

  return (
    <section className="grid grid-cols-4 gap-6">
      {/* Left section */}
      <div className="col-span-3 space-y-8 relative">
        {/* Call State Display */}
        <div
          className={cn(
            "border-rounded !border-orange-500 p-8 flex flex-col justify-center items-center min-h-full transition-opacity duration-300",
            callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
              ? "opacity-100"
              : "opacity-0",
            callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse"
          )}
        >
          {Icon && <Icon size={62} className="text-primary" />}
          <p className="mt-4 text-center text-sm text-zinc-700">
            Waiting for the companion to speak...
          </p>
        </div>

        {/* Soundwave animation (active when speaking) */}
        <div
          className={cn(
            "transition-all duration-200 size-60 absolute",
            callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
          )}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={soundwaves}
            autoPlay={false}
            className="bg-black w-full"
          />
        </div>

        {/* Translation section */}

    <div className=" h-[120px] overflow-y-auto center-items">
        <div className="min-w-full text-center mt-6 relative">
            {messages.map((message) => {
              if (message.role === "assistant") {
                return (
                  <p key={message.text} className="text-orange-600 font-semibold text-sm italic overflow-y-hidden ">
                    {name.split(' ')[0].replace(/[.,]/g, " ")} : {message.text}
                  </p>  
                )
              } else {
                return <p key={message.text} className="text-blue-600 font-semibold  text-sm italic overflow-y-hidden " >
                    {user?.fullName} : {message.text}
                  </p>  
              }
            })}
            <div className=""/>
        </div>
    </div>
  </div>

      {/* Right panel (User controls) */}
      <div className="col-span-1">
        <div className="space-y-5">
          {/* User info */}
          <div className="center-items p-8 border-rounded border">
            {user?.hasImage ? (
                <Image src={user.imageUrl} width={100} height={100} className="rounded-xl" alt="user img"/>
            ) : (
                <User size={50} className="bg-neutral-400 rounded-full"/>
            ) }
            <p className="text-lg font-bold mt-2">{user?.fullName}</p>
          </div>

          {/* Control buttons */}
          <div className="grid grid-cols-2 gap-3">
                        <Button onClick={toggleMicrophone}  className={cn("mic border-rounded center-items py-3 min-h-full cursor-pointer", callStatus !== CallStatus.ACTIVE ? "cursor-not-allowed" : "") }>
                            {isMuted ? (
                                <>
                                    <MicOff size={28}/>
                                    <p>Turn On mic</p>
                                </>
                            ) : (
                                <>
                                    <Mic size={28}/>
                                    <p>Turn Off mic</p>
                                </>
                            )}
                        </Button>

                        <Button className="repeat border-rounded center-items py-3 h-full cursor-pointer">
                            <Repeat size={28}/>
                            <p>Repeat</p>
                        </Button>
                    </div>

          {/* End lesson */}
          <Button

            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
            className={cn("w-full bg-zinc-800 hover:opacity-95 text-white cursor-pointer", callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-zinc-800", callStatus === CallStatus.CONNECTING ? "animate-pulse bg-green-700" : "")}>
            {callStatus === CallStatus.ACTIVE ? "End Session" : callStatus === CallStatus.CONNECTING ? "Connecting ..." : "Start Session"}
          </Button>
        </div>
      </div>


    </section>
  )
}

export default AgentComponent