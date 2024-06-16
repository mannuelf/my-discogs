import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchUserInventory } from "~/inventory";
import type { InventoryFetchResponse, Listing } from "~/inventory/inventory.types";

export const loader: LoaderFunction = async () => {
  const data = await fetchUserInventory(process.env.SELLER_USERNAME, "for sale", "listed", "desc");
  console.log("🚀 LoaderFunction:", data);
  return data;
};

export const meta: MetaFunction = () => {
  return [{ title: "Shop records" }, { name: "description", content: "Buy records" }];
};

export default function Index() {
  const data: InventoryFetchResponse = useLoaderData();
  console.log("🚀 ~ Index ~ data:", data);

  return (
    <>
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
    </>
  );
}
