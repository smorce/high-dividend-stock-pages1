// client コンポーネント
export const config = { runtime: 'client' }; // この行を追加

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// export default async function Home({ data }) {
export default function Home({ data }) {
  const [isCityVisible, setIsCityVisible] = useState(true);

  // Cityカラムの表示/非表示を切り替える関数
  const toggleCityColumn = () => {
    setIsCityVisible(!isCityVisible);
  };

  return (
    <main className="p-8">
      <button onClick={toggleCityColumn}>Toggle City Column</button>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">Name</th>
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">Age</th>
            {isCityVisible && (
              <motion.th
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 bg-slate-50 dark:bg-slate-800"
              >
                City
              </motion.th>
            )}
          </tr>
        </thead>
        <AnimatePresence>
          <tbody className="bg-white dark:bg-slate-800">
            {data.name.map((n: string, index: number) => (
              <tr key={index}>
                <td className="border-b dark:border-slate-700 p-4 pl-8">{n}</td>
                <td className="border-b dark:border-slate-700 p-4 pl-8">{data.age[index]}</td>
                {isCityVisible && (
                  <motion.td
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    className="border-b dark:border-slate-700 p-4 pl-8"
                  >
                    {data.city[index]}
                  </motion.td>
                )}
              </tr>
            ))}
          </tbody>
        </AnimatePresence>
      </table>
    </main>
  );
}