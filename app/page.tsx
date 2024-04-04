import { KVNamespace } from "@cloudflare/workers-types";

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
export default async function Home() {
  const { name, age, city } = await getKVData();

  return (
    <main className="p-8">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">Name</th>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">Age</th>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">City</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {name.map((n: string, index: number) => (
            <tr key={index}>
              <td className="border-b dark:border-slate-700 p-4 pl-8">{n}</td>
              <td className="border-b dark:border-slate-700 p-4 pl-8">{age[index]}</td>
              <td className="border-b dark:border-slate-700 p-4 pl-8">{city[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}