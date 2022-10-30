import {
  Avatar,
  Box,
  Card,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ReactComponent as UserIcon } from "@/assets/icons/user.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart.svg";
import { ReactComponent as PeopleIcon } from "@/assets/icons/people.svg";
import { ReactComponent as MediaIcon } from "@/assets/icons/media.svg";

interface IProfileHeader {
  selectedTab: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const SCoverWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  height: 232,

  "&::before": {
    content: "' '",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.rgbToRgba(theme.palette.primary.darker, 0.8),
    backdropFilter: "blur(6px)",
  },
}));

const SUserInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  position: "absolute",
  bottom: "unset",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    gap: 24,
    bottom: -24,
    left: 24,
    top: "unset",
    transform: "none",
  },
}));

const ProfileHeader: React.FC<IProfileHeader> = (props) => {
  return (
    <Card>
      <SCoverWrapper>
        <SUserInfo>
          <Avatar
            src="https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1"
            alt="profile-pic"
            sx={{ width: { xs: 80, md: 124 }, height: { xs: 80, md: 124 } }}
          />
          <Box color="#fff" sx={{ textAlign: { xs: "center", md: "start" } }}>
            <Typography
              variant="h4"
              fontSize={(theme) => ({
                xs: theme.typography.fontSizes["xl"],
                md: theme.typography.fontSizes["2xl"],
              })}
            >
              Minimal UI
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.72 }}>
              UI Designer
            </Typography>
          </Box>
        </SUserInfo>

        <Box
          sx={{
            width: "100%",
            height: "100%",
            "& img": {
              objectFit: "cover",
              width: "100%",
              height: "100%",
            },
          }}
        >
          <img src="/assets/images/covers/cover_2.jpeg" alt="cover" />
        </Box>
      </SCoverWrapper>

      <Tabs
        value={props.selectedTab}
        onChange={props.handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="inherit"
        sx={{
          "& .MuiTabs-flexContainer": {
            justifyContent: { sm: "center", md: "flex-end" },
            gap: 40,
            paddingInlineEnd: 24,
          },
        }}
      >
        <Tab label="Profile" icon={<UserIcon />} iconPosition="start" />
        <Tab label="Followers" icon={<HeartIcon />} iconPosition="start" />
        <Tab label="Friends" icon={<PeopleIcon />} iconPosition="start" />
        <Tab label="Gallery" icon={<MediaIcon />} iconPosition="start" />
      </Tabs>
    </Card>
  );
};

export default ProfileHeader;
