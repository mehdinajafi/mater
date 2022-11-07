import React, { useState } from "react";
import { Box, Checkbox, Paper, Typography } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import TaskDrawer from "./TaskDrawer";
import { ITask } from "./interfaces";
import { ReactComponent as CheckRoundedIcon } from "@/assets/icons/check-rounded.svg";
import { ReactComponent as CircleIcon } from "@/assets/icons/circle.svg";

interface IKanbanTask {
  task: ITask;
  index: number;
}

const KanbanTask: React.FC<IKanbanTask> = ({ task, index }) => {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  const handleTaskComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.currentTarget.checked);
  };

  return (
    <>
      <TaskDrawer open={open} onClose={() => setOpen(false)} task={task} />

      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            elevation={0}
            onClick={() => setOpen(true)}
            sx={(theme) => ({
              overflow: "hidden",
              cursor: "pointer !important",
              boxShadow: theme.customShadows.z1,
              marginTop: 16,

              "&:hover": {
                boxShadow: theme.customShadows.z20,
              },
            })}
          >
            {task.attachments[0] && (
              <img src={task.attachments[0]} alt="attachment" />
            )}

            <Box sx={{ display: "flex", alignItems: "center", py: 15, px: 15 }}>
              <Checkbox
                checked={completed}
                onChange={handleTaskComplete}
                disableRipple
                icon={<CircleIcon width={24} height={24} />}
                checkedIcon={<CheckRoundedIcon width={24} height={24} />}
              />
              <Typography
                variant="subtitle2"
                sx={{ opacity: completed ? 0.48 : 1 }}
              >
                {task.title}
              </Typography>
            </Box>
          </Paper>
        )}
      </Draggable>
    </>
  );
};

export default KanbanTask;
