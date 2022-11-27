import { Suspense } from "react";
import { Box, LinearProgress } from "@mui/material";
import { Outlet } from "react-router-dom";

const DashboardPageLoading = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <LinearProgress
            color="inherit"
            sx={{ width: 250, height: 6, borderRadius: "6px" }}
          />
        </Box>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export default DashboardPageLoading;
