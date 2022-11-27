import { lazy, Suspense, Fragment } from "react";
import { IconButton, Popover } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DropdownLoading from "../DropdownLoading";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import getContacts from "@/api/getContacts";
import { ReactComponent as PeopleIcon } from "@/assets/icons/people.svg";

const ContactsDropdownContent = lazy(() => import("./ContactsDropdownContent"));

export interface IContact {
  id: string;
  name: string;
  avatar: string;
}

const ContactsDropdown = () => {
  const { data: contacts, isLoading } = useQuery<IContact[]>(
    ["contacts"],
    getContacts
  );
  const { anchorEl, isOpen, onToggle, onClose } = useAnchorDisclosure();

  return (
    <Fragment>
      <IconButton onClick={(e) => onToggle(e.currentTarget)}>
        <PeopleIcon width={20} height={20} />
      </IconButton>

      <Popover
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
        <Suspense fallback={<DropdownLoading />}>
          <ContactsDropdownContent contacts={contacts} isLoading={isLoading} />
        </Suspense>
      </Popover>
    </Fragment>
  );
};

export default ContactsDropdown;
