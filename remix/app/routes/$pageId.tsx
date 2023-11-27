import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPage } from "~/models/page.server";
import {
  fetchNavData,
  fetchPageData,
  NavData,
  PageData,
} from "../cms/contentful/useContentful";
import { Page } from "~/components/Page";
import { renderContentCardFromData } from "~/cms/contentful/renderers";
import { Banner } from "~/components/Banner";
import { useContext, useEffect, useState } from "react";
import i18next from "~/i18next.server";
import { LocaleContext } from "~/root";
import { Flex, Switch, Text } from "@mantine/core";

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.pageId) {
    return;
  }

  return json({
    pageData: await getPage(params.pageId, "en"),
  });
};

type LoaderData = {
  pageData: {
    nav: NavData;
    page: PageData;
  };
};

const renderPage = (
  navData: NavData | null,
  pageData: PageData,
  locale: string,
  setLocale: (locale: string) => void,
): React.ReactNode => {
  const contentCards = (
    <>
      {pageData
        ? pageData.contentCardDatas.map((contentCardData) =>
            renderContentCardFromData(contentCardData),
          )
        : null}
    </>
  );

  return (
    <Page navSections={navData?.sections ?? []}>
      {pageData?.bannerData && (
        <Banner
          title={pageData ? pageData.bannerData?.fields.title : ""}
          subHeaders={pageData ? pageData.bannerData?.fields.subHeaders : []}
          textContents={
            pageData ? pageData.bannerData?.fields.textContents : []
          }
        />
      )}

      {contentCards}
      <Flex
        pos="fixed"
        right={0}
        bottom={0}
        p="8px"
        m="8px"
        bg="pink"
        align="center"
        style={{ borderRadius: "16px" }}
      >
        <Text mr="4px" fw="700" size="12px" c="white">
          LANGUAGE:
        </Text>
        <Switch onChange={() => setLocale(locale === "en" ? "fil" : "en")} />
        <Text ml="8px" fw="700" size="12px" c="white">
          {locale}
        </Text>
      </Flex>
    </Page>
  );
};

export const getHomepage = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [navDatas, setNavDatas] = useState<NavData | null>(null);
  const { locale, setLocale } = useContext(LocaleContext);

  useEffect(() => {
    const loadHomePageData = async () => {
      const res = await fetchPageData("homepage", locale);
      const navDatas = await fetchNavData();
      setPageData(res);
      setNavDatas(navDatas);
    };

    loadHomePageData();
  }, [locale]);

  console.log("### navDatas: ", navDatas);
  return pageData ? renderPage(navDatas, pageData, locale, setLocale) : null;
};

export default function PostSlug() {
  const { pageData } = useLoaderData() as LoaderData;
  return renderPage(pageData.nav, pageData.page, "en", () => {});
}
