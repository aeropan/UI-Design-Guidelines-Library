/**
 * AppThemeProvider — 封装 AntD ConfigProvider + 主题切换
 */
import { useMemo, useEffect, type ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { getAntdTheme, type ThemeMode, type ThemeOverrides } from './getAntdTheme';

export interface AppThemeProviderProps {
  /** 主题模式 */
  mode: ThemeMode;
  /** 可选的主题覆盖 */
  overrides?: ThemeOverrides;
  /** 子元素 */
  children: ReactNode;
  /** 是否同步 data-theme 属性到 document.documentElement */
  syncDocumentTheme?: boolean;
}

/**
 * 主题提供者 — 同时设置 AntD ConfigProvider 和 document data-theme
 */
export function AppThemeProvider({
  mode,
  overrides,
  children,
  syncDocumentTheme = true,
}: AppThemeProviderProps) {
  const theme = useMemo(() => getAntdTheme(mode, overrides), [mode, overrides]);

  useEffect(() => {
    if (syncDocumentTheme) {
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode, syncDocumentTheme]);

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
