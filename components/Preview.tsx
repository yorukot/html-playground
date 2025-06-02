'use client';

import { useEffect, useRef } from 'react';

interface PreviewProps {
  htmlContent: string;
}

export function Preview({ htmlContent }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // 如果 HTML 內容已經包含完整的 HTML 文檔結構，直接使用
    // 否則包裝在基本的 HTML 結構中
    let fullHtml = htmlContent;

    if (!htmlContent.toLowerCase().includes('<!doctype') && !htmlContent.toLowerCase().includes('<html')) {
      fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `;
    }

    // 強制重新載入 iframe 內容，確保完全隔離
    iframe.srcdoc = '';
    
    // 使用 setTimeout 確保 iframe 完全清空後再設置新內容
    setTimeout(() => {
      if (iframe) {
        iframe.srcdoc = fullHtml;
      }
    }, 10);
  }, [htmlContent]);

  return (
    <div className="h-full w-full bg-white overflow-y-auto">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0 bg-white"
        sandbox="allow-scripts"
        title="HTML Preview"
        style={{
          colorScheme: 'light',
          backgroundColor: 'white',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      />
    </div>
  );
} 