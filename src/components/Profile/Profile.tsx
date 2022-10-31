import { Box, Grid } from "@mui/material";
import { useState } from "react";
import TabPanel from "../TabPanel";
import ProfileHeader from "./ProfileHeader";
import ProfileCounter from "./ProfileCounter";
import ProfileAbout from "./ProfileAbout";
import ProfileSocial from "./ProfileSocial";
import NewPostForm from "./NewPostForm";
import SingleProfilePost from "./SingleProfilePost";
import { nanoid } from "nanoid";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <ProfileHeader selectedTab={selectedTab} handleTabChange={handleChange} />

      <TabPanel selectedTab={selectedTab} index={0}>
        <Grid container spacing={24} mt={24}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <ProfileCounter follower={68651} following={9406} />
              <ProfileAbout
                about={{
                  bio: "Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..",
                  location: "Live at Alborz",
                  email: "dev.mehdinajafi@gmail.com",
                  resume: [
                    "UI Designer at Gleichner, Mueller and Tromp",
                    "Studied at Nikolaus - Leuschke",
                  ],
                }}
              />
              <ProfileSocial
                social={{
                  facebook: "https://www.facebook.com/lorem.ipsum",
                  instagram: "https://www.instagram.com/lorem.ipsum",
                  linkedin: "https://www.linkedin.com/in/lorem.ipsum",
                  twitter: "https://www.twitter.com/lorem.ipsum",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <NewPostForm />
              <SingleProfilePost
                post={{
                  date: new Date().getTime(),
                  image: "/assets/images/covers/cover_3.jpeg",
                  title: "Assumenda nam repudiandae rerum fugiat vel maxime.",
                  author: {
                    id: nanoid(),
                    name: "Mehdi Najafi",
                    avatar:
                      "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
                  },
                  likes: [
                    {
                      id: nanoid(),
                      name: "Mehdi Najafi",
                      avatar:
                        "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
                    },
                    {
                      id: nanoid(),
                      name: "Someone else",
                      avatar:
                        "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
                    },
                  ],
                  totalLikes: 32,
                  comments: [
                    {
                      id: nanoid(),
                      date: new Date().getTime(),
                      body: "Praesent venenatis metus at",
                      author: {
                        id: nanoid(),
                        name: "Mehdi Najafi",
                        avatar:
                          "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
                      },
                    },
                    {
                      id: nanoid(),
                      date: new Date().getTime(),
                      body: "Praesent venenatis metus at",
                      author: {
                        id: nanoid(),
                        name: "Mehdi Najafi",
                        avatar:
                          "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
                      },
                    },
                  ],
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={1}>
        Followers
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={2}>
        Friends
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={3}>
        Gallery
      </TabPanel>
    </Box>
  );
};

export default Profile;
