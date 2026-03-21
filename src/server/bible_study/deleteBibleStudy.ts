import { getUserSessionFn } from "#/auth/supabase";
import { getSupabaseServerClient } from "#/lib/supabase";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DeleteBibleStudySchema = z.object({
  study_id: z.string(),
});

export const deleteBibleStudy = createServerFn()
  .inputValidator(DeleteBibleStudySchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { user } = await getUserSessionFn();

    const { data: _, error } = await supabase
      .schema("numbers")
      .from("bible_studies")
      .delete()
      .eq("id", data.study_id)
      .eq("creator_id", user.id)
      .select();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return `Deleted bible study: ${data.study_id}`;
  });

// // Call from anywhere - components, loaders, hooks, etc.
// const time = await getServerTime()
