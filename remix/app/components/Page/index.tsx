import { createStyles } from "@mantine/styles";
import { AppShell, Box, Burger, Button, Flex, Menu, Text } from "@mantine/core";
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
  },

  shell: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },

  header: {},
}));

type NavSection = {
  name: string;
  pages?: {
    id: string;
    title: string;
    slug: string;
  }[];
};

export const Page = ({
  navSections,
  children,
}: {
  navSections: NavSection[];
  children: React.ReactNode;
}) => {
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
      className={classes.shell}
    >
      <AppShell.Header className={classes.header}>
        <HeaderContent>
          <Flex align="center" h="100%" w="100%" p={{ xs: "8px", sm: "16px" }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Logo />

            <Box style={{ flexGrow: 1 }}>
              <Navigation sections={navSections} />
            </Box>

            <Onboarding />
          </Flex>

          {announcement && <Announcement text={announcement} />}
        </HeaderContent>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ marginTop: "-1px" }}>
        <MobileNavigation sections={navSections} />
      </AppShell.Navbar>

      <AppShell.Main className={classes.container}>{children}</AppShell.Main>
    </AppShell>
  );
};

const Logo = () => (
  <Box ml={{ xs: "4px", sm: "8px" }}>
    <a id="logo" href="https://vectara.com">
      <img
        alt="Vectara"
        src="https://vectara.com/wp-content/uploads/2023/07/vectara-color-logo.svg"
        style={{ width: "100%", height: "auto" }}
      ></img>
    </a>
  </Box>
);

const HeaderContent = ({ children }: { children: React.ReactNode }) => {
  return <Box h="100%">{children}</Box>;
};

const Navigation = ({ sections }: { sections: NavSection[] }) => (
  <Flex
    align="center"
    h="100%"
    visibleFrom="sm"
    gap="2px"
    style={{ flexGrow: 1 }}
    justify="space-evenly"
    p="0 4px"
  >
    <NavigationContents2 sections={sections} />
  </Flex>
);

const MobileNavigation = ({ sections }: { sections: NavSection[] }) => (
  <Flex direction="column" justify="left">
    <NavigationContents />
  </Flex>
);

const NavigationContents2 = ({ sections }: { sections: NavSection[] }) => {
  return (
    <>
      {sections.map((section) => (
        <Menu openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Button
              size="sm"
              variant="transparent"
              color="black"
              p="4px 6px"
              justify="left"
            >
              <Text size="sm">{section.name}</Text>
            </Button>
          </Menu.Target>

          <Menu.Dropdown w="100%" pt="16px" pb="16px">
            <Flex justify="space-evenly">
              <Box>
                {section.pages?.map((page) => (
                  <Menu.Item component="a" href={page.slug}>
                    <Text size="sm">{page.title}</Text>
                  </Menu.Item>
                ))}
              </Box>
            </Flex>
          </Menu.Dropdown>
        </Menu>
      ))}

      {/*
      <Menu openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            size="sm"
            variant="transparent"
            color="black"
            p="4px 6px"
            justify="left"
          >
            <Text size="sm">Solutions</Text>
          </Button>
        </Menu.Target>
      </Menu>

      <Menu openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            size="sm"
            variant="transparent"
            color="black"
            p="4px 6px"
            justify="left"
          >
            <Text size="sm">Pricing</Text>
          </Button>
        </Menu.Target>
      </Menu>

      <Menu openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            size="sm"
            variant="transparent"
            color="black"
            p="4px 6px"
            justify="left"
          >
            <Text size="sm">Developers</Text>
          </Button>
        </Menu.Target>
      </Menu>

      <Menu openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            size="sm"
            variant="transparent"
            color="black"
            p="4px 6px"
            justify="left"
          >
            <Text size="sm">Resources</Text>
          </Button>
        </Menu.Target>
      </Menu>

      <Menu openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            size="sm"
            variant="transparent"
            color="black"
            p="4px 6px"
            justify="left"
          >
            <Text size="sm">Company</Text>
          </Button>
        </Menu.Target>
      </Menu>
      */}
    </>
  );
};

