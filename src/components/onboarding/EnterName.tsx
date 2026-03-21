import { useUserStore } from "#/store/useUserStore";
import Input from "#/ui/input/Input";
import { useRouteContext } from "@tanstack/react-router";
import ButtonNavigation, {
  type ButtonNavigationInterface,
} from "./ButtonNavigation";
import OnboardingCard from "./OnboardingCard";
import OnboardingTitle from "./OnboardingTitle";
import { useForm } from "@tanstack/react-form-start";
import z from "zod";
import InputValidationErrors from "#/ui/input/InputValidationErrors";
const nameSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
});

const EnterName = ({ next, back }: ButtonNavigationInterface) => {
  const { firstName, lastName, setFirstName, setLastName } = useUserStore();
  const { profile } = useRouteContext({ from: "__root__" });

  const form = useForm({
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
    },
    validators: {
      onChange: nameSchema,
    },
  });

  return (
    <>
      <OnboardingTitle
        title={profile && profile.username ? "Update your profile" : undefined}
        description="Enter your name"
      />
      <OnboardingCard>
        <div className="w-full space-y-2">
          <label htmlFor="FirstName" className="block text-sm">
            First Name
          </label>
          <form.Field
            name="firstName"
            children={(field) => (
              <>
                <Input
                  placeholder="Enter your first name"
                  defaultValue={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    field.handleChange(e.target.value);
                  }}
                  type="text"
                  id="FirstName"
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
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="LastName" className="block text-sm">
            Last Name
          </label>
          <form.Field
            name="lastName"
            children={(field) => (
              <>
                <Input
                  placeholder="Enter your last name"
                  defaultValue={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    field.handleChange(e.target.value);
                  }}
                  type="text"
                  id="LastName"
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
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit]}
          children={([canSubmit]) => (
            <ButtonNavigation
              next={{
                ...next!,
                disabled: !firstName || !lastName || !canSubmit,
              }}
              back={back}
            />
          )}
        />
      </OnboardingCard>
    </>
  );
};

export default EnterName;
