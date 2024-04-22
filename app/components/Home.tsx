// 自己資本比率が低すぎるが合っているか確認 → コードは合ってそう。一旦これで。　→　done
// 配当貴族フラグと連続増配年数が一致していない → 連続増配年数を0で穴埋めすれば良さそうなのでコードを修正した　→　done
// 表のソート機能(配当利回り、総合得点)　→　実装が複雑になるのでやらない
// 残：About に noteの記事
// AnimatePresence の位置が変わったか大丈夫か？ → 大丈夫
// GitHub Actions のデータ件数を5件に絞っているので解除する

// Tips
// item[col] as number と書くと数値型であるとTypeScriptの型チェッカーが数値型として認識し、算術演算を適用できるようになる



// client コンポーネント
"use client";  // この行を追加

import React, { useRef, useEffect, useState } from 'react';
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
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  const toggleData = () => {
    setIsDataExpanded(!isDataExpanded);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        const tableContainerTop = tableContainerRef.current.getBoundingClientRect().top;
        setIsHeaderFixed(tableContainerTop < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <nav className="container mx-auto px-4 py-2 nav-container">
        <div className="logo-container">
          <img src="/logo.png" className="w-12 h-12"/>
          <span className="text-gray-700 text-sm">High Dividend Stock Page by smorce</span>
          {/* <a href="https://github.com/smorce" className="text-blue-500 text-sm github-link" target="_blank">https://github.com/smorce</a> */}
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>  {/* HomeリンクがTOPページにリダイレクトするように変更 */}
          <li><a href="#">About</a></li>
          <li><a href="https://twitter.com/smorce1">Twitter</a></li>
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

        <div className="table-container mt-6 table-shadow" ref={tableContainerRef}>
          <div className={`table-header-fixed ${isHeaderFixed ? 'fixed' : ''}`}>
            <table className="text-sm text-left text-gray-500" id="data-table">
              <thead className="table-header text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3 width-70">ティッカー</th>
                  <th scope="col" className="px-6 py-3 width-100">企業名</th>
                  <th scope="col" className="px-6 py-3 width-70">配当利回り</th>
                  <th scope="col" className="px-6 py-3 width-70">連続増配年数</th>
                  <th scope="col" className="px-6 py-3 width-70">収益と市場優位性</th>
                  <th scope="col" className="px-6 py-3 width-70">財務の健全性</th>
                  <th scope="col" className="px-6 py-3 width-70">稼ぐ力と安全性</th>
                  <th scope="col" className="px-6 py-3 width-70">配当実績と支払い能力</th>
                  <th scope="col" className="px-6 py-3 width-70">総合得点(5点)</th>
                  <th scope="col" className="px-6 py-3 width-600">AIによる総評</th>
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
                            className={`px-6 py-3 ${col.length >= 11 ? 'width-100' : 'width-70'}`}   // col名が11文字以上なら width-100 を割り当てる

                          >
                            {col}
                          </motion.th>
                        ))}
                      </AnimatePresence>
                    </>
                  )}
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-body">
            <table className="text-sm text-left text-gray-500" id="data-table">
              <tbody>
                {data.map((item: DataItem, index: number) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 width-70">{item['ティッカー']}</td>
                    <td className="px-6 py-4 width-100">{item['企業名']}</td>
                    <td className="px-6 py-4 width-70"><span className="score-pill">{Number(item['配当利回り'])}</span></td>
                    <td className="px-6 py-4 width-70">{item['連続増配年数']}</td>
                    <td className="px-6 py-4 width-70">{Number(item['収益と市場優位性'])}</td>
                    <td className="px-6 py-4 width-70">{Number(item['財務の健全性'])}</td>
                    <td className="px-6 py-4 width-70">{Number(item['稼ぐ力と安全性'])}</td>
                    <td className="px-6 py-4 width-70">{Number(item['配当実績と支払い能力'])}</td>
                    {/* 総合得点カラム */}
                    <td className="px-6 py-4 width-70">
                      {(
                        (
                          Number(item['収益と市場優位性']) +
                          Number(item['財務の健全性']) +
                          Number(item['稼ぐ力と安全性']) +
                          Number(item['配当実績と支払い能力'])
                        ) / 4
                      ).toFixed(2)}
                    </td>
                    {/* AIコメントのカラム */}
                    <td className="px-6 py-4 width-600"><span className="score-pill">{item['AIによる総評']}</span></td>
                    {/* 隠れカラム */}
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
                        className={`px-6 py-4 ${col.length >= 11 ? 'width-100' : 'width-70'}`}   // col名が11文字以上なら width-100 を割り当てる

                      >
                        {/* {item[col] ?? '-'} */}
                        {['発行済株式数', '時価総額', '売上高', '利益余剰金', '株主資本(純資産, 自己資本)', '総資産', '純有利子負債', 'フリーキャッシュフロー', '営業キャッシュフロー', '財務キャッシュフロー', '投資キャッシュフロー', '現金及び現金同等物'].includes(col) ?
                          `${Math.floor(Number(item[col]) / 1000000)}M` :  // item[col]は文字列なのでNumber関数で数値に変換し単位を'M'（百万）にして表示。小数点は切り捨てで表示している
                          (item[col] ? item[col].toString() : '-')          // 上記リスト内のカラムではない場合はココで処理する
                        }
                      </motion.td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}