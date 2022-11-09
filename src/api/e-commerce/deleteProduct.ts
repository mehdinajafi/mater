const deleteProduct = async ({ productId }: { productId: string }) => {
  const res = await fetch(`/api/products/delete/${productId}`, {
    method: "POST",
  });
  return res.json();
};

export default deleteProduct;
