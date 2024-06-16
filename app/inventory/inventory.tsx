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
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-start">
      {data.listings.map((listing: Listing) => (
        <article key={listing.release.title} className="flex justify-start w-full">
          <Card className={cn("p-0 shadow-none w-full overflow-hidden")}>
            <div className="justify-items-start">
              <CardHeader className="flex-1 p-0">
                <img
                  className="w-full h-auto min-w-[193px]"
                  src={listing.release.images[0].uri}
                  alt={listing.release.title}
                />
              </CardHeader>
              <CardContent className="flex-1 pt-4">
                <CardTitle className="text-xl">{listing.release.title}</CardTitle>
                <CardDescription className="leading-6">
                  <strong>Artist:</strong> {listing.release.artist}
                  <br />
                  <strong>Label:</strong> {listing.release.label} - {listing.release.catalog_number}
                  <br />
                  <strong>Released:</strong> {listing.release.year}
                  <br />
                  <strong>Price:</strong> {listing.original_price.formatted}
                </CardDescription>
                <CardDescription className="leading-6">
                  <a
                    href={listing.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="🤔 or come into the store save on shipping"
                    className="text-sm text-black-600 border-2 border-black-600 hover:border-black hover:text-color-black rounded-md p-2 mt-2 block"
                  >
                    Buy on Discogs
                  </a>
                  <span className="flex mt-4">
                    <span className="flex">
                      <a
                        href={`https://music.youtube.com/search?q=${listing.release.title} ${listing.release.artist}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-gray-700 grid grid-cols-2 leading-4"
                      >
                        <span className="mr-2">Demo</span>
                        <span>
                          {" "}
                          <img src={"./icon-youtube.svg"} alt="YouTube" width={16} height={16} />
                        </span>
                      </a>
                    </span>
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
