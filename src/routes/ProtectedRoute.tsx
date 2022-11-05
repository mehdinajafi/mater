import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Logo from "@/components/Logo";
import useUser from "@/hooks/api/useUser";

const ProtectedRoute = () => {
  const { data: currentUser, isLoading, isError } = useUser();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 10,
        }}
      >
        <Logo width={100} height={100} />
      </Box>
    );
  }

  if (!currentUser && isError) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
