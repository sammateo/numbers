import { Hash } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col gap-2 items-center justify-center">
      <div className="inline-block p-4 bg-primary/10 rounded-full mb-4 animate-bounce">
        <Hash className="w-8 h-8 md:w-8 md:h-8 text-primary" />
      </div>
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
