import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import type { InventoryFetchResponse, Listing } from "./inventory.types";

export const Inventory = (data: InventoryFetchResponse): React.ReactElement => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 justify-items-start pb-40">
      {data.listings.map((listing: Listing) => (
        <article
          id={listing.release.title}
          key={listing.release.title}
          className="flex justify-start w-full"
        >
          <Card className={cn("p-0 shadow-none w-full overflow-hidden")}>
            <div className="justify-items-start">
              <CardHeader
                className="flex-1 h-40 sm:h-60 md:h-90 lg:h-100 p-0 relative"
                title={listing.release.title}
                style={{
                  backgroundImage: listing.release.images[0]
                    ? `url(${listing.release.images[0].uri})`
                    : "",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {listing.condition ?? listing.condition}
              </CardHeader>
              <CardContent className="flex-1 pt-4">
                <CardTitle className="text-sm">{listing.release.title}</CardTitle>
                <CardDescription className="leading-6 text-black">
                  <strong>Artist:</strong> {listing.release.artist}
                  <br />
                  <strong>Label:</strong> {listing.release.label} - {listing.release.catalog_number}
                  <br />
                  <strong>Released:</strong> {listing.release.year}
                  <br />
                  <strong>Price:</strong> {listing.original_price.formatted}
                </CardDescription>
                <CardDescription className="leading-6">
                  <span className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <a
                      href={listing.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white border-0 border-black-600 bg-black hover:text-color-black rounded-md p-2 mt-2 "
                    >
                      View on Discogs
                    </a>
                    <a
                      href={`https://music.youtube.com/search?q=${encodeURIComponent(
                        listing.release.title,
                      )} ${encodeURIComponent(listing.release.artist)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-start text-xs text-white border-0 border-black-600 bg-black hover:text-color-black rounded-md p-2 mt-2"
                    >
                      <span className="w-[24px] mt-[2px]">
                        <img src={"./icon-youtube.svg"} alt="YouTube" width={16} height={16} />
                      </span>
                      <span>Listen</span>
                    </a>
                  </span>
                </CardDescription>
              </CardContent>
            </div>
            <CardFooter className="p-0"></CardFooter>
          </Card>
        </article>
      ))}
    </section>
  );
};
