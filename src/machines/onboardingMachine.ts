import { submitProfile } from "#/server/account/submitAccountDetails";
import { useUserStore } from "#/store/useUserStore";
import { fromPromise, setup } from "xstate";

export const onboardingMachine = setup({
  // implementation of profile data submission
  actors: {
    submitProfile: fromPromise(async () => {
      const { firstName, lastName, username, avatarUrl } =
        useUserStore.getState();

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
        NEXT: "review",
        BACK: "enterName",
      },
    },

    // chooseAvatar: {
    //   on: {
    //     NEXT: "review",
    //     BACK: "chooseUsername",
    //   },
    // },

    review: {
      on: {
        BACK: "chooseUsername",
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
