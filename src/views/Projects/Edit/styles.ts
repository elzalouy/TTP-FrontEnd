// When using TypeScript 4.x and above
import type {} from "@mui/x-date-pickers/themeAugmentation";
// When using TypeScript 3.x and below
import "@mui/x-date-pickers/themeAugmentation";
import "@mui/x-date-pickers-pro/themeAugmentation";
import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
});
