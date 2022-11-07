import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  InputBase,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { format, formatDistance } from "date-fns";
import useUser from "@/hooks/api/useUser";
import { ITask } from "./interfaces";
import { ReactComponent as CheckIcon } from "@/assets/icons/check.svg";
import { ReactComponent as ThumbUpIcon } from "@/assets/icons/thumb-up.svg";
import { ReactComponent as PaperClipIcon } from "@/assets/icons/paper-clip.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";
import { ReactComponent as DotsVerticalIcon } from "@/assets/icons/dots-vertical.svg";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";
import { ReactComponent as UploadIcon } from "@/assets/icons/upload.svg";
import { ReactComponent as MediaPlusIcon } from "@/assets/icons/media-plus-solid.svg";
import { ReactComponent as XIcon } from "@/assets/icons/x.svg";

interface ITaskDrawer {
  open: boolean;
  onClose: () => void;
  task: ITask;
}

const SInputBase = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,
  "& input": {
    fontSize: "1.125rem",
    fontWeight: 700,
    paddingBlock: theme.spacing(8),
    borderRadius: "0.5rem",
    border: "1px solid transparent",
    transition:
      "padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

    "&:hover, &:focus": {
      paddingLeft: 8,
      border: `1px solid ${theme.palette.gray[800]}`,
    },
  },
}));

const SAddItemBox = styled("button")(({ theme }) => ({
  backgroundColor: "rgba(145, 158, 171, 0.08)",
  color: theme.palette.gray[600],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 38,
  height: 38,
  border: "1px dashed rgba(145, 158, 171, 0.24)",
  borderRadius: "50%",
  cursor: "pointer",
}));

const SRadioBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "selected",
})<{ color: "info" | "error" | "warning"; selected: boolean }>(
  ({ theme, selected, color }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(4),
    border: "1px solid rgba(145, 158, 171, 0.24)",
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.bold,
    paddingInline: theme.spacing(8),

    ...(selected && {
      ...(color === "info" && {
        color: theme.palette.info.main,
        backgroundColor: theme.palette.info.semiTransparent,
        borderColor: theme.palette.info.main,
      }),
      ...(color === "error" && {
        color: theme.palette.error.main,
        backgroundColor: theme.palette.error.semiTransparent,
        borderColor: theme.palette.error.main,
      }),
      ...(color === "warning" && {
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.semiTransparent,
        borderColor: theme.palette.warning.main,
      }),
    }),
  })
);

