import { QueryFunction } from "@tanstack/react-query";

const getProducts: QueryFunction<
  any,
  [string, { search: string; status: string }]
> = async ({ queryKey, signal }) => {
  const [_key, { search, status }] = queryKey;
  let url = "/api/products";
  url += `?search=${search}`;
  url += `&status=${status}`;
  const res = await fetch(url, { signal });
  return res.json();
};

export default getProducts;
