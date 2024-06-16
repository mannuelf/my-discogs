import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import "dotenv/config";
import { useEffect } from "react";
import { pageview } from "./lib/gtags.client";
import "./tailwind.css";

export async function loader() {
  return json({ gaTrackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const error = useRouteError();
  const { gaTrackingId } = useLoaderData<typeof loader>();

  console.error(error);

  useEffect(() => {
    if (typeof window !== "undefined" && gaTrackingId?.length) {
      pageview(location.pathname, gaTrackingId);
    }
  }, [gaTrackingId]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', '${gaTrackingId}', {
                        page_path: window.location.pathname,
                      });
                    `,
              }}
            />
          </>
        )}
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
