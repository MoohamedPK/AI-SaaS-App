"use server";

import { prisma } from "@/lib/prisma";

export async function fetchCompanions () {

    try {
        const companions = await prisma.companion.findMany({
            orderBy: {
                createdAt: "desc"
            },

            include: {
                author: true,
            }
        })

        return companions;

    } catch (error) {
        console.log("can't fetch comapnions:", error);
    }

}