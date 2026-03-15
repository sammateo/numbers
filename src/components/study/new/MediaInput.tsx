import { useState } from "react";
import { X, Plus, Link as LinkIcon, Youtube, Image as ImageIcon } from "lucide-react";

interface Media {
  id: string;
  type: "youtube" | "link" | "image";
  url: string;
  title?: string;
}

interface MediaInputProps {
  media: Media[];
  onChange: (media: Media[]) => void;
}

export function MediaInput({ media, onChange }: MediaInputProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [mediaType, setMediaType] = useState<"youtube" | "link" | "image">("youtube");

  const addMedia = () => {
    if (url.trim()) {
      onChange([
        ...media,
        {
          id: Date.now().toString(),
          type: mediaType,
          url: url.trim(),
          title: title.trim() || undefined,
        },
      ]);
      setUrl("");
      setTitle("");
    }
  };

  const removeMedia = (id: string) => {
    onChange(media.filter((m) => m.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "youtube":
        return Youtube;
      case "image":
        return ImageIcon;
      default:
        return LinkIcon;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex gap-2">
          {(["youtube", "link", "image"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMediaType(type)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                mediaType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={
              mediaType === "youtube"
                ? "YouTube URL"
                : mediaType === "image"
                ? "Image URL"
                : "Link URL"
            }
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              className="flex-1 px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={addMedia}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {media.length > 0 && (
        <div className="space-y-2">
          {media.map((item) => {
            const Icon = getIcon(item.type);
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
              >
                <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  {item.title && <div className="font-medium truncate">{item.title}</div>}
                  <div className="text-sm text-muted-foreground truncate">{item.url}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeMedia(item.id)}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
