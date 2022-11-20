import { MutationFunction } from "@tanstack/react-query";

const updateCartItem: MutationFunction<
  any,
  {
    cartItemId: string;
    quantity: number;
  }
> = async ({ cartItemId, quantity }) => {
  const res = await fetch("/api/cart/update", {
    method: "POST",
    body: JSON.stringify({ cartItemId, quantity }),
  });
  return res.json();
};

export default updateCartItem;
