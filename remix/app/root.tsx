import { cssBundleHref } from "@remix-run/css-bundle";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import styles from "./cms/contentful/styles.css";
import i18next from "~/i18next.server";
import { createContext } from "react";
import { useContext, useState } from "react";
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

// This might actually only work when deployed. I'll figure this out.
/*export async function loader({ request }: LoaderFunctionArgs) {
  let locale = await i18next.getLocale(request);
  return json({ locale });
}*/

export default function App() {
  //let { locale } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body className="h-full" style={{ border: "1px solid gold" }}>
        <MantineProvider>
          <LocaleProvider>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </LocaleProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

// Temporary context to test CMS translations

export const LocaleContext = createContext({
  locale: "en",
  setLocale: (locale: string) => {},
});

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<string>("en");

  const value = {
    locale,
    setLocale,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};
