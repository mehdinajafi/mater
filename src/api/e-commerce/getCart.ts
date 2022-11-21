import { QueryFunction } from "@tanstack/react-query";

const getCart: QueryFunction<any, [string]> = async ({ queryKey, signal }) => {
  const res = await fetch("/api/cart", { signal });
  return res.json();
};

export default getCart;
