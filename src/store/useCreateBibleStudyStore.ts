import type {
  BibleStudyVerse,
  FullBibleStudy,
  FullBibleStudyCollaborator,
  RichTextContent,
  StudyVisibility,
} from "#/types";
import { create } from "zustand";
type CreateBibleStudyState = FullBibleStudy & {
  setTitle: (title: string) => void;
  setTopic: (topic: string) => void;
  setDescription: (description: string) => void;
  setContent: (content: RichTextContent | null) => void;
  setVerses: (verses: BibleStudyVerse[]) => void;
  setCollaborators: (collaborators: FullBibleStudyCollaborator[]) => void;
  setVisibility: (visibility: StudyVisibility) => void;
  reset: () => void;
};

export const useCreateBibleStudyStore = create<CreateBibleStudyState>(
  (set) => ({
    id: "",
    creator_id: "",
    title: "",
    topic: "",
    description: "",
    content: null,
    visibility: "private",
    created_at: "",
    updated_at: "",
    verses: [],
    media: [],
    collaborators: [],
    creator: {
      id: "",
      first_name: null,
      last_name: null,
      username: "",
      avatar_url: null,
      created_at: "",
      updated_at: "",
    },
    setTitle: (title) => set({ title }),
    setTopic: (topic) => set({ topic }),
    setDescription: (description) => set({ description }),
    setContent: (content) => set({ content }),
    setVerses: (verses) => set({ verses }),
    setCollaborators: (collaborators) => set({ collaborators }),
    setVisibility: (visibility) => set({ visibility }),
    reset: () =>
      set({
        id: "",
        creator_id: "",
        title: "",
        topic: "",
        description: "",
        content: null,
        visibility: "private",
        created_at: "",
        updated_at: "",
        verses: [],
        collaborators: [],
        media: [],
      }),
  }),
);
