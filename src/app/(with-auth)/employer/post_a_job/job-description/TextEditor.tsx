"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";



interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {

    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        immediatelyRender: false, 

        onUpdate: ({ editor }) => {
          const html = editor.getHTML();
          onChange(html); 
        },
    });

    useEffect(() => {
      if (!editor) return;

      const currentHTML = editor.getHTML();

      if (value !== currentHTML) {
        editor.commands.setContent(value || "");
      }
    }, [value, editor]);

    if (!editor) return null;


  return (
  <div className="editor-wrapper">
    {/* Toolbar */}
    <div className="editor-toolbar">
      <button
        className={editor.isActive("bold") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <b>B</b>
      </button>

      <button
        className={editor.isActive("italic") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i>I</i>
      </button>

      <button
        className={editor.isActive("bulletList") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        •
      </button>

      <button
        className={editor.isActive("orderedList") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </button>
    </div>

    {/* Editor */}
    <div className="editor-content">
      <EditorContent editor={editor} />
    </div>
  </div>
);

}
