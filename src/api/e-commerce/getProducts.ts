import { QueryFunction } from "@tanstack/react-query";

const getProducts: QueryFunction<
  any,
  [
    string,
    {
      search?: string;
      status?: string;
      gender?: string[];
      category?: string;
      color?: string[];
      minPrice?: string;
      maxPrice?: string;
      rating?: string;
      order?: string;
      orderBy?: string;
    }
  ]
> = async ({ queryKey, signal }) => {
  const [_key, { search, status }] = queryKey;
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  const res = await fetch("/api/products?" + params.toString(), { signal });
  return res.json();
};

export default getProducts;
