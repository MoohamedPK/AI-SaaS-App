// app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createUser } from "@/actions/users/createUser";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing Clerk Webhook Secret");
    return new Response("Missing secret", { status: 500 });
  }

  // 1. Get headers from Clerk
  const headerPayload = headers();
  const svixId = (await headerPayload).get("svix-id") ?? "";
  const svixTimestamp = (await headerPayload).get("svix-timestamp") ?? "";
  const svixSignature = (await headerPayload).get("svix-signature") ?? "";

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  // 2. Get raw body
  const body = await req.text(); // VERY IMPORTANT: must use text(), not json()
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;


  try {
    // 3. hire svix to check the signature hahaha
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // 4. Handle the event (example: user.created)
  const eventType = evt.type;

//   console.log("🔔 Webhook event received:", eventType);

  if (eventType === "user.created") {

    const {id, email_addresses, image_url} = evt.data;

    // check if the user is already exist or not because wehbhooks sometime need to retry so it will create the same user
    const userExist = await prisma.user.findUnique({where: {clerkId : id}})
    
    if (userExist) return new Response("User already exist", {status: 200});
    
    const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: email_addresses[0].email_address.split("@")[0],
        image: image_url
    }

    createUser(user as User)

    // You can save to DB, send welcome email, etc.
  }

  return new Response("Webhook received", { status: 200 });
}