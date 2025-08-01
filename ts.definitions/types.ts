
export type companionProps = {
    name: string,
    subject: string,
    topic : string,
    style : string,
    voice : string,
    duration : number,
}

export enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

export type SavedMessage = {
  role: string;
  text: string;
}

import { Prisma } from "@prisma/client";
import {Check, X} from "lucide-react" 

export type PricingPlan = {
  title: string;
  price: string;
  description: string;
  features: {
    icon: typeof Check | typeof X;
    text: string;
  }[],
  button: {
    href: string,
    text: string
  }
};

export type Bookmarks = Prisma.BookmarkGetPayload<{include: {companion: true}}>
export type CompletedLessons = Prisma.SessionHistoryGetPayload<{include: {user: true, companion: true}}>