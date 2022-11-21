import { MutationFunction } from "@tanstack/react-query";

const deleteCartItems: MutationFunction<
  any,
  {
    cartItemIds: string[];
  }
> = async ({ cartItemIds }) => {
  const res = await fetch("/api/cart/remove", {
    method: "POST",
    body: JSON.stringify({ cartItemIds }),
  });
  return res.json();
};

export default deleteCartItems;
