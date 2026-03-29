import { getSupabaseServerClient } from "#/lib/supabase";
import type { BibleStudyCollaboratorInsert } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const AddBibleCollaboratorsSchema = z.array(
  z.object({
    study_id: z.uuid(),
    user_id: z.uuid(),
    role: z
      .union([z.literal("viewer"), z.literal("editor")])
      .nullable()
      .default("viewer"),
  }),
);

export const addBibleStudyCollaborators = createServerFn({ method: "POST" })
  .inputValidator(AddBibleCollaboratorsSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const insertObject: BibleStudyCollaboratorInsert[] = data.map(
      (collaborator) => {
        return {
          study_id: collaborator.study_id,
          user_id: collaborator.user_id,
          role: collaborator.role ?? "viewer",
        };
      },
    );
    const { data: _, error } = await supabase
      .schema("numbers")
      .from("bible_study_collaborators")
      .insert(insertObject)
      .select();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    console.log(`Added ${data.length} collaborators`);
    return;
  });
