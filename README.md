# HTML Playground

A real-time HTML editor and preview tool based on Next.js, supporting code sharing and local storage.

## 🚀 Features

- **Real-time Preview**: Edit HTML on the left, see results instantly on the right
- **Syntax Highlighting**: Uses `@uiw/react-codemirror` for syntax highlighting
- **Code Sharing**: Compress code to URL using `lz-string` for easy sharing
- **Local Storage**: Automatically save your code to browser local storage
- **Dark Mode**: Support for light/dark theme switching
- **Responsive Design**: Great experience on both desktop and mobile devices
- **Secure Preview**: Safe HTML code execution using iframe sandbox

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **React 19** (useState/useEffect)
- **Tailwind CSS 4** - Styling framework
- **shadcn/ui** - UI component library
- **@uiw/react-codemirror** - Code editor
- **lz-string** - Code compression
- **lucide-react** - Icon library
- **TypeScript** - Type safety

## 📦 Installation & Usage

### Install Dependencies

```bash
pnpm install
```

### Development Mode

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build Production Version

```bash
pnpm build
pnpm start
```

## 🎯 How to Use

### Basic Usage

1. Visit the main page
2. Input HTML code in the left editor
3. View real-time preview on the right

### Toolbar Features

- **Reset**: Restore to default HTML code
- **Share**: Compress current code and copy share link to clipboard
- **Copy**: Copy current HTML code to clipboard
- **Dark Mode**: Toggle between light/dark themes

### Code Sharing

After clicking the "Share" button, a link will be generated in the following format:

```
https://yourdomain.com/playground?code=compressed_string
```

Others can open this link to see the same HTML code.

### Local Storage

- Code is automatically saved to browser localStorage
- Previous code will be automatically loaded on next visit
- If URL contains `?code=...` parameter, shared code will be loaded with priority

## 📁 Project Structure

```
html-playground/
├── app/
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── resizable.tsx
│   ├── HtmlEditor.tsx         # HTML editor component
│   ├── Preview.tsx            # Preview component
│   └── Toolbar.tsx            # Toolbar component
├── lib/
│   └── utils.ts               # Utility functions
└── public/                    # Static assets
```

## 🔧 Custom Configuration

### Modify Default HTML

Modify the `DEFAULT_HTML` constant in `app/page.tsx`:

```typescript
const DEFAULT_HTML = '<h1>Your custom default content</h1>';
```

### Adjust Debounce Delay

Modify the debounce delay time in `components/HtmlEditor.tsx`:

```typescript
const debouncedValue = useDebounce(localValue, 300); // 300ms delay
```

### Customize Editor Styles

Modify the CodeMirror style properties in `HtmlEditor.tsx` to customize editor appearance.

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Automatic deployment complete

### Other Platforms

This is a standard Next.js application that can be deployed to any platform supporting Node.js.

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror) - Code editor
- [lz-string](https://github.com/pieroxy/lz-string) - String compression library
