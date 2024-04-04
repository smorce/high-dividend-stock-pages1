import { KVNamespace } from "@cloudflare/workers-types";

export const runtime = "edge";

const getPlatform = async () => {
  const { MY_KV_STORE } = process.env as unknown as {
    MY_KV_STORE: KVNamespace;
  };

  const platform = await MY_KV_STORE.get("platform", "text");

  return platform;
};

export default async function Home() {
  const platform = await getPlatform();

  return (
    <main>
      <p className="p-8">{platform}</p>
    </main>
  );
}