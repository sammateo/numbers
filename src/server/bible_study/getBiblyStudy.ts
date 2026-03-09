import { getSupabaseServerClient } from "#/lib/supabase";
import type { BibleStudy } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GetBibleStudySchema = z.object({
  study_id: z.string(),
});

export const getBibleStudy = createServerFn()
  .inputValidator(GetBibleStudySchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { data: bible_studies, error } = await supabase
      .schema("numbers")
      .from("bible_studies")
      .select("*")
      .eq("id", data.study_id)
      .maybeSingle<BibleStudy>();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return bible_studies;
  });
