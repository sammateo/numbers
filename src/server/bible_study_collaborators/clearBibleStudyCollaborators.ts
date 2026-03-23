import { getSupabaseServerClient } from "#/lib/supabase";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const ClearBibleStudyCollaboratorsSchema = z.object({
  study_id: z.uuid(),
});

export const clearBibleStudyCollaborators = createServerFn({ method: "POST" })
  .inputValidator(ClearBibleStudyCollaboratorsSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase
      .schema("numbers")
      .from("bible_study_collaborators")
      .delete()
      .eq("study_id", data.study_id);
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    console.log(`Cleared collaborators from study: ${data.study_id}`);
    return;
  });
