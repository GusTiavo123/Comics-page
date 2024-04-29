import { ThemeProvider as NextThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { lightTheme, darkTheme } from "../styles/theme";

import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemeProvider>
  );
}

export default MyApp;
