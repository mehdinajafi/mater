import { QueryFunction } from "@tanstack/react-query";

const getShippingCost: QueryFunction<
  any,
  [
    string,
    {
      addressId?: number;
    }
  ]
> = async ({ queryKey, signal }) => {
  const [_key, { addressId }] = queryKey;
  const res = await fetch("/api/shipping-cost", {
    method: "POST",
    signal,
    body: JSON.stringify({
      addressId,
    }),
  });
  return res.json();
};

export default getShippingCost;
