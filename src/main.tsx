import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, extendTheme, ThemeOverride } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/styles.css";

const client = new QueryClient();

const themeConfig: ThemeOverride = {
  colors: {
    brand: {
      green: "#04A51E",
      bg: "#1D1D1D",
      "green-disabled": "#005E0E",
      "text-input": "#B2B2B2",
      profile: "#262626",
    },
  },
  fontSizes: {
    "4xl": "48px",
    "3xl": "40px",
    "2xl": "32px",
    xl: "24px",
    lg: "20px",
    md: "16px",
    sm: "14px",
  },
  fontStyle: {
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`,
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
};

const theme = extendTheme(themeConfig satisfies ThemeOverride);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
