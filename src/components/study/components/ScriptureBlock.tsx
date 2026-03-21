interface ScriptureBlockProps {
  reference: string;
  text: string;
}

export function ScriptureBlock({ reference, text }: ScriptureBlockProps) {
  return (
    <div className="my-4 md:my-6 p-4 md:p-6 bg-secondary/50 rounded-lg border-l-4 border-primary">
      <div className="text-xs md:text-sm text-accent mb-2">{reference}</div>
      <div className="text-base md:text-lg leading-relaxed italic text-foreground">
        {text}
      </div>
    </div>
  );
}
