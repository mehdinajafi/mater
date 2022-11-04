import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getUser from "@/api/getUser";
import ICurrentUser from "@/types/interfaces/currentUser";

const useUser = () => {
  const query = useQuery(["user"], getUser);

  return query as UseQueryResult<ICurrentUser> & {
    data: ICurrentUser;
  };
};

export default useUser;
