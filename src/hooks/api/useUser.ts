import { useQuery } from "@tanstack/react-query";
import getUser from "@/api/getUser";
import ICurrentUser from "@/types/interfaces/currentUser";

const useUser = () => {
  const query = useQuery(["profile"], getUser);

  return {
    data: query.data as ICurrentUser,
    isLoading: query.isLoading,
    error: query.error,
  };
};

export default useUser;
