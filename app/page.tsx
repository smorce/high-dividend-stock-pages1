import { KVNamespace } from "@cloudflare/workers-types";

export const runtime = "edge";

const getKVData = async () => {
  const { MY_KV_STORE } = process.env as unknown as {
    MY_KV_STORE: KVNamespace;
  };

  // Fetch all three values concurrently
  const [name, age, city] = await Promise.all([
    MY_KV_STORE.get("Name", "text"),
    MY_KV_STORE.get("Age", "text"),
    MY_KV_STORE.get("City", "text")
  ]);

  console.log(MY_KV_STORE);
  console.log(name);
  console.log(age);
  console.log(city);

  return { name, age, city };
};

// 事前に定義されたKV Namespaceバインディングを直接使用します。　←　ダメだった
// このバインディング名はwrangler.tomlで設定した名前に一致させる必要があります。
// declare const MY_KV_STORE: KVNamespace;

// const getKVData = async () => {
//   // Fetch all three values concurrently
//   const [name, age, city] = await Promise.all([
//     MY_KV_STORE.get("Name", "text"),
//     MY_KV_STORE.get("Age", "text"),
//     MY_KV_STORE.get("City", "text")
//   ]);

//   return { name, age, city };
// };



export default async function Home() {
  const { name, age, city } = await getKVData();

  return (
    <main className="p-8">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">Key</th>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">Value</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          <tr>
            <td className="border-b dark:border-slate-700 p-4 pl-8">Name</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8">{name}</td>
          </tr>
          <tr>
            <td className="border-b dark:border-slate-700 p-4 pl-8">Age</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8">{age}</td>
          </tr>
          <tr>
            <td className="border-b dark:border-slate-700 p-4 pl-8">City</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8">{city}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}