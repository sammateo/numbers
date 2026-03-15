import { createBibleStudyMachine } from "#/machines/createBibleStudyMachine";
import { useMachine } from "@xstate/react";
import EnterTitle from "./forms/EnterTitle";
import EnterDescription from "./forms/EnterDescription";
import EnterContent from "./forms/EnterContent";
import ReviewContent from "./forms/ReviewContent";
import { useCreateBibleStudyStore } from "#/store/useCreateBibleStudyStore";
import Completed from "./forms/Completed";

const NewBibleStudyPage = () => {
  const [state, send] = useMachine(createBibleStudyMachine);
  const reset = useCreateBibleStudyStore((s) => s.reset);

  if (state.matches("enterTitle")) {
    return (
      <EnterTitle
        next={{ label: "Next", action: () => send({ type: "NEXT" }) }}
      />
    );
  }
  if (state.matches("enterDescription")) {
    return (
      <EnterDescription
        back={{ label: "Back", action: () => send({ type: "BACK" }) }}
        next={{ label: "Next", action: () => send({ type: "NEXT" }) }}
      />
    );
  }
  if (state.matches("enterContent")) {
    return (
      <EnterContent
        back={{ label: "Back", action: () => send({ type: "BACK" }) }}
        next={{ label: "Next", action: () => send({ type: "NEXT" }) }}
      />
    );
  }
  if (state.matches("review")) {
    return (
      <ReviewContent
        back={{ label: "Back", action: () => send({ type: "BACK" }) }}
        next={{ label: "Submit", action: () => send({ type: "SUBMIT" }) }}
      />
    );
  }
  if (state.matches("submitting")) {
    return (
      <div>
        <p>submitting...</p>
      </div>
    );
  }
  if (state.matches("complete")) {
    reset();
    return <Completed />;
  }

  return null;
};

export default NewBibleStudyPage;
