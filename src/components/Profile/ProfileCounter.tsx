import addCommas from "@/utils/addCommas";
import { Box, Card, Divider, Typography } from "@mui/material";

interface IProfileCounter {
  follower: number;
  following: number;
}

const ProfileCounter: React.FC<IProfileCounter> = (props) => {
  return (
    <Card sx={{ py: 24, display: "flex", alignItems: "center" }}>
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography variant="h4">{addCommas(props.follower)}</Typography>
        <Typography variant="body2" color="text-secondary">
          Follower
        </Typography>
      </Box>
      <Divider flexItem orientation="vertical" />
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography variant="h4">{addCommas(props.following)}</Typography>
        <Typography variant="body2" color="text-secondary">
          Following
        </Typography>
      </Box>
    </Card>
  );
};

export default ProfileCounter;
