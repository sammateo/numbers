import { useMachine } from "@xstate/react";
import { onboardingMachine } from "@/machines/onboardingMachine";
import EnterName from "./EnterName";
import ChooseUsername from "./ChooseUsername";

const OnboardingPage = () => {
  const [state, send] = useMachine(onboardingMachine);
  if (state.matches("enterName")) {
    return (
      <EnterName
        next={{
          label: "Next",
          action: () => {
            send({ type: "NEXT" });
          },
        }}
      />
    );
  }
  if (state.matches("chooseUsername")) {
    return (
      <ChooseUsername
        back={{
          label: "Back",
          action: () => {
            send({ type: "BACK" });
          },
        }}
        next={{
          label: "Next",
          action: () => {
            send({ type: "NEXT" });
          },
        }}
      />
    );
  }
  if (state.matches("chooseAvatar")) {
    return (
      <div>
        <p>choose avatar</p>
        <button
          onClick={() => {
            send({ type: "BACK" });
          }}
        >
          back
        </button>
        <button
          onClick={() => {
            send({ type: "NEXT" });
          }}
        >
          next
        </button>
      </div>
    );
  }
  if (state.matches("review")) {
    return (
      <div>
        <p>review details</p>
        <button
          onClick={() => {
            send({ type: "BACK" });
          }}
        >
          back
        </button>
        <button
          onClick={() => {
            send({ type: "SUBMIT" });
          }}
        >
          submit
        </button>
      </div>
    );
  }
  if (state.matches("submitting")) {
    return <div>submitting...</div>;
  }
  if (state.matches("complete")) {
    return <div>completed</div>;
  }
  return null;
};

export default OnboardingPage;
