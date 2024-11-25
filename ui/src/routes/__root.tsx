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
  SidebarDivider,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "../components/ui/sidebar.tsx";

import { useQuery } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { pathname } = useLocation();

  // todo: strongly type this
  const user = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("http://localhost:8000/auth/profile", { credentials: "include" })
        .then((res) => res.json()),
  });

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
              <SidebarLabel>
                {user?.data?.profile?.email}
              </SidebarLabel>
              <SidebarDivider />
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
