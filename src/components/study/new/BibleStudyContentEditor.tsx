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
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { MenuBar } from "./MenuBar.tsx";

const extensions = [TextStyleKit, StarterKit];

export default () => {
  const editor = useEditor({
    extensions,
    content: {
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
              text: "Hi there,",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "this is a ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "basic",
            },
            {
              type: "text",
              text: " example of ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "Tiptap",
            },
            {
              type: "text",
              text: ". Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:",
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
                      text: "That's a bullet list with one …",
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
                      text: "… or two list items.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:",
            },
          ],
        },
        {
          type: "codeBlock",
          attrs: {
            language: "css",
          },
          content: [
            {
              type: "text",
              text: "body {\n  display: none;\n}",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.",
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
                  text: "Wow, that's amazing. Good work, boy! 👏 ",
                },
                {
                  type: "hardBreak",
                },
                {
                  type: "text",
                  text: "— Mom",
                },
              ],
            },
          ],
        },
      ],
    },
  });
  const getContent = () => {
    const stuff = editor.getJSON();
    console.log(stuff);
  };

  return (
    <div className="mx-10 my-10 border-2 border-gray-300 px-5 py-5 rounded-md">
      <MenuBar editor={editor} />
      <EditorContent className="py-4 px-4" editor={editor} />
      <button onClick={getContent}>click</button>
    </div>
  );
};
