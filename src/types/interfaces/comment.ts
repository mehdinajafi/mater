import IUser from "./user";

export default interface IComment {
  id: string;
  date: number;
  body: string;
  author: IUser;
}
