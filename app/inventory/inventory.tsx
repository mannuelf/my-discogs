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
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-start">
      {data.listings.map((listing: Listing) => (
        <article key={listing.release.title} className="flex justify-start">
          <Card className={cn("p-2 shadow-none w-full overflow-hidden")}>
            <div className="flex justify-items-start">
              <CardHeader className="flex-1 p-0">
                <img
                  className="w-full h-auto min-w-[193px]"
                  src={listing.release.thumbnail}
                  alt={listing.release.title}
                />
              </CardHeader>
              <CardContent className="flex-1">
                <CardTitle className="text-xl">{listing.release.title}</CardTitle>
                <CardDescription>
                  <strong>Artist:</strong> {listing.release.artist}
                  <br />
                  <strong>Label:</strong> {listing.release.label} - {listing.release.catalog_number}
                  <br />
                  <strong>Released:</strong> {listing.release.year}
                  <hr />
                  <strong>Price:</strong> {listing.original_price.formatted}
                  <hr />
                  <a
                    href={listing.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="🤔 or come into the store save on shipping"
                    className="text-lg text-blue-500"
                  >
                    Buy on Discogs
                  </a>
                  <br className="p-4" />
                  <strong>Listen:</strong>
                  <div className="flex">
                    <span className="grid grid-cols-3 gap-4	p-2 text-xs font-light text-white rounded-br-lg">
                      <a
                        href={`https://music.youtube.com/search?q=${listing.release.artist} ${listing.release.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mr-2"
                      >
                        <img src={"./icon-youtube.svg"} alt="YouTube" width={20} height={20} />
                      </a>
                      <a
                        href={`https://music.apple.com/us/search?term=${listing.release.artist} ${listing.release.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mr-2"
                      >
                        <img src={"./icon-apple.svg"} alt="Apple Music" width={20} height={20} />
                      </a>
                      <a
                        href={`https://www.deezer.com/search/${listing.release.artist} ${listing.release.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mr-2"
                      >
                        <img src={"./icon-deezer.svg"} alt="Deezer" width={20} height={20} />
                      </a>
                      <a
                        href={`https://open.spotify.com/search/${listing.release.artist} ${listing.release.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mr-2"
                      >
                        <img src={"./icon-spotify.svg"} alt="Spotify" width={20} height={20} />
                      </a>
                      <a
                        href={`https://listen.tidal.com/search?q=${listing.release.artist} ${listing.release.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mr-2"
                      >
                        <img src={"./icon-tidal.svg"} alt="TIDAL" width={20} height={20} />
                      </a>
                    </span>
                  </div>
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
