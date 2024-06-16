import type { MetaFunction } from "@remix-run/node";
import { Inventory } from "~/inventory/inventory";

export const meta: MetaFunction = () => {
  return [{ title: "Shop records" }, { name: "description", content: "Buy records" }];
};

export default function Index() {
  return (
    <>
      <Inventory />
    </>
  );
}
