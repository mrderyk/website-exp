export const Button = ({ children }: { children: React.ReactNode }) => {
  return <div style={buttonStyles}>{children}</div>;
};

const buttonStyles = {
  borderRadius: "28px",
  color: "#6900ff",
  border: "2px solid #6900ff",
  fontSize: "16px",
  padding: "18px 39px",
  display: "inline-block",
  cursor: "crab",
};
