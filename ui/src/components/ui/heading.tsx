import clsx from "clsx";
import type { ComponentProps, JSX } from "react";

type H = ComponentProps<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

type HeadingProps =
  & { level?: 1 | 2 | 3 | 4 | 5 | 6 }
  & H;

export function Heading(
  { className, level = 1, ...props }: HeadingProps,
) {
  const Element: keyof JSX.IntrinsicElements = `h${level}`;

  return (
    <Element
      {...props}
      className={clsx(
        className,
        "text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white",
      )}
    />
  );
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  const Element: keyof JSX.IntrinsicElements = `h${level}`;

  return (
    <Element
      {...props}
      className={clsx(
        className,
        "text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white",
      )}
    />
  );
}
