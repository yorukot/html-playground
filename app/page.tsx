"use client";

import { useState, useEffect } from "react";
import { HtmlEditor } from "@/components/HtmlEditor";
import { Preview } from "@/components/Preview";
import { Toolbar } from "@/components/Toolbar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import * as LZString from "lz-string";

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Playground 範例</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>`;

const STORAGE_KEY = "html-playground-content";

export default function PlaygroundPage() {
  const [htmlContent, setHtmlContent] = useState(DEFAULT_HTML);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize: Load content from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");

    if (codeParam) {
      try {
        const decompressed =
          LZString.decompressFromEncodedURIComponent(codeParam);
        if (decompressed) {
          setHtmlContent(decompressed);
        } else {
          // Decompression failed, fallback to localStorage or default value
          const saved = localStorage.getItem(STORAGE_KEY);
          setHtmlContent(saved || DEFAULT_HTML);
        }
      } catch (error) {
        console.error("Failed to decompress code from URL:", error);
        const saved = localStorage.getItem(STORAGE_KEY);
        setHtmlContent(saved || DEFAULT_HTML);
      }
    } else {
      // No URL parameter, load from localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      setHtmlContent(saved || DEFAULT_HTML);
    }

    setIsLoading(false);
  }, []);

  // Save to localStorage
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

      alert("分享連結已複製到剪貼簿！");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      alert("複製失敗，請手動複製網址");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      alert("HTML 程式碼已複製到剪貼簿！");
    } catch (error) {
      console.error("Failed to copy HTML:", error);
      alert("複製失敗");
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
      {/* Fixed toolbar at the top */}
      <div className="flex-shrink-0 bg-background border-b p-2">
        <Toolbar
          onReset={handleReset}
          onShare={handleShare}
          onCopy={handleCopy}
        />
      </div>

      {/* Editor and preview area */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={50} minSize={20}>
            <HtmlEditor value={htmlContent} onChange={setHtmlContent} />
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
