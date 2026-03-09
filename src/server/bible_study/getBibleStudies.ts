import { getSupabaseServerClient } from "#/lib/supabase";
import type { BibleStudy } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GetBibleStudiesSchema = z.object({
  creator_id: z.string(),
});

export const getBibleStudies = createServerFn()
  .inputValidator(GetBibleStudiesSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { data: bible_studies, error } = await supabase
      .schema("numbers")
      .from("bible_studies")
      .select("*")
      .eq("creator_id", data.creator_id)
      .order("created_at", { ascending: false })
      .overrideTypes<Array<BibleStudy>>();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return bible_studies;
  });
