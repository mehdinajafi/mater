import React from "react";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { IContact } from "./ContactsDropdown";

interface IContactsDropdownMenu {
  contacts: IContact[] | undefined;
  isLoading: boolean;
}

const ContactsDropdownMenu: React.FC<IContactsDropdownMenu> = (props) => {
  const { contacts } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ p: 12 }}>
        Contacts&nbsp;
        <Typography variant="body1" component="span">
          {contacts && "(" + contacts.length + ")"}
        </Typography>
      </Typography>

      <List sx={{ maxHeight: 385, overflowY: "auto" }}>
        {contacts &&
          contacts.map((contact: any) => (
            <ListItemButton
              key={contact.id}
              component="li"
              sx={(theme) => ({
                px: 8,
                py: 6,
                borderRadius: theme.borderRadius.md,
                minHeight: 64,
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
      </List>
    </React.Fragment>
  );
};

export default ContactsDropdownMenu;
