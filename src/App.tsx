import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
