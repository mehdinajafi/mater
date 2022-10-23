import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <div>ss</div>
    </ThemeProvider>
  );
}

export default App;
