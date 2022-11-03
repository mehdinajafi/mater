import IAuthor from "./author";
import IComment from "./comment";

export default interface IPost {
  id: number;
  author: IAuthor;
  published: number;
  body: string;
  attachment: string;
  totalLikes: number;
  lastLikes: {
    id: string;
    name: string;
    avatar: string;
  }[];
  comments: IComment[];
}
