import {
  IconButton,
  Avatar,
  Box,
  Typography,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Divider,
  List,
  ListSubheader,
  Tooltip,
  Stack,
} from "@mui/material";
import { formatDistance } from "date-fns";
import DropdownLoading from "../DropdownLoading";
import { INotification } from "./NotificationsDropdown";
import { ReactComponent as ClockIcon } from "@/assets/icons/clock.svg";
import { ReactComponent as DoubleCheckIcon } from "@/assets/icons/double-check.svg";

interface INotificationsMenu {
  isLoading: boolean;
  unreadNotifications: INotification[];
  readedNotifications: INotification[];
}

const NotificationsMenu: React.FC<INotificationsMenu> = (props) => {
  const { isLoading, unreadNotifications, readedNotifications } = props;

  if (isLoading) {
    return <DropdownLoading />;
  }

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 20, py: 16 }}
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
      </Stack>

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
        disableTypography
        primary={
          <Typography variant="subtitle2">
            {notification.title} &nbsp;
            <Typography variant="body2" component="span" color="text-secondary">
              {notification.dec}
            </Typography>
          </Typography>
        }
        secondary={
          <Stack direction="row" alignItems="center" spacing={4} mt={4}>
            <Box component={ClockIcon} sx={{ color: "gray.500" }} />
            <Typography variant="caption">
              {formatDistance(notification.time, new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Stack>
        }
      ></ListItemText>
    </ListItemButton>
  );
};

export default NotificationsMenu;
