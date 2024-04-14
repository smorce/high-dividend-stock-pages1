## 高配当優良株のページ


## ローカルでの起動方法（ただし .next フォルダができちゃうので今はやらない）
- ターミナルでプロジェクトのディレクトリに移動
- npm run dev
- http://localhost:3000 にアクセス


## トグルボタンの状態管理はサーバーサイドでは行えないのでクライアントサイドに切り出した
.
├── app/                        # App Directoryのルート
│   ├── components/             # 再利用可能なコンポーネント
│   │   └── Home.tsx            # メインのクライアントコンポーネント
│   └── globals.css
│   └── favicon.ico
│   └── layout.tsx
│   └── page.tsx                # ページのエントリーポイント。データ取得をココで行う
├── public/                     # 静的ファイル
├── styles/                     # スタイルシート
│   └── tableStyles.css
├── next.config.js              # Next.jsの設定ファイル
└── package.json                # パッケージ依存関係とスクリプト
