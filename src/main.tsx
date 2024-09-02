import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, extendTheme, ThemeOverride } from '@chakra-ui/react'

const themeConfig : ThemeOverride = {
  colors: {
    brand:{
      green:"#04A51E",
      backgroundColor:"#1D1D1D",
      "green-disabled":"#005E0E",
      "text-input" : "#B2B2B2"
    }
  },
  fontSizes:{
    '4xl': '48px',
    '3xl': '40px',
    '2xl': '32px',
    'xl': '24px',
    'lg': '20px',
    'md': '16px', 
    'sm': '14px',
  },
  fontStyle:{
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`,
  }
}

const theme = extendTheme (themeConfig satisfies ThemeOverride)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>   
    <App />
    </ChakraProvider>
  </StrictMode>,
)
