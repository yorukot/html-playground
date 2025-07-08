"use client";

import { useEffect, useRef } from "react";

interface PreviewProps {
  htmlContent: string;
}

export function Preview({ htmlContent }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
    <div className="h-full w-full bg-white overflow-y-auto">
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
  );
}
