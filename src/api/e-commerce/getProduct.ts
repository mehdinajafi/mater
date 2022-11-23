import { QueryFunction } from "@tanstack/react-query";
import IProduct from "@/components/ECommerce/interface/product";

const getProduct: QueryFunction<
  { product: IProduct },
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
