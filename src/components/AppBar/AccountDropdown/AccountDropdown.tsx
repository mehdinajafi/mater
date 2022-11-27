import React, { lazy, Suspense } from "react";
import { IconButton, Avatar, Popover } from "@mui/material";
import DropdownLoading from "../DropdownLoading";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import useUser from "@/hooks/api/useUser";

const AccountDropdownContent = lazy(() => import("./AccountDropdownContent"));

const AccountDropdown = () => {
  const { data: currentUser } = useUser();
  const { anchorEl, isOpen, onToggle, onClose } = useAnchorDisclosure();

  return (
    <React.Fragment>
      <IconButton onClick={(e) => onToggle(e.currentTarget)} sx={{ p: 0 }}>
        <Avatar src={currentUser.avatar} alt={currentUser.name} />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 200,
          },
        }}
      >
        <Suspense fallback={<DropdownLoading />}>
          <AccountDropdownContent currentUser={currentUser} onClose={onClose} />
        </Suspense>
      </Popover>
    </React.Fragment>
  );
};

export default AccountDropdown;
