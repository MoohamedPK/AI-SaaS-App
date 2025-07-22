import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { CreateAssistantDTO } from "@vapi-ai/web/dist/api"

export const assistantConfig: CreateAssistantDTO = {

  model: {
    provider: "openai",
    model: "chatgpt-4o-latest",
    
    messages: [
      {
        role: "system",
        content:  `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the {{topic}} and {{subject}}.

                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.`
      },
     ],
   },

   voice: {
    provider: "11labs",
    voiceId: "burt",
  },

  
  name: "companion",
  firstMessage: "Hello, let's start the session. Today we'll be talking about {{topic}}.",
  transcriber:{
    provider: "deepgram",
    model: "nova-3",
    language: "en"
  },
}

