import { Box, Breadcrumbs, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Profile from "@/components/Profile";
import useUser from "@/hooks/useUser";

const UserProfilePage = () => {
  const { data: currentColor } = useUser();

  return (
    <Box>
      <Box mt={30} mb={40}>
        <Typography variant="h4" mb={8}>
          Profile
        </Typography>

        <Breadcrumbs
          aria-label="breadcrumb"
          separator={
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "gray.500",
              }}
            />
          }
        >
          <Link
            to="/"
            component={RouterLink}
            variant="body2"
            color="text.primary"
            underline="hover"
          >
            Dashboard
          </Link>
          <Link
            to="/user"
            component={RouterLink}
            variant="body2"
            color="text.primary"
            underline="hover"
          >
            User
          </Link>
          <Typography variant="body2" color="gray.500">
            {currentColor?.name}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Profile />
    </Box>
  );
};

export default UserProfilePage;
