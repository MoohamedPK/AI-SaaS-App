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

export async function fetchSessionHsitory (clerkId: string) {

    const userInDb = await prisma.user.findUnique({
        where: {
            clerkId
        }
    })


    if (!userInDb) throw new Error("user not found");

    const sessions = await prisma.sessionHistory.findMany({
        include: {
            companion: true,
            user: true,
        },
        where: {
            completed: true,
            userId: userInDb.id
        }
    });

    return sessions
}

export async function insertSessionToHistory (companionId: string, clerkId: string | undefined) {

    if (!companionId && !clerkId) throw new Error("Incorrect Infos");

    const userInDb = await prisma.user.findUnique({
        where: {
            clerkId ,
        }
    })

    if (!userInDb?.id) throw new Error("User not Found")

    try {
        // Optional: avoid duplicate active sessions
        const existing = await prisma.sessionHistory.findFirst({
        where: {
            companionId,
            userId: userInDb.id,
            completed: false,
        },
        });

        if (existing) return;

        await prisma.sessionHistory.create({
            data: {
                completed: false,
                companionId,
                userId: userInDb.id
            }
        })
    } catch (error) {
        console.log(error);
    }
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