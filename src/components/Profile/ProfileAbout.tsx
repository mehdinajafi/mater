import { Box, Card, Typography } from "@mui/material";
import { ReactComponent as MarkerSolidIcon } from "@/assets/icons/marker-solid.svg";
import { ReactComponent as MailSolidIcon } from "@/assets/icons/mail-solid.svg";
import { ReactComponent as BriefCaseSolidIcon } from "@/assets/icons/briefcase-solid.svg";

interface IProfileAbout {
  about: {
    bio?: string;
    location?: string;
    email?: string;
    resume?: string[];
  };
}

const ProfileAbout: React.FC<IProfileAbout> = ({ about }) => {
  return (
    <Card sx={{ p: 24 }}>
      <Typography variant="h6">About</Typography>
      {about.bio && <Typography variant="body2">{about.bio}</Typography>}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 16, mt: 16 }}>
        {about.location && (
          <Box sx={{ display: "flex", gap: 16 }}>
            <Box
              component={MarkerSolidIcon}
              sx={{ width: 20, height: 20, flexShrink: 0 }}
            />
            <Typography variant="body2">{about.location}</Typography>
          </Box>
        )}

        {about.email && (
          <Box sx={{ display: "flex", gap: 16 }}>
            <Box
              component={MailSolidIcon}
              sx={{ width: 20, height: 20, flexShrink: 0 }}
            />
            <Typography variant="body2">{about.email}</Typography>
          </Box>
        )}

        {about.resume &&
          about.resume.map((item, index) => (
            <Box sx={{ display: "flex", gap: 16 }} key={index}>
              <Box
                component={BriefCaseSolidIcon}
                sx={{ width: 20, height: 20, flexShrink: 0 }}
              />
              <Typography variant="body2">{item}</Typography>
            </Box>
          ))}
      </Box>
    </Card>
  );
};

export default ProfileAbout;
