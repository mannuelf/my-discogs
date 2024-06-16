import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Footer } from "~/components/footer";
import { PaginationBar } from "~/components/paginationBar";
import { fetchUserInventory } from "~/inventory";
import { Inventory } from "~/inventory/inventory";
import type { InventoryFetchResponse } from "~/inventory/inventory.types";

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const pageNumber = searchParams.get("page") || "1";

  const data = await fetchUserInventory(
    pageNumber,
    "12",
    process.env.SELLER_USERNAME,
    "for sale",
    "listed",
    "desc",
  );
  return data;
};

export const meta: MetaFunction = () => {
  return [{ title: "Shop records" }, { name: "description", content: "Buy some records" }];
};

export default function Index() {
  const data: InventoryFetchResponse = useLoaderData();
  // console.log("🚀 ~ Index ~ data:", data);

  return (
    <>
      <PaginationBar total={data.pagination.pages} />
      <Inventory {...data} />
      <PaginationBar total={data.pagination.pages} />
      <Footer />
    </>
  );
}
