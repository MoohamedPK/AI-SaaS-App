"use client";

import { vapi } from "@/vapi.sdk";
import { CallStatus, SavedMessage } from "@/ts.definitions/types";
import { useEffect, useRef, useState } from "react";
import { LucideIcon, Mic, MicOff, Repeat, User } from "lucide-react";
import { Button } from "../ui/button";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/public/Sound Wave Loop.json";
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
import gsap from "gsap";

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

const AgentComponent = ({ companion, iconName }: { companion: Companion; iconName?: string }) => {
  const { topic, style, subject, name, duration } = companion;
  const {user} = useUser();
  const Icon = iconMap[iconName ?? ""];
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Animation setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.from(".control-panel", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });

      // Pulse animation for connecting state
      gsap.to(".connecting-pulse", {
        opacity: 0.6,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle speaking animation
  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isSpeaking]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // VAPI event handlers
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addCompanionToHistory(user!.id, companion.id);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onMessage = (message: any) => {
      if (!message?.transcript) return;

      setMessages((prev) => {
        const last = prev[prev.length - 1];

        if (last && last.role === message.role) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: message.role,
            text: message.transcript,
          };
          return updated;
        }

        return [...prev, { role: message.role, text: message.transcript }];
      });
    };

    const onError = (error: Error) => console.log("ERROR", error);
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
    };
  }, [companion.id, user]);

  const toggleMicrophone = () => {
    if (callStatus === CallStatus.ACTIVE) {
      const isMuted = vapi.isMuted();
      vapi.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const handleDisconnect = () => {
    vapi.stop();
    setMessages([]);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    gsap.globalTimeline.getChildren().forEach(t => t.kill());
    gsap.to(".connecting-pulse", { opacity: 0.6, duration: 1, repeat: -1, yoyo: true });

    const assistantOverrides = {
      variableValues: { subject, topic, style },
    };
    
    vapi.start(assistantConfig, assistantOverrides);
    await insertSessionToHistory(companion.id, user?.id);
    
    const durationInMillisecond = duration * 60 * 1000;
    setTimeout(async () => {
      vapi.stop();
      await updatedSession(companion.id, user!.id);
    }, durationInMillisecond);
  };

  return (
    <section
  className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-4"
  ref={containerRef}
>
  {/* Left section - Main content */}
  <div className="lg:col-span-3 space-y-6 relative rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 shadow-lg p-4 sm:p-6">
    {/* Floating gradient */}
    <div className="absolute -top-20 -right-20 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/20 rounded-full blur-[70px] -z-10"></div>

    {/* Call State Display */}
    <div
      className={cn(
        "flex flex-col justify-center items-center min-h-[220px] sm:min-h-[300px] rounded-xl transition-all duration-500 relative overflow-hidden text-center px-4",
        callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
          ? "opacity-100 bg-gradient-to-br from-gray-900/80 to-gray-800/80"
          : "opacity-0 h-0",
        callStatus === CallStatus.CONNECTING &&
          "opacity-100 bg-gradient-to-br from-blue-900/50 to-purple-900/50 connecting-pulse"
      )}
    >
      {Icon && (
        <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg mb-4 sm:mb-6">
          <Icon size={40} className="text-white sm:w-12 sm:h-12" />
        </div>
      )}
      <p className="text-lg sm:text-xl font-medium text-white/90 mt-2 sm:mt-4">
        {callStatus === CallStatus.CONNECTING
          ? "Connecting to your AI companion..."
          : "Ready to start your session"}
      </p>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px] sm:bg-[size:40px_40px] opacity-10 -z-10"></div>
    </div>

    {/* Soundwave animation */}
    <div
      className={cn(
        "transition-all duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64",
        callStatus === CallStatus.ACTIVE
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      )}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={soundwaves}
        loop={true}
        className="w-full h-full"
      />
    </div>

    {/* Messages display */}
    <div className="h-[200px] sm:h-[250px] overflow-y-auto p-3 sm:p-4 rounded-xl bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-sm border border-white/10 custom-scrollbar">
      <div className="space-y-3">
        {messages.map((message, index) => (
          <div
            key={`${index}-${message.text.substring(0, 10)}`}
            className={cn(
              "p-3 sm:p-4 rounded-xl max-w-[85%] sm:max-w-[80%] backdrop-blur-sm text-sm sm:text-base",
              message.role === "assistant"
                ? "bg-gradient-to-r from-purple-600/30 to-purple-800/30 border border-purple-500/20 mr-auto"
                : "bg-gradient-to-r from-blue-600/30 to-blue-800/30 border border-blue-500/20 ml-auto"
            )}
          >
            <p className="font-semibold text-white/90">
              {message.role === "assistant"
                ? `${name.split(" ")[0].replace(/[.,]/g, " ")}:`
                : `${user?.fullName}:`}
            </p>
            <p className="text-white/80 mt-1">{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  </div>

  {/* Right panel - Controls */}
  <div className="lg:col-span-1 control-panel">
    <div className="space-y-6 rounded-2xl bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-lg border border-white/10 shadow-lg p-4 sm:p-6">
      {/* User profile */}
      <div className="flex flex-col items-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/10 text-center">
        {user?.hasImage ? (
          <div className="relative">
            <Image
              src={user.imageUrl}
              width={90}
              height={90}
              className="rounded-full border-4 border-white/20 shadow-lg"
              alt="User profile"
            />
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-70 -z-10 blur-md"></div>
          </div>
        ) : (
          <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
            <User size={36} className="text-white sm:w-10 sm:h-10" />
          </div>
        )}
        <h3 className="text-lg font-bold">{user?.fullName ? user.fullName : user?.emailAddresses[0].emailAddress.split("@")[0]}</h3>
        <p className="text-xs sm:text-sm text-white/60 mt-1">{subject} Learner</p>
      </div>

      {/* Control buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={toggleMicrophone}
          disabled={callStatus !== CallStatus.ACTIVE}
          className={cn(
            "flex flex-col items-center justify-center py-3 sm:py-4 h-full rounded-xl transition-all border text-xs sm:text-sm",
            callStatus !== CallStatus.ACTIVE
              ? "opacity-50 cursor-not-allowed bg-gray-800/50 border-gray-700"
              : isMuted
              ? "bg-gradient-to-br from-red-900/50 to-red-800/50 border-red-700 hover:from-red-900/60 hover:to-red-800/60"
              : "bg-gradient-to-br from-gray-800/50 to-gray-700/50 border-gray-600 hover:from-gray-800/60 hover:to-gray-700/60"
          )}
        >
          {isMuted ? (
            <>
              <MicOff size={20} className="mb-1 text-red-400 sm:w-6 sm:h-6" />
              <span className="text-xs text-white/80">Unmute</span>
            </>
          ) : (
            <>
              <Mic size={20} className="mb-1 text-blue-400 sm:w-6 sm:h-6" />
              <span className="text-xs text-white/80">Mute</span>
            </>
          )}
        </Button>

        <Button className="flex flex-col items-center justify-center py-3 sm:py-4 h-full rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-600 hover:from-gray-800/60 hover:to-gray-700/60 text-xs sm:text-sm">
          <Repeat size={20} className="mb-1 text-purple-400 sm:w-6 sm:h-6" />
          <span className="text-xs text-white/80">Repeat</span>
        </Button>
      </div>

      {/* Main action button */}
      <Button
        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
        className={cn(
          "w-full py-4 sm:py-5 text-white rounded-xl transition-all duration-300 shadow-lg text-sm sm:text-base",
          callStatus === CallStatus.ACTIVE
            ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            : callStatus === CallStatus.CONNECTING
            ? "bg-gradient-to-r from-blue-600 to-blue-500 animate-pulse"
            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        )}
      >
        {callStatus === CallStatus.ACTIVE
          ? "End Session"
          : callStatus === CallStatus.CONNECTING
          ? "Connecting..."
          : "Start Session"}
      </Button>
    </div>
  </div>
</section>

  );
};

export default AgentComponent;