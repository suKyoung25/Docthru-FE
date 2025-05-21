import React from "react";
import Editor from "./Editor";

export default function EditorSection({
  challengeTitle = "챌린지 제목",
  content,
  handleContent,
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold">{challengeTitle}</span>
      <Editor content={content} handleContent={handleContent} />
    </div>
  );
}
