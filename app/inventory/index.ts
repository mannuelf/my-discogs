import { getErrorMessage } from "./inventory.helpers";
import type { InventoryFetchResponse } from "./inventory.types";

const buildUrl = (username: string, params: Record<string, string>): string => {
  const baseUrl = `https://api.discogs.com/users/${username}/inventory`;
  const queryParams = new URLSearchParams(params).toString();
  return `${baseUrl}?${queryParams}`;
};

const buildHeaders = (): Record<string, string> => ({
  Authorization: `Discogs key=${process.env.CONSUMER_KEY}, secret=${process.env.CONSUMER_SECRET}`,
  "User-Agent": `${process.env.USER_AGENT}`,
});

const validateResponse = async (response: Response): Promise<void> => {
  if (!response.ok) {
    const errorMessage = getErrorMessage(response.status);
    console.error(
      `Server responded with a status: ${response.status} ${response.statusText}. ${errorMessage}`,
    );
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

const parseResponseData = async (response: Response): Promise<InventoryFetchResponse> => {
  const data = await response.json();
  if (!data || !data.pagination) {
    console.error("Unexpected API response structure:", data);
    throw new Error("Invalid API response structure");
  }
  return data;
};

const handleError = (error: unknown): never => {
  console.error(`Failed to fetch user inventory:`, error);
  throw error;
};

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
) => {
  const url = buildUrl(username, { pageNumber, perPage, status, sort, sortOrder });
  const headers = buildHeaders();

  try {
    const response = await fetch(url, { headers });
    await validateResponse(response);
    return await parseResponseData(response);
  } catch (error) {
    handleError(error);
  }
};
