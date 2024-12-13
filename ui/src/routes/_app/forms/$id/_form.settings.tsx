import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "../../../../components/ui/badge.tsx";
import { Divider } from "../../../../components/ui/divider.tsx";
import { Field, Label, Legend } from "../../../../components/ui/fieldset.tsx";
import { Input } from "../../../../components/ui/input.tsx";
import { Switch } from "../../../../components/ui/switch.tsx";
import { Strong, Text } from "../../../../components/ui/text.tsx";
import { useGetForm } from "../../../../features/forms/use_get_form.tsx";
import { FieldGroup } from "../../../../components/ui/fieldset.tsx";
import { useSetEnabled } from "../../../../features/forms/use_set_enabled.tsx";
import {
  useManageEmail,
} from "../../../../features/forms/use_set_target_email.tsx";
import { Button } from "../../../../components/ui/button.tsx";
import { useUser } from "../../../../lib/auth/use_user.ts";

export const Route = createFileRoute("/_app/forms/$id/_form/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useUser();
  const id = Route.useParams().id;
  const { data: form } = useGetForm(id);
  const setEnabled = useSetEnabled(id);
  const manageEmail = useManageEmail(id);

  if (!form) {
    return null;
  }

  const handleToggleEnabled = async (enabled: boolean) => {
    await setEnabled.mutateAsync({
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
          <Legend>Target email</Legend>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <Text>
                Form submissions will be sent to this email. When using an email
                other than your account email, you will need to verify it before
                receiving submissions.
              </Text>
              <Text>
                Defaults to your account email{" "}
                <Strong>{user?.profile.email}</Strong> when left blank.
              </Text>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Field className="w-full">
                  <div className="flex gap-4">
                    <div className="w-full">
                      <Input
                        type="email"
                        placeholder={user?.profile.email}
                        value={manageEmail.value}
                        onChange={(e) => manageEmail.setValue(e.target.value)}
                        disabled={manageEmail.mode === "view" ||
                          manageEmail.mutation.isPending}
                      />
                    </div>
                    <div
                      className="hidden data-[mode=view]:block"
                      data-mode={manageEmail.mode}
                    >
                      <Button
                        variant="outline"
                        onClick={manageEmail.edit}
                      >
                        Edit
                      </Button>
                    </div>
                    <div
                      className="hidden gap-2 data-[mode=edit]:flex"
                      data-mode={manageEmail.mode}
                    >
                      <Button
                        variant="outline"
                        onClick={manageEmail.cancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outline"
                        onClick={manageEmail.save}
                        pending={manageEmail.mutation.isPending}
                        disabled={!manageEmail.canSave}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </Field>
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
    </div>
  );
}
