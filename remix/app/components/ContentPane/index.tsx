import { Box, Flex, Text } from "@mantine/core";

interface ContentPaneProps {
  imagePlacement: "left" | "right" | "top";
  imgUrl: string;
  title?: string;
  imageTitle?: string;
  text: string | React.ReactNode;
  backgroundImage?: string;
  background?: "blue" | "white";
}

/**
 *
 * @param param0
 * @returns
 */
export const ContentPane = ({
  imagePlacement,
  imgUrl,
  title,
  imageTitle,
  text,
  backgroundImage,
  background = "white",
}: ContentPaneProps) => {
  const backgroundToHex = {
    blue: "#264cd6",
    white: "#ffffff",
  };

  const textColor = background === "blue" ? "#ffffff" : "#000000";
  return (
    <Flex
      style={{
        background: backgroundToHex[background],
        borderRadius: "8px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.46)",
      }}
      p="60px 24px"
      mt="40px"
      gap="24px"
      color="#ffffff"
      direction={{
        base: "column",
        md: imagePlacement === "top" ? "column" : "row",
      }}
    >
      {["left", "top"].includes(imagePlacement) && (
        <Flex
          justify="center"
          align="center"
          direction="column"
          w={{ base: "100%", md: imagePlacement === "top" ? "100%" : "50%" }}
        >
          <Text lh="50px" fw={500} size="50px">
            {imageTitle}
          </Text>
          <Flex align="center" justify="center" mt={imageTitle ? "36px" : 0}>
            <img width="90%" height="auto" src={imgUrl} />
          </Flex>
        </Flex>
      )}
      <Flex
        w={{ base: "100%", md: imagePlacement === "top" ? "100%" : "50%" }}
        c={textColor}
        justify="center"
      >
        <Box w="90%">
          <Box mb="24px">
            <Text lh="50px" fw={500} size="42px">
              {title}
            </Text>
          </Box>
          <Box>
            <Box lh="29px" style={{ fontSize: "18px" }} fw={300}>
              {text}
            </Box>
          </Box>
        </Box>
      </Flex>
      {imagePlacement === "right" && (
        <Flex justify="center" align="center" w={{ base: "100%", md: "50%" }}>
          <img width="90%" height="auto" src={imgUrl} />
        </Flex>
      )}
    </Flex>
  );
};
