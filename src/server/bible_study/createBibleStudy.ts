import { getUserSessionFn } from "#/auth/supabase";
import { getSupabaseServerClient } from "#/lib/supabase";
import type { BibleStudyInsert } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// // Define the primitive types that can exist in JSON
// const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
// // Define the TypeScript type for a general JSON value
// type Json = z.infer<typeof literalSchema> | { [key: string]: Json | undefined } | Json[];

// // Define the Zod schema for a general JSON value using recursion
// type JsonSchema = z.ZodType<Json>;

// const jsonSchema: JsonSchema = z.lazy(() =>
//   z.union([
//     literalSchema,
//     z.record(jsonSchema.optional()), // Object with potentially undefined values
//     z.array(jsonSchema),
//   ])
// );

const JsonSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(JsonSchema),
    z.record(z.string(), JsonSchema.optional()),
  ]),
);

export const CreateBibleStudySchema = z.object({
  // id: z.string(),
  //   creator_id: z.string(),
  title: z.string(),
  topic: z.string().nullable(),
  description: z.string().nullable(),
  content: JsonSchema,
  visibility: z.union([
    z.literal("private"),
    z.literal("public"),
    z.literal("shared"),
  ]),
  //   created_at: z.string(),
  //   updated_at: z.string(),
});

export const createBibleStudy = createServerFn({ method: "POST" })
  .inputValidator(CreateBibleStudySchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { user } = await getUserSessionFn();
    const insertObject: BibleStudyInsert = {
      creator_id: user.id,
      title: data.title,
      topic: data.topic,
      description: data.description,
      content: data.content,
      visibility: data.visibility,
    };
    const { data: createdStudy, error } = await supabase
      .schema("numbers")
      .from("bible_studies")
      .insert(insertObject)
      .select();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    console.log(`Created bible study: ${data.title}`);
    return createdStudy[0].id;
    // return `Created bible study: ${data.title}`;
  });

// // Call from anywhere - components, loaders, hooks, etc.
// const time = await getServerTime()
