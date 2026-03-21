import { createServerFn } from "@tanstack/react-start";
import { ApiClient, BibleClient } from "@youversion/platform-core";
import z from "zod";

const apiClient = new ApiClient({
  appKey: process.env.YOUVERSION_API_KEY || "",
});

const bibleClient = new BibleClient(apiClient);

// Fetch John 3:16 with HTML formatting
// const passage = await bibleClient.getPassage(3034, "JHN.3.16", "html");
// const books = await bibleClient.getBooks(1);
// console.log(passage.content); // "<div><div class=\"p\"><span class=\"yv-v\" v=\"16\"></span>..."
const GetBooksSchema = z.object({
  version_id: z.number(),
});

export const getBooks = createServerFn()
  .inputValidator(GetBooksSchema)
  .handler(async ({ data }) => {
    try {
      const books = await bibleClient.getBooks(data.version_id);
      return books;
    } catch (error) {
      console.error(error);
    }
  });
