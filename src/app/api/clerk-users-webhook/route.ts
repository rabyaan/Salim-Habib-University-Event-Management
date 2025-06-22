import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);
    const { type, data } = event;

    if (type !== "user.created") {
      return new Response("Event ignored", { status: 200 });
    }

    const externalId = data.id;
    const email = data.email_addresses?.[0]?.email_address;
    const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ");

    console.log("📥 Clerk user.created event:", {
      externalId,
      email,
      fullName,
    });

    if (!externalId || !email) {
      console.error("❌ Missing required fields");
      return new Response("Missing fields", { status: 400 });
    }

    // Sync to Convex
    const userId = await fetchMutation(api.users.createUser, {
      externalId,
      email,
      fullName: fullName || undefined,
      role: "student", // default for now
      profileComplete: false, // default on creation
    });

    console.log("✅ User synced to Convex:", userId);
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook failed:", err);
    return new Response("Webhook error", { status: 400 });
  }
}
