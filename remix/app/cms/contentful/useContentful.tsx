import contentful, { createClient } from "contentful";
import { ContentCardData, ImageType } from "./types";

const client = createClient({
  accessToken: "S4pKrBdF11eLvk59LunlYFjSe9mdqpwSmRscuLUDqvQ",
  space: "70lx0hlbgvje",
  host: "cdn.contentful.com",
});

export type BannerData = {
  fields: {
    title: string;
    subHeaders: string[];
    textContents: string[];
  };
};

export type PageDataRaw = {
  contentTypeId: "page";
  fields: {
    name: contentful.EntryFieldTypes.Text;
    banner: contentful.Entry;
    contentCards: contentful.Entry[];
  };
};

export type PageData = {
  name: string;
  bannerData: BannerData;
  contentCardDatas: ContentCardData[];
};

type NavDataRaw = {
  contentTypeId: "navigation";
  fields: {
    sections: NavSection[];
    pages?: PageDataRaw[];
  };
};

type NavSection = {
  contentTypeId: "navigationSection";
  fields: {
    name: contentful.EntryFieldTypes.Text;
    pages?: PageDataRaw[];
  };
};

export type NavData = {
  sections: {
    name: string;
    pages?: {
      id: string;
      title: string;
      slug: string;
    }[];
  }[];
};

export const fetchNavData = async (): Promise<NavData | null> => {
  const navigation = await client.getEntries<NavDataRaw>({
    content_type: "navigation",
  });

  const sectionNameToPageIds: Record<string, string[]> = {};

  (navigation.items[0].fields.sections as NavSection[]).forEach((section) => {
    console.log("### SECTION: ", section);

    if (!sectionNameToPageIds[`${section.fields.name}`]) {
      sectionNameToPageIds[`${section.fields.name}`] = [];
    }
    sectionNameToPageIds[`${section.fields.name}`].push(
      ...(section.fields.pages?.map((page) => (page as any).sys.id as string) ??
        []),
    );
  });

  const pageIds: string[] = [];
  Object.values(sectionNameToPageIds).map((val) => pageIds.push(...val));

  const pageEntries =
    (await client.getEntries({
      "sys.id[in]": pageIds,
    })) ?? undefined;

  const pages = pageEntries.items.map((pageEntry) => {
    return {
      id: pageEntry.sys.id,
      slug: pageEntry.fields.name,
      title: pageEntry.fields.title,
    };
  });

  const res = {
    sections: (
      navigation.items[0].fields.sections as {
        fields: {
          name: string;
        };
      }[]
    ).map((section) => {
      return {
        name: section.fields.name,
        pages: sectionNameToPageIds[section.fields.name].map((id) => {
          return pages.find((page) => page.id === id);
        }),
      };
    }),
  };

  console.log("### RES: ", res);

  return res as NavData;
};

export const fetchPageData = async (
  pageId: string,
  locale: string = "en",
): Promise<PageData | null> => {
  const page = await client.getEntries<PageDataRaw>({
    content_type: "page",
    "fields.name": pageId,
    locale,
  });

  if (page.items.length === 0) {
    return null;
  }

  const bannerData = page.items[0]?.fields.banner;

  const contentCardEntries =
    (page.items[0].fields.contentCards as contentful.Entry[]) ?? [];

  const contentCardEntryIds = contentCardEntries.map(
    (contentCardEntry) => contentCardEntry.sys.id,
  );

  const contentCards =
    (await client.getEntries({
      "sys.id[in]": contentCardEntryIds,
      locale,
    })) ?? [];

  const items = contentCards.items ?? [];
  const contentCardDatas: ContentCardData[] = [];

  items.forEach((item) => {
    const fields = item.fields;
    const ctas =
      (
        fields.ctas as {
          text: string;
          link: string;
        }[]
      )?.map((cta) => ({
        text: cta.text,
        link: cta.link,
      })) ?? [];

    const contentCardData = {
      imagePlacement: fields.imagePlacement,
      contentData: fields.content,
      contentHeader: fields.contentHeader,
      image: (fields.image as ImageType)?.fields,
      imageTitle: fields.imageTitle,
      ctas,
      backgroundColor: fields.backgroundColor,
    };

    const orderIndex = contentCardEntryIds.indexOf(item.sys.id);
    contentCardDatas[orderIndex] = contentCardData as ContentCardData;
  });

  return {
    name: page.items[0].fields.name,
    bannerData,
    contentCardDatas,
  };
};
