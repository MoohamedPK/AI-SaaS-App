"use server";

import { prisma } from "@/lib/prisma";

export async function fetchCompanions () {

    try {
        const companions = await prisma.companions.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })

        return companions;

    } catch (error) {
        console.log("can't fetch comapnions:", error);
    }

}