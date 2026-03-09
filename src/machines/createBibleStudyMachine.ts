import { createBibleStudy } from "#/server/bible_study/createBibleStudy";
import { useCreateBibleStudyStore } from "#/store/useCreateBibleStudyStore";
import { fromPromise, setup } from "xstate";

export const createBibleStudyMachine = setup({
  actors: {
    submitBibleStudy: fromPromise(async () => {
      const { title, description, content, visibility } =
        useCreateBibleStudyStore.getState();
      const response = await createBibleStudy({
        data: {
          title,
          description,
          content,
          visibility,
        },
      });
    }),
  },
}).createMachine({
  id: "createBibleStudy",
  initial: "enterTitle",
  states: {
    enterTitle: {
      on: {
        NEXT: "enterDescription",
      },
    },
    enterDescription: {
      on: {
        NEXT: "enterContent",
        BACK: "enterTitle",
      },
    },
    enterContent: {
      on: { NEXT: "review", BACK: "enterDescription" },
    },
    review: {
      on: { BACK: "enterContent", SUBMIT: "submitting" },
    },
    submitting: {
      invoke: {
        id: "submitBibleStudy",
        src: "submitBibleStudy",
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
