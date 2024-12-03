import { createFileRoute } from "@tanstack/react-router";
import { Subheading } from "../../../../components/ui/heading.tsx";
import { useState } from "react";
import { Field } from "../../../../components/ui/fieldset.tsx";
import { Label } from "../../../../components/ui/fieldset.tsx";
import { Input } from "../../../../components/ui/input.tsx";
import { Description } from "../../../../components/ui/fieldset.tsx";
import { Code, CodeBlock, Text } from "../../../../components/ui/text.tsx";
import { Switch } from "../../../../components/ui/switch.tsx";
import { Badge } from "../../../../components/ui/badge.tsx";
import { Divider } from "../../../../components/ui/divider.tsx";

export const Route = createFileRoute("/_app/forms/$id/_form/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const [enabled, setEnabled] = useState(false);
  const [returnTo, setReturnTo] = useState("");
  const url = new URL(`http://127.0.0.1:8000/forms/${id}`);

  if (returnTo) {
    url.searchParams.set("return_to", returnTo);
  }

  const example = html`<form method="post" action="${url.toJSON()}">
  <label for="email">Email</label>
  <input type="email" name="email" id="email"/>
  <button type="submit">Submit</button>
</form>`;

  return (
    <div className="space-y-12 *:space-y-8">
      <section className="max-w-2xl">
        {/* todo(feat): implement this feature in api */}
        <Field className="flex justify-between">
          <div>
            <Label>Accept submissions</Label>
            <Description>
              This form will return 404 when not accepting submissions.
            </Description>
          </div>
          <div className="flex items-center gap-2">
            <Badge>
              {enabled ? "Accepting submissions" : "Returns 404"}
            </Badge>
            <Switch checked={enabled} onChange={(value) => setEnabled(value)} />
          </div>
        </Field>
      </section>

      <Divider />

      <section>
        <div>
          <Subheading>Get started</Subheading>
          <Text>Add this form snippet to your website to get started.</Text>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <CodeBlock className="rounded-xl overflow-x-scroll">
            {example}
          </CodeBlock>

          <Field>
            <Label>
              Success URL&nbsp;<Code>return_to={returnTo}</Code>
            </Label>
            <Description>
              Redirects to this path after the form is submitted. Origin is set
              by the <Code>referer</Code> header of the form request.
            </Description>
            <Input
              type="text"
              value={returnTo}
              placeholder="/thank-you-page"
              onChange={(e) => setReturnTo(e.target.value)}
            />
          </Field>
        </div>
      </section>

      <div>
        <Subheading>Test submission</Subheading>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
        <div dangerouslySetInnerHTML={{ __html: example }} />
      </div>
    </div>
  );
}
const html = (strings: TemplateStringsArray, ...values: string[]) =>
  String.raw({ raw: strings }, ...values);
