import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Badge } from "../../../../components/ui/badge.tsx";
import { Divider } from "../../../../components/ui/divider.tsx";
import { Field, Label } from "../../../../components/ui/fieldset.tsx";
import { Input } from "../../../../components/ui/input.tsx";
import { Switch } from "../../../../components/ui/switch.tsx";
import { Strong, Text } from "../../../../components/ui/text.tsx";
import { useGetForm } from "../../../../features/forms/use_get_form.ts";
import { FieldGroup } from "../../../../components/ui/fieldset.tsx";
import { useSetEnabled } from "../../../../features/forms/use_set_enabled.ts";
import {
  useManageEmail,
} from "../../../../features/forms/use_set_target_email.ts";
import { Button } from "../../../../components/ui/button.tsx";
import { useUser } from "../../../../lib/auth/use_user.ts";
import { Heading } from "../../../../components/ui/heading.tsx";
import { useDeleteForm } from "../../../../features/forms/use_delete_form.ts";
import { toast } from "sonner";
import { useSetCloudflareTurnstile } from "../../../../features/forms/use_set_cloudflare_turnstile.ts";
import { useSetTitle } from "../../../../features/forms/use_set_title.ts";
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/16/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

export const Route = createFileRoute("/_app/forms/$id/_form/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const id = Route.useParams().id;
  const { data: form } = useGetForm(id);
  const setTitle = useSetTitle(id);
  const setEnabled = useSetEnabled(id);
  const manageEmail = useManageEmail(id);
  const setCloudflareTurnstile = useSetCloudflareTurnstile(id);
  const deleteForm = useDeleteForm();

  if (!form) {
    return null;
  }

  const handleToggleEnabled = async (enabled: boolean) => {
    await setEnabled.mutateAsync({
      id: form.id,
      enabled: enabled,
    });
    toast(enabled ? "Form enabled" : "Form disabled");
  };

  const handleDeleteForm = async () => {
    await deleteForm.mutateAsync(form.id);
    toast(`Form deleted: ${form.title}`);
    navigate({ to: "/forms" });
  };

  return (
    <>
      <div className="space-y-12 *:space-y-8">
        <section>
          <Field>
            <Label>Form Title</Label>
            <div className="grid grid-cols-2 gap-12">
              <Text>
                The display name for this form.
              </Text>

              <div>
                <div className="flex items-center gap-2">
                  <Field className="w-full">
                    <div className="space-y-2">
                      <div className="flex w-full items-center gap-4">
                        <Input
                          value={setTitle.value}
                          onChange={(e) => setTitle.change(e.target.value)}
                          onBlur={() => setTitle.save()}
                          disabled={setTitle.mutation.isPending}
                        />
                        <span className="flex items-center">
                          {setTitle.mutation.isPending
                            ? (
                              <ArrowPathIcon className="size-4 fill-zinc-400 animate-spin" />
                            )
                            : (
                              <>
                                <CheckIcon
                                  className="size-4 fill-green-600 data-[dirty=true]:hidden"
                                  data-dirty={setTitle.dirty ? "true" : "false"}
                                />
                                <PencilIcon
                                  className="size-4 data-[dirty=false]:hidden animate-pulse"
                                  data-dirty={setTitle.dirty ? "true" : "false"}
                                />
                              </>
                            )}
                        </span>
                      </div>
                      <div className="text-red-500 text-sm">
                        {setTitle.error}
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
            <Label>Allow submissions</Label>
            <div className="grid grid-cols-2 gap-12">
              <Text>
                Submissions will not be collected when disabled. Users will
                still be redirected to your success URL.
              </Text>

              <div>
                <div className="flex items-center gap-2">
                  {form.enabled
                    ? <Badge color="green">Enabled</Badge>
                    : <Badge color="red">Disabled</Badge>}
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
            <Label>Destination email</Label>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <Text>
                  Form submissions will be sent to this email. When using an
                  email other than your account email, you will need to verify
                  it to receive submissions.
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
            <Label>Cloudflare Turnstile</Label>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <Text>
                  Form submissions are protected by Cloudflare Turnstile to
                  prevent bots from submitting spam.
                </Text>
                <Text>
                  Read more about how to set this up here{"  "}
                  <a
                    className="underline hover:text-current/80"
                    href="https://developers.cloudflare.com/turnstile/get-started/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cloudflare Turnstile
                  </a>
                </Text>
              </div>

              <div className="space-y-4 w-full">
                <Field>
                  <Label>Site Key</Label>
                  <Input
                    type="text"
                    placeholder="0x4AAAAAAAN..."
                    disabled={setCloudflareTurnstile.mode === "view"}
                    value={setCloudflareTurnstile.value.siteKey}
                    onChange={(e) =>
                      setCloudflareTurnstile.setSiteKey(e.target.value)}
                  />
                </Field>

                <Field>
                  <Label>Secret Key</Label>
                  <Input
                    type="password"
                    placeholder="0x4AAAAAAAN..."
                    autoComplete="off"
                    disabled={setCloudflareTurnstile.mode === "view"}
                    value={setCloudflareTurnstile.value.secretKey}
                    onChange={(e) =>
                      setCloudflareTurnstile.setSecret(e.target.value)}
                    data-1p-ignore
                  />
                </Field>

                <div>
                  <div
                    className="hidden data-[mode=view]:block"
                    data-mode={setCloudflareTurnstile.mode}
                  >
                    <Button
                      variant="outline"
                      onClick={setCloudflareTurnstile.edit}
                    >
                      Edit
                    </Button>
                  </div>

                  <div
                    className="hidden data-[mode=edit]:flex gap-2"
                    data-mode={setCloudflareTurnstile.mode}
                  >
                    <Button
                      variant="outline"
                      onClick={setCloudflareTurnstile.cancel}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setCloudflareTurnstile.save()}
                      pending={setCloudflareTurnstile.mutation.isPending}
                      disabled={!setCloudflareTurnstile.canSave}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Field>
        </section>

        <Divider />

        <section>
          <Field>
            <Label>Discord webhook</Label>
            <div className="grid grid-cols-2 gap-12">
              <Text>
                Webhooks allow Discord to be notified when the form is
                submitted. This is a free alternative to emails.
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

      <div className="mt-32 space-y-12 *:space-y-8">
        <section className="border border-red-500 rounded-lg p-8">
          <Heading level={2}>Danger Zone</Heading>
          <Field>
            <Label>Delete this form</Label>
            <div className="grid grid-cols-2 gap-12">
              <Text>
                Deleting this form will permantently remove the form and all
                associated submissions. This action cannot be undone.
              </Text>
              <div>
                <Button
                  variant="outline"
                  color="red"
                  onClick={handleDeleteForm}
                  pending={deleteForm.isPending}
                >
                  Delete this form
                </Button>
              </div>
            </div>
          </Field>
        </section>
      </div>
    </>
  );
}
