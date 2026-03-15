import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { HiListBullet } from "react-icons/hi2";
import { menuBarStateSelector } from "./menuBarState.ts";
import { VscHorizontalRule, VscListOrdered } from "react-icons/vsc";
import { BsBlockquoteRight } from "react-icons/bs";
import {
  FaBold,
  FaItalic,
  FaParagraph,
  FaStrikethrough,
} from "react-icons/fa6";
import { FaRedo, FaUndo } from "react-icons/fa";

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-background rounded-t-sm p-1 border-b border-gray-300">
      <div className=" [&>button]:px-2 [&>button]:py-1 [&>button]:rounded flex gap-2 items-center flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? "is-active" : ""}
        >
          <FaBold className="size-6 py-1" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "is-active" : ""}
        >
          <FaItalic className="size-6 py-1" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "is-active" : ""}
        >
          <FaStrikethrough className="size-6 py-1" />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "is-active" : ""}
        >
          Code
        </button> */}

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? "is-active" : ""}
        >
          <FaParagraph className="size-6 py-1" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : ""}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? "is-active" : ""}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? "is-active" : ""}
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={editorState.isHeading4 ? "is-active" : ""}
        >
          H4
        </button>
        {/* <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={editorState.isHeading5 ? "is-active" : ""}
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={editorState.isHeading6 ? "is-active" : ""}
        >
          H6
        </button> */}
        <button
          title="bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? "is-active" : ""}
        >
          <HiListBullet className="size-5" />
        </button>
        <button
          title="ordered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? "is-active" : ""}
        >
          <VscListOrdered className="size-5" />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? "is-active" : ""}
        >
          Code block
        </button> */}
        <button
          title="block quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "is-active" : ""}
        >
          <BsBlockquoteRight className="size-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <VscHorizontalRule className="size-6" />
        </button>
        {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Reset formatting
        </button> */}
        {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button> */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <FaUndo className="size-6 py-1" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <FaRedo className="size-6 py-1" />
        </button>
      </div>
    </div>
  );
};
