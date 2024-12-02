import { useLocation } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "../ui/sidebar.tsx";
import { UserMenu } from "./user_menu.tsx";

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <SidebarBody>
        <SidebarSection>
          <SidebarLabel className="mt-3">Links App</SidebarLabel>
          <SidebarDivider />
          <SidebarItem
            to="/pages"
            current={pathname.startsWith("/pages")}
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
  );
}
