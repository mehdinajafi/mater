import React from "react";
import { Box, Paper } from "@mui/material";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import KanbanTask from "./KanbanTask";
import KanbanColumnHeader from "./KanbanColumnHeader";
import AddNewTask from "./AddNewTask";
import { IColumn, ITask } from "./interfaces";

interface IKanbanColumn {
  column: IColumn;
  tasks: ITask[];
  index: number;
  deleteColumn: (columnId: string) => void;
  addNewTask: (columnId: string, task: ITask) => void;
}

const KanbanColumn: React.FC<IKanbanColumn> = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "gray.100",
            px: 16,
            height: "max-content",
            border: "1px dashed rgba(145, 158, 171, 0.24)",
          }}
          ref={provided.innerRef}
        >
          <KanbanColumnHeader
            column={props.column}
            deleteColumn={props.deleteColumn}
          />

          <Droppable droppableId={props.column.id} type="task">
            {(provided) => (
              <Box
                sx={{ width: 280, flexGrow: 1, minHeight: 10 }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.tasks.map((task, index) => (
                  <KanbanTask key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          <Box mt={16} mb={24}>
            <AddNewTask column={props.column} addNewTask={props.addNewTask} />
          </Box>
        </Paper>
      )}
    </Draggable>
  );
};

export default KanbanColumn;
