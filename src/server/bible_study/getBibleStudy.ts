import { getSupabaseServerClient } from "#/lib/supabase";
import type { BibleStudy, FullBibleStudy } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GetBibleStudySchema = z.object({
  study_id: z.uuid(),
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

export const getCompleteBibleStudy = createServerFn()
  .inputValidator(GetBibleStudySchema)
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
      .eq("id", data.study_id)
      .maybeSingle<FullBibleStudy>();

    if (error) {
      console.error(error);
      throw error;
    }
    return bible_studies;
  });
