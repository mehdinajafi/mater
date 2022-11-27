import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Divider, MenuItem, Stack } from "@mui/material";
import ICurrentUser from "@/types/interfaces/currentUser";

interface IAccountDropdownMenu {
  currentUser: ICurrentUser;
  onClose: () => void;
}

const AccountDropdownMenu: React.FC<IAccountDropdownMenu> = (props) => {
  const { currentUser, onClose } = props;

  return (
    <React.Fragment>
      <Box px={20} py={12}>
        <Typography variant="subtitle2">{currentUser.name}</Typography>
        <Typography variant="body2" color="text-secondary">
          {currentUser.role}
        </Typography>
      </Box>
      <Divider variant="dashed" />
      <Stack p={8}>
        <MenuItem component={Link} to="/" onClick={onClose}>
          Home
        </MenuItem>
        <MenuItem component={Link} to="/user/profile" onClick={onClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="/user/account" onClick={onClose}>
          Settings
        </MenuItem>
      </Stack>
      <Divider variant="dashed" />
      <Stack p={8}>
        <MenuItem component="div">Logout</MenuItem>
      </Stack>
    </React.Fragment>
  );
};

export default AccountDropdownMenu;
