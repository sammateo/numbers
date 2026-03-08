import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString();
});

const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  avatarUrl: z.string(),
});

export const submitProfile = createServerFn()
  .inputValidator(ProfileSchema)
  .handler(async ({ data }) => {
    return `Created user: ${data.username}`;
  });

// // Call from anywhere - components, loaders, hooks, etc.
// const time = await getServerTime()
