import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import getProfile from "@/api/getProfile";
import { ReactComponent as ArrowPathIcon } from "@/assets/icons/arrow-path.svg";

const SCurrentUser = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "rgba(145, 158, 171, 0.12)",
  borderRadius: theme.borderRadius.xl,
  padding: theme.spacing(16, 20),
  marginTop: theme.spacing(24),
}));

const ProfileCard = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    ["profile"],
    getProfile
  );

  if (isLoading) {
    return (
      <Link to="/user/account">
        <SCurrentUser>
          <Stack alignItems="center" direction="row" spacing={10} width="100%">
            <Skeleton variant="circular" width={40} height={40} />

            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
            </Box>
          </Stack>
        </SCurrentUser>
      </Link>
    );
  }

  if (isError) {
    return (
      <SCurrentUser>
        <Stack direction="column" spacing={10}>
          <Typography variant="body2">
            Something went wrong. Try reloading.
          </Typography>
          <Button
            variant="contained"
            sx={{ width: "max-content" }}
            startIcon={<ArrowPathIcon />}
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </Stack>
      </SCurrentUser>
    );
  }

  return (
    <Link to="/user/account">
      <SCurrentUser>
        <Avatar src={data.avatar} alt={data.name} />

        <Box sx={{ marginInlineStart: 16 }}>
          <Typography variant="subtitle2">{data.name}</Typography>
          <Typography variant="body2" color="text-secondary">
            {data.role}
          </Typography>
        </Box>
      </SCurrentUser>
    </Link>
  );
};

export default ProfileCard;
