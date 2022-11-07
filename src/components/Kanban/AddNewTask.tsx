import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  InputBase,
  Paper,
  Tooltip,
} from "@mui/material";
import { nanoid } from "nanoid";
import { IColumn, ITask } from "./interfaces";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";
import { ReactComponent as CheckRoundedIcon } from "@/assets/icons/check-rounded.svg";
import { ReactComponent as CircleIcon } from "@/assets/icons/circle.svg";

interface IAddNewTask {
  column: IColumn;
  addNewTask: (columnId: string, task: ITask) => void;
}

const AddNewTask: React.FC<IAddNewTask> = (props) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddNewTask = (columnId: string, task: ITask) => {
    props.addNewTask(columnId, task);
    setShowForm(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {showForm && (
        <AddTaskForm column={props.column} addNewTask={handleAddNewTask} />
      )}

      <Button
        variant="text"
        color="inherit"
        size="large"
        startIcon={<PlusIcon />}
        onClick={() => setShowForm(!showForm)}
        sx={{ fontSize: "0.875rem" }}
      >
        Add Task
      </Button>
    </Box>
  );
};

// ------------------------- AddTaskForm ------------------------- //
const AddTaskForm: React.FC<IAddNewTask> = (props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleTaskComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
  };

  const handleTaskOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleTitleInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && taskTitle.trim() !== "") {
      props.addNewTask(props.column.id, {
        id: nanoid(),
        title: taskTitle,
        attachments: [],
        assignee: [],
        completed: completed,
        description: "",
        dueDate: [new Date().getTime(), undefined],
        liked: false,
        comments: [],
        prioritize: "Low",
      });
    }
  };

  return (
    <Paper variant="outlined">
      <InputBase
        name="task"
        multiline
        placeholder="Task name"
        value={taskTitle}
        onChange={handleTaskOnChange}
        onKeyPress={handleTitleInputKeyPress}
        sx={{ px: 16, pt: 16, pb: 5 }}
      />
      <Box sx={{ display: "flex", pb: 16, pr: 12, pl: 8 }}>
        <Tooltip title="Mark complete">
          <Checkbox
            checked={completed}
            onChange={handleTaskComplete}
            disableRipple
            icon={<CircleIcon width={24} height={24} />}
            checkedIcon={<CheckRoundedIcon width={24} height={24} />}
          />
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default AddNewTask;
