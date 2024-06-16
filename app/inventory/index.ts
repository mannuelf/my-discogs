import type { InventoryFetchResponse } from "./inventory.types";

/**
 * Fetch user inventory
 * @see https://www.discogs.com/developers/#page:marketplace,header:marketplace-inventory
 * @param username
 * @param status
 * @param sort
 * @param sortOrder
 */
export const fetchUserInventory = async (
  pageNumber: string,
  perPage: string,
  username: string,
  status: string,
  sort: string,
  sortOrder: string,
): Promise<InventoryFetchResponse | undefined> => {
  const baseUrl = `https://api.discogs.com/users/${username}/inventory`;

  const queryParams = new URLSearchParams({
    page: pageNumber,
    per_page: perPage,
    status,
    sort,
    sort_order: sortOrder,
  }).toString();

  const url = `${baseUrl}?${queryParams}`;

  const headers = {
    Authorization: `Discogs key=${process.env.CONSUMER_KEY}, secret=${process.env.CONSUMER_SECRET}`,
    "User-Agent": `${process.env.USER_AGENT}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user inventory:", error);
  }

  return undefined;
};
