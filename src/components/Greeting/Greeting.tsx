import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getProfile from "@/api/getProfile";
import { ReactComponent as DashboardImage } from "@/assets/images/dashboard_illustration.svg";

const Greeting = () => {
  const { data: profile, isLoading } = useQuery(["profile"], getProfile);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        bgcolor: "rgb(236 225 251)",
        borderRadius: theme.borderRadius["2xl"],
      })}
    >
      <Box
        sx={{
          pl: 40,
          py: { xs: 40, lg: 0 },
          pr: { xs: 40, lg: 0 },
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography
          variant="h4"
          mb={16}
          color="primary.darker"
          sx={{
            textAlign: { xs: "center", md: "start" },
            fontSize: { xs: "1.25rem", lg: "1.5rem" },
          }}
        >
          Welcome back!
          <br /> {profile && profile.name}
        </Typography>
        <Typography variant="body2" mb={24} color="primary.darker">
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything.
        </Typography>
        <Button variant="contained">Go Now</Button>
      </Box>

      <Box sx={{ p: 24, maxWidth: 360 }}>
        <DashboardImage />
      </Box>
    </Box>
  );
};

export default Greeting;
