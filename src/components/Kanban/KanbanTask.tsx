import React from "react";
import { Box, Checkbox, Paper, Typography } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import { ITask } from "./interfaces";
import { ReactComponent as CheckRoundedIcon } from "@/assets/icons/check-rounded.svg";
import { ReactComponent as CircleIcon } from "@/assets/icons/circle.svg";

interface IKanbanTask {
  task: ITask;
  index: number;
  changeTaskCompletion: (taskId: string, complete: boolean) => void;
}

const KanbanTask: React.FC<IKanbanTask> = ({
  task,
  index,
  changeTaskCompletion,
}) => {
  const handleTaskComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeTaskCompletion(task.id, e.currentTarget.checked);
  };

  return (
    <>
      {/*
        // TODO: Complete Drawer
        <TaskDrawer open={open} onClose={() => setOpen(false)} task={task} />
      */}

      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            elevation={0}
            sx={(theme) => ({
              overflow: "hidden",
              cursor: "grab",
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
                checked={task.completed}
                onChange={handleTaskComplete}
                disableRipple
                icon={<CircleIcon width={24} height={24} />}
                checkedIcon={<CheckRoundedIcon width={24} height={24} />}
                sx={{ p: 0 }}
              />
              <Typography
                variant="subtitle2"
                sx={{ opacity: task.completed ? 0.48 : 1, ml: 16 }}
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
