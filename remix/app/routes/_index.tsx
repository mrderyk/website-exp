import { Button } from "@mantine/core";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { getHomepage } from "./$pageId";
import i18next from "~/i18next.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => [
  { title: "Vectara  – The Trusted GenAI Platform for All Builders" },
];

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);

  return json({
    locale,
  });
};

export default function Index() {
  const homepageContent = getHomepage();
  return <div>{homepageContent}</div>;
}
