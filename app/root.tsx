import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import "dotenv/config";
import { useEffect } from "react";
import { pageview } from "./lib/gtags.client";
import "./tailwind.css";

export async function loader() {
  return json({ gaTrackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const gaTrackingId = data?.gaTrackingId || "";

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
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
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
        <main className="w-full mx-auto relative">
          {children}
          <ScrollRestoration />
          <Scripts />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
