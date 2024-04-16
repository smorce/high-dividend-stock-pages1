// ★KVバリューを使う。あとは横スクロールバーの追加。表のソート機能。ヘッダー。
// minWidth: '1200px' の調整
// AnimatePresence の位置が変わったか大丈夫か？
// GitHub Actions のデータ件数を5件に絞っているので解除する



// client コンポーネント
"use client";  // この行を追加

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './tableStyles.css';

// useClient();

// 型定義
interface DataItem {
  'ティッカー': string;
  '企業名': string;
  '収益と市場優位性': number;
  '財務の健全性': number;
  '稼ぐ力と安全性': number;
  '配当実績と支払い能力': number;
  '連続増配年数': number;
  '配当利回り': number;
  'AIによる総評': string;
  '発行済株式数': number;
  '株価': number;
  '配当貴族フラグ': number;
  '時価総額': number;
  '1株当りの配当金': number;
  '次回配当金の権利確定日': string;
  '配当性向': number;
  '過去5年間の平均配当利回り': number;
  '売上高': number;
  '利益余剰金': number;
  '株主資本(純資産, 自己資本)': number;
  '総資産': number;
  '純有利子負債': number;
  'フリーキャッシュフロー': number;
  '営業キャッシュフロー': number;
  '財務キャッシュフロー': number;
  '投資キャッシュフロー': number;
  '現金及び現金同等物': number;
  '営業利益率': number;
  '流動比率': number;
  '自己資本比率': number;
  '営業キャッシュフローマージン': number;
  [key: string]: string | number;  // インデックスシグネチャの追加。動的なプロパティアクセスにはインデックスシグネチャが必要なため、使用する全てのデータ型をココで定義する
}

interface HomeProps {
  data: DataItem[];
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
          </h1>
          <p className="text-sm subtitle">アメリカ株式 専門</p>
        </div>

        <div style={{ marginTop: '30px', marginBottom: '30px', height: '30px' }}></div>   {/* 空白スペースを作るためだけのdiv */}

        <div className="flex-container">

          <div className="toggle-container py-2" style={{ width: 'fit-content' }}>
            <div className={`toggle-switch ${isDataExpanded ? 'active' : ''}`} onClick={toggleData}></div>
            <span className="toggle-text" id="toggleLabel" onClick={toggleData}>
              {isDataExpanded ? "詳細データの表示" : "詳細データの表示"}
            </span>
          </div>
          <div className="right-content">
            <span className="notification-icon">!</span>
            <span className="summary-header" style={{ fontSize: '19px' }}>集計条件
              <div className="tooltip-content">
                選定企業：S&P500より選定<br />
                除外対象1：BRK.BとBF.Bはデータがほぼないため除外<br />
                除外対象2：GOOG を採用し GOOGL は除外<br />
                配当利回り：3%以上9%以下を抽出
              </div>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto mt-6 table-shadow" style={{ maxWidth: '100%' }}>   {/* overflow-x: auto;スタイルを適用します。これにより、内容がコンテナの幅を超える場合にのみ横スクロールバーが表示されます */}
          <table className="w-full text-sm text-left text-gray-500" id="data-table" style={{ minWidth: '1200px' }}>   {/* テーブルが適切にスクロールされるように、min-widthプロパティをテーブルに適用するとよいでしょう。これはテーブルの最小幅を設定し、カラムが縮まないようにします */}
            <thead className="table-header text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">ティッカー</th>
                <th scope="col" className="px-6 py-3">企業名</th>
                <th scope="col" className="px-6 py-3">収益と市場優位性</th>
                <th scope="col" className="px-6 py-3">財務の健全性</th>
                <th scope="col" className="px-6 py-3">稼ぐ力と安全性</th>
                <th scope="col" className="px-6 py-3">配当実績と支払い能力</th>
                <th scope="col" className="px-6 py-3">連続増配年数</th>
                <th scope="col" className="px-6 py-3">配当利回り</th>
                <th scope="col" className="px-6 py-3">AIによる総評</th>
                {isDataExpanded && (
                  <>
                    <AnimatePresence>
                      {[
                        '発行済株式数', '株価', '配当貴族フラグ', '時価総額', '1株当りの配当金', '次回配当金の権利確定日',
                        '配当性向', '過去5年間の平均配当利回り', '売上高', '利益余剰金', '株主資本(純資産, 自己資本)',
                        '総資産', '純有利子負債', 'フリーキャッシュフロー', '営業キャッシュフロー', '財務キャッシュフロー',
                        '投資キャッシュフロー', '現金及び現金同等物', '営業利益率', '流動比率', '自己資本比率',
                        '営業キャッシュフローマージン'
                      ].map(col => (
                        <motion.th
                          key={col}
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 100, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          scope="col"
                          className="px-6 py-3"
                        >
                          {col}
                        </motion.th>
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item: DataItem, index: number) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4">{item['ティッカー']}</td>
                  <td className="px-6 py-4">{item['企業名']}</td>
                  <td className="px-6 py-4">{Number(item['収益と市場優位性']).toFixed(2)}</td>
                  <td className="px-6 py-4">{Number(item['財務の健全性']).toFixed(2)}</td>
                  <td className="px-6 py-4">{Number(item['稼ぐ力と安全性']).toFixed(2)}</td>
                  <td className="px-6 py-4">{Number(item['配当実績と支払い能力']).toFixed(2)}</td>
                  <td className="px-6 py-4">{item['連続増配年数']}</td>
                  <td className="px-6 py-4"><span className="score-pill">{Number(item['配当利回り']).toFixed(2)}</span></td>
                  <td className="px-6 py-4"><span className="score-pill">{item['AIによる総評']}</span></td>
                  {isDataExpanded && [
                    '発行済株式数', '株価', '配当貴族フラグ', '時価総額', '1株当りの配当金', '次回配当金の権利確定日',
                    '配当性向', '過去5年間の平均配当利回り', '売上高', '利益余剰金', '株主資本(純資産, 自己資本)',
                    '総資産', '純有利子負債', 'フリーキャッシュフロー', '営業キャッシュフロー', '財務キャッシュフロー',
                    '投資キャッシュフロー', '現金及び現金同等物', '営業利益率', '流動比率', '自己資本比率',
                    '営業キャッシュフローマージン'
                  ].map(col => (
                    <motion.td
                      key={col}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 100, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 py-4"
                    >
                      {item[col] ?? '-'}
                    </motion.td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}