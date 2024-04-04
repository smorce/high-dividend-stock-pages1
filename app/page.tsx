import { KVNamespace } from "@cloudflare/workers-types";

export const runtime = "edge";

const getKVData = async () => {
  const { MY_KV_STORE } = process.env as unknown as {
    MY_KV_STORE: KVNamespace;
  };

  // Fetch all three values concurrently
  const [platform, version, releaseDate] = await Promise.all([
    MY_KV_STORE.get("platform", "text"),
    MY_KV_STORE.get("version", "text"),
    MY_KV_STORE.get("release_date", "text")
  ]);

  return { platform, version, releaseDate };
};

export default async function Home() {
  const { platform, version, releaseDate } = await getKVData();

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
            <td className="border-b dark:border-slate-700 p-4 pl-8">Platform</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8">{platform}</td>
          </tr>
          <tr>
            <td className="border-b dark:border-slate-700 p-4 pl-8">Version</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8">{version}</td>
          </tr>
          <tr>
            <td className="border-b dark:border-slate-700 p-4 pl-8">Release Date</td>
            <td className="border-b dark:border-slate-700 p-4 pl-8">{releaseDate}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}