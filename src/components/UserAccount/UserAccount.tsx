import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "@/components/TabPanel";
import { ReactComponent as UserIcon } from "@/assets/icons/user.svg";
import { ReactComponent as DocumentIcon } from "@/assets/icons/document.svg";
import { ReactComponent as BellIcon } from "@/assets/icons/bell.svg";
import { ReactComponent as ShareIcon } from "@/assets/icons/share.svg";
import { ReactComponent as KeyIcon } from "@/assets/icons/key.svg";
import AccountGeneralTab from "./AccountGeneralTab";

const UserAccount = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="inherit"
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: { xs: 24, md: 40 },
          },
        }}
      >
        <Tab icon={<UserIcon />} iconPosition="start" label="General" />
        <Tab icon={<DocumentIcon />} iconPosition="start" label="Billing" />
        <Tab icon={<BellIcon />} iconPosition="start" label="Notifications" />
        <Tab icon={<ShareIcon />} iconPosition="start" label="Social Links" />
        <Tab icon={<KeyIcon />} iconPosition="start" label="Change Password" />
      </Tabs>

      <Box mt={30}>
        <TabPanel selectedTab={selectedTab} index={0}>
          <AccountGeneralTab />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={1}>
          Billing
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={2}>
          Notifications
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={3}>
          Social Links
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={4}>
          Change Password
        </TabPanel>
      </Box>
    </Box>
  );
};

export default UserAccount;
