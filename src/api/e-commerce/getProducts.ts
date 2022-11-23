import { QueryFunction } from "@tanstack/react-query";

const getProducts: QueryFunction<
  any,
  [
    string,
    {
      search?: string;
      statuses?: string[];
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
  const [_key, { search, statuses }] = queryKey;
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (statuses) {
    statuses.forEach((status) => {
      params.append("status", status);
    });
  }
  const res = await fetch("/api/products?" + params.toString(), { signal });
  return res.json();
};

export default getProducts;
