import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "./hooks/useUser";
import theme from "./theme";

function App() {
  const navigate = useNavigate();
  const { data: currentUser, isLoading, error } = useUser();

  if (isLoading) {
    // TODO: Show Loading
    return;
  }
  if (currentUser === null || error) {
    navigate("/auth/login");
  }

  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
