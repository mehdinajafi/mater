import { MutationFunction } from "@tanstack/react-query";

const addToCart: MutationFunction<
  any,
  {
    productId: string;
    colorId: number;
    size: number;
    quantity: number;
  }
> = async ({ productId, colorId, size, quantity }) => {
  const res = await fetch("/api/cart/add", {
    method: "POST",
    body: JSON.stringify({ productId, colorId, size, quantity }),
  });
  return res.json();
};

export default addToCart;
