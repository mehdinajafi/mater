import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 480,
          px: { xs: 20, md: 64 },
          py: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F1F2F7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 480,
          }}
        >
          <Box
            component="img"
            src="/assets/illustrations/dashboard.png"
            alt="auth"
            sx={{ maxHeight: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
