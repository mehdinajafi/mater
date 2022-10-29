import { Outlet } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import { useAppStore } from "@/store";
import AppBar from "@/components/AppBar";

const SidebarWidth = 280;

const Layout = () => {
  const isSidebarOpen = useAppStore((store) => store.isSidebarOpen);
  const toggleSidebar = useAppStore((store) => store.toggleSidebar);

  return (
    <Box display="flex">
      <Box
        component="aside"
        sx={{ width: { lg: SidebarWidth }, flexShrink: { lg: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={isSidebarOpen}
          onClose={toggleSidebar}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              width: SidebarWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              width: SidebarWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", lg: `calc(100% - ${SidebarWidth}px)` },
          pb: 100,
        }}
      >
        <AppBar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
