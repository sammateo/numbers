import { Link } from "@tanstack/react-router";

const Completed = () => {
  return (
    <div className="max-w-lg mx-auto flex flex-col items-center gap-5">
      <div className="pt-4 text-center">
        <h2 className="text-2xl font-semibold">Profile Update completed</h2>
        <Link to="/study">View studies</Link>
      </div>
    </div>
  );
};

export default Completed;
