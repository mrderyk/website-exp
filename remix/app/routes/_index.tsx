import type { MetaFunction } from "@remix-run/node";
import { HomePageBanner } from "~/components/Banner";
import { Page } from "~/components/Page";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [
  { title: "Vectara  – The Trusted GenAI Platform for All Builders" },
];

export default function Index() {
  //const user = useOptionalUser();
  return (
    <Page>
      <HomePageBanner />
      <ContentPane
        imagePlacement="left"
        imgUrl="img/vectara-boomerang-event.jpeg"
        title="Meet Boomerang!"
        background="blue"
        text={
          <div>
            <p>
              Our SOLD OUT Boomerang event was a success. The LIVE STREAM
              recording is now available ON DEMAND where you’ll:
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "16px" }}>
              <li>
                Hear industry perspectives from thought leaders, including
                🎙️Vectara’s GenAI vision
              </li>
              <li>
                Discover how Vectara’s Boomerang 🪃 Retrieval Model reduces
                hallucinations
              </li>
              <li>
                Explore how we can co-build ⚒️ the art of possible in the GenAI
                Ecosystem together
              </li>
            </ul>
          </div>
        }
      />
    </Page>
  );
}

interface ContentPaneProps {
  imagePlacement: "left" | "right";
  imgUrl: string;
  title: string;
  text: string | React.ReactNode;
  background?: "blue" | "white";
}

export const ContentPane = ({
  imagePlacement,
  imgUrl,
  title,
  text,
  background = "white",
}: ContentPaneProps) => {
  const backgroundToHex = {
    blue: "#264cd6",
    white: "#ffffff",
  };
  return (
    <div
      style={{ ...contentPaneStyles, background: backgroundToHex[background] }}
    >
      {imagePlacement === "left" && (
        <div style={imageContainerStyles}>
          <img style={imageStyles} src={imgUrl} />
        </div>
      )}
      <div style={contentPaneTextContainerStyles}>
        <div style={titleStyles}>{title}</div>
        <div style={textContentStyles}>{text}</div>
      </div>
    </div>
  );
};

const contentPaneStyles = {
  display: "flex",
  padding: "60px 24px",
  marginTop: "40px",
  gap: "24px",
  color: "#ffffff",
};

const imageContainerStyles = {
  display: "flex",
  justifyContent: "center",
  width: "50%",
  height: "100%",
};

const titleStyles = {
  lineHeight: "50px",
  fontWeight: 500,
  fontSize: "42px",
  marginBottom: "24px",
};

const textContentStyles = {
  fontSize: "18px",
  lineHeight: "29px",
  fontWeight: 300,
};

const imageStyles = {
  borderRadius: "15px",
  width: "90%",
};

const contentPaneTextContainerStyles = {
  width: "50%",
};
