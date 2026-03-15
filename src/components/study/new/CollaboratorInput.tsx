import { useState } from "react";
import { X, UserPlus } from "lucide-react";

interface Collaborator {
  username: string;
  name: string;
}

interface CollaboratorInputProps {
  collaborators: Collaborator[];
  onChange: (collaborators: Collaborator[]) => void;
}

// Mock user suggestions
const mockUsers = [
  { username: "sarahj", name: "Sarah Johnson" },
  { username: "mchen", name: "Michael Chen" },
  { username: "emilyr", name: "Emily Rodriguez" },
  { username: "davidk", name: "David Kim" },
];

export function CollaboratorInput({
  collaborators,
  onChange,
}: CollaboratorInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredUsers = mockUsers.filter(
    (user) =>
      !collaborators.some((c) => c.username === user.username) &&
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const addCollaborator = (user: Collaborator) => {
    onChange([...collaborators, user]);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const removeCollaborator = (username: string) => {
    onChange(collaborators.filter((c) => c.username !== username));
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
                onClick={() => addCollaborator(user)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate">{user.name}</div>
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

      {collaborators.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {collaborators.map((collab) => (
            <div
              key={collab.username}
              className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full"
            >
              <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs">
                {collab.name.charAt(0)}
              </div>
              <span className="text-sm">@{collab.username}</span>
              <button
                type="button"
                onClick={() => removeCollaborator(collab.username)}
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
