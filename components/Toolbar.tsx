'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Share2, Copy, Sun, Moon } from 'lucide-react';

interface ToolbarProps {
  onReset: () => void;
  onShare: () => void;
  onCopy: () => void;
}

export function Toolbar({ onReset, onShare, onCopy }: ToolbarProps) {
  const [isDark, setIsDark] = useState(false);

  // 檢查初始主題
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // 在組件掛載時檢查 localStorage 中的主題設置
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        重置
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onShare}
        className="flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        分享
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="flex items-center gap-2"
      >
        <Copy className="w-4 h-4" />
        複製
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDarkMode}
        className="flex items-center gap-2"
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        {isDark ? '淺色' : '深色'}
      </Button>
    </div>
  );
} 