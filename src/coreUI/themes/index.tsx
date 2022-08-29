import { createTheme } from "@mui/material/styles";
import createTypography from "@mui/material/styles/createTypography";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";
export const TypoTheme = createTheme({
  typography: {
    allVariants: {
      textTransform: "none",
    },
  },
});

export const theme = () => {
  const themeOption = {
    heading: "#000000",
    paper: "#ffffff",
    backgroundDefault: "#ffffff",
    background: "#fafafb",
    darkTextPrimary: "#000000",
    darkTextSecondary: "#44444f",
    textDark: "#212121",
    menuSelected: "#ffffff",
    menuSelectedBack: "#000000",
    divider: "#eeeeee",
  };

  const themes = createTheme({
    direction: "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: createTypography(
      themePalette(themeOption),
      themeTypography(themeOption)
    ),
  });
  themes.components = componentStyleOverrides(themeOption);
  return themes;
};

export default theme;
export * from "./Styles";
