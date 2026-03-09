import type { BibleStudy, RichTextContent } from "#/types";
import { create } from "zustand";
type CreateBibleStudyState = BibleStudy & {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setContent: (content: RichTextContent | null) => void;
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
    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setContent: (content) => set({ content }),
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
      }),
  }),
);
