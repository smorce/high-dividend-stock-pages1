import { KVNamespace } from "@cloudflare/workers-types";
import Home from './components/Home';

export const runtime = "edge";   // サーバーサイドを示す

// 型定義
interface DataProps {
  'ティッカー': string[];
  '企業名': string[];
  '収益と市場優位性': number[];
  '財務の健全性': number[];
  '稼ぐ力と安全性': number[];
  '配当実績と支払い能力': number[];
  '連続増配年数': number[];
  '配当利回り': number[];
  'AIによる総評': string[];
  '発行済株式数': number[];
  '株価': number[];
  '配当貴族フラグ': number[];
  '時価総額': number[];
  '1株当りの配当金': number[];
  '次回配当金の権利確定日': string[];
  '配当性向': number[];
  '過去5年間の平均配当利回り': number[];
  '売上高': number[];
  '利益余剰金': number[];
  '株主資本(純資産, 自己資本)': number[];
  '総資産': number[];
  '純有利子負債': number[];
  'フリーキャッシュフロー': number[];
  '営業キャッシュフロー': number[];
  '財務キャッシュフロー': number[];
  '投資キャッシュフロー': number[];
  '現金及び現金同等物': number[];
  '営業利益率': number[];
  '流動比率': number[];
  '自己資本比率': number[];
  '営業キャッシュフローマージン': number[];
  [key: string]: number[] | string[] | undefined;  // DataProps インターフェースの任意のプロパティに対して number[]、string[]、または undefined の値を許容するようになります。
}

// 全部結合されちゃう。実際には各データは配列なのでこれは間違い
// interface DataProps {
//   'ティッカー': string;
//   '企業名': string;
//   '収益と市場優位性': number;
//   '財務の健全性': number;
//   '稼ぐ力と安全性': number;
//   '配当実績と支払い能力': number;
//   '連続増配年数': number;
//   '配当利回り': number;
//   'AIによる総評': string;
//   '発行済株式数': number;
//   '株価': number;
//   '配当貴族フラグ': number;
//   '時価総額': number;
//   '1株当りの配当金': number;
//   '次回配当金の権利確定日': string;
//   '配当性向': number;
//   '過去5年間の平均配当利回り': number;
//   '売上高': number;
//   '利益余剰金': number;
//   '株主資本(純資産, 自己資本)': number;
//   '総資産': number;
//   '純有利子負債': number;
//   'フリーキャッシュフロー': number;
//   '営業キャッシュフロー': number;
//   '財務キャッシュフロー': number;
//   '投資キャッシュフロー': number;
//   '現金及び現金同等物': number;
//   '営業利益率': number;
//   '流動比率': number;
//   '自己資本比率': number;
//   '営業キャッシュフローマージン': number;
//   [key: string]: string | number;  // インデックスシグネチャの追加。動的なプロパティアクセスにはインデックスシグネチャが必要なため、使用する全てのデータ型をココで定義する
// }


const getKVData = async (): Promise<DataProps> => {
  const { MY_KV_STORE } = process.env as unknown as {
    MY_KV_STORE: KVNamespace;
  };
  
  // 全カラム
  const keys: string[] = ['ティッカー','企業名','収益と市場優位性','財務の健全性','稼ぐ力と安全性','配当実績と支払い能力','連続増配年数','配当利回り','AIによる総評','発行済株式数','株価','配当貴族フラグ','時価総額','1株当りの配当金','次回配当金の権利確定日','配当性向','過去5年間の平均配当利回り','売上高','利益余剰金','株主資本(純資産, 自己資本)','総資産','純有利子負債','フリーキャッシュフロー','営業キャッシュフロー','財務キャッシュフロー','投資キャッシュフロー','現金及び現金同等物','営業利益率','流動比率','自己資本比率','営業キャッシュフローマージン'];
  // 数値型のカラム。後で数値変換するために使う
  const numericKeys = ['収益と市場優位性', '財務の健全性', '稼ぐ力と安全性', '配当実績と支払い能力', '連続増配年数', '配当利回り',
    '発行済株式数', '株価', '配当貴族フラグ', '時価総額', '1株当りの配当金', '配当性向', '過去5年間の平均配当利回り',
    '売上高', '利益余剰金', '株主資本(純資産, 自己資本)', '総資産', '純有利子負債', 'フリーキャッシュフロー',
    '営業キャッシュフロー', '財務キャッシュフロー', '投資キャッシュフロー', '現金及び現金同等物', '営業利益率',
    '流動比率', '自己資本比率', '営業キャッシュフローマージン'];
  const promises = keys.map(key =>
    MY_KV_STORE.get(key, "text").then(data => JSON.parse(data || 'null'))  // JSON.parse()が文字列内の数値も適切に数値型に変換する能力を持っているため "100" は数値の 100 にパースされる
  );

  const values = await Promise.all(promises);
  const data: DataProps = keys.reduce((acc, key, index) => {
    // 数値が必要なプロパティであれば数値に変換
    if (numericKeys.includes(key)) {
      acc[key] = Array.isArray(values[index]) ? values[index].map(Number) : Number(values[index]);
    } else {
      acc[key] = values[index];
    }
    return acc;
  }, {} as DataProps);

  return data;
};

// 取得したデータを使用してページを生成
export default async function Page() {
  const data = await getKVData();

  // Home コンポーネントにデータを渡す際に配列にする
  return <Home data={[data]} />;
}