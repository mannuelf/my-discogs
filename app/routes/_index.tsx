import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Footer } from "~/components/footer";
import { PaginationBar } from "~/components/paginationBar";
import { fetchUserInventory } from "~/inventory";
import { Inventory } from "~/inventory/inventory";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { TerminalIcon } from "~/components/TerminalIcon";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Shop ${
        process.env.SELLER_USERNAME ?? process.env.SELLER_USERNAME
      } records`,
    },
    {
      name: "description",
      content: `Buy some vinyl records from ${
        process.env.SELLER_USERNAME ?? process.env.SELLER_USERNAME
      }`,
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
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

    console.log(data);

    return json({ inventory: data });
  } catch (error) {
    console.log("Error fetching inventory:", error);
    return json(
      { error: "Failed to load inventory. Please try again later or" },
      { status: 500 },
    );
  }
};

export default function Index() {
  const { inventory, error } = useLoaderData<typeof loader>();

  if (error) {
    return (
      <div>
        <Alert>
          <TerminalIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Error: {error} Check the Discogs{" "}
            <a
              href="https://status.discogs.com/posts/dashboard"
              className="text-color-red"
            >
              Api status page here
            </a>{" "}
            if the problem persists.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!inventory || !inventory.pagination) {
    return <div>No inventory data available.</div>;
  }

  return (
    <>
      <Inventory {...inventory} />
      <section className="fixed mb-0 bottom-10 left-0 right-0 flex justify-center items-center">
        <PaginationBar total={inventory.pagination.pages} />
      </section>
      <Footer />
    </>
  );
}
