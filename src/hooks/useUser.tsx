import { useQuery } from "@tanstack/react-query";
import getProfile from "@/api/getProfile";
import ICurrentUser from "@/types/interfaces/currentUser";

const useUser = () => {
  const query = useQuery(["profile"], getProfile);

  return {
    data: query.data as ICurrentUser,
    isLoading: query.isLoading,
    error: query.error,
  };
};

export default useUser;
