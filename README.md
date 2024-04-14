## 高配当優良株のページ


## ローカルでの起動方法（ただし .next フォルダができちゃうので今はやらない）
- ターミナルでプロジェクトのディレクトリに移動
- npm run dev
- http://localhost:3000 にアクセス


.
├── app/                        # App Directoryのルート
│   ├── components/             # 再利用可能なコンポーネント
│   │   └── Home.tsx            # メインのクライアントコンポーネント
│   ├── data/                   # データ取得やAPI呼び出し関連のロジック
│   │   └── getServerSideProps.ts # サーバーサイドのデータ取得ロジック
│   └── page.tsx                # ページのエントリーポイント
├── public/                     # 静的ファイル
│   ├── images/
│   └── favicon.ico
├── styles/                     # スタイルシート
│   └── globals.css
├── next.config.js              # Next.jsの設定ファイル
└── package.json                # パッケージ依存関係とスクリプト
