import { lazy, Suspense, Fragment } from "react";
import { IconButton, Badge, Popover } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DropdownLoading from "../DropdownLoading";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import getNotifications from "@/api/getNotifications";
import { ReactComponent as BellIcon } from "@/assets/icons/bell.svg";

const NotificationsDropdownContent = lazy(
  () => import("./NotificationsDropdownContent")
);

export interface INotification {
  id: string;
  read: boolean;
  title: string;
  dec: string;
  time: number;
  icon: string;
}

const NotificationsDropdown = () => {
  const { data: notifications, isLoading } = useQuery(
    ["notifications"],
    getNotifications
  );
  const { anchorEl, isOpen, onToggle, onClose } = useAnchorDisclosure();

  const unreadNotifications =
    notifications &&
    notifications.filter((notif: INotification) => !notif.read);
  const readedNotifications =
    notifications && notifications.filter((notif: INotification) => notif.read);

  return (
    <Fragment>
      <IconButton onClick={(e) => onToggle(e.currentTarget)}>
        <Badge
          badgeContent={unreadNotifications && unreadNotifications.length}
          color="error"
        >
          <BellIcon width={20} height={20} />
        </Badge>
      </IconButton>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 360,
          },
        }}
      >
        <Suspense fallback={<DropdownLoading />}>
          <NotificationsDropdownContent
            isLoading={isLoading}
            readedNotifications={readedNotifications}
            unreadNotifications={unreadNotifications}
          />
        </Suspense>
      </Popover>
    </Fragment>
  );
};

export default NotificationsDropdown;
