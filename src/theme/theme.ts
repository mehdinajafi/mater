import { createTheme, ThemeOptions } from "@mui/material";
import { lightpalette } from "./pallette";
import { shadows } from "./shadows";
import components from "./components";
import typography from "./typography";

const theme = (): ThemeOptions => {
  return createTheme({
    palette: lightpalette,
    components,
    typography,
    shadows,
  });
};

export default theme;
