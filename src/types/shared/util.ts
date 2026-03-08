export type UUID = string;
export type Timestamp = string;
export type RichTextContent = Record<string, unknown>;
export type StudyVisibility = "private" | "shared" | "public";
export type MediaType = "youtube" | "image" | "link" | "file";
export type CollaboratorRole = "viewer" | "editor";
export interface RichTextNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: RichTextNode[];
  text?: string;
}

// export interface RichTextContent {
//   type: "doc";
//   content: RichTextNode[];
// }
