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

export const Inventory = async (data: InventoryFetchResponse): Promise<React.ReactElement> => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {data
        ? data.listings.map((listing: Listing) => (
            <div key={listing.id} className="bg-cover bg-center flex flex-col justify-end">
              <Card className={cn("w-[auto]")}>
                <div className="flex">
                  <CardHeader className="flex-1 p-0">
                    <img src={listing.release.thumbnail} alt={listing.release.title} />
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardTitle className="text-xl">{listing.release.title}</CardTitle>
                    <CardDescription>{listing.release.artist}</CardDescription>
                  </CardContent>
                </div>
                <CardFooter>
                  <a href={listing.uri} target="_blank" rel="noopener noreferrer">
                    Buy on Discogs
                  </a>
                  <a href={listing.uri} target="_blank" rel="noopener noreferrer">
                    Reserve for Pickup at the shop
                  </a>
                </CardFooter>
              </Card>
            </div>
          ))
        : null}
    </div>
  );
};
