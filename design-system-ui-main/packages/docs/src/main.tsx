import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, App as AntdApp, theme as antdTheme } from 'antd'
import { ThemeProvider, useTheme } from './theme'
import { darkTheme, lightTheme } from '@/app/theme/antd'
import './index.css'
import App from './App.tsx'

function ThemedApp() {
  const { mode } = useTheme()
  const isDark = mode === 'dark'

  return (
    <ConfigProvider
      theme={{
        ...(isDark ? darkTheme : lightTheme),
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  </StrictMode>,
)
