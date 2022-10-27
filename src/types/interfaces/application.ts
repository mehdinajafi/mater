export default interface IApplication {
  id: number;
  logo: string;
  name: string;
  price: number;
  os: "Mac" | "Windows";
  rate: number;
  reviews: number;
}
