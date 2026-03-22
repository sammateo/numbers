import { getUserSessionFn } from "#/auth/supabase";
import { getSupabaseServerClient } from "#/lib/supabase";
import type { Profile } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CheckUsernameSchema = z.object({
  username: z.string(),
});

/**
 * Returns true if username is available
 */
export const checkUsername = createServerFn()
  .inputValidator(CheckUsernameSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { user } = await getUserSessionFn();

    //short circuit if username is the same
    if (user.username === data.username) {
      return true;
    }
    const { data: existing, error } = await supabase
      .schema("numbers")
      .from("profiles")
      .select("id")
      .ilike("username", data.username)
      //exclude current user if editing profile
      .neq("id", user.id)
      .maybeSingle<Profile>();

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return !existing;
  });
