import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    console.log("✅ Webhook verified!");
    console.log("Clerk Event:", JSON.stringify(evt, null, 2));

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Failed to verify webhook:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }
}
