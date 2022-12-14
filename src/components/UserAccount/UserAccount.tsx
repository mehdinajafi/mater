import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "@/components/ui/TabPanel";
import useUser from "@/hooks/api/useUser";
import AccountGeneralTab from "./AccountGeneralTab";
import BillingTab from "./BillingTab";
import NotificationsTab from "./NotificationsTab";
import SocialLinksTab from "./SocialLinksTab";
import ChangePasswordTab from "./ChangePasswordTab";
import { ReactComponent as UserIcon } from "@/assets/icons/user.svg";
import { ReactComponent as DocumentIcon } from "@/assets/icons/document.svg";
import { ReactComponent as BellIcon } from "@/assets/icons/bell.svg";
import { ReactComponent as ShareIcon } from "@/assets/icons/share.svg";
import { ReactComponent as KeyIcon } from "@/assets/icons/key.svg";

const UserAccount = () => {
  const { data: currentUser } = useUser();
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
          <AccountGeneralTab currentUser={currentUser} />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={1}>
          <BillingTab />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={2}>
          <NotificationsTab />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={3}>
          <SocialLinksTab />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={4}>
          <ChangePasswordTab />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default UserAccount;
