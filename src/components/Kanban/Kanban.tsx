import { Box } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";

export interface ITask {
  id: string;
  content: string;
  attachment?: string[];
}

interface ITasks {
  [x: string]: ITask;
}

type TaskId = keyof ITasks;

export interface IColumn {
  id: string;
  title: string;
  taskIds: TaskId[];
}

interface IColumns {
  [x: string]: IColumn;
}

type ColumnId = keyof IColumns;

interface IData {
  tasks: ITasks;
  columns: IColumns;
  columnsOrder: ColumnId[];
}

const initialData: IData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Take out the garbage",
      attachment: ["/assets/images/covers/cover_1.jpeg"],
    },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    backlog: {
      id: "backlog",
      title: "Backlog",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    progress: {
      id: "progress",
      title: "Progress",
      taskIds: [],
    },
  },
  columnsOrder: ["backlog", "progress"],
};

const Kanban: React.FC = (props) => {
  const [data, setData] = useState<IData>(initialData);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnsOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnsOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const home = data.columns[source.droppableId];
    const foreign = data.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newHome.id]: newHome,
        },
      };

      setData(newState);
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };

    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              display: "flex",
              ml: -24,
            }}
          >
            {data.columnsOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <KanbanColumn
                  key={columnId}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Kanban;
