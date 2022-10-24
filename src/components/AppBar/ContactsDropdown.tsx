import {
  Menu,
  IconButton,
  Avatar,
  Box,
  Typography,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import getContacts from "@/api/getContacts";
import { ReactComponent as PeopleIcon } from "@/assets/icons/people.svg";

const ContactsDropdown = () => {
  const { data: contacts } = useQuery(["contacts"], getContacts);
  const { anchorEl, isOpen, onToggle, onClose } = useAnchorDisclosure();

  return (
    <>
      <IconButton onClick={(e) => onToggle(e.currentTarget)}>
        <PeopleIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 320,
            p: 8,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 12 }}>
          Contacts&nbsp;
          <Typography variant="body1" component="span">
            {contacts && "(" + contacts.length + ")"}
          </Typography>
        </Typography>
        <Box sx={{ maxHeight: 385, overflowY: "auto" }}>
          {contacts &&
            contacts.map((contact: any) => (
              <ListItemButton
                key={contact.id}
                sx={(theme) => ({
                  px: 8,
                  py: 6,
                  borderRadius: theme.borderRadius.md,
                })}
              >
                <ListItemAvatar>
                  <Avatar src={contact.avatar} alt={contact.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {contact.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
        </Box>
      </Menu>
    </>
  );
};

export default ContactsDropdown;
