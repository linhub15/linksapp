import { useLocation } from "@tanstack/react-router";

import { SidebarLayout } from "../ui/sidebar-layout.tsx";
import { Navbar, NavbarSection, NavbarSpacer } from "../ui/navbar.tsx";
import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "../ui/sidebar.tsx";
import type { PropsWithChildren } from "react";
import { UserMenu } from "./user_menu.tsx";

export function AppLayout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>Mobile View</NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <SidebarLabel className="mt-3">Links App</SidebarLabel>
              <SidebarDivider />
              <SidebarItem
                to="/pages"
                current={pathname === "/" || pathname.startsWith("/pages")}
              >
                <SidebarLabel>Pages</SidebarLabel>
              </SidebarItem>
              <SidebarItem to="/forms" current={pathname.startsWith("/forms")}>
                <SidebarLabel>Forms</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                to="/about"
                current={pathname.startsWith("/about")}
              >
                <SidebarLabel>About</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            <div className="flex-1" />
            <SidebarSection>
              <UserMenu />
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
