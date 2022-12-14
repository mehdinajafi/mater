import { createTheme, ThemeOptions } from "@mui/material";
import { lightpalette } from "./palette";
import { customShadows, shadows } from "./shadows";
import components from "./components";
import typography from "./typography";
import borderRadius from "./borderRadius";

const theme = (): ThemeOptions => {
  return createTheme({
    palette: lightpalette,
    spacing: (px: number) => `${px / 16}rem`,
    borderRadius,
    components,
    typography,
    shadows,
    customShadows,
  });
};

export default theme;
