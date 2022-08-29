export default function themePalette(theme: any): any {
  return {
    primary: {
      // black
      light: "#B2B3BD",
      main: "#000000",
      dark: "#000000",
      200: "#808191",
      800: "#171725",
    },
    secondary: {
      // yellow
      light: "#FCEFC0",
      main: "#FFC500",
      200: "#F3E8E7",
      800: "#FFE2AC",
    },
    error: {
      light: "#ef9a9a",
      main: "#f44336",
      dark: "#c62828",
    },
    orange: {
      light: "#fbe9e7",
      main: "#ffab91",
      dark: "#d84315",
    },
    warning: {
      light: "#fff8e1",
      main: "#ffe57f",
      dark: "#ffc107",
    },
    success: {
      light: "#b9f6ca",
      200: "#69f0ae",
      main: "#00e676",
      dark: "#00c853",
    },
    grey: {
      50: "#FAFAFB",
      100: "#F1F1F5",
      500: "#E4E4E4",
      600: "#92929D",
      700: "#696974",
      900: "#44444F",
    },
    dark: {
      light: "#505050",
      main: "#000000",
      dark: "#11142D",
      800: "#171725",
      900: "#200E32",
    },
    blue: {
      light: "#D1E5FF",
      main: "#50B5FF",
      dark: "#0079BF",
      800: "#00ACBA",
      900: "#783DBD", // purple
    },
    yellow: {
      light: "#FBF5E2",
      main: "#FFC500",
      dark: "#FF974A",
    },
    red: {
      light: "#FF3A00",
      main: "#FF0000",
      dark: "#D23434",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
      gray: "#696974",
      light: "#9FA1AB",
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault,
    },
  };
}
