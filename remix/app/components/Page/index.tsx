import { createStyles } from "@mantine/styles";
import { AppShell, Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Announcement } from "../Announcement";

const useStyles = createStyles(() => ({
  container: {
    height: "100%",
    fontSize: "14px",
    lineHeight: "22px",
    color: "black",
    fontWeight: 400,
    margin: 0,
    paddingTop: "46px",
    width: "100%",
    maxWidth: "none",
  },
}));

export const Page = ({ children }: { children: React.ReactNode }) => {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure();

  // TODO: Get this from CMS.
  const announcement =
    "Just Released (11/6): ***As seen in The NY Times *** Vectara’s Open Source “Hallucination Evaluation Model”… Learn More!";
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header mt={announcement ? "46px" : 0}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main className={classes.container}>
        {announcement && <Announcement text={announcement} />}
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
