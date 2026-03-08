import type {
  BibleStudyCollaborator,
  BibleStudyMedia,
  BibleStudyVerse,
  Profile,
  RichTextContent,
  StudyVisibility,
  Timestamp,
  UUID,
} from "..";

export interface BibleStudy {
  id: UUID;
  creator_id: UUID;
  title: string;
  topic: string | null;
  description: string | null;
  content: RichTextContent | null;
  visibility: StudyVisibility;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface BibleStudyInsert {
  creator_id: UUID;
  title: string;
  topic?: string | null;
  description?: string | null;
  content?: RichTextContent;
  visibility?: StudyVisibility;
}

export interface BibleStudyUpdate {
  title?: string;
  topic?: string | null;
  description?: string | null;
  content?: RichTextContent;
  visibility?: StudyVisibility;
  updated_at?: Timestamp;
}

export interface FullBibleStudy extends BibleStudy {
  creator: Profile;
  verses: BibleStudyVerse[];
  media: BibleStudyMedia[];
  collaborators: BibleStudyCollaborator[];
}
