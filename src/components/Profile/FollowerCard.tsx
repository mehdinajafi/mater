import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { ReactComponent as LocationIcon } from "@/assets/icons/location.svg";
import { ReactComponent as CheckIcon } from "@/assets/icons/check.svg";
import { useState } from "react";

interface IFollowerCard {
  follower: {
    id: string;
    name: string;
    avatar: string;
    location: string;
    following: boolean;
  };
}

const FollowerCard: React.FC<IFollowerCard> = ({ follower }) => {
  const [following, setFollowing] = useState(follower.following);

  const toggleFollow = () => {
    setFollowing((prevFollowing) => !prevFollowing);
  };

  return (
    <Card sx={{ p: 24, display: "flex", alignItems: "center" }}>
      <Avatar
        src={follower.avatar}
        alt={follower.name}
        sx={{ flexShrink: 0 }}
      />
      <Box flexGrow={1} pl={16} pr={8}>
        <Typography variant="subtitle2">{follower.name}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "gray.600",
          }}
        >
          <Box component={LocationIcon} sx={{ width: 16, height: 16 }} />
          <Typography variant="body2">{follower.location}</Typography>
        </Box>
      </Box>
      <Button
        variant={following ? "text" : "outlined"}
        color={following ? "primary" : "inherit"}
        size="small"
        startIcon={following && <CheckIcon />}
        onClick={toggleFollow}
      >
        {following ? "Followed" : "Follow"}
      </Button>
    </Card>
  );
};

export default FollowerCard;
