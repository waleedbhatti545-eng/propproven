"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface TagListEditorProps {
  tags: string[];
  onChange: (newTags: string[]) => void;
  placeholder?: string;
  label: string;
}

export function TagListEditor({ tags, onChange, placeholder = "Add item...", label }: TagListEditorProps) {
  const [inputVal, setInputVal] = useState("");

  const handleAdd = () => {
    if (inputVal.trim() && !tags.includes(inputVal.trim())) {
      onChange([...tags, inputVal.trim()]);
      setInputVal("");
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(tags.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-neutral-300">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, i) => (
          <div key={i} className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-lg text-sm group transition-all hover:bg-indigo-500/20">
            {tag}
            <button onClick={() => handleRemove(i)} className="text-indigo-400 hover:text-white transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
          placeholder={placeholder}
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        <button type="button" onClick={handleAdd} className="bg-white/5 hover:bg-white/10 text-white p-2 rounded-xl transition-colors border border-white/10">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
