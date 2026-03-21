// import "./styles.scss";
import "#/components/tiptap-node/heading-node/heading-node.scss";
import "#/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "#/components/tiptap-node/code-block-node/code-block-node.scss";
import "#/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "#/components/tiptap-node/list-node/list-node.scss";
import "#/components/tiptap-node/image-node/image-node.scss";
import "#/components/tiptap-node/heading-node/heading-node.scss";
import "#/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "#/components/tiptap-templates/simple/simple-editor.scss";

import { TextStyleKit } from "@tiptap/extension-text-style";
import {
  Editor,
  EditorContent,
  useEditor,
  type Content,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { MenuBar } from "./MenuBar.tsx";
import type { RichTextContent } from "#/types/index.ts";
import { useEffect } from "react";

const extensions = [TextStyleKit, StarterKit];

export default ({
  disabled = true,
  content,
  setContent,
}: {
  disabled?: boolean;
  content: RichTextContent;
  setContent?: (content: RichTextContent) => void;
}) => {
  const initialContent = (content as JSONContent) || {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Bible Study Topic",
          },
        ],
      },
      {
        type: "horizontalRule",
      },
      {
        type: "heading",
        attrs: {
          level: 4,
        },
        content: [
          {
            type: "text",
            text: "Bible Study Subtopic",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "point 1",
                  },
                ],
              },
              {
                type: "bulletList",
                content: [
                  {
                    type: "listItem",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            type: "text",
                            text: "book chapter:verse",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "point 2",
                  },
                ],
              },
              {
                type: "bulletList",
                content: [
                  {
                    type: "listItem",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            type: "text",
                            text: "book chapter:verse",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Key point",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
      },
    ],
  };
  const editor = useEditor({
    editable: !disabled,
    extensions,
    content: initialContent,
  });
  useEffect(() => {
    if (!editor) return;
    if (!content) {
      editor.commands.setContent(initialContent as Content);
      return;
    }
    const current = editor.getJSON();

    if (JSON.stringify(current) !== JSON.stringify(content)) {
      editor.commands.setContent(content as Content);
    }
    const updateHandler = ({ editor }: { editor: Editor }) => {
      if (setContent) setContent(editor.getJSON());
    };
    editor.on("update", updateHandler);
    return () => {
      editor.off("update", updateHandler);
    };
  }, [editor, content]);

  return (
    <div
      className={`border ${disabled ? "border-transparent" : "border-gray-300"} pb-5 rounded-md`}
    >
      {!disabled && <MenuBar editor={editor} />}
      <EditorContent className="py-4 px-4" editor={editor} />
    </div>
  );
};
