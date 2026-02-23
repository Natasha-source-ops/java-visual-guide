import { MessageCircle } from "lucide-react";

interface ExplanationPanelProps {
  explanation: string;
}

export default function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  if (!explanation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
        <MessageCircle className="w-8 h-8 opacity-40" />
        <p className="text-sm">Starte die Ausführung, um Erklärungen zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-1">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-4 h-4 text-panel-explanation" />
        <h3 className="text-xs font-semibold text-panel-explanation uppercase tracking-wider">Erklärung</h3>
      </div>
      <div className="flex-1 rounded-md border border-panel-explanation/20 bg-panel-explanation/5 p-4">
        <p className="text-sm leading-relaxed text-foreground/90">{explanation}</p>
      </div>
    </div>
  );
}
