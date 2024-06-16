import type { InventoryFetchResponse, Listing } from "./inventory.types";

export const Inventory = async (data: InventoryFetchResponse) => {
  return (
    <div className="grid grid-cols-6 font-sans columns-4">
      {data?.listings.map((listing: Listing) => (
        <div key={listing.id} className="bg-cover bg-center flex flex-col justify-end">
          <img src={listing.release.thumbnail} alt={listing.release.title} />
          <h2 className="text-l text-zinc-50 bg-slate-800 p-2">{listing.release.title}</h2>
          <p>{listing.release.artist}</p>
          <a href={listing.uri} target="_blank" rel="noopener noreferrer">
            Buy on Discogs
          </a>
          <a href={listing.uri} target="_blank" rel="noopener noreferrer">
            Reserve for Pickup at the shop
          </a>
        </div>
      ))}
    </div>
  );
};
