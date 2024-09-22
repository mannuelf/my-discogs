import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Footer } from "~/components/Footer";
import { PaginationBar } from "~/components/PaginationBar";
import { StatusAlert } from "~/components/StatusAlert";
import { fetchUserInventory } from "~/inventory";
import { Inventory } from "~/inventory/inventory";
import { InventoryFetchResponse } from "~/inventory/inventory.types";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const pageNumber = searchParams.get("page") || "1";

  try {
    const data = await fetchUserInventory(
      pageNumber,
      "12",
      process.env.SELLER_USERNAME,
      "for sale",
      "listed",
      "desc",
    );

    return json({ inventory: data, ENV: { sellerUsername: process.env.SELLER_USERNAME } });
  } catch (error) {
    console.log("Error fetching inventory:", error);
    return json({ error: "Failed to load inventory. Please try again later or" }, { status: 500 });
  }
};

export const Meta: MetaFunction = () => {
  const { ENV } = useLoaderData<typeof loader>();
  return [
    {
      title: `Shop ${ENV.sellerUsername} records`,
    },
    {
      name: "description",
      content: `Buy some vinyl records from ${ENV.sellerUsername}`,
    },
  ];
};

export default function Index() {
  const { inventory, error } = useLoaderData<typeof loader>() as {
    inventory: InventoryFetchResponse;
    error: Error;
  };

  if (error) {
    <StatusAlert error={error} />;
  }

  if (!inventory) {
    return <div>No inventory data available.</div>;
  }

  return (
    <>
      <Inventory {...inventory} />
      <PaginationBar total={inventory.pagination.pages} />
      <Footer />
    </>
  );
}
