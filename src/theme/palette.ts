import { PaletteOptions } from "@mui/material";

export const lightpalette: PaletteOptions = {
  mode: "light",
  primary: {
    darker: "rgb(32, 10, 105)",
    dark: "rgb(67, 26, 158)",
    main: "rgb(118, 53, 220)",
    light: "rgb(185, 133, 244)",
    lighter: "rgb(235, 214, 253)",
  },
  secondary: {
    darker: "rgb(9, 26, 122)",
    dark: "rgb(25, 57, 183)",
    main: "rgb(51, 102, 255)",
    light: "rgb(132, 169, 255)",
    lighter: "rgb(214, 228, 255)",
  },
  info: {
    darker: "rgb(0, 55, 104)",
    dark: "rgb(0, 108, 156)",
    main: "rgb(0, 184, 217)",
    light: "rgb(97, 243, 243)",
    lighter: "rgb(202, 253, 245)",
  },
  success: {
    darker: "rgb(10, 85, 84)",
    dark: "rgb(27, 128, 106)",
    main: "rgb(54, 179, 126)",
    light: "rgb(134, 232, 171)",
    lighter: "rgb(216, 251, 222)",
  },
  warning: {
    darker: "rgb(122, 65, 0)",
    dark: "rgb(183, 110, 0)",
    main: "rgb(255, 171, 0)",
    light: "rgb(255, 214, 102)",
    lighter: "rgb(255, 245, 204)",
  },
  error: {
    darker: "rgb(122, 9, 22)",
    dark: "rgb(183, 29, 24)",
    main: "rgb(255, 86, 48)",
    light: "rgb(255, 172, 130)",
    lighter: "rgb(255, 233, 213)",
  },
  text: {
    primary: "rgb(33, 43, 54)",
    secondary: "rgb(99, 115, 129)",
    disabled: "rgb(145, 158, 171)",
  },
  gray: {
    100: "rgb(249, 250, 251)",
    200: "rgb(244, 246, 248)",
    300: "rgb(223, 227, 232)",
    400: "rgb(196, 205, 213)",
    500: "rgb(145, 158, 171)",
    600: "rgb(99, 115, 129)",
    700: "rgb(69, 79, 91)",
    800: "rgb(33, 43, 54)",
    900: "rgb(22, 28, 36)",
  },
  background: {
    semiTransparent: "rgba(249, 250, 251, 0.8)",
    default: "rgb(249, 250, 251)",
  },
  action: {
    disabled: "rgb(99, 115, 129)",
    hover: "rgba(145, 158, 171, 0.08)",
    selected: "rgba(118, 53, 220, 0.08)",
    attention: "rgba(145, 158, 171, 0.16)",
  },
};
