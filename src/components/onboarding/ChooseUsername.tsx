import { useUserStore } from "#/store/useUserStore";
import Input from "#/ui/input/Input";
import z from "zod";
import type { ButtonNavigationInterface } from "./ButtonNavigation";
import ButtonNavigation from "./ButtonNavigation";
import OnboardingCard from "./OnboardingCard";
import OnboardingTitle from "./OnboardingTitle";
import { useForm } from "@tanstack/react-form-start";
import InputValidationErrors from "#/ui/input/InputValidationErrors";
const userNameSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot be more than 20 characters")
    .refine(
      (s) => /^(?=.*[a-z])[a-z0-9]+$/.test(s),
      "Username must only contain alphanumeric characters and have at least one letter",
    ),
});

const ChooseUsername = ({ next, back }: ButtonNavigationInterface) => {
  const { firstName, username, setUsername } = useUserStore();

  const form = useForm({
    defaultValues: {
      userName: username,
    },
    validators: {
      onChange: userNameSchema,
    },
  });

  return (
    <>
      <OnboardingTitle
        title={`Hi ${firstName}`}
        description="Please select a username below"
      />
      <OnboardingCard>
        <div className="space-y-2">
          <form.Field name="userName">
            {(field) => (
              <>
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value.toLowerCase().replace(" ", ""));
                    field.handleChange(
                      e.target.value.toLowerCase().replace(" ", ""),
                    );
                  }}
                  type="text"
                  id="FirstName"
                  className="lowercase"
                  error={!field.state.meta.isValid}
                />

                {!field.state.meta.isValid && (
                  <InputValidationErrors
                    isValid={field.state.meta.isValid}
                    errors={field.state.meta.errors.map((error) => {
                      return { message: error?.message || "" };
                    })}
                  />
                )}
              </>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit]}
            children={([canSubmit]) => (
              <ButtonNavigation
                next={{
                  ...next!,
                  disabled: !username || !canSubmit,
                }}
                back={back}
              />
            )}
          />
        </div>
      </OnboardingCard>
    </>
  );
};

export default ChooseUsername;
