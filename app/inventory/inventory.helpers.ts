import { responses } from "types";
import { InventoryFetchResponse } from "./inventory.types";

export const getErrorMessage = (statusCode: number): string => {
  const response = responses.find((response) => response.status === statusCode);
  if (response) {
    return `${response.title}: ${response.description}`;
  } else {
    return "An unknown error occurred.";
  }
};

export const buildUrl = (username: string, params: Record<string, string>): string => {
  const baseUrl = `https://api.discogs.com/users/${username}/inventory`;
  const queryParams = new URLSearchParams(params).toString();
  return `${baseUrl}?${queryParams}`;
};

export const buildHeaders = (): Record<string, string> => ({
  Authorization: `Discogs key=${process.env.CONSUMER_KEY}, secret=${process.env.CONSUMER_SECRET}`,
  "User-Agent": `${process.env.USER_AGENT}`,
});

export const validateResponse = async (response: Response): Promise<void> => {
  if (!response.ok) {
    const errorMessage = getErrorMessage(response.status);
    console.error(
      `Server responded with a status: ${response.status} ${response.statusText}. ${errorMessage}`,
    );
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const parseResponseData = async (response: Response): Promise<InventoryFetchResponse> => {
  const data = await response.json();
  if (!data || !data.pagination) {
    console.error("Unexpected API response structure:", data);
    throw new Error("Invalid API response structure");
  }
  return data;
};

export const handleError = (error: unknown): never => {
  console.error(`Failed to fetch user inventory:`, error);
  throw error;
};
