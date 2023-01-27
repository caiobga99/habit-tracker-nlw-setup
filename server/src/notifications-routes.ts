import { FastifyInstance } from "fastify";
import WebPush from "web-push";

import { z } from "zod";

const publicKey =
  "BHqHu8fKn_U9FF7Qere4ZTUxGZ8aAC3NyyxykxMoKIQ2aEVeyE1ZF7A9X4MEGk1mEzZkW8ivcil4yqM1x7GCGcs";
const privateKey = "gw17K9Bw2h4Ja7fLE3OTQiXeHqr8lK1akETOvh5F7KI";

WebPush.setVapidDetails("htttp://localhost:3333", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", (request, reply) => {
    console.log(request.body);

    return reply.status(201).send();
  });

  app.post("/push/send", (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, "HELLO DO BACKEND!");
    }, 5000);

    return reply.status(201).send();
  });
}
