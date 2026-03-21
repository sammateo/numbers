import { getSupabaseServerClient } from "#/lib/supabase";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const ClearBibleVersesSchema = z.object({
  study_id: z.uuid(),
});

export const clearBibleVerses = createServerFn({ method: "POST" })
  .inputValidator(ClearBibleVersesSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase
      .schema("numbers")
      .from("bible_study_verses")
      .delete()
      .eq("study_id", data.study_id);
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    console.log(`Cleared verses from study: ${data.study_id}`);
    return;
  });
