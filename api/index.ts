// Vercel serverless function — wraps the TanStack Start SSR handler.
// Built output at dist/server/server.js exports a Web-standard `fetch` handler.
// We bridge it to Vercel's Node.js (req, res) calling convention.

// @ts-ignore — dist is built before this function runs
import handler from "../dist/server/server.js";

export default async function (req: any, res: any) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host  = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url   = `${proto}://${host}${req.url}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers as Record<string, string | string[]>)) {
    if (v) headers.set(k, Array.isArray(v) ? v.join(", ") : v);
  }

  let body: ReadableStream | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = new ReadableStream({
      start(controller) {
        req.on("data", (chunk: Buffer) => controller.enqueue(chunk));
        req.on("end", () => controller.close());
        req.on("error", (e: Error) => controller.error(e));
      },
    });
  }

  const webReq  = new Request(url, { method: req.method, headers, body, duplex: "half" } as any);
  const webRes  = await handler.fetch(webReq);

  res.statusCode = webRes.status;
  webRes.headers.forEach((value: string, key: string) => res.setHeader(key, value));
  const buf = await webRes.arrayBuffer();
  res.end(Buffer.from(buf));
}
