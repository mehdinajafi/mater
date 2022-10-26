import {
  Menu,
  IconButton,
  Avatar,
  Box,
  Typography,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Badge,
  Divider,
  CircularProgress,
  List,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import getNotifications from "@/api/getNotifications";
import { ReactComponent as BellIcon } from "@/assets/icons/bell.svg";
import { ReactComponent as ClockIcon } from "@/assets/icons/clock.svg";
import { ReactComponent as DoubleCheckIcon } from "@/assets/icons/double-check.svg";

interface INotification {
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
    <>
      <IconButton onClick={(e) => onToggle(e.currentTarget)}>
        <Badge
          badgeContent={unreadNotifications && unreadNotifications.length}
          color="error"
        >
          <BellIcon width={20} height={20} />
        </Badge>
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 360,
          },
        }}
      >
        {isLoading ? (
          <Box sx={{ py: 50, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 20,
                py: 16,
              }}
            >
              <div>
                <Typography variant="subtitle2">Notifications</Typography>
                <Typography variant="body2">
                  You have {unreadNotifications.length} unread messages
                </Typography>
              </div>
              <Tooltip title="Mark all as read">
                <IconButton color="primary">
                  <DoubleCheckIcon width={20} height={20} />
                </IconButton>
              </Tooltip>
            </Box>

            <Divider variant="dashed" />

            <List>
              <NotificationSubHeader>New</NotificationSubHeader>
              {unreadNotifications.map((notif: INotification) => (
                <Notification key={notif.id} notification={notif} />
              ))}

              <NotificationSubHeader>Before That</NotificationSubHeader>
              {readedNotifications.map((notif: INotification) => (
                <Notification key={notif.id} notification={notif} />
              ))}
            </List>
          </div>
        )}
      </Menu>
    </>
  );
};

/* ------------------ Notification SubHeader ------------------ */
const NotificationSubHeader: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  return (
    <ListSubheader sx={{ px: 20, py: 8 }}>
      <Typography variant="overline">{props.children}</Typography>
    </ListSubheader>
  );
};

/* ------------------ Notification ------------------ */
const Notification: React.FC<{
  notification: INotification;
}> = ({ notification }) => {
  return (
    <ListItemButton
      sx={{
        bgcolor: notification.read ? "transparent" : "action.attention",
        mt: 1,
        px: 20,
        py: 12,
      }}
    >
      <ListItemAvatar>
        <Avatar src={notification.icon} alt="notif-icon" />
      </ListItemAvatar>
      <ListItemText
        sx={{ m: 0 }}
        primary={
          <Typography variant="subtitle2">
            {notification.title} &nbsp;
            <Typography variant="body2" component="span" color="text-secondary">
              {notification.dec}
            </Typography>
          </Typography>
        }
        secondary={
          <Box sx={{ display: "flex", alignItems: "center", gap: 4, mt: 4 }}>
            <Box sx={{ color: "gray.500" }}>
              <ClockIcon />
            </Box>
            <Typography variant="caption">
              {formatDistance(notification.time, new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Box>
        }
      ></ListItemText>
    </ListItemButton>
  );
};

export default NotificationsDropdown;
