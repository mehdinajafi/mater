import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  IconButton,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import ISocial from "@/types/interfaces/social";
import getProfileFriends from "@/api/profile/getProfileFriends";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/pen.svg";
import { ReactComponent as DotsVerticalIcon } from "@/assets/icons/dots-vertical.svg";
import { ReactComponent as FacebookIcon } from "@/assets/icons/social/facebook.svg";
import { ReactComponent as InstagramIcon } from "@/assets/icons/social/instagram.svg";
import { ReactComponent as LinkedinIcon } from "@/assets/icons/social/linkedin.svg";
import { ReactComponent as TwitterIcon } from "@/assets/icons/social/twitter.svg";

interface IFriend {
  id: number;
  name: string;
  avatar: string;
  location: string;
  job: string;
  isFollowing: boolean;
  social: ISocial;
}

const FriendsTab: React.FC = () => {
  const {
    data: friends,
    isLoading,
    isError,
  } = useQuery<IFriend[]>(["profile-friends"], getProfileFriends);

  const [searchParams, setSearchParams] = useState("");

  if (isLoading) {
    return (
      <Box mt={40}>
        <Typography variant="h4" mb={40}>
          Friends
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
          <Skeleton variant="rounded" height={262} />
          <Skeleton variant="rounded" height={262} />
          <Skeleton variant="rounded" height={262} />
        </Box>
      </Box>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const filteredFriends = friends.filter(
    (friend) => friend.name.search(searchParams) > -1
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.currentTarget.value);
  };

  return (
    <Box mt={40}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 24,
          mb: 40,
        }}
      >
        <Typography variant="h4">Friends</Typography>
        <InputBase
          placeholder="Search Friends..."
          value={searchParams}
          onChange={handleOnChange}
          startAdornment={
            <InputAdornment position="start" sx={{ flexShrink: 0 }}>
              <Box component={SearchIcon} sx={{ width: 20, height: 20 }} />
            </InputAdornment>
          }
          sx={(theme) => ({
            border: "1px solid rgba(145, 158, 171, 0.32)",
            borderRadius: "0.5rem",
            pl: 14,
            width: 220,
            transition:
              "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, width 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "& input": {
              py: 8.5,
              pr: 14,
            },
            "&.Mui-focused": {
              width: { md: 280 },
              boxShadow: theme.customShadows.z20,
            },
          })}
        />
      </Box>

      {filteredFriends.length === 0 ? (
        <Box mt={80} textAlign="center">
          <Typography variant="h6" mb={16}>
            Not found
          </Typography>
          <Typography variant="body2" color="text-secondary">
            No results found for{" "}
            <Box component="strong" color="gray.800">
              "{searchParams}"
            </Box>
            <br />
            Try checking for typos or using complete words.
          </Typography>
        </Box>
      ) : (
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
          {filteredFriends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </Box>
      )}
    </Box>
  );
};

// --------------------- Friend Card --------------------- //
interface IFriendCard {
  friend: IFriend;
}

const FriendCard: React.FC<IFriendCard> = ({ friend }) => {
  const { isOpen, onClose, onToggle, anchorEl } = useAnchorDisclosure();

  return (
    <Card
      sx={{
        py: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Avatar
        src={friend.avatar}
        alt={friend.name}
        sx={{ width: 64, height: 64, mb: 24 }}
      />
      <Typography variant="subtitle1">{friend.name}</Typography>
      <Typography variant="body2" color="text-secondary" mt={4}>
        {friend.job}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mt: 8 }}>
        {friend.social.facebook && (
          <IconButton sx={{ color: "rgb(24, 119, 242)" }}>
            <FacebookIcon width={20} height={20} />
          </IconButton>
        )}
        {friend.social.instagram && (
          <IconButton sx={{ color: "rgb(224, 45, 105)" }}>
            <InstagramIcon width={20} height={20} />
          </IconButton>
        )}
        {friend.social.linkedin && (
          <IconButton sx={{ color: "rgb(0, 126, 187)" }}>
            <LinkedinIcon width={20} height={20} />
          </IconButton>
        )}
        {friend.social.twitter && (
          <IconButton sx={{ color: "rgb(0, 170, 236)" }}>
            <TwitterIcon width={20} height={20} />
          </IconButton>
        )}
      </Box>

      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={(e) => onToggle(e.currentTarget)}
      >
        <DotsVerticalIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        onClose={onClose}
        anchorEl={anchorEl}
        PaperProps={{
          sx: { p: 8 },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "error.main",
          }}
        >
          <Box
            component={TrashIcon}
            sx={{ width: 20, height: 20, flexShrink: 0 }}
          />
          Delete
        </MenuItem>
        <MenuItem sx={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Box
            component={PenIcon}
            sx={{ width: 20, height: 20, flexShrink: 0 }}
          />
          Edit
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default FriendsTab;
