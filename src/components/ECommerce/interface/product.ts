export default interface IProduct {
  id: string;
  image: string;
  gallery: string[];
  title: string;
  price: number;
  discountPercent: number;
  createAt: number;
  status: number;
  colors: { id: number; code: string }[];
  sizes: number[];
  url: { uri: string };
  rating: { rate: number; count: number };
}
