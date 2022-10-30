import { useState } from "react";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <ProfileHeader selectedTab={selectedTab} handleTabChange={handleChange} />
    </div>
  );
};

export default Profile;
