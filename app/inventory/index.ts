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
