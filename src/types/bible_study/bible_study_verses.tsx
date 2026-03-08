import type { MediaType, Timestamp, UUID } from "..";

export interface BibleStudyVerse {
  id: UUID;
  study_id: UUID;
  book: string;
  chapter: number;
  verse_start: number;
  verse_end: number | null;
  verse_text: string | null;
  created_at: Timestamp;
}

export interface BibleStudyVerseInsert {
  study_id: UUID;
  book: string;
  chapter: number;
  verse_start: number;
  verse_end?: number | null;
  verse_text?: string | null;
}

export interface BibleStudyMedia {
  id: UUID;
  study_id: UUID;
  type: MediaType;
  url: string;
  title: string | null;
  created_at: Timestamp;
}

export interface BibleStudyMediaInsert {
  study_id: UUID;
  type: MediaType;
  url: string;
  title?: string | null;
}
