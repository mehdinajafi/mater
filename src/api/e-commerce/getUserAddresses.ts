import { QueryFunction } from "@tanstack/react-query";

const getUserAddresses: QueryFunction<any, [string]> = async ({
  queryKey,
  signal,
}) => {
  const res = await fetch("/api/address/all");
  return res.json();
};

export default getUserAddresses;
