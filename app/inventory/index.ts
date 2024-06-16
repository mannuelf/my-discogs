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
    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status);
      throw new Error(`Server responded with a status: ${response.status} ${response.statusText}. ${errorMessage}`);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error:", error.message);
      throw new Error(`Network error:: ${error}`);
    } else if (error instanceof SyntaxError) {
      console.error("Parsing error:", error.message);
      throw new Error(`Parsing error: ${error}`);
    } else {
      throw new Error(`Failed to fetch user inventory: ${error}`);
    }
  }

  return undefined;
};
