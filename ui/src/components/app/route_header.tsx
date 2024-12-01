import { Divider } from "../ui/divider.tsx";
import { Heading } from "../ui/heading.tsx";

type Props = {
  title: string;
  actionSlot?: React.ReactNode;
  navigationSlot?: React.ReactNode;
};

export function RouteHeader(props: Props) {
  return (
    <>
      {props.navigationSlot}
      <div className="flex w-full justify-between h-8 mt-3">
        <Heading>{props.title}</Heading>
        <div>
          {props.actionSlot}
        </div>
      </div>
      <Divider />
    </>
  );
}
