import { fetchNavData, fetchPageData } from "~/cms/contentful/useContentful";

export const getPage = async (pageId: string, locale?: string) => {
  const navData = await fetchNavData();
  const pageData = await fetchPageData(pageId, locale);

  return {
    nav: navData,
    page: pageData,
  };
};
