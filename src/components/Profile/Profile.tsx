import { useState } from "react";
import { Box } from "@mui/material";
import TabPanel from "@/components/ui/TabPanel";
import ProfileHeader from "./ProfileHeader";
import ProfileTab from "./ProfileTab";
import FriendsTab from "./FriendsTab";
import FollowersTab from "./FollowersTab";
import GalleryTab from "./GalleryTab";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <ProfileHeader selectedTab={selectedTab} handleTabChange={handleChange} />

      <TabPanel selectedTab={selectedTab} index={0}>
        <ProfileTab />
      </TabPanel>

      <TabPanel selectedTab={selectedTab} index={1}>
        <FollowersTab />
      </TabPanel>

      <TabPanel selectedTab={selectedTab} index={2}>
        <FriendsTab />
      </TabPanel>

      <TabPanel selectedTab={selectedTab} index={3}>
        <GalleryTab />
      </TabPanel>
    </Box>
  );
};

export default Profile;
