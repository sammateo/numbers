import { getUserSessionFn } from "#/auth/supabase";
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
    return profile;
  });

const SearchProfilesSchema = z.object({
  username: z.string(),
});

export const searchUserProfiles = createServerFn()
  .inputValidator(SearchProfilesSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { user } = await getUserSessionFn();

    const { data: profiles, error } = await supabase
      .schema("numbers")
      .from("profiles")
      .select("*")
      .ilike("username", `%${data.username}%`)
      .neq("id", user.id)

      .overrideTypes<Array<Profile>>();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    // console.log(data.username);
    // console.log(profiles);
    return profiles;
  });
