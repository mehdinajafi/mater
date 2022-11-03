import IPost from "./post";
import ISocial from "./social";

export default interface IProfile {
  name: string;
  avatar: string;
  banner: string;
  job: string;
  followersCount: number;
  followingsCount: number;
  bio: string;
  location: string;
  email: string;
  resume: string[];
  social: ISocial;
  posts: IPost[];
}
