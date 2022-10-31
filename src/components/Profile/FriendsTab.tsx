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
  Typography,
} from "@mui/material";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/pen.svg";
import { ReactComponent as DotsVerticalIcon } from "@/assets/icons/dots-vertical.svg";
import { ReactComponent as FacebookIcon } from "@/assets/icons/social/facebook.svg";
import { ReactComponent as InstagramIcon } from "@/assets/icons/social/instagram.svg";
import { ReactComponent as LinkedinIcon } from "@/assets/icons/social/linkedin.svg";
import { ReactComponent as TwitterIcon } from "@/assets/icons/social/twitter.svg";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";

interface IFriendsTab {
  friends: {
    id: string;
    avatar: string;
    name: string;
    job: string;
    socials: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
  }[];
}

const FriendsTab: React.FC<IFriendsTab> = (props) => {
  const [friends, setFriends] = useState(props.friends);
  const [searchParams, setSearchParams] = useState("");

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
    </Box>
  );
};

// --------------------- Friend Card --------------------- //
interface IFriendCard {
  friend: IFriendsTab["friends"][number];
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
      <Typography variant="subtitle1" mb={4}>
        {friend.name}
      </Typography>
      <Typography variant="body2" color="text-secondary">
        {friend.job}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {friend.socials.facebook && (
          <IconButton sx={{ color: "rgb(24, 119, 242)" }}>
            <FacebookIcon width={20} height={20} />
          </IconButton>
        )}
        {friend.socials.instagram && (
          <IconButton sx={{ color: "rgb(224, 45, 105)" }}>
            <InstagramIcon width={20} height={20} />
          </IconButton>
        )}
        {friend.socials.linkedin && (
          <IconButton sx={{ color: "rgb(0, 126, 187)" }}>
            <LinkedinIcon width={20} height={20} />
          </IconButton>
        )}
        {friend.socials.twitter && (
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
