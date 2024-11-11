import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { SidebarLayout } from "../components/ui/sidebar-layout.tsx";
import {
  Navbar,
  NavbarSection,
  NavbarSpacer,
} from "../components/ui/navbar.tsx";
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "../components/ui/sidebar.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
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
              <SidebarItem
                to="/"
                current={pathname === "/" || pathname.startsWith("/pages")}
              >
                <SidebarLabel>Pages</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                to="/about"
                current={pathname.startsWith("/about")}
              >
                <SidebarLabel>About</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <Outlet />
    </SidebarLayout>
  );
}
