import IComment from "./comment";
import IUser from "./user";

export default interface IPost {
  date: number;
  image: string;
  title: string;
  author: IUser;
  likes: IUser[];
  totalLikes: number;
  comments: IComment[];
}