const NavigationContents = () => (
  <>
    <Menu openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button
          size="sm"
          variant="transparent"
          color="black"
          p="4px 6px"
          justify="left"
        >
          <Text size="sm">Platform</Text>
        </Button>
      </Menu.Target>

      <Menu.Dropdown w="100%" pt="16px" pb="16px">
        <Flex justify="space-evenly">
          <Box>
            <Menu.Label>
              <Text size="xs" fw={700}>
                Search That Understands & Responds
              </Text>
            </Menu.Label>
            <Menu.Item>
              <Text size="sm">What is Vectara?</Text>
              <Text size="xs" c="gray">
                Modern LLM-powered search platform
              </Text>
            </Menu.Item>
            <Menu.Item>
              <Text size="sm">Why Vectara?</Text>
              <Text size="xs" c="gray">
                Affordable & fast AI at your fingertips
              </Text>
            </Menu.Item>
            <Menu.Item>
              <Text size="sm">Grounded Generation</Text>
              <Text size="xs" c="gray">
                Best-in-class retrieval, summaries, and more
              </Text>
            </Menu.Item>
          </Box>

          <Box>
            <Menu.Label>
              <Text size="xs" fw={700}>
                Capabilities & Benefits
              </Text>
            </Menu.Label>
            <Menu.Item>
              <Text size="sm">Breakthrough Relevance</Text>
              <Text size="xs" c="gray">
                Search that learns as it does
              </Text>
            </Menu.Item>
            <Menu.Item>
              <Text size="sm">API-First</Text>
              <Text size="xs" c="gray">
                Flexible search for any application
              </Text>
            </Menu.Item>
            <Menu.Item>
              <Text size="sm">Retrieval-Augmented Generation</Text>
              <Text size="xs" c="gray">
                Ensures that generated content is verifiable
              </Text>
            </Menu.Item>
          </Box>

          <Box pt="28.8px">
            <Menu.Item>
              <Text size="sm">Language Agnostic</Text>
              <Text size="xs" c="gray">
                Search across many languages
              </Text>
            </Menu.Item>
            <Menu.Item>
              <Text size="sm">Secure & Reliable</Text>
              <Text size="xs" c="gray">
                Secure & available search-as-a-service
              </Text>
            </Menu.Item>
          </Box>
        </Flex>
      </Menu.Dropdown>
    </Menu>

    <Menu openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button
          size="sm"
          variant="transparent"
          color="black"
          p="4px 6px"
          justify="left"
        >
          <Text size="sm">Solutions</Text>
        </Button>
      </Menu.Target>
    </Menu>

    <Menu openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button
          size="sm"
          variant="transparent"
          color="black"
          p="4px 6px"
          justify="left"
        >
          <Text size="sm">Pricing</Text>
        </Button>
      </Menu.Target>
    </Menu>

    <Menu openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button
          size="sm"
          variant="transparent"
          color="black"
          p="4px 6px"
          justify="left"
        >
          <Text size="sm">Developers</Text>
        </Button>
      </Menu.Target>
    </Menu>

    <Menu openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button
          size="sm"
          variant="transparent"
          color="black"
          p="4px 6px"
          justify="left"
        >
          <Text size="sm">Resources</Text>
        </Button>
      </Menu.Target>
    </Menu>

    <Menu openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button
          size="sm"
          variant="transparent"
          color="black"
          p="4px 6px"
          justify="left"
        >
          <Text size="sm">Company</Text>
        </Button>
      </Menu.Target>
    </Menu>
  </>
);

const Onboarding = () => (
  <Flex
    gap="16px"
    justify={{ base: "flex-end", md: "flex-start" }}
    mr={{ base: "8px", md: 0 }}
  >
    <Button
      component="a"
      color="green"
      href="https://console.vectara.com"
      p="6px"
    >
      <Text size="sm" fw={700}>
        Log In
      </Text>
    </Button>
    <Button component="a" href="https://console.vectara.com/signup" p="6px">
      <Text size="sm" fw={700}>
        Get Started Free
      </Text>
    </Button>
  </Flex>
);
