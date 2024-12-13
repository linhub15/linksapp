import { createFileRoute } from "@tanstack/react-router";
import { Subheading } from "../../../../components/ui/heading.tsx";
import { Code, CodeBlock, Text } from "../../../../components/ui/text.tsx";
import { Input } from "../../../../components/ui/input.tsx";
import {
  Description,
  Field,
  Label,
} from "../../../../components/ui/fieldset.tsx";
import { useState } from "react";
import { useGetForm } from "../../../../features/forms/use_get_form.tsx";

export const Route = createFileRoute("/_app/forms/$id/_form/quickstart")({
  component: RouteComponent,
});

function RouteComponent() {
  const id = Route.useParams().id;
  const { data: form } = useGetForm(id);
  const [returnTo, setReturnTo] = useState("");

  if (!form) {
    return null;
  }

  const url = new URL(`${import.meta.env.VITE_API_URL}/forms/${form.id}`);

  if (returnTo) {
    url.searchParams.set("return_to", returnTo);
  }

  const example = html`<form method="post" action="${url.toJSON()}">
  <label for="email">Email</label>
  <input type="email" name="email" id="email"/>
  <button type="submit">Submit</button>
</form>`;

  return (
    <div className="space-y-12">
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
