import "dotenv/config";
import { getErrorMessage } from "./inventory.helpers";
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
): Promise<InventoryFetchResponse> => {
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

    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status);
      console.error(
        `Server responded with a status: ${response.status} ${response.statusText}. ${errorMessage}`,
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.pagination) {
      console.error("Unexpected API response structure:", data);
      throw new Error("Invalid API response structure");
    }
    return data;
  } catch (error) {
    console.error(`Failed to fetch user inventory:`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
