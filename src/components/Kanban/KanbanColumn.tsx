import { Box, IconButton, InputBase, Paper } from "@mui/material";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { IColumn, ITask } from "./Kanban";
import KanbanTask from "./KanbanTask";
import { ReactComponent as DotsIcon } from "@/assets/icons/dots.svg";

interface IKanbanColumn {
  column: IColumn;
  tasks: ITask[];
  index: number;
}

const KanbanColumn: React.FC<IKanbanColumn> = (props) => {
  const handleTitileOnChange = () => {};

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          variant="outlined"
          sx={{ bgcolor: "gray.100", px: 16, ml: 24 }}
          ref={provided.innerRef}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between", pt: 24 }}
          >
            <InputBase
              value={props.column.title}
              onChange={handleTitileOnChange}
            />
            <IconButton>
              <DotsIcon />
            </IconButton>
          </Box>

          <Droppable droppableId={props.column.id} type="task">
            {(provided) => (
              <Box
                sx={{ width: 280 }}
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
        </Paper>
      )}
    </Draggable>
  );
};

export default KanbanColumn;
