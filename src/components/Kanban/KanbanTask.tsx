import { Box } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import { ITask } from "./Kanban";

interface IKanbanTask {
  task: ITask;
  index: number;
}

const KanbanTask: React.FC<IKanbanTask> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            p: 24,
            backgroundColor: snapshot.isDragging ? "aqua" : "white",
            cursor: "grab",
          }}
        >
          {task.content}
        </Box>
      )}
    </Draggable>
  );
};

export default KanbanTask;
