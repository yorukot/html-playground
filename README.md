This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# HTML Playground

一個基於 Next.js 的即時 HTML 編輯器和預覽工具，支援程式碼分享和本地儲存。

## 🚀 功能特色

- **即時預覽**：在左側編輯 HTML，右側即時顯示結果
- **語法高亮**：使用 `@uiw/react-textarea-code-editor` 提供語法上色
- **程式碼分享**：使用 `lz-string` 壓縮程式碼到 URL，輕鬆分享給他人
- **本地儲存**：自動儲存您的程式碼到瀏覽器本地儲存
- **深色模式**：支援淺色/深色主題切換
- **響應式設計**：在桌面和行動裝置上都有良好的使用體驗
- **安全預覽**：使用 iframe sandbox 安全地執行 HTML 程式碼

## 🛠️ 技術堆疊

- **Next.js 15** (App Router)
- **React 19** (useState/useEffect)
- **Tailwind CSS 4** - 樣式框架
- **shadcn/ui** - UI 組件庫
- **@uiw/react-textarea-code-editor** - 程式碼編輯器
- **lz-string** - 程式碼壓縮
- **lucide-react** - 圖標庫
- **TypeScript** - 類型安全

## 📦 安裝與運行

### 安裝依賴

```bash
pnpm install
```

### 開發模式

```bash
pnpm dev
```

在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 查看結果。

### 建置生產版本

```bash
pnpm build
pnpm start
```

## 🎯 使用方法

### 基本使用

1. 訪問 `/playground` 頁面
2. 在左側編輯器中輸入 HTML 程式碼
3. 右側會即時顯示預覽結果

### 工具欄功能

- **重置**：恢復為預設的 HTML 程式碼
- **分享**：將當前程式碼壓縮並複製分享連結到剪貼簿
- **複製**：複製當前 HTML 程式碼到剪貼簿
- **深色模式**：切換淺色/深色主題

### 程式碼分享

點擊「分享」按鈕後，會生成類似以下格式的連結：

```
https://yourdomain.com/playground?code=壓縮後的字串
```

其他人打開此連結即可看到相同的 HTML 程式碼。

### 本地儲存

- 程式碼會自動儲存到瀏覽器的 localStorage
- 下次訪問時會自動載入上次的程式碼
- 如果 URL 包含 `?code=...` 參數，會優先載入分享的程式碼

## 📁 專案結構

```
html-playground/
├── app/
│   ├── playground/
│   │   └── page.tsx          # Playground 主頁面
│   ├── globals.css            # 全域樣式
│   ├── layout.tsx             # 根佈局
│   └── page.tsx               # 首頁
├── components/
│   ├── ui/                    # shadcn/ui 組件
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── HtmlEditor.tsx         # HTML 編輯器組件
│   ├── Preview.tsx            # 預覽組件
│   └── Toolbar.tsx            # 工具欄組件
├── lib/
│   └── utils.ts               # 工具函數
└── public/                    # 靜態資源
```

## 🔧 自定義配置

### 修改預設 HTML

在 `app/playground/page.tsx` 中修改 `DEFAULT_HTML` 常數：

```typescript
const DEFAULT_HTML = '<h1>您的自定義預設內容</h1>';
```

### 調整 Debounce 延遲

在 `components/HtmlEditor.tsx` 中修改 debounce 延遲時間：

```typescript
const debouncedValue = useDebounce(localValue, 300); // 300ms 延遲
```

### 自定義編輯器樣式

在 `HtmlEditor.tsx` 中修改 CodeEditor 的 style 屬性來自定義編輯器外觀。

## 🚀 部署

### Vercel 部署

1. 將程式碼推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中導入專案
3. 自動部署完成

### 其他平台

此專案是標準的 Next.js 應用程式，可以部署到任何支援 Node.js 的平台。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🙏 致謝

- [Next.js](https://nextjs.org/) - React 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 組件庫
- [@uiw/react-textarea-code-editor](https://github.com/uiwjs/react-textarea-code-editor) - 程式碼編輯器
- [lz-string](https://github.com/pieroxy/lz-string) - 字串壓縮庫
