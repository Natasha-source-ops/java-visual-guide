import { useMemo } from "react";

interface CodeEditorProps {
  code: string;
  currentLine: number; // 1-based, -1 = no highlight
}

function highlightSyntax(line: string): string {
  let escaped = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments
  escaped = escaped.replace(
    /(\/\/.*)$/,
    '<span class="text-code-comment">$1</span>'
  );

  // Strings
  escaped = escaped.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span class="text-code-string">$1</span>'
  );

  // Keywords
  const keywords = /\b(public|static|void|int|double|boolean|char|String|new|return|if|else|for|while|do|class|extends|implements|abstract|interface|null|true|false|this|super)\b/g;
  escaped = escaped.replace(
    keywords,
    '<span class="text-code-keyword font-semibold">$1</span>'
  );

  // Types
  escaped = escaped.replace(
    /\b(System|ArrayList|List|Math)\b/g,
    '<span class="text-code-type">$1</span>'
  );

  // Numbers (not inside already tagged spans)
  escaped = escaped.replace(
    /\b(\d+)\b/g,
    '<span class="text-code-number">$1</span>'
  );

  // Method calls
  escaped = escaped.replace(
    /\b(\w+)(?=\()/g,
    (match, name) => {
      if (["if", "for", "while", "do", "class", "new", "return", "int", "double", "boolean", "char", "void", "public", "static", "abstract"].includes(name)) return match;
      return `<span class="text-code-method">${name}</span>`;
    }
  );

  return escaped;
}

export default function CodeEditor({ code, currentLine }: CodeEditorProps) {
  const lines = useMemo(() => code.split("\n"), [code]);

  return (
    <div className="h-full flex flex-col bg-code-bg rounded-lg border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/70" />
          <div className="w-3 h-3 rounded-full bg-code-string/70" />
          <div className="w-3 h-3 rounded-full bg-primary/70" />
        </div>
        <span className="text-xs text-muted-foreground font-code ml-2">Main.java</span>
      </div>
      <div className="flex-1 overflow-auto p-0">
        <pre className="font-code text-sm leading-6">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isActive = lineNum === currentLine;
            return (
              <div
                key={idx}
                className={`flex transition-colors duration-300 ${
                  isActive
                    ? "bg-code-line-highlight/15 line-highlight-pulse"
                    : "hover:bg-secondary/30"
                }`}
              >
                <span
                  className={`inline-block w-12 text-right pr-4 select-none shrink-0 text-xs leading-6 ${
                    isActive ? "text-primary font-bold" : "text-code-line-number"
                  }`}
                >
                  {lineNum}
                </span>
                <span
                  className={`flex-1 px-2 ${isActive ? "text-foreground" : ""}`}
                  dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
                />
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
