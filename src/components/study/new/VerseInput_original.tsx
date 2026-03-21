import { useState } from "react";
import { X, Plus } from "lucide-react";

interface Verse {
  id: string;
  reference: string;
  text: string;
}

interface VerseInputProps {
  verses: Verse[];
  onChange: (verses: Verse[]) => void;
}

export function VerseInput({ verses, onChange }: VerseInputProps) {
  const [reference, setReference] = useState("");
  const [text, setText] = useState("");

  const addVerse = () => {
    if (reference.trim() && text.trim()) {
      onChange([
        ...verses,
        {
          id: Date.now().toString(),
          reference: reference.trim(),
          text: text.trim(),
        },
      ]);
      setReference("");
      setText("");
    }
  };

  const removeVerse = (id: string) => {
    onChange(verses.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="John 3:16"
            className="px-4 py-2 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="md:col-span-2 flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="For God so loved the world..."
              className="flex-1 px-4 py-2 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={addVerse}
              className="px-3 md:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {verses.length > 0 && (
        <div className="space-y-2">
          {verses.map((verse) => (
            <div
              key={verse.id}
              className="flex items-start gap-3 p-3 md:p-4 bg-secondary rounded-lg border-l-4 border-primary"
            >
              <div className="flex-1 space-y-1 min-w-0">
                <div className="text-xs md:text-sm text-accent">
                  {verse.reference}
                </div>
                <div className="text-sm md:text-base text-foreground leading-relaxed wrap-break-word">
                  {verse.text}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeVerse(verse.id)}
                className="p-1 hover:bg-background rounded transition-colors shrink-0"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
