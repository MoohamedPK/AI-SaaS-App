"use server";

import { prisma } from "@/lib/prisma";


export async function fetchCompanionById (id: string) {

    try {
        const companion = await prisma.companions.findUnique({
            where: {
                id
            }
        })

        return companion;

    } catch (error) {
        console.log("can't fetch companion by id :", error )
        
    }

}