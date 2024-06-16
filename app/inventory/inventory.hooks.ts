import { useQuery } from "@tanstack/react-query";
import { fetchUserInventory } from ".";

export const useFetchUserInventory = (username: string, status: string, sort: string, sortOrder: string) => {
  return useQuery({
    queryKey: ['userInventory', username, status, sort, sortOrder],
    queryFn: () => fetchUserInventory(username, status, sort, sortOrder)
  });
};
