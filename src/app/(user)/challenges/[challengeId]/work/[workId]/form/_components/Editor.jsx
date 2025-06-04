"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import ClipLoader from "react-spinners/ClipLoader";
import { editorExtensions } from "./editorConfig";

const EditorToolbar = dynamic(() => import("./EditorToolbar"), {
  loading: () => <div className="h-12 animate-pulse bg-gray-100" />
});

export default function Editor({ challengeTitle, content, handleContent, onDraft, isDrafting }) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: content || "",
    editorProps: {
      attributes: {
        class: "prose prose-lg focus:outline-none w-full max-w-full"
      }
    },
    onUpdate: ({ editor }) => {
      handleContent(editor.getHTML());
    },
    immediatelyRender: false
  });

  // 컨텐츠 동기화
  useEffect(() => {
    if (!editor || content === editor.getHTML()) return;
    editor.commands.setContent(content);
  }, [editor, content]);

  // 단축키 이벤트 핸들러
  useEffect(() => {
    if (!editor) return;

    const handleSaveShortcut = (e) => {
      const isMac = navigator.userAgent.includes("Mac");
      const isSaveKey = (isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s");

      if (isSaveKey) {
        e.preventDefault();
        onDraft(challengeTitle, editor.getHTML());
      }
    };

    document.addEventListener("keydown", handleSaveShortcut);
    return () => document.removeEventListener("keydown", handleSaveShortcut);
  }, [editor, challengeTitle, onDraft]);

  if (!editor) return null;

  return (
    <div className="flex flex-col rounded-lg border-t border-gray-200">
      <div className="flex flex-col items-start justify-between">
        <EditorToolbar editor={editor} />
        {isDrafting && (
          <div className="flex h-6 w-full items-center gap-1 pt-1 pb-2 pl-1">
            <span className="text-sm text-gray-500">임시 저장중</span>
            <ClipLoader color="#3B82F6" size={10} />
          </div>
        )}
      </div>

      <EditorContent
        editor={editor}
        className="h-[calc(100vh-250px)] min-h-[300px] overflow-y-auto pb-5 text-lg sm:pb-0 [&_.is-editor-empty]:before:pointer-events-none [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:h-0 [&_.is-editor-empty]:before:text-lg [&_.is-editor-empty]:before:text-gray-400 [&_.is-editor-empty]:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
}
