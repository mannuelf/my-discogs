import {
  buildHeaders,
  buildUrl,
  handleError,
  parseResponseData,
  validateResponse,
} from "./inventory.helpers";

/**
 * Fetch user inventory
 * @see https://www.discogs.com/developers/#page:marketplace,header:marketplace-inventory
 * @param username
 * @param status
 * @param sort
 * @param sortOrder
 */
export const fetchUserInventory = async (
  page: string,
  per_page: string,
  username: string,
  status: string,
  sort: string,
  sort_order: string,
) => {
  const url = buildUrl(username, { page, per_page, status, sort, sort_order });
  const headers = buildHeaders();

  try {
    const response = await fetch(url, { headers });
    await validateResponse(response);
    return await parseResponseData(response);
  } catch (error) {
    handleError(error);
  }
};
