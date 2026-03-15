import type { BibleStudy } from "#/types";
import { Link } from "@tanstack/react-router";
import { CiGlobe } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
const NewCard = ({
  id,
  title,
  description,
  topic,
  visibility,
  created_at,
}: BibleStudy) => {
  const visibilityIcons = {
    private: GoLock,
    shared: LuUsers,
    public: CiGlobe,
  };

  const VisibilityIcon = visibilityIcons[visibility];
  return (
    <Link to="/study/$studyId" params={{ studyId: id }} className="block group">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
        <div className="space-y-3 md:space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg md:text-xl group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </h3>
              <VisibilityIcon className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
            </div>
            <div className="inline-block px-2 py-1 bg-accent/10 text-accent-foreground rounded text-xs md:text-sm">
              {topic}
            </div>
          </div>

          <p className="text-sm md:text-base text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs text-accent-foreground">
                {"test".charAt(0)}
              </div>
              <span className="truncate">@{"test"}</span>
              {/* {collaborators > 0 && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">
                    {collaborators} collaborator{collaborators > 1 ? "s" : ""}
                  </span>
                </>
              )} */}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              {new Date(created_at).toDateString()}{" "}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewCard;
