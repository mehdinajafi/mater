import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export interface INavItem {
  icon: React.ReactNode;
  endIcon?: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<INavItem> = (props) => {
  return (
    <ListItemButton
      selected={props.isActive}
      sx={(theme) => ({
        borderRadius: theme.borderRadius.md,
        mb: 4,
        color: theme.palette.gray[600],
        "&.Mui-selected": {
          color: theme.palette.primary.main,
        },
      })}
      onClick={props.onClick}
    >
      <ListItemIcon
        sx={{
          minWidth: 24,
          height: 24,
          marginInlineEnd: 16,
          color: "inherit",
        }}
      >
        {props.icon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant="subtitle2"
            color={props.isActive ? "primary" : "text-secondary"}
            textTransform="capitalize"
          >
            {props.text}
          </Typography>
        }
      />
      {props.endIcon}
    </ListItemButton>
  );
};

export default NavItem;
