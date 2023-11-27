import { Document } from "@contentful/rich-text-types";
import contentful, { AssetFields } from "contentful";

export interface ImageType extends Object {
  fields: AssetFields;
}
export type ContentCardDataRawFields = {
  imageTitle: contentful.EntryFieldTypes.Text;
  contentHeader: contentful.EntryFieldTypes.Text;
  content: Document;
  imagePlacement: contentful.EntryFieldTypes.Text;
  image: ImageType;
  ctas: { text: string; link: string }[];
  backgroundColor: contentful.EntryFieldTypes.Text;
};

export type CardContent = {
  contentTypeId: "contentCard";
  fields: ContentCardDataRawFields;
};

export type ContentCardData = {
  imagePlacement: "left" | "right" | "top";
  contentData: Document;
  contentHeader: string;
  image: AssetFields;
  imageTitle: contentful.EntryFieldTypes.Text;
  ctas: {
    text: string;
    link: string;
  }[];
  backgroundColor: "blue" | "white";
};

export type ContentCardDataListRaw = {
  contentTypeId: "testList";
  fields: {
    contentDatas: contentful.Entry[];
  };
};
