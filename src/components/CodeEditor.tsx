import { useMemo } from "react";

interface CodeEditorProps {
  code: string;
  currentLine: number; // 1-based, -1 = no highlight
  previousLine?: number; // 1-based, -1 = no highlight
}

export default function CodeEditor({ code, currentLine, previousLine = -1 }: CodeEditorProps) {
  const lines = useMemo(() => code.split("\n"), [code]);

  return (
    <div className="h-full flex flex-col bg-code-bg rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-border bg-secondary/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/70" />
          <div className="w-3 h-3 rounded-full bg-code-string/70" />
          <div className="w-3 h-3 rounded-full bg-primary/70" />
        </div>
        <span className="text-xs text-muted-foreground font-code ml-2">Main.java</span>
        <div className="ml-auto flex items-center gap-3 text-[11px] text-muted-foreground font-code">
          <span className="inline-flex items-center gap-1">
            <span className="text-primary">▶</span>
            NOW
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="text-amber-500">↳</span>
            PREV
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-0">
        <pre className="font-code text-sm leading-6">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isActive = lineNum === currentLine;
            const isPrevious = lineNum === previousLine && !isActive;
            return (
              <div
                key={idx}
                className={`flex transition-colors duration-300 ${
                  isActive
                    ? "bg-code-line-highlight/15 line-highlight-pulse"
                    : isPrevious
                    ? "bg-amber-500/10"
                    : "hover:bg-secondary/30"
                }`}
              >
                <span className="inline-flex w-8 items-center justify-center shrink-0 text-xs font-semibold leading-6 select-none">
                  {isActive ? (
                    <span className="text-primary">▶</span>
                  ) : isPrevious ? (
                    <span className="text-amber-500">↳</span>
                  ) : (
                    <span className="text-transparent">·</span>
                  )}
                </span>
                <span
                  className={`inline-block w-12 text-right pr-4 select-none shrink-0 text-xs leading-6 ${
                    isActive
                      ? "text-primary font-bold"
                      : isPrevious
                      ? "text-amber-500 font-semibold"
                      : "text-code-line-number"
                  }`}
                >
                  {lineNum}
                </span>
                <span
                  className={`flex-1 px-2 ${isActive ? "text-foreground" : ""}`}
                >
                  {line || " "}
                </span>
                {isActive && (
                  <span className="w-1 bg-primary rounded-full mr-1 shrink-0" />
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
