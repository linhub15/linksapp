import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "../../../../components/ui/badge.tsx";
import { Divider } from "../../../../components/ui/divider.tsx";
import {
  Description,
  Field,
  Label,
  Legend,
} from "../../../../components/ui/fieldset.tsx";
import { Subheading } from "../../../../components/ui/heading.tsx";
import { Input } from "../../../../components/ui/input.tsx";
import { Switch } from "../../../../components/ui/switch.tsx";
import { Code, CodeBlock, Text } from "../../../../components/ui/text.tsx";
import { useGetForm } from "../../../../features/forms/use_get_form.tsx";
import { useUpdateForm } from "../../../../features/forms/use_update_form.tsx";
import { FieldGroup } from "../../../../components/ui/fieldset.tsx";

export const Route = createFileRoute("/_app/forms/$id/_form/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const id = Route.useParams().id;
  const { data: form } = useGetForm(id);
  const updateForm = useUpdateForm();
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

  const handleToggleEnabled = async (enabled: boolean) => {
    await updateForm.mutateAsync({
      id: form.id,
      enabled: enabled,
    });
  };

  return (
    <div className="space-y-12 *:space-y-8">
      <section>
        <Field>
          <Legend>Allow submissions</Legend>
          <div className="grid grid-cols-2 gap-12">
            <Text>
              Submissions will not be collected when disabled. Users will still
              be redirected to your success URL.
            </Text>

            <div>
              <div className="flex items-center gap-2">
                <Badge>
                  {form.enabled ? "Enabled" : "Disabled"}
                </Badge>
                <Switch
                  checked={form.enabled}
                  onChange={(value) => handleToggleEnabled(value)}
                />
              </div>
            </div>
          </div>
        </Field>
      </section>

      <Divider />

      <section>
        <Field>
          <Legend>Discord webhook</Legend>
          <div className="grid grid-cols-2 gap-12">
            <Text>
              Webhooks allow Discord to be notified when the form is submitted.
              This is a free alternative to emails.
            </Text>
            <div>
              <FieldGroup>
                <Field>
                  <Label>
                    Discord webhook URL <Badge>Coming soon</Badge>
                  </Label>
                  <Input
                    type="text"
                    placeholder="https://discord.com/api/webhooks/..."
                    disabled
                  />
                </Field>

                <Field className="flex items-center gap-2">
                  <Badge>Disabled</Badge>
                  <Switch disabled />
                </Field>
              </FieldGroup>
            </div>
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
