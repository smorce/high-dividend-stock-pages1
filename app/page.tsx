export default async function Home() {
  const res = await fetch("/api/kv-data");
  const { platform, version, releaseDate } = await res.json();

  return (
    <main className="p-8">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">
              Key
            </th>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">
              Value
            </th>
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