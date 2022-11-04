import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "./hooks/api/useUser";
import theme from "./theme";

function App() {
  const navigate = useNavigate();
  const { data: currentUser, isLoading, isError } = useUser();

  if (isLoading) {
    // TODO: Show Loading
    return <div></div>;
  }

  if (currentUser === null || isError) {
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
