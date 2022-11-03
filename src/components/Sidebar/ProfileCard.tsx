import { Link } from "react-router-dom";
import { Avatar, Box, styled, Typography } from "@mui/material";
import useUser from "@/hooks/api/useUser";

interface IProfileCard {
  onClick: () => void;
}

const SCurrentUser = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "rgba(145, 158, 171, 0.12)",
  borderRadius: theme.borderRadius.xl,
  padding: theme.spacing(16, 20),
  marginTop: theme.spacing(24),
}));

const ProfileCard: React.FC<IProfileCard> = (props) => {
  const { data: currentUser } = useUser();

  return (
    <Link to="/user/account" onClick={props.onClick}>
      <SCurrentUser>
        <Avatar src={currentUser.avatar} alt={currentUser.name} />

        <Box sx={{ marginInlineStart: 16 }}>
          <Typography variant="subtitle2">{currentUser.name}</Typography>
          <Typography variant="body2" color="text-secondary">
            {currentUser.role}
          </Typography>
        </Box>
      </SCurrentUser>
    </Link>
  );
};

export default ProfileCard;
