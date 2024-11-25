import * as Headless from "@headlessui/react";
import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  forwardRef,
} from "react";
import { Link as RouterLink, type LinkProps } from "@tanstack/react-router";

export const Link = forwardRef(function Link(
  props: LinkProps & ComponentPropsWithoutRef<"a">,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Headless.DataInteractive>
      <RouterLink {...props} ref={ref} />
    </Headless.DataInteractive>
  );
});
