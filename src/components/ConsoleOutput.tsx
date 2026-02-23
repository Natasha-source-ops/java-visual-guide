import { Terminal } from "lucide-react";

interface ConsoleOutputProps {
  lines: string[];
}

export default function ConsoleOutput({ lines }: ConsoleOutputProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 p-1">
        <Terminal className="w-4 h-4 text-panel-console" />
        <h3 className="text-xs font-semibold text-panel-console uppercase tracking-wider">Konsolenausgabe</h3>
      </div>
      <div className="flex-1 bg-code-bg rounded-md border border-border p-3 font-code text-sm overflow-auto">
        {lines.length === 0 ? (
          <span className="text-muted-foreground italic text-xs">Noch keine Ausgabe...</span>
        ) : (
          lines.map((line, i) => (
            <div
              key={i}
              className={`transition-all duration-300 ${
                i === lines.length - 1 ? "text-panel-console" : "text-foreground/70"
              }`}
            >
              <span className="text-muted-foreground mr-2 select-none">&gt;</span>
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
