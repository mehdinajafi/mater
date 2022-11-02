import { Box, List, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { useAppStore } from "@/store";
import ProfileCard from "./ProfileCard";
import NavGroup from "./NavGroup";
import NavLink from "./NavLink";
import { ReactComponent as DashboardIcon } from "@/assets/icons/dashboard.svg";
import { ReactComponent as UserIcon } from "@/assets/icons/user.svg";

const Sidebar = () => {
  const theme = useTheme();
  const matchesDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const setSidebarIsOpen = useAppStore((store) => store.setSidebarIsOpen);

  const handleItemClick = () => {
    if (matchesDownLg) {
      setSidebarIsOpen(false);
    }
  };

  return (
    <Box sx={{ px: 20 }}>
      <Box pt={24} pb={16}>
        <Link to="/" onClick={handleItemClick}>
          <Logo />
        </Link>

        <ProfileCard onClick={handleItemClick} />
      </Box>

      <List disablePadding>
        <NavLink
          to="/"
          icon={<DashboardIcon />}
          text="app"
          onClick={handleItemClick}
        />
        <NavGroup
          onClickOnLinks={handleItemClick}
          toggle={{
            text: "profile",
            icon: <UserIcon />,
            to: "/user",
          }}
          items={[
            { to: "/user/profile", text: "profile" },
            { to: "/user/account", text: "account" },
          ]}
        />
      </List>
    </Box>
  );
};

export default Sidebar;
