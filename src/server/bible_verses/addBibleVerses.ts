import { getSupabaseServerClient } from "#/lib/supabase";
import type { BibleStudyVerseInsert } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const AddBibleVersesSchema = z.array(
  z.object({
    study_id: z.uuid(),
    version: z.number(),
    book: z.string(),
    book_title: z.string().nullable(),
    chapter: z.number(),
    verse_start: z.number(),
    verse_end: z.number().nullable(),
    verse_text: z.string().nullable(),
  }),
);

export const addBibleVerses = createServerFn({ method: "POST" })
  .inputValidator(AddBibleVersesSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const insertObject: BibleStudyVerseInsert[] = data.map((verse) => {
      return {
        study_id: verse.study_id,
        version: verse.version,
        book: verse.book,
        book_title: verse.book_title,
        chapter: verse.chapter,
        verse_start: verse.verse_start,
        verse_end: verse.verse_end,
        verse_text: verse.verse_text,
      };
    });
    const { data: _, error } = await supabase
      .schema("numbers")
      .from("bible_study_verses")
      .insert(insertObject)
      .select();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    console.log(`Added ${data.length} verses`);
    return;
  });
