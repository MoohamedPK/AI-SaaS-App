"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";


export async function createUser (user: User) {

    await prisma.user.create({data: user})
}