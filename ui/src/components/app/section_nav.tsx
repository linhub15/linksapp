import { Link } from "../ui/link.tsx";

type Props = {
  backButtonLabel: string;
};

export function SectionNav({ backButtonLabel }: Props) {
  return (
    <div className="max-lg:hidden">
      <Link
        className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        data-headlessui-state=""
        to=".."
      >
        <svg
          className="size-4 fill-zinc-400 dark:fill-zinc-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fillRule="evenodd"
            d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
        {backButtonLabel}
      </Link>
    </div>
  );
}
