import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Profile from "@/components/Profile";

const UserProfilePage = () => {
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
          <Link to="/">
            <Typography variant="body2" color="text.primary">
              Dashboard
            </Typography>
          </Link>
          <Link to="/user">
            <Typography variant="body2" color="text.primary">
              User
            </Typography>
          </Link>
          <Typography>
            <Typography variant="body2" color="gray.500">
              Mehdi Najafi
            </Typography>
          </Typography>
        </Breadcrumbs>
      </Box>

      <Profile />
    </Box>
  );
};

export default UserProfilePage;
