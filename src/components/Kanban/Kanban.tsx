import { useState } from "react";
import { Box } from "@mui/material";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { nanoid } from "nanoid";
import KanbanColumn from "./KanbanColumn";
import AddNewColumnForm from "./AddNewColumnForm";
import { IData, ITask } from "./interfaces";

const initialData: IData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Take out the garbage.",
      attachments: ["/assets/images/covers/cover_1.jpeg"],
      assignee: [],
      completed: false,
      description: "",
      dueDate: [new Date().getTime(), undefined],
      liked: false,
      comments: [
        {
          id: nanoid(),
          date: new Date().getTime(),
          author: {
            avatar: "/assets/images/avatars/avatar_default.jpg",
            name: "Lucian Obrien",
          },
          attachment: "/assets/images/covers/cover_1.jpeg",
          content: "Quis veniam aut saepe aliquid nulla.",
        },
        {
          id: nanoid(),
          date: new Date().getTime(),
          author: {
            avatar: "/assets/images/avatars/avatar_default.jpg",
            name: "Lucian Obrien",
          },
          attachment: "/assets/images/covers/cover_1.jpeg",
          content: "Quis veniam aut saepe aliquid nulla.",
        },
      ],
      prioritize: "Low",
    },
    "task-2": {
      id: "task-2",
      title: "Go to the gym.",
      attachments: [],
      assignee: [],
      completed: false,
      description: "",
      dueDate: [new Date().getTime(), undefined],
      liked: false,
      comments: [],
      prioritize: "Low",
    },
  },
  columns: {
    backlog: {
      id: "backlog",
      title: "Backlog",
      taskIds: ["task-1", "task-2"],
    },
    progress: {
      id: "progress",
      title: "Progress",
      taskIds: [],
    },
  },
  columnsOrder: ["backlog", "progress"],
};

const Kanban = () => {
  const [data, setData] = useState<IData>(initialData);

  const deleteColumn = (columnId: string) => {
    const newData = { ...data };
    newData.columnsOrder = newData.columnsOrder.filter((id) => id !== columnId);
    delete newData.columns[columnId];
    setData(newData);
  };

  const addNewColumn = (columnId: string, title: string) => {
    const newData = { ...data };
    newData.columnsOrder = [...newData.columnsOrder, columnId];
    newData.columns[columnId] = {
      id: columnId,
      title,
      taskIds: [],
    };
    setData(newData);
  };

  const addNewTask = (columnId: string, task: ITask) => {
    const newData = { ...data };
    newData.tasks[task.id] = task;
    newData.columns[columnId].taskIds = [
      ...newData.columns[columnId].taskIds,
      task.id,
    ];
    setData(newData);
  };

  const changeTaskCompletion = (taskId: string, complete: boolean) => {
    const newData = { ...data };
    newData.tasks[taskId].completed = complete;
    setData(newData);
  };

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
              gap: 24,
              overflowX: "auto",
              pb: 24,
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
                  deleteColumn={deleteColumn}
                  addNewTask={addNewTask}
                  changeTaskCompletion={changeTaskCompletion}
                />
              );
            })}
            {provided.placeholder}
            <Box flexShrink={0}>
              <AddNewColumnForm addNewColumn={addNewColumn} />
            </Box>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Kanban;
