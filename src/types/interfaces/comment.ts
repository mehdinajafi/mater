import IAuthor from "./author";

export default interface IComment {
  id: string;
  author: IAuthor;
  date: number;
  body: string;
}
