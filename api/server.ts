import { createServer } from "node:http";
import { join } from "node:path";

// Import the TanStack Start SSR server built to dist/server/server.js
// Vercel will bundle this as a serverless function.

let handler: { fetch: (req: Request) => Promise<Response> } | undefined;

async function getHandler() {
  if (!handler) {
    // In production on Vercel, the built output is available relative to __dirname
    handler = (await import("../dist/server/server.js")).default;
  }
  return handler;
}

export default async function (req: any, res: any) {
  const h = await getHandler();
  const url = `http://${req.headers.host}${req.url}`;
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v) headers.set(k, Array.isArray(v) ? v.join(", ") : v as string);
  }

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? new ReadableStream({
          start(controller) {
            req.on("data", (chunk: Buffer) => controller.enqueue(chunk));
            req.on("end", () => controller.close());
            req.on("error", (e: Error) => controller.error(e));
          },
        })
      : undefined;

  const webReq = new Request(url, { method: req.method, headers, body, duplex: "half" } as any);
  const webRes = await h.fetch(webReq);

  res.statusCode = webRes.status;
  webRes.headers.forEach((value: string, key: string) => res.setHeader(key, value));
  const buf = await webRes.arrayBuffer();
  res.end(Buffer.from(buf));
}
