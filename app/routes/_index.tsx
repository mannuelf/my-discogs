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
  return [
    { title: `Shop ${process.env.SELLER_USERNAME ?? process.env.SELLER_USERNAME} records` },
    {
      name: "description",
      content: `Buy some vinyl records from ${
        process.env.SELLER_USERNAME ?? process.env.SELLER_USERNAME
      }`,
    },
  ];
};

export default function Index() {
  const data: InventoryFetchResponse = useLoaderData();

  return (
    <>
      <Inventory {...data} />
      <section className="fixed mb-0 bottom-10 left-0 right-0 flex justify-center items-center">
        <PaginationBar total={data.pagination.pages} />
      </section>
      <Footer />
    </>
  );
}
