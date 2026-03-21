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

const GetScriptureSchema = z.object({
  version_id: z.number(),
  book_id: z.string(),
  chapter: z.number(),
  verse_start: z.number(),
  verse_end: z.number().nullable(),
});

export const getScripture = createServerFn()
  .inputValidator(GetScriptureSchema)
  .handler(async ({ data }) => {
    try {
      const verse_end = data.verse_end ? `-${data.verse_end}` : "";
      const usfmString = `${data.book_id}.${data.chapter}.${data.verse_start}${verse_end}`;
      const passage = await bibleClient.getPassage(
        data.version_id,
        usfmString,
        "text",
      );
      return passage.content;
    } catch (error) {
      console.error(error);
      return "";
    }
  });
