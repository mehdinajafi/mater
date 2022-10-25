import { AppBar as BaseAppbar, Box, IconButton, Toolbar } from "@mui/material";
import { useAppStore } from "@/store";
import AccountDropdown from "./AccountDropdown";
import ContactsDropdown from "./ContactsDropdown";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as MenuIcon } from "@/assets/icons/menu.svg";
import NotificationsDropdown from "./NotificationsDropdown";
import LanguageDropdown from "./LanguageDropdown";

const AppBar = () => {
  const toggleSidebar = useAppStore((store) => store.toggleSidebar);

  return (
    <BaseAppbar
      position="sticky"
      color="default"
      elevation={0}
      sx={(theme) => ({
        backdropFilter: "blur(6px)",
        backgroundColor: theme.palette.background.semiTransparent,
      })}
    >
      <Toolbar sx={{ px: { xs: 16, sm: 24, lg: 40 } }}>
        <IconButton
          sx={{
            marginInlineEnd: 8,
            display: { xs: "inline-flex", lg: "none" },
          }}
          onClick={toggleSidebar}
        >
          <MenuIcon width={20} height={20} />
        </IconButton>
        <IconButton>
          <SearchIcon width={20} height={20} />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexGrow: 1,
            gap: 12,
          }}
        >
          <LanguageDropdown />
          <NotificationsDropdown />
          <ContactsDropdown />
          <AccountDropdown />
        </Box>
      </Toolbar>
    </BaseAppbar>
  );
};

export default AppBar;
