"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function toggleBookmark (companionId: string) {
    
    const {userId: clerkId} = await auth();

    if (!clerkId) throw new Error("Not Authenticated");

    const user = await prisma.user.findUnique({
        where: {
            clerkId
        }
    })

    const existing = await prisma.bookmark.findUnique({
        where: {
            userId_companionId: { // Note: Prisma creates a compound unique index called userId_companionId 
            // automatically because of @@unique([userId, companionId])
                userId: user!.id,
                companionId
            }
        }
    })

    if (existing) {
        await prisma.bookmark.delete({
            where: {
                id: existing.id
            }
        })

        return {bookmarked: false};

    } else {
        await prisma.bookmark.create({
            data: {
                userId: user!.id, 
                companionId
            }
        })

        return {bookmarked: true};
    }
}