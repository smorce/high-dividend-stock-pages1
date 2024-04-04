import { NextResponse } from "next/server";
import { KVNamespace } from "@cloudflare/workers-types";

export async function GET(request: Request) {
  const { MY_KV_STORE } = process.env as unknown as {
    MY_KV_STORE: KVNamespace;
  };

  const [platform, version, releaseDate] = await Promise.all([
    MY_KV_STORE.get("platform", "text"),
    MY_KV_STORE.get("version", "text"),
    MY_KV_STORE.get("release_date", "text"),
  ]);

  return NextResponse.json({ platform, version, releaseDate });
}