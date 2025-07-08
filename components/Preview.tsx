"use client";

import { useEffect, useRef, useState } from "react";

interface PreviewProps {
  htmlContent: string;
}

export function Preview({ htmlContent }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [pageTitle, setPageTitle] = useState("HTML Preview");

  // Extract title from HTML content
  useEffect(() => {
    const titleMatch = htmlContent.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch && titleMatch[1].trim()) {
      setPageTitle(titleMatch[1].trim());
    } else {
      setPageTitle("HTML Preview");
    }
  }, [htmlContent]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // If HTML content already contains complete HTML document structure, use it directly
    // Otherwise wrap it in basic HTML structure
    let fullHtml = htmlContent;

    if (
      !htmlContent.toLowerCase().includes("<!doctype") &&
      !htmlContent.toLowerCase().includes("<html")
    ) {
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

    // Force reload iframe content to ensure complete isolation
    iframe.srcdoc = "";

    // Use setTimeout to ensure iframe is completely cleared before setting new content
    setTimeout(() => {
      if (iframe) {
        iframe.srcdoc = fullHtml;
      }
    }, 10);
  }, [htmlContent]);

  return (
    <div className="h-full w-full bg-white overflow-y-auto flex flex-col">
      {/* Browser tab style header */}
      <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 h-10 flex items-center px-4">
        <div className="flex items-center space-x-3">
          {/* Title */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-medium truncate max-w-xs">{pageTitle}</span>
          </div>
        </div>
      </div>

      {/* iframe content */}
      <div className="flex-1 bg-white">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0 bg-white"
          sandbox="allow-scripts allow-modals"
          title="HTML Preview"
          style={{
            colorScheme: "light",
            backgroundColor: "white",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        />
      </div>
    </div>
  );
}
