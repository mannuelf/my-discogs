export interface Pagination {
  items: number;
  page: number;
  pages: number;
  per_page: number;
  urls: Record<string, unknown>; // Assuming URLs is an object with unknown structure
}

export interface Price {
  currency: string;
  value: number;
}

export interface Seller {
  id: number;
  resource_url: string;
  username: string;
}

export interface Release {
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

export interface Listing {
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

export interface InventoryFetchResponse {
  pagination: Pagination;
  listings: Listing[];
}
