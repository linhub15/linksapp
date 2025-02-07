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

  const example = html`<form
  method="post"
  action="${url.toJSON()}"
>
  <label for="email">Email</label>
  <input type="email" name="email" id="email"/>

  <label for="message">Message</label>
  <textarea name="message" id="message"></textarea>
  ${
    form.cfTurnstileSiteKey
      ? html`<div class="cf-turnstile" data-sitekey="${form.cfTurnstileSiteKey}"></div>`
      : ""
  }
  <button type="submit">Submit</button>
</form>`;

  return (
    <div className="space-y-12">
      <section>
        <Field>
          <Label>
            Set the form method and action
          </Label>
          <div className="grid grid-cols-2 gap-12">
            <Description>
              Provide a success page URL with the query parameter{" "}
              <Code>return_to</Code>.{" "}
              This must be a relative URL on the same domain that the form is
              submitted from.
            </Description>

            <div className="space-y-4">
              <CodeBlock>method="post"</CodeBlock>
              <CodeBlock>action="{url.toJSON()}"</CodeBlock>
            </div>
          </div>
        </Field>
      </section>

      <section>
        <Field>
          <Label>
            Success URL <span>(Optional)</span>
          </Label>
          <div className="grid grid-cols-2 gap-12">
            <Description>
              Provide a success page URL with the query parameter{" "}
              <Code>return_to</Code>.{" "}
              This must be a relative URL on the same domain that the form is
              submitted from.
            </Description>

            <Input
              type="text"
              value={returnTo}
              placeholder="/thank-you-page"
              onChange={(e) => setReturnTo(e.target.value)}
            />
          </div>
        </Field>
      </section>

      <section>
        <div className="space-y-4">
          <div>
            <Subheading>Example</Subheading>
            <Text>Add this form snippet to your website to get started.</Text>
          </div>
          <CodeBlock className="rounded-xl overflow-x-scroll">
            {example}
          </CodeBlock>
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
