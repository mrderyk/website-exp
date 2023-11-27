import { Button } from "../Button";

// TODO: Pull content image and text from CMS.
export const HomePageBanner = () => {
  return (
    <div style={homePageBannerStyles}>
      <div style={bannerTextStyles}>
        The Trusted GenAI Platform for All Builders.
      </div>
      <div style={bannerSubTextStyles}>
        Create ChatGPT-like experiences on your data.
      </div>
      <div style={bannerSubTextStyles}>
        Grounded Generation mitigates hallucinations, bias, & copyright
        infringement.
      </div>
      <div style={{ ...bannerSubTextStyles, fontWeight: 700 }}>
        GenAI is finally ready for business.
      </div>

      <div style={bannerFooterStyles}>
        <Button>Meet Boomerang</Button>
        <Button>Book a Call</Button>
      </div>
    </div>
  );
};

const homePageBannerStyles = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "center",
  padding: "0 24px",
  textAlign: "center" as "center",
};

const bannerTextStyles = {
  margin: "40px 0 72px 0",
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
