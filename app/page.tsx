'use client';

import { useState, useEffect } from 'react';
import { HtmlEditor } from '@/components/HtmlEditor';
import { Preview } from '@/components/Preview';
import { Toolbar } from '@/components/Toolbar';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import * as LZString from 'lz-string';

export const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Playground 範例</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .feature-card {
            background: rgba(255, 255, 255, 0.2);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            transition: transform 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-5px);
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #ff6b6b;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            margin: 10px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
        .btn:hover {
            background: #ff5252;
            transform: scale(1.05);
        }
        .demo-form {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        input, textarea {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 歡迎使用 HTML Playground!</h1>
        
        <p>這是一個功能豐富的 HTML 編輯器，您可以即時預覽您的程式碼。試試編輯這些內容吧！</p>
        
        <div class="feature-grid">
            <div class="feature-card">
                <h3>🎨 即時預覽</h3>
                <p>編輯程式碼時立即看到結果</p>
            </div>
            <div class="feature-card">
                <h3>🔗 程式碼分享</h3>
                <p>一鍵生成分享連結</p>
            </div>
            <div class="feature-card">
                <h3>💾 自動儲存</h3>
                <p>程式碼自動儲存到本地</p>
            </div>
            <div class="feature-card">
                <h3>🌙 深色模式</h3>
                <p>支援淺色/深色主題</p>
            </div>
        </div>
        
        <div class="demo-form">
            <h3>📝 互動式表單範例</h3>
            <input type="text" placeholder="輸入您的姓名" id="nameInput">
            <textarea placeholder="寫下您的想法..." rows="3"></textarea>
            <button class="btn" onclick="showGreeting()">提交</button>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn" onclick="changeColor()">🎨 改變背景色</button>
            <button class="btn" onclick="addElement()">➕ 新增元素</button>
        </div>
        
        <div id="dynamic-content"></div>
    </div>
    
    <script>
        function showGreeting() {
            const name = document.getElementById('nameInput').value || '朋友';
            alert('你好，' + name + '！歡迎使用 HTML Playground！');
        }
        
        function changeColor() {
            const colors = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = randomColor;
        }
        
        function addElement() {
            const container = document.getElementById('dynamic-content');
            const newElement = document.createElement('div');
            newElement.innerHTML = '<p style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin: 10px 0;">🎉 新增的動態元素！時間：' + new Date().toLocaleTimeString() + '</p>';
            container.appendChild(newElement);
        }
        
        // 歡迎動畫
        window.addEventListener('load', function() {
            document.querySelector('h1').style.animation = 'fadeInDown 1s ease-out';
            document.querySelector('.container').style.animation = 'fadeInUp 1s ease-out 0.3s both';
        });
    </script>
    
    <style>
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</body>
</html>`;

const STORAGE_KEY = 'html-playground-content';

export default function PlaygroundPage() {
  const [htmlContent, setHtmlContent] = useState(DEFAULT_HTML);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化：從 URL 或 localStorage 載入內容
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');
    
    if (codeParam) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(codeParam);
        if (decompressed) {
          setHtmlContent(decompressed);
        } else {
          // 解壓縮失敗，fallback 到 localStorage 或預設值
          const saved = localStorage.getItem(STORAGE_KEY);
          setHtmlContent(saved || DEFAULT_HTML);
        }
      } catch (error) {
        console.error('Failed to decompress code from URL:', error);
        const saved = localStorage.getItem(STORAGE_KEY);
        setHtmlContent(saved || DEFAULT_HTML);
      }
    } else {
      // 沒有 URL 參數，從 localStorage 載入
      const saved = localStorage.getItem(STORAGE_KEY);
      setHtmlContent(saved || DEFAULT_HTML);
    }
    
    setIsLoading(false);
  }, []);

  // 儲存到 localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, htmlContent);
    }
  }, [htmlContent, isLoading]);

  const handleReset = () => {
    setHtmlContent(DEFAULT_HTML);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleShare = async () => {
    try {
      const compressed = LZString.compressToEncodedURIComponent(htmlContent);
      const url = `${window.location.origin}${window.location.pathname}?code=${compressed}`;
      
      await navigator.clipboard.writeText(url);
      
      alert('分享連結已複製到剪貼簿！');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('複製失敗，請手動複製網址');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      alert('HTML 程式碼已複製到剪貼簿！');
    } catch (error) {
      console.error('Failed to copy HTML:', error);
      alert('複製失敗');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">載入中...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* 固定在頂部的工具欄 */}
      <div className="flex-shrink-0 bg-background border-b p-2">
        <Toolbar 
          onReset={handleReset}
          onShare={handleShare}
          onCopy={handleCopy}
        />
      </div>
      
      {/* 編輯器和預覽區 */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={50} minSize={20}>
            <HtmlEditor 
              value={htmlContent}
              onChange={setHtmlContent}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={20}>
            <Preview htmlContent={htmlContent} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
} 