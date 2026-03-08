import { submitProfile } from "#/server/account/submitAccountDetails";
import { useOnboardingStore } from "#/store/useOnboardingStore";
import { fromPromise, setup } from "xstate";

export const onboardingMachine = setup({
  // implementation of profile data submission
  actors: {
    submitProfile: fromPromise(async () => {
      const { firstName, lastName, username, avatarUrl } =
        useOnboardingStore.getState();

      const response = await submitProfile({
        data: {
          firstName,
          lastName,
          username,
          avatarUrl: avatarUrl || "",
        },
      });
      console.log(response);
    }),
  },
}).createMachine({
  id: "onboarding",
  initial: "enterName",
  states: {
    enterName: {
      on: {
        NEXT: "chooseUsername",
      },
    },

    chooseUsername: {
      on: {
        NEXT: "chooseAvatar",
        BACK: "enterName",
      },
    },

    chooseAvatar: {
      on: {
        NEXT: "review",
        BACK: "chooseUsername",
      },
    },

    review: {
      on: {
        BACK: "chooseAvatar",
        SUBMIT: "submitting",
      },
    },

    submitting: {
      invoke: {
        id: "submitUserProfile",
        src: "submitProfile",
        onDone: {
          target: "complete",
        },
        onError: {
          target: "review",
        },
      },
    },

    complete: {
      type: "final",
    },
  },
});
