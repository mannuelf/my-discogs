interface ApiResponse {
  status: number;
  title: string;
  description: string;
  body?: unknown;
}

export const responses: ApiResponse[] = [
  {
    status: 200,
    title: "OK",
    description: "The request was successful, and the requested data is provided in the response body.",
    body: {}, // Example placeholder, actual data structure would vary
  },
  {
    status: 201,
    title: "Continue",
    description: `You've sent a POST request to a list of resources to create a new one. The ID of the newly-created resource will be provided in the body of the response.`,
    body: { id: "newResourceId" }, // Example placeholder
  },
  {
    status: 204,
    title: "No Content",
    description: "The request was successful, and the server has no additional information to convey, so the response body is empty.",
  },
  {
    status: 401,
    title: "Unauthorized",
    description: `You're attempting to access a resource that first requires authentication. See Authenticating with OAuth.`,
  },
  {
    status: 403,
    title: "Forbidden",
    description: `You're not allowed to access this resource. Even if you authenticated, or already have, you simply don't have permission. Trying to modify another user's profile, for example, will produce this error.`,

  },
  {
    status: 404,
    title: "Not Found",
    description: `The resource you requested doesn't exist.`
  },
  {
    status: 405,
    title: "Method Not Allowed",
    description: `You're trying to use an HTTP verb that isn't supported by the resource. Trying to PUT to /artists/1, for example, will fail because Artists are read-only.`,
  },
  {
    status: 422,
    title: "Unprocessable Entity",
    description: `Your request was well-formed, but there's something semantically wrong with the body of the request. This can be due to malformed JSON, a parameter that's missing or the wrong type, or trying to perform an action that doesn't make any sense. Check the response body for specific information about what went wrong.`,
  },
  {
    status: 500,
    title: "Internal Server Error",
    description: `Something went wrong on our end while attempting to process your request. The response body's message field will contain an error code that you can send to Discogs Support (which will help us track down your specific issue).`,
  },
];

interface Pagination {
  items: number;
  page: number;
  pages: number;
  per_page: number;
  urls: Record<string, unknown>;
}

interface Price {
  currency: string;
  value: number;
}

interface Seller {
  id: number;
  resource_url: string;
  username: string;
}

interface Release {
  artist: string;
  catalog_number: string;
  description: string;
  format: string;
  id: number;
  resource_url: string;
  thumbnail: string;
  title: string;
  year: number;
}

interface Listing {
  allow_offers: boolean;
  audio: boolean;
  comments: string;
  condition: string;
  id: number;
  posted: string;
  price: Price;
  release: Release;
  resource_url: string;
  seller: Seller;
  ships_from: string;
  sleeve_condition: string;
  status: string;
  uri: string;
}

export interface MarketplaceData {
  pagination: Pagination;
  listings: Listing[];
}
