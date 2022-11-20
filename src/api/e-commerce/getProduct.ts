import { QueryFunction } from "@tanstack/react-query";

const getProduct: QueryFunction<
  any,
  [
    string,
    {
      id?: string;
    }
  ]
> = async ({ queryKey, signal }) => {
  const [_key, { id }] = queryKey;
  const res = await fetch(`/api/product/?id=${id}`, { signal });
  return res.json();
};

export default getProduct;
