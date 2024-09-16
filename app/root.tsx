import { SerializeFrom } from "@remix-run/node";
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
import { useEffect } from "react";
import { pageview } from "./lib/gtags.client";
import "./tailwind.css";

export async function loader() {
  return json({
    ENV: {
      gaTrackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
      nodeEnv: process.env.NODE_ENV,
      sellerUsername: process.env.SELLER_USERNAME,
    },
  });
}

declare global {
  interface Window {
    ENV: SerializeFrom<typeof loader>["ENV"];
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { ENV } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (typeof window !== "undefined" && ENV.gaTrackingId?.length) {
      pageview(location.pathname, ENV.gaTrackingId);
    }
  }, [ENV.gaTrackingId]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {ENV.nodeEnv === "development" || !ENV.gaTrackingId ? null : (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ENV.gaTrackingId}`} />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', '${ENV.gaTrackingId}', {
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
