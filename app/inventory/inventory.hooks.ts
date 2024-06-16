import { useQuery } from "@tanstack/react-query";
import { fetchUserInventory } from ".";

export const useFetchUserInventory = (
  pageNumber: string,
  perPage: string,
  username: string,
  status: string,
  sort: string,
  sortOrder: string,
) => {
  return useQuery({
    queryKey: ["userInventory", username, status, sort, sortOrder, pageNumber],
    queryFn: () => fetchUserInventory(pageNumber, perPage, username, status, sort, sortOrder,),
  });
};
