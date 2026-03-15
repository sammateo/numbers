import { onboardingMachine } from "@/machines/onboardingMachine";
import { useMachine } from "@xstate/react";
import ChooseUsername from "./ChooseUsername";
import EnterName from "./EnterName";
import ReviewDetails from "./ReviewDetails";
import Submitting from "./Submitting";
import Completed from "./Completed";

const OnboardingPage = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 p-4 md:p-6 lg:p-8">
      <OnboardingPageContent />
    </div>
  );
};

const OnboardingPageContent = () => {
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
  // if (state.matches("chooseAvatar")) {
  //   return (
  //     <div>
  //       <p>choose avatar</p>
  //       <button
  //         onClick={() => {
  //           send({ type: "BACK" });
  //         }}
  //       >
  //         back
  //       </button>
  //       <button
  //         onClick={() => {
  //           send({ type: "NEXT" });
  //         }}
  //       >
  //         next
  //       </button>
  //     </div>
  //   );
  // }
  if (state.matches("review")) {
    return (
      <ReviewDetails
        back={{
          label: "Back",
          action: () => {
            send({ type: "BACK" });
          },
        }}
        next={{
          label: "Submit",
          action: () => {
            send({ type: "SUBMIT" });
          },
        }}
      />
    );
  }
  if (state.matches("submitting")) {
    return <Submitting />;
  }
  if (state.matches("complete")) {
    return <Completed />;
  }
  return null;
};

export default OnboardingPage;
