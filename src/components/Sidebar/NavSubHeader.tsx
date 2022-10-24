import { ListSubheader, Typography } from "@mui/material";

interface INavSubHeader {
  children: React.ReactNode;
}

const NavSubHeader: React.FC<INavSubHeader> = (props) => {
  return (
    <ListSubheader
      sx={(theme) => ({ p: theme.spacing(24, 16, 8), lineHeight: 1.5 })}
    >
      <Typography variant="overline">{props.children}</Typography>
    </ListSubheader>
  );
};

export default NavSubHeader;
