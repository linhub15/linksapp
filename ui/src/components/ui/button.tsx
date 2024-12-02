import { cva, type VariantProps } from "cva";
import * as Headless from "@headlessui/react";
import clsx from "clsx";
import { forwardRef, Fragment, type ReactNode } from "react";

export const buttonVariants = cva({
  base: [
    // Base
    "relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold",
    // Sizing
    "px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6",
    // Focus
    "focus:outline-none data-focus:outline data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500",
    // Disabled
    "data-disabled:opacity-50",
    // Icon
    "[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]",
  ],
  variants: {
    variant: {
      solid: [
        // Optical border, implemented as the button background to avoid corner artifacts
        "border-transparent bg-(--btn-border)",
        // Dark mode: border is rendered on `after` so background is set to button background
        "dark:bg-(--btn-bg)",
        // Button background, implemented as foreground layer to stack on top of pseudo-border layer
        "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg]",
        // Drop shadow, applied to the inset `before` layer so it blends with the border
        "before:shadow",
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        "dark:before:hidden",
        // Dark mode: Subtle white outline is applied using a border
        "dark:border-white/5",
        // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
        "after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)]",
        // Inner highlight shadow
        "after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)]",
        // White overlay on hover
        "after:data-active:bg-(--btn-hover-overlay) after:data-hover:bg-(--btn-hover-overlay)",
        // Dark mode: `after` layer expands to cover entire button
        "dark:after:-inset-px dark:after:rounded-lg",
        // Disabled
        "before:data-disabled:shadow-none after:data-disabled:shadow-none",
      ],
      outline: [
        // Base
        "border-zinc-950/10 text-zinc-950 data-active:bg-zinc-950/[2.5%] data-hover:bg-zinc-950/[2.5%]",
        // Dark mode
        "dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-active:bg-white/5 dark:data-hover:bg-white/5",
        // Icon
        "[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]",
      ],
      ghost: [
        // Base
        "border-transparent text-zinc-950 data-active:bg-zinc-950/5 data:bg-zinc-950/5",
        // Dark mode
        "dark:text-white dark:data-active:bg-white/10 dark:hover:bg-white/10",
        // Icon
        "[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-500)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]",
      ],
    },
    color: {
      "dark/zinc": [
        "text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950/90%)] [--btn-hover-overlay:var(--color-white/10%)]",
        "dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white/5%)]",
        "[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]",
      ],
      red: [
        "text-white bg-[--btn-hover-overlay:var(--color-white/10)] [--btn-bg:var(--color-red-600)] [--btn-border:var(--color-red-700/90)]",
        "[--btn-icon:(--color-red-300)] data-active:[--btn-icon:var(--color-red-200)] data-hover:[--btn-icon:var(--color-red-200)]",
      ],
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});

type ButtonProps =
  & React.ButtonHTMLAttributes<HTMLButtonElement>
  & VariantProps<typeof buttonVariants>
  & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant,
  children,
  asChild = false,
  ...props
}, ref) => {
  return (
    <Headless.Button
      as={asChild ? Fragment : "button"}
      ref={ref}
      className={clsx(
        buttonVariants({ variant }),
        className,
      )}
      {...props}
    >
      <TouchTarget>{children}</TouchTarget>
    </Headless.Button>
  );
});

/**
 * Expand the hit area to at least 44×44px on touch devices
 */
export function TouchTarget({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
