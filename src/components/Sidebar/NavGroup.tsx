import { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import NavItem from "./NavItem";
import { ReactComponent as ChevronRightIcon } from "@/assets/icons/chevron-right.svg";
import { ReactComponent as ChevronBottomIcon } from "@/assets/icons/chevron-bottom.svg";

interface INavGroup {
  toggle: {
    text: string;
    icon: React.ReactNode;
    to: string;
  };
  items: {
    text: string;
    to: string;
  }[];
  onClickOnLinks: () => void;
}

const NavGroup: React.FC<INavGroup> = (props) => {
  const linkMatch = useMatch({ path: props.toggle.to, end: false });
  const isLinkActive = linkMatch != null;
  const [isOpen, setIsOpen] = useState(isLinkActive);

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <NavItem
        icon={props.toggle.icon}
        text={props.toggle.text}
        isActive={isLinkActive}
        onClick={toggle}
        endIcon={isOpen ? <ChevronBottomIcon /> : <ChevronRightIcon />}
      />

      <Collapse in={isOpen} timeout="auto">
        <List component="div" disablePadding>
          {props.items.map((item) => (
            <NavLink
              to={item.to}
              key={item.text}
              onClick={props.onClickOnLinks}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={(theme) => ({
                    padding: theme.spacing(8, 12, 8, 16),
                    borderRadius: theme.borderRadius.md,
                  })}
                >
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 24,
                      marginInlineEnd: 16,
                      color: "inherit",
                    }}
                  >
                    <Box
                      sx={(theme) => ({
                        width: 4,
                        height: 4,
                        borderRadius: theme.borderRadius.full,
                        backgroundColor: isActive
                          ? theme.palette.primary.main
                          : theme.palette.gray[500],
                        transition:
                          "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        ...(isActive && { transform: "scale(2)" }),
                      })}
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ my: 0 }}
                    primary={
                      <Typography
                        variant="body2"
                        textTransform="capitalize"
                        fontWeight={(theme) =>
                          isActive
                            ? theme.typography.fontWeights.semiBold
                            : theme.typography.fontWeights.regular
                        }
                        color={isActive ? "text-primary" : "text-secondary"}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              )}
            </NavLink>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NavGroup;
