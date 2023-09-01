import type { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { SideBar } from "./sidebar";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Navbar />

      <Flex>
        <SideBar />
        <main style={{ width : "100%"}}>{children}</main>
      </Flex>
    </Box>
  );
}
