import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, MARKS } from "@contentful/rich-text-types";
import { Box, Button, Table, Text } from "@mantine/core";
import { ContentPane } from "~/components/ContentPane";
import { ContentCardData } from "./types";

export const renderContentCardFromData = (
  data: ContentCardData,
): React.ReactNode => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: React.ReactNode) => {
        return (
          <img
            width="80%"
            height="auto"
            src={node.data.target.fields.file.url}
          />
        );
      },
      [BLOCKS.TABLE]: (node: any, children: React.ReactNode) => (
        <CustomTable>{children}</CustomTable>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <CustomP>{children}</CustomP>
      ),
    },
  };

  const { contentData } = data;

  const content = documentToReactComponents(contentData, options);

  const ctas =
    data.ctas?.map((cta) => {
      return (
        <Button m="4px 0" color="gray" component="a" href={cta.link}>
          {cta.text}
        </Button>
      );
    }) ?? [];

  return (
    <>
      <ContentPane
        imagePlacement={data.imagePlacement}
        imgUrl={data.image?.file?.url ?? ""}
        title={data.contentHeader}
        background={data.backgroundColor as "blue" | "white"}
        text={[content, ctas]}
      />
    </>
  );
};

const CustomTable = ({ children }: { children: React.ReactNode }) => (
  <Table className="customTable">{children}</Table>
);

const CustomP = ({ children }: { children: React.ReactNode }) => (
  <Box style={{ paddingRight: "8px" }}>
    <Text size="14px" lh="20px">
      {children}
    </Text>
  </Box>
);
