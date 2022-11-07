export interface ITask {
  id: string;
  title: string;
  attachments: string[];
  dueDate: [number, undefined | number];
  description: string;
  assignee: { name: string; avatar: string }[];
  prioritize: "Low" | "Medium" | "Hight";
  liked: boolean;
  completed: boolean;
  comments: {
    id: string;
    author: { name: string; avatar: string };
    date: number;
    content?: string;
    attachment?: string;
  }[];
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

export interface IData {
  tasks: ITasks;
  columns: IColumns;
  columnsOrder: ColumnId[];
}
