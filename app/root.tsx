import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import "dotenv/config";
import ReactGA from "react-ga4";
import "./tailwind.css";

if (typeof window !== "undefined") {
  ReactGA.initialize("G-JG2X5QBTD3");
}

export function Layout({ children }: { children: React.ReactNode }) {
  const error = useRouteError();
  console.error(error);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="container relative">
          {children}
          <ScrollRestoration />
          <Scripts />
        </main>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
