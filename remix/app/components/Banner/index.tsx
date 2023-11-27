import { Button } from "../Button";
import { Text } from "@mantine/core";

interface BannerProps {
  title: string;
  subHeaders: string[];
  textContents: string[];
}

export const Banner = ({ title, subHeaders, textContents }: BannerProps) => {
  return (
    <div style={bannerStyles}>
      <div style={bannerTextStyles}>{title}</div>
      {subHeaders?.map((subHeader) => <SubHeader>{subHeader}</SubHeader>)}
      {textContents?.map((textContent) => (
        <div style={bannerSubTextStyles}>{textContent}</div>
      ))}
    </div>
  );
};

const SubHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text size="30px" m="20px 0 40px 0" fw={500}>
      {children}
    </Text>
  );
};

const bannerStyles = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "center",
  padding: "50px 24px 24px 24px",
  textAlign: "center" as "center",
  boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.46)",
  borderRadius: "8px",
};

const bannerTextStyles = {
  margin: "40px 0",
  fontSize: "96px",
  lineHeight: "106px",
};

const bannerSubTextStyles = {
  fontSize: "24px",
  lineHeight: "34px",
  color: "#2c313a",
};

const bannerFooterStyles = {
  fontSize: "24px",
  color: "#2c313a",
  marginTop: "50px",
  display: "flex",
  gap: "24px",
  justifyContent: "center",
};
