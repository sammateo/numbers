import { useState } from "react";
import { X, UserPlus } from "lucide-react";
import { searchUserProfiles } from "#/server/account/getUserProfile";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { CollaboratorRole, FullBibleStudyCollaborator } from "#/types";

interface CollaboratorInputProps {
  collaborators: FullBibleStudyCollaborator[];
  onChange: (collaborators: FullBibleStudyCollaborator[]) => void;
  collaboratorInputRole: CollaboratorRole;
}

export function CollaboratorInput({
  collaborators,
  onChange,
  collaboratorInputRole,
}: CollaboratorInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchUserProfilesTrigger = useServerFn(searchUserProfiles);
  const {
    data: foundUsers,
    // isPending: usernameCheckPending,
    // isEnabled: userNameCheckEnabled,
  } = useQuery({
    queryKey: ["searchUserProfiles", searchTerm],
    queryFn: async () =>
      await searchUserProfilesTrigger({
        data: {
          username: searchTerm,
        },
      }),
    enabled: !!searchTerm,
  });

  const filteredUsers =
    foundUsers?.filter(
      (user) =>
        !collaborators.some((c) => c.user.username === user.username) &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase()),
      // ||
      // user.name.toLowerCase().includes(searchTerm.toLowerCase())),
    ) ?? [];

  const addCollaborator = (user: FullBibleStudyCollaborator) => {
    onChange([...collaborators, user]);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const removeCollaborator = (username: string) => {
    onChange(collaborators.filter((c) => c.user.username !== username));
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            @
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search users by @username"
            className="w-full pl-8 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {showSuggestions && searchTerm && filteredUsers.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            {filteredUsers.slice(0, 5).map((user) => (
              <button
                key={user.username}
                type="button"
                onClick={() =>
                  addCollaborator({
                    user: user,
                    id: "",
                    study_id: "",
                    user_id: user.id,
                    role: collaboratorInputRole,
                    created_at: "",
                  })
                }
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm">
                  {user?.username?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate">
                    {/* {user?.first_name} {user?.last_name} */}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    @{user.username}
                  </div>
                </div>
                <UserPlus className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
      </div>

      {collaborators &&
        collaborators.filter((c) => c.role === collaboratorInputRole).length >
          0 && (
          <div className="flex flex-wrap gap-2">
            {collaborators
              .filter((c) => c.role === collaboratorInputRole)
              .map((collab) => (
                <div
                  key={collab.user.username}
                  className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full"
                >
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs">
                    {collab.user.username.charAt(0)}
                  </div>
                  <span className="text-sm">@{collab.user.username}</span>
                  <button
                    type="button"
                    onClick={() => removeCollaborator(collab.user.username)}
                    className="p-0.5 hover:bg-background rounded-full transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
          </div>
        )}
    </div>
  );
}
