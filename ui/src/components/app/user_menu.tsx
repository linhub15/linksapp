import clsx from "clsx";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowRightEndOnRectangleIcon,
  ChevronUpIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { useUser } from "../../lib/auth/use_user.ts";
import { SidebarItem } from "../ui/sidebar.tsx";
import { useSignout } from "../../lib/auth/use_signout.ts";
import { Link } from "../ui/link.tsx";

export function UserMenu() {
  const { data, isLoading } = useUser();
  const signout = useSignout();

  return (
    <Menu>
      {isLoading
        ? <div className="rounded-xl h-4 w-full bg-zinc-800 animate-pulse" />
        : (
          <MenuButton as={SidebarItem}>
            <span>{data?.profile?.email}</span>
            <ChevronUpIcon className="size-4 ml-auto" />
          </MenuButton>
        )}

      <MenuItems
        className={clsx([
          "w-(--button-width) origin-top-right rounded-xl p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 ",
          "border border-black/10 bg-white/75 dark:border-white/5 dark:text-white dark:bg-zinc-900 dark:ring-inset",
          "shadow-lg outline outline-transparent backdrop-blur",
        ])}
        transition
        anchor={{ to: "top", gap: ".5rem" }}
      >
        <MenuItem>
          <Link
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-focus:bg-white/10 hover:cursor-pointer"
            to={"/account"}
          >
            <UserCircleIcon className="size-4 fill-white/30" />
            Account settings
          </Link>
        </MenuItem>
        <div className="my-1 h-px bg-white/5" />
        <MenuItem>
          <button
            type="button"
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-focus:bg-white/10 hover:cursor-pointer"
            onClick={() => signout.mutateAsync({})}
          >
            <ArrowRightEndOnRectangleIcon className="size-4 fill-white/30" />
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
