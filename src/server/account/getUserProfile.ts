import { getSupabaseServerClient } from "#/lib/supabase";
import type { Profile } from "#/types";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GetProfileSchema = z.object({
  id: z.string(),
});

export const getUserProfile = createServerFn()
  .inputValidator(GetProfileSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { data: profile, error } = await supabase
      .schema("numbers")
      .from("profiles")
      .select("*")
      .eq("id", data.id)
      .maybeSingle<Profile>();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    // console.log(profile);
    return profile;
  });
