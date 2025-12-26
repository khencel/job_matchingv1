"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";



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

    if (!editor) return null;


  return (
    <div className="border rounded p-3 bg-white">
        
      <EditorContent editor={editor} className="ProseMirror mb-2" />
      
      <div className="mb-2 d-flex gap-1">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          •
        </button>

        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1.
        </button>
        
      </div>

      
    </div>
  );
}