const TaskDrawer: React.FC<ITaskDrawer> = (props) => {
  const task = props.task;

  const renderDueDate = () => {
    const start = task.dueDate[0];
    const end = task.dueDate[1];

    if (!end) {
      return format(start, `dd MMM yy`);
    }

    const sameYear =
      new Date(start).getFullYear() === new Date(end).getFullYear();
    const sameMonth = new Date(start).getMonth() === new Date(end).getMonth();
    if (!sameYear) {
      return `${format(start, "dd MMM yyy")} - ${format(end, "dd MMM yyy")}`;
    }
    if (sameMonth) {
      return `${format(start, `dd`)} - ${format(end, `dd MMM yyy`)}`;
    }
    return `${format(start, `dd MMM`)} - ${format(end, `dd MMM yyy`)}`;
  };

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      PaperProps={{ sx: { width: 480, maxWidth: "100%" } }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 20 }}>
        <Button
          size="small"
          variant="outlined"
          color={task.completed ? "primary" : "dark"}
          startIcon={task.completed && <CheckIcon />}
        >
          {task.completed ? "completed" : "Mark Complete"}
        </Button>

        <Tooltip title="Like this">
          <IconButton
            color={task.liked ? "primary" : "default"}
            size="small"
            sx={{ ml: "auto" }}
          >
            <ThumbUpIcon width={20} height={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Attachment">
          <IconButton size="small" sx={{ ml: 8 }}>
            <PaperClipIcon width={20} height={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete task">
          <IconButton size="small" sx={{ ml: 8 }}>
            <TrashIcon width={20} height={20} />
          </IconButton>
        </Tooltip>

        <IconButton size="small" sx={{ ml: 8 }}>
          <DotsVerticalIcon width={20} height={20} />
        </IconButton>
      </Box>

      <Divider />

      <Box
        sx={{
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            px: 20,
            pt: 24,
            pb: 40,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Box>
            <SInputBase value={task.title} placeholder="Task name" />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" color="gray.600" sx={{ width: 120 }}>
              Assignee
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
              {task.assignee.map((user) => (
                <Avatar src={user.avatar} alt={user.name} />
              ))}
              <Tooltip title="Add assignne">
                <SAddItemBox>
                  <PlusIcon width={20} height={20} />
                </SAddItemBox>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" color="gray.600" sx={{ width: 120 }}>
              Due date
            </Typography>
            <Box sx={{ fontSize: "0.875rem", cursor: "pointer" }}>
              {renderDueDate()}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" color="gray.600" sx={{ width: 120 }}>
              Prioritize
            </Typography>

            <RadioGroup
              defaultValue="low"
              sx={{ flexDirection: "row", gap: 8 }}
            >
              <Box position="relative">
                <SRadioBox color="info" selected={task.prioritize === "Low"}>
                  {task.prioritize === "Low" ? (
                    <CheckIcon width={16} height={16} />
                  ) : (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "info.main",
                      }}
                    />
                  )}
                  Low
                </SRadioBox>

                <FormControlLabel
                  value="low"
                  label=""
                  control={<Radio sx={{ display: "none" }} />}
                  sx={{ position: "absolute", inset: 0 }}
                />
              </Box>

              <Box position="relative">
                <SRadioBox
                  color="warning"
                  selected={task.prioritize === "Medium"}
                >
                  {task.prioritize === "Medium" ? (
                    <CheckIcon width={16} height={16} />
                  ) : (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "warning.main",
                      }}
                    />
                  )}
                  Medium
                </SRadioBox>

                <FormControlLabel
                  value="medium"
                  label=""
                  control={<Radio sx={{ display: "none" }} />}
                  sx={{ position: "absolute", inset: 0 }}
                />
              </Box>

              <Box position="relative">
                <SRadioBox color="error" selected={task.prioritize === "Hight"}>
                  {task.prioritize === "Hight" ? (
                    <CheckIcon width={16} height={16} />
                  ) : (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "error.main",
                      }}
                    />
                  )}
                  Hight
                </SRadioBox>

                <FormControlLabel
                  value="high"
                  label=""
                  control={<Radio sx={{ display: "none" }} />}
                  sx={{ position: "absolute", inset: 0 }}
                />
              </Box>
            </RadioGroup>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Typography variant="caption" color="gray.600" sx={{ width: 120 }}>
              Description
            </Typography>
            <TextField
              multiline
              color="gray"
              sx={{
                flexGrow: 1,
                "& .MuiInputBase-root": {
                  py: 8.5,
                  px: 14,
                },
              }}
              InputProps={{ sx: { fontSize: "0.875rem" } }}
            />
          </Box>

          <Box sx={{ display: "flex" }}>
            <Typography variant="caption" color="gray.600" sx={{ width: 120 }}>
              Attachments
            </Typography>
            <Box sx={{ display: "flex", gap: 8 }}>
              {task.attachments.map((attachment) => (
                <Box
                  key={attachment}
                  sx={{
                    position: "relative",
                    borderRadius: "0.625rem",
                    overflow: "hidden",
                    width: 62,
                    height: 62,
                  }}
                >
                  <Box
                    component="img"
                    src={attachment}
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    size="small"
                    disableRipple
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      p: 0,
                      color: "rgba(255, 255, 255, 0.72)",
                      backgroundColor: "rgba(22, 28, 36, 0.48)",
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: "rgba(22, 28, 36, 0.72)",
                      },
                    }}
                  >
                    <XIcon width={16} height={16} />
                  </IconButton>
                </Box>
              ))}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  bgcolor: "gray.100",
                  color: "gray.500",
                  borderRadius: "0.5rem",
                  border: "1px dashed rgba(145, 158, 171, 0.24)",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.72,
                  },
                }}
              >
                <UploadIcon width={28} height={28} />
              </Box>
            </Box>
          </Box>
        </Box>

        {task.comments.length !== 0 && <Comments comments={task.comments} />}
      </Box>

      <Divider />

      <NewCommentForm />
    </Drawer>
  );
};

// -------------------------- Comments -------------------------- //
const Comments: React.FC<{
  comments: ITask["comments"];
}> = ({ comments }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        px: 20,
        py: 24,
        bgcolor: "gray.200",
      }}
    >
      {comments.map((comment) => (
        <Box key={comment.id} sx={{ display: "flex", gap: 16 }}>
          <Avatar
            src={comment.author.avatar}
            alt={comment.author.name}
            sx={{ flexShrink: 0 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Typography variant="subtitle2">{comment.author.name}</Typography>
              <Typography variant="caption" color="text-secondary">
                {formatDistance(comment.date, new Date(), { addSuffix: true })}
              </Typography>
            </Box>
            <Typography variant="body2" mt={4}>
              {comment.content}
            </Typography>
            {comment.attachment && (
              <Box sx={{ mt: 8, overflow: "hidden", borderRadius: "0.5rem" }}>
                <img src={comment.attachment} alt="comment-attachment" />
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// -------------------------- New Comment Form -------------------------- //
const NewCommentForm = () => {
  const { data: currentUser } = useUser();

  return (
    <Box sx={{ px: 20, py: 24, display: "flex", gap: 16 }}>
      <Avatar
        src={currentUser.avatar}
        alt={currentUser.name}
        sx={{ flexShrink: 0 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          flexGrow: 1,
          border: "1px solid rgba(145, 158, 171, 0.24)",
          borderRadius: "0.5rem",
        }}
      >
        <InputBase
          multiline
          rows={2}
          placeholder="Type a message"
          sx={{ px: 16, pt: 12 }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", p: 8 }}>
          <Tooltip title="Add photo">
            <IconButton>
              <MediaPlusIcon width={20} height={20} />
            </IconButton>
          </Tooltip>
          <Button variant="contained">Comment</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskDrawer;
