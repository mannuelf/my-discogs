export interface Pagination {
  items: number;
  page: number;
  pages: number;
  per_page: number;
  urls: Record<
    string,
    {
      last: string;
      next: string;
    }
  >;
}

export interface Price {
  currency: string;
  value: number;
}

interface OriginalPrice {
  curr_abbr: string;
  curr_id: number;
  formatted: string;
  value: number;
}

interface SellerStats {
  rating: string;
  stars: number;
  total: number;
}

interface Seller {
  id: number;
  username: string;
  avatar_url: string;
  stats: SellerStats;
  min_order_total: number;
  html_url: string;
  uid: number;
  url: string;
  payment: string;
  shipping: string;
  resource_url: string;
}

interface Image {
  type: string;
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
}

interface ReleaseStatsCommunity {
  in_wantlist: number;
  in_collection: number;
}

interface ReleaseStats {
  community: ReleaseStatsCommunity;
}

interface Release {
  thumbnail: string;
  description: string;
  images: Image[];
  artist: string;
  format: string;
  resource_url: string;
  title: string;
  year: number;
  id: number;
  label: string;
  catalog_number: string;
  stats: ReleaseStats;
}

export interface Listing {
  id: number;
  resource_url: string;
  uri: string;
  status: string;
  condition: string;
  sleeve_condition: string;
  comments: string;
  ships_from: string;
  posted: string;
  allow_offers: boolean;
  offer_submitted: boolean;
  audio: boolean;
  price: Price;
  original_price: OriginalPrice;
  shipping_price: Record<string, unknown>;
  original_shipping_price: Record<string, unknown>;
  seller: Seller;
  release: Release;
}

export interface InventoryFetchResponse {
  pagination: Pagination;
  listings: Listing[];
}
