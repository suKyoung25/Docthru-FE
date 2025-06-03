import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";

export const editorExtensions = [
  StarterKit.configure({
    bulletList: false,
    orderedList: false,
    listItem: false
  }),
  TextStyle,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph", "bulletList", "orderedList"]
  }),
  Color.configure({ types: [TextStyle.name] }),
  BulletList,
  OrderedList,
  ListItem.configure({
    HTMLAttributes: {
      class: "list-item"
    }
  }),
  Placeholder.configure({
    placeholder: "번역 내용을 적어주세요",
    emptyEditorClass: "is-editor-empty"
  })
];

// 에디터에서 사용하는 색상 팔레트
export const editorColors = [
  "#000000", // Black
  "#EF4444", // Red
  "#F97316", // Orange
  "#EAB308", // Yellow
  "#22C55E", // Green
  "#3B82F6", // Blue
  "#6366F1", // Indigo
  "#A855F7" // Purple
];
