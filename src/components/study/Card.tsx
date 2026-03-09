import type { BibleStudy } from "#/types";
import { Link } from "@tanstack/react-router";

const Card = ({ id, title, topic, visibility, created_at }: BibleStudy) => {
  return (
    <article className="rounded-[10px] border border-gray-200 bg-white px-4 pt-12 pb-4 w-full">
      <time dateTime="2022-10-10" className="block text-xs text-gray-500">
        {" "}
        {new Date(created_at).toLocaleDateString()}{" "}
      </time>

      <Link to="/study/$studyId" params={{ studyId: id }}>
        <h3 className="mt-0.5 text-lg font-medium text-gray-900">{title}</h3>
      </Link>

      <div className="mt-4 flex flex-wrap gap-1">
        <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs whitespace-nowrap text-purple-600">
          {visibility}
        </span>

        <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs whitespace-nowrap text-purple-600">
          {topic}
        </span>
      </div>
    </article>
  );
};

export default Card;
