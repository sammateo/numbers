import { getSupabaseServerClient } from "#/lib/supabase";
import type { BibleStudyUpdate } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CreateBibleStudySchema } from "./createBibleStudy";

const UpdateBibleStudySchema = CreateBibleStudySchema.extend({
  id: z.uuid(),
});

export const updateBibleStudy = createServerFn({ method: "POST" })
  .inputValidator(UpdateBibleStudySchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const updateObject: BibleStudyUpdate = {
      title: data.title,
      topic: data.topic,
      description: data.description,
      content: data.content,
      visibility: data.visibility,
    };
    const { data: _, error } = await supabase
      .schema("numbers")
      .from("bible_studies")
      .update(updateObject)
      .eq("id", data.id)
      .select();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return `Updated bible study: ${data.title}`;
  });
