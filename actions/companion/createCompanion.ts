"use server"

import { auth } from "@clerk/nextjs/server";

import { companionProps } from "@/ts.definitions/types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNewCompanion (formData: companionProps): Promise<{success: boolean, message? : string}> {

    const {userId} = await auth()

    if (!userId) throw new Error("not authenticated");

    console.log('User ID:', userId);
    
    await prisma.companions.create({
        data: {
            name: formData.name,
            subject: formData.subject.toUpperCase(),
            topic: formData.topic,
            voice: formData.voice,
            style: formData.style,
            duration: Number(formData.duration),
        }
    })

    revalidatePath('/companion-library')
    return {success: true}

}