import { QueryFunction } from "@tanstack/react-query";

const getPayment: QueryFunction<any, [string]> = async ({
  queryKey,
  signal,
}) => {
  const res = await fetch(`/api/payment`, { signal });
  return res.json();
};

export default getPayment;
