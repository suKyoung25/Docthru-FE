"use client";

import { useState } from "react";
import Image from "next/image";
import { editorColors } from "./editorConfig";

// Import icons
import IconBold from "@/assets/editor/ic_bold.svg";
import IconItalic from "@/assets/editor/ic_italic.svg";
import IconUnderline from "@/assets/editor/ic_underline.svg";
import IconLeft from "@/assets/editor/ic_left.svg";
import IconCenter from "@/assets/editor/ic_center.svg";
import IconRight from "@/assets/editor/ic_right.svg";
import IconOrderedList from "@/assets/editor/ic_list_ordered.svg";
import IconBulletList from "@/assets/editor/ic_list_bullet.svg";
import IconTextColor from "@/assets/editor/ic_textColor.svg";

export default function EditorToolbar({ editor }) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="flex items-center gap-1 pt-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 ${editor.isActive("bold") ? "rounded bg-gray-200" : ""}`}
      >
        <Image src={IconBold} alt="Bold" width={10} height={14} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 ${editor.isActive("italic") ? "rounded bg-gray-200" : ""}`}
      >
        <Image src={IconItalic} alt="Italic" width={12} height={14} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 ${editor.isActive("underline") ? "rounded bg-gray-200" : ""}`}
      >
        <Image src={IconUnderline} alt="Underline" width={12} height={15} />
      </button>

      <div className="mx-2 h-6 w-[1px] bg-gray-200" />
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 ${editor.isActive({ textAlign: "center" }) ? "rounded bg-gray-200" : ""}`}
      >
        <Image src={IconCenter} alt="Align Center" width={14} height={14} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 ${editor.isActive({ textAlign: "right" }) ? "rounded bg-gray-200" : ""}`}
      >
        <Image src={IconRight} alt="Align Right" width={14} height={14} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 ${editor.isActive({ textAlign: "left" }) ? "rounded bg-gray-200" : ""}`}
      >
        <Image src={IconLeft} alt="Align Left" width={14} height={14} />
      </button>
      <div className="mx-2 h-6 w-[1px] bg-gray-200" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 ${editor.isActive("bulletList") ? "rounded bg-gray-200" : ""}`}
      >
        <Image src={IconBulletList} alt="Bullet List" width={14} height={14} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 ${editor.isActive("orderedList") ? "rounded bg-gray-200" : ""}`}
      >
        <Image src={IconOrderedList} alt="Ordered List" width={14} height={14} />
      </button>

      <div className="relative">
        <button onClick={() => setShowColorPicker(!showColorPicker)} className="p-2 pl-5">
          <Image src={IconTextColor} alt="Text Color" width={14} height={14} />
        </button>
        {showColorPicker && (
          <div className="absolute top-full left-0 z-10 mt-1 flex gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
            {editorColors.map((color) => (
              <button
                key={color}
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: color }}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  setShowColorPicker(false);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
