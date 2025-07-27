"use server";

import { prisma } from "@/lib/prisma";

export async function addCompanionToHistory (clerkId: string, companionId: string) {

    const userInDb = await prisma.user.findUnique({
        where: {
            clerkId
        }
    })

    if (!userInDb) throw new Error("user not found");

    await prisma.sessionHistory.create({
        data: {
            userId:userInDb.id,
            companionId,
        }
    })
}

export async function fetchSessionHsitory () {

    const sessions = await prisma.sessionHistory.findMany({
        include: {
            companion: true,
            user: true,
        },
        where: {
            completed: true
        }
    });

    return sessions
}

export async function updatedSession (companionId: string, clerkId: string) {

     const userInDb = await prisma.user.findUnique({
        where: {
            clerkId
        }
    })
    if (!userInDb) throw new Error("user not found");

    // You need to know the unique 'id' of the sessionHistory to use findUnique
    // If you want to find by companionId and userId, use findFirst instead
    const session = await prisma.sessionHistory.findFirst({
        where: {
            companionId,
            userId: userInDb?.id,
            completed: false,
        }
    })

    if (!session) throw new Error("Session not found")

    await prisma.sessionHistory.update({
        where: {
            id: session.id
        },
        data: {
            completed: true
        }
    })
} 