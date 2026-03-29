import { getUserSessionFn } from "#/auth/supabase";
import { getSupabaseServerClient } from "#/lib/supabase";
import type { ProfileUpdate } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  avatarUrl: z.string(),
});

export const submitProfile = createServerFn()
  .inputValidator(ProfileSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { user } = await getUserSessionFn();
    const updateObject: ProfileUpdate = {
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      username: data.username.toLowerCase().trim(),
    };
    const { data: _, error } = await supabase
      .schema("numbers")
      .from("profiles")
      .update(updateObject)
      .eq("id", user.id)
      .select();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return `Updated user: ${data.username}`;
  });
