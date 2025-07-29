"use server";

import { prisma } from "@/lib/prisma";

export async function fetchUserCompanions (clerkId: string) {

    const userInDb = await prisma.user.findUnique({
        where: {
            clerkId
        }
    })

    if (!userInDb?.id) throw new Error ("User not found")

        try {
            
            const userCompanions = await prisma.companion.findMany({
                where: {
                    authorId: userInDb.id
                }
            })

            return userCompanions;
            
        } catch (error) {
            console.log(error);
        }
}