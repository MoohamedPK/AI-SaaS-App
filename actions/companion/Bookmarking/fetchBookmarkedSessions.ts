"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function fetchBookmarkedSessions () {

    const {userId: clerkId} = await auth();

    if (!clerkId) throw new Error ("Not Authenticated");

    const user = await prisma.user.findUnique({
        where: {
            clerkId
        }
    })

    const bookmarks = await prisma.bookmark.findMany({
        where: {
            userId: user!.id
        },
        include: {
            companion: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return bookmarks
}