"use server"

import { auth } from "@clerk/nextjs/server";

import { companionProps } from "@/ts.definitions/types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNewCompanion (formData: companionProps): Promise<{success: boolean, message? : string}> {

    const {userId} = await auth();

    if (!userId) throw new Error("Not Authenticated");

    const userInDb = await prisma.user.findUnique({
        where: {clerkId: userId}
    })

    if (!userInDb?.id) throw new Error("User not found");



    
    await prisma.companion.create({
        data: {
            name: formData.name,
            subject: formData.subject,
            authorId: userInDb.id,
            topic: formData.topic,
            voice: formData.voice,
            style: formData.style.toLowerCase(),
            duration: Number(formData.duration),
        }
    })

    revalidatePath('/companion-library')
    return {success: true}

}