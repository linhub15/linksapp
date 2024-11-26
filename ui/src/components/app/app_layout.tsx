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
import { useSignout } from "../../lib/auth/use_signout.ts";
import { useProfile } from "../../lib/auth/use_profile.ts";
import type { PropsWithChildren } from "react";

export function AppLayout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const { data } = useProfile();
  const signout = useSignout();

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
              <SidebarLabel>{data?.profile?.email}</SidebarLabel>
              <SidebarDivider />
              <SidebarItem
                to="/pages"
                current={pathname === "/" || pathname.startsWith("/pages")}
              >
                <SidebarLabel>Pages</SidebarLabel>
              </SidebarItem>
              <SidebarItem to="/about" current={pathname.startsWith("/about")}>
                <SidebarLabel>About</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarDivider className="mt-auto"/>
            <SidebarSection>
              <SidebarItem
                className="cursor-pointer"
                onClick={() => signout.mutateAsync({})}
              >
                Log out
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
