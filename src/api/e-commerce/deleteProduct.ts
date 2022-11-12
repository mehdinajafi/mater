import { MutationFunction } from "@tanstack/react-query";

const deleteProduct: MutationFunction<any, { ids: string[] }> = async ({
  ids,
}) => {
  const res = await fetch("/api/products/delete", {
    method: "POST",
    body: JSON.stringify({
      ids,
    }),
  });
  return res.json();
};

export default deleteProduct;
