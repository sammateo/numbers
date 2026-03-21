import { getSupabaseServerClient } from "#/lib/supabase";
import type { BibleStudy, FullBibleStudy } from "#/types";
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

export const getCompleteBibleStudies = createServerFn()
  .inputValidator(GetBibleStudiesSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { data: bible_studies, error } = await supabase
      .schema("numbers")

      .from("bible_studies")
      .select(
        `
      *,
      creator:profiles!creator_id (*),
      verses:bible_study_verses (*),
      media:bible_study_media (*),
      collaborators:bible_study_collaborators (
        *,
        user:profiles!user_id (*)
      )
    `,
      )
      .eq("creator_id", data.creator_id)
      .order("created_at", { ascending: false })
      .overrideTypes<Array<FullBibleStudy>>();

    // .maybeSingle<FullBibleStudy>();

    if (error) {
      console.error(error);
      throw error;
    }
    return bible_studies;
  });
