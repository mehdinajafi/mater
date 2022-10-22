import { ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
  return <ThemeProvider theme={theme()}></ThemeProvider>;
}

export default App;
