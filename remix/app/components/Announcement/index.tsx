// TODO: Pull this content from CMS.
export const Announcement = ({ text }: { text: string }) => {
  return (
    <div style={announcementStyles}>
      <div>{text}</div>
    </div>
  );
};

const announcementStyles = {
  backgroundColor: "#ff7c1a",
  padding: "8px",
  fontSize: "18px",
  lineHeight: "30px",
  color: "#000000",
  fontWeight: 700,
  textAlign: "center" as "center",
  width: "100%",
};
