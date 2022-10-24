import { Box, List } from "@mui/material";
import NavSubHeader from "./NavSubHeader";
import ProfileCard from "./ProfileCard";
import NavGroup from "./NavGroup";
import NavLink from "./NavLink";
import { ReactComponent as LogoImg } from "@/assets/images/logo.svg";
import { ReactComponent as DashboardIcon } from "@/assets/icons/dashboard.svg";
import { ReactComponent as EcommerceIcon } from "@/assets/icons/ecommerce.svg";
import { ReactComponent as UserIcon } from "@/assets/icons/user.svg";

const Sidebar = () => {
  return (
    <Box sx={{ px: 20 }}>
      <Box pt={24} pb={16}>
        <div>
          <LogoImg width={40} height={40} />
        </div>

        <ProfileCard />
      </Box>

      <List disablePadding>
        <NavSubHeader>general</NavSubHeader>
        <NavLink to="/" icon={<DashboardIcon />} text="app" />
        <NavLink to="/ecommerce" icon={<EcommerceIcon />} text="e-commerce" />

        <NavSubHeader>management</NavSubHeader>
        <NavGroup
          toggle={{
            text: "profile",
            icon: <UserIcon />,
            to: "/user",
          }}
          items={[
            { to: "/user/profile", text: "profile" },
            { to: "/user/cards", text: "cards" },
          ]}
        />
      </List>
    </Box>
  );
};

export default Sidebar;
