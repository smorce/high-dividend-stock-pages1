import { KVNamespace } from "@cloudflare/workers-types";
import Home from './components/Home';

export const runtime = "edge";

const getKVData = async () => {
  const { MY_KV_STORE } = process.env as unknown as {
    MY_KV_STORE: KVNamespace;
  };

  // Fetch all three values concurrently
  const [name, age, city] = await Promise.all([
    MY_KV_STORE.get("Name", "text").then(data => JSON.parse(data || '[]')),
    MY_KV_STORE.get("Age", "text").then(data => JSON.parse(data || '[]')),
    MY_KV_STORE.get("City", "text").then(data => JSON.parse(data || '[]'))
  ]);

  return { name, age, city };
};

// 取得した配列を使用して表を動的に生成
export default async function Page() {
  const { name, age, city } = await getKVData();
  return <Home data={ name, age, city } />;
}