import type { CollaboratorRole, Profile, Timestamp, UUID } from "..";

export interface BibleStudyCollaborator {
  id: UUID;
  study_id: UUID;
  user_id: UUID;
  role: CollaboratorRole;
  created_at: Timestamp;
}
export interface FullBibleStudyCollaborator {
  id: UUID;
  study_id: UUID;
  user_id: UUID;
  role: CollaboratorRole;
  created_at: Timestamp;
  user: Profile;
}

export interface BibleStudyCollaboratorInsert {
  study_id: UUID;
  user_id: UUID;
  role?: CollaboratorRole;
}
