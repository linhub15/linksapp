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
import {
  DocumentTextIcon,
  InformationCircleIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";

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
            <SidebarLabel className="flex gap-x-2.5 items-center">
              <QueueListIcon className="inline size-6 stroke-white/70" />
              Pages
            </SidebarLabel>
          </SidebarItem>
          <SidebarItem to="/forms" current={pathname.startsWith("/forms")}>
            <SidebarLabel className="flex gap-x-2.5 items-center">
              <DocumentTextIcon className="inline size-6 stroke-white/70" />
              Forms
            </SidebarLabel>
          </SidebarItem>
          <SidebarItem
            to="/about"
            current={pathname.startsWith("/about")}
          >
            <SidebarLabel className="flex gap-x-2.5 items-center">
              <InformationCircleIcon className="inline size-6 stroke-white/70" />
              About
            </SidebarLabel>
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
