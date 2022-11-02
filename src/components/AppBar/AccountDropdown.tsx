import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Box,
  Typography,
  Divider,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import useUser from "@/hooks/useUser";

const AccountDropdown = () => {
  const { data: currentUser } = useUser();
  const { anchorEl, isOpen, onToggle, onClose } = useAnchorDisclosure();

  return (
    <>
      <IconButton onClick={(e) => onToggle(e.currentTarget)} sx={{ p: 0 }}>
        <Avatar
          src={currentUser && currentUser.avatar}
          alt={currentUser && currentUser.name}
        />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 200,
          },
        }}
      >
        <Box px={20} py={12}>
          {currentUser ? (
            <>
              <Typography variant="subtitle2">{currentUser.name}</Typography>
              <Typography variant="body2" color="text-secondary">
                {currentUser.role}
              </Typography>
            </>
          ) : (
            <div>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
          )}
        </Box>
        <Divider variant="dashed" />
        <Box sx={{ display: "flex", flexDirection: "column", p: 8 }}>
          <Link to="/">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link to="/user/profile">
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link to="/user/account">
            <MenuItem>Settings</MenuItem>
          </Link>
        </Box>
        <Divider variant="dashed" />
        <Box p={8}>
          <MenuItem>Logout</MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default AccountDropdown;
