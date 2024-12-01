import type { PropsWithChildren } from "react";
import { Navbar, NavbarSection, NavbarSpacer } from "../ui/navbar.tsx";
import { SidebarLayout } from "../ui/sidebar-layout.tsx";
import { AppSidebar } from "./app_sidebar.tsx";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>Mobile View</NavbarSection>
        </Navbar>
      }
      sidebar={<AppSidebar />}
    >
      {children}
    </SidebarLayout>
  );
}
