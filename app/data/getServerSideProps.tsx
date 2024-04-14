import { KVNamespace } from "@cloudflare/workers-types";

export const runtime = "edge";

const getKVData = async () => {
  const { MY_KV_STORE } = process.env as unknown as {
    MY_KV_STORE: KVNamespace;
  };

  const [name, age, city] = await Promise.all([
    MY_KV_STORE.get("Name", "text").then(data => JSON.parse(data || '[]')),
    MY_KV_STORE.get("Age", "text").then(data => JSON.parse(data || '[]')),
    MY_KV_STORE.get("City", "text").then(data => JSON.parse(data || '[]'))
  ]);

  return { name, age, city };
};

export async function getServerSideProps() {
  const data = await getKVData();
  return { props: { data } };
}