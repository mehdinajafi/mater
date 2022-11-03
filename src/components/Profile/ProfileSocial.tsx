import { Box, Card, CardContent, CardHeader, Link } from "@mui/material";
import { ReactComponent as FacebookIcon } from "@/assets/icons/social/facebook.svg";
import { ReactComponent as InstagramIcon } from "@/assets/icons/social/instagram.svg";
import { ReactComponent as LinkedinIcon } from "@/assets/icons/social/linkedin.svg";
import { ReactComponent as TwitterIcon } from "@/assets/icons/social/twitter.svg";
import ISocial from "@/types/interfaces/social";

interface IProfileSocial {
  social: ISocial;
}

const ProfileSocial: React.FC<IProfileSocial> = ({ social }) => {
  return (
    <Card sx={{ p: 24 }}>
      <CardHeader title="Social" sx={{ p: 0 }} />

      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 16, p: 0, mt: 24 }}
      >
        {social.facebook && (
          <SocialRow
            icon={FacebookIcon}
            link={social.facebook}
            iconColor="rgb(24, 119, 242)"
          />
        )}
        {social.instagram && (
          <SocialRow
            icon={InstagramIcon}
            link={social.instagram}
            iconColor="rgb(224, 45, 105)"
          />
        )}
        {social.linkedin && (
          <SocialRow
            icon={LinkedinIcon}
            link={social.linkedin}
            iconColor="rgb(0, 126, 187)"
          />
        )}
        {social.twitter && (
          <SocialRow
            icon={TwitterIcon}
            link={social.twitter}
            iconColor="rgb(0, 170, 236)"
          />
        )}
      </CardContent>
    </Card>
  );
};

// -------------------- SocialRow -------------------- //
interface ISocialRow {
  icon: React.ElementType;
  link: string;
  iconColor: string;
}

const SocialRow: React.FC<ISocialRow> = (props) => {
  return (
    <Box display="flex">
      <Box
        component={props.icon}
        sx={{
          mr: 16,
          width: 20,
          height: 20,
          flexShrink: 0,
          color: props.iconColor,
        }}
      />
      <Link
        href={props.link}
        target="_blank"
        variant="body2"
        color="inherit"
        underline="hover"
        sx={{ overflowWrap: "anywhere" }}
      >
        {props.link}
      </Link>
    </Box>
  );
};

export default ProfileSocial;
