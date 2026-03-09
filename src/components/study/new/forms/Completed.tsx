import { Link } from "@tanstack/react-router";

const Completed = () => {
  return (
    <div className="max-w-md my-10 mx-auto text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="mx-auto size-20 text-gray-400"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        ></path>
      </svg>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">Completed</h2>

      <p className="mt-4 text-pretty text-gray-700">
        Your Bible Study has been created successfully.
      </p>

      <Link
        to="/study"
        className="mt-6 block w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        View Bible Studies
      </Link>
    </div>
  );
};

export default Completed;
