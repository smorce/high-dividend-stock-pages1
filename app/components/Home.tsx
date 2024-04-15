// ★KVバリューを使う
// client コンポーネント
"use client";  // この行を追加

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './tableStyles.css';

// useClient();

// 型定義
interface DataProps {
  name: string[];
  age:  string[];   // number
  city: string[];
}

interface HomeProps {
  data: DataProps;
}

// export default async function Home({ data }: HomeProps) {
export default function Home({ data }: HomeProps) {
  const [isDataExpanded, setIsDataExpanded] = useState(false);

  const toggleData = () => {
    setIsDataExpanded(!isDataExpanded);
  };

  return (
    <>
      <nav className="container mx-auto px-4 py-2 nav-container">
        <div className="logo-container">
          <img src="https://placehold.co/50" alt="Placeholder image for the logo" className="w-12 h-12"/>
          <span className="text-gray-700 text-sm">Logo</span>
          <a href="https://github.com/somerepo" className="text-blue-500 text-sm github-link" target="_blank">Github: https://github.com/somerepo</a>
        </div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Twitter</a></li>
        </ul>
      </nav>

      <div className="container mx-auto px-4 py-2">
        <div className="header">
          <h1 className="text-2xl font-semibold">
            <span style={{ color: "#ff7f50" }}>高配当</span>株 分析サイト
            <p className="text-sm">アメリカ株式 専門</p><br />
          </h1>
        </div>
        {/* <div className="sub-header">
          <p className="text-sm">アメリカ株式 専門</p><br />
          <p className="text-sm">【集計条件】</p>
          <p className="text-sm">　選定企業：S&P500より選定</p>
          <p className="text-sm">　除外対象1：BRK.BとBF.Bはデータがほぼないため除外</p>
          <p className="text-sm">　除外対象2：GOOG を採用し GOOGL は除外</p>
          <p className="text-sm">　配当利回り：3%以上9%以下を抽出</p>
        </div> */}
        <div className="summary-container">
          <div className="summary-header">
            <button className="button-3d">集計条件はこちら</button>
            <div className="tooltip-content">
              選定企業：S&P500より選定<br />
              除外対象1：BRK.BとBF.Bはデータがほぼないため除外<br />
              除外対象2：GOOG を採用し GOOGL は除外<br />
              配当利回り：3%以上9%以下を抽出
            </div>
          </div>
        </div>
        <div className="toggle-container py-2" style={{ width: 'fit-content' }}>
          <div className={`toggle-switch ${isDataExpanded ? 'active' : ''}`} onClick={toggleData}></div>
          <span className="toggle-text" id="toggleLabel" onClick={toggleData}>
            {isDataExpanded ? "Show More Data" : "Show More Data"}
          </span>
        </div>
        <div className="overflow-x-auto mt-6 table-shadow">
          <table className="w-full text-sm text-left text-gray-500" id="data-table">
            <thead className="table-header text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">Ticker</th>
                <th scope="col" className="px-6 py-3">Company Name</th>
                <th scope="col" className="px-6 py-3">Revenue & Market Dominance</th>
                <th scope="col" className="px-6 py-3">Financial Health</th>
                <th scope="col" className="px-6 py-3">Earning Power & Safety</th>
                <th scope="col" className="px-6 py-3">Dividend Yield</th>
                <th scope="col" className="px-6 py-3">Overall</th>
                <th scope="col" className="px-6 py-3">AIによる総評</th>
                {isDataExpanded && (
                  <motion.th
                    initial={{ x: -100, opacity: 0 }} // 左から登場
                    animate={{ x: 0, opacity: 1 }}    // 中央へ移動し、完全に表示
                    exit={{ x: 100, opacity: 0 }}    // 右から左へのアニメーション？ できてないけど一旦OK
                    transition={{ duration: 0.2 }}    // アニメーションの時間はN秒
                    scope="col"
                    className="px-6 py-3"
                  >
                    ニューカラム
                  </motion.th>
                )}
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">XXXXXX</td>
                  <td className="px-6 py-4">XXXXXXXXXX</td>
                  <td className="px-6 py-4">Score</td>
                  <td className="px-6 py-4">Score</td>
                  <td className="px-6 py-4">Score</td>
                  <td className="px-6 py-4"><span className="score-pill">Score</span></td>
                  <td className="px-6 py-4">Score</td>
                  <td className="px-6 py-4"><span className="score-pill">この企業は財務性は健全で収益性もあり、投資対象として魅力的な企業です。総合的にみて点数が高いです。</span></td>
                  {isDataExpanded && (
                    <motion.td
                      initial={{ x: -100, opacity: 0 }} // 左から登場
                      animate={{ x: 0, opacity: 1 }}    // 中央へ移動し、完全に表示
                      exit={{ x: 100, opacity: 0 }}    // 右から左へのアニメーション？ できてないけど一旦OK
                      transition={{ duration: 0.2 }}    // アニメーションの時間はN秒
                      className="px-6 py-4"
                    >
                      ニューカラムの値
                    </motion.td>
                  )}
                </tr>
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>
    </>
  );
}