import type { CollaboratorRole, Timestamp, UUID } from "..";

export interface BibleStudyCollaborator {
  id: UUID;
  study_id: UUID;
  user_id: UUID;
  role: CollaboratorRole;
  created_at: Timestamp;
}

export interface BibleStudyCollaboratorInsert {
  study_id: UUID;
  user_id: UUID;
  role?: CollaboratorRole;
}
