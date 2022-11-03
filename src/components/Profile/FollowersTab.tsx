import { useState } from "react";
import { Box, Typography, Avatar, Button, Card, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getProfileFollower from "@/api/profile/getProfileFollower";
import ISocial from "@/types/interfaces/social";
import { ReactComponent as LocationIcon } from "@/assets/icons/location.svg";
import { ReactComponent as CheckIcon } from "@/assets/icons/check.svg";

interface IFollower {
  id: number;
  name: string;
  avatar: string;
  location: string;
  job: string;
  isFollowed: boolean;
  social: ISocial;
}

const FollowersTab: React.FC = () => {
  const {
    data: followers,
    isLoading,
    isError,
  } = useQuery<IFollower[]>(["profile-follower"], getProfileFollower);

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const renderSkeleton = () => {
    return (
      <>
        <Skeleton variant="rounded" height={92} />
        <Skeleton variant="rounded" height={92} />
        <Skeleton variant="rounded" height={92} />
      </>
    );
  };

  return (
    <div>
      <Typography variant="h4" my={40}>
        Followers
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, minmax(10px, 1fr))",
            sm: "repeat(2, minmax(10px, 1fr))",
            md: "repeat(3, minmax(10px, 1fr))",
          },
          gap: 24,
        }}
      >
        {isLoading
          ? renderSkeleton()
          : followers.map((follower) => (
              <FollowerCard key={follower.id} follower={follower} />
            ))}
      </Box>
    </div>
  );
};

// -------------------- Follower Card -------------------- //
interface IFollowerCard {
  follower: IFollower;
}

const FollowerCard: React.FC<IFollowerCard> = ({ follower }) => {
  const [isFollowed, setIsFollowed] = useState(follower.isFollowed);

  const toggleFollow = () => {
    setIsFollowed((previsFollowed) => !previsFollowed);
  };

  return (
    <Card sx={{ p: 24, display: "flex", alignItems: "center" }}>
      <Avatar
        src={follower.avatar}
        alt={follower.name}
        sx={{ flexShrink: 0 }}
      />
      <Box flexGrow={1} pl={16} pr={8}>
        <Typography variant="subtitle2" noWrap>
          {follower.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "gray.600",
          }}
        >
          <Box component={LocationIcon} sx={{ width: 16, height: 16 }} />
          <Typography variant="body2" noWrap>
            {follower.location}
          </Typography>
        </Box>
      </Box>
      <Button
        variant={isFollowed ? "text" : "outlined"}
        color={isFollowed ? "primary" : "inherit"}
        size="small"
        startIcon={
          isFollowed && (
            <Box component={CheckIcon} sx={{ width: 20, height: 20 }} />
          )
        }
        onClick={toggleFollow}
        sx={{
          "& .MuiButton-startIcon": {
            flexShrink: 0,
          },
        }}
      >
        {isFollowed ? "Followed" : "Follow"}
      </Button>
    </Card>
  );
};

export default FollowersTab;
