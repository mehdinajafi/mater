import { Box, Breadcrumbs, Typography, Link, Skeleton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Profile from "@/components/Profile";
import getProfile from "@/api/profile/getProfile";

const UserProfilePage = () => {
  const { data: profile, isLoading } = useQuery(["profile"], getProfile);

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
          {isLoading && (
            <Skeleton width={80} variant="text" sx={{ fontSize: "1rem" }} />
          )}
          {profile && (
            <Typography variant="body2" color="gray.500">
              {profile.name}
            </Typography>
          )}
        </Breadcrumbs>
      </Box>

      <Profile />
    </Box>
  );
};

export default UserProfilePage;
