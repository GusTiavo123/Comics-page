import { createTheme } from "@nextui-org/react";

export const lightTheme = createTheme({
  type: 'light',
  palette: {
    primary: {
      main: "#0070f3",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff9800",
      contrastText: "#fff",
    },
  },
});

export const darkTheme = createTheme({
  type: 'dark',
  palette: {
    primary: {
      main: "#90caf9",
      contrastText: "#000",
    },
    secondary: {
      main: "#ffa726",
      contrastText: "#000",
    },
  },
});
