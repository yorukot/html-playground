"use client";

import { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function HtmlEditor({ value, onChange }: HtmlEditorProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isDark, setIsDark] = useState(false);
  const debouncedValue = useDebounce(localValue, 300);

  // Check theme
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // When debounced value changes, notify parent component
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  // When external value changes, update local state
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback((val: string) => {
    setLocalValue(val);
  }, []);

  return (
    <div
      className={`max-h-screen h-screen w-full ${
        isDark ? "bg-[#282c34]" : "bg-white"
      }`}
    >
      <CodeMirror
        className="max-h-screen overflow-y-auto"
        value={localValue}
        onChange={handleChange}
        extensions={[html()]}
        theme={isDark ? oneDark : undefined}
        placeholder="請輸入 HTML 程式碼..."
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightSelectionMatches: false,
          searchKeymap: true,
        }}
        style={{
          fontSize: "14px",
          height: "100%",
          backgroundColor: isDark ? "#282c34" : "#ffffff",
        }}
      />
    </div>
  );
}
