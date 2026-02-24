import type { StackFrame } from "@/lib/java-simulator";
import { Layers } from "lucide-react";

interface StackPanelProps {
  stackFrames: StackFrame[];
}

export default function StackPanel({ stackFrames }: StackPanelProps) {
  if (stackFrames.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
        <Layers className="w-8 h-8 opacity-40" />
        <p className="text-sm">Drücke „Nächster Schritt" um zu beginnen.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-1">
      <div className="flex items-center gap-2 mb-2">
        <Layers className="w-4 h-4 text-panel-stack" />
        <h3 className="text-xs font-semibold text-panel-stack uppercase tracking-wider">Call Stack</h3>
      </div>
      {[...stackFrames].reverse().map((frame, idx) => (
        <div
          key={`${frame.methodName}-${idx}`}
          className={`rounded-md border transition-all duration-300 ${
            idx === 0
              ? "border-panel-stack/50 bg-panel-stack/5"
              : "border-border bg-secondary/30"
          }`}
        >
          <div className={`px-3 py-1.5 text-xs font-code font-semibold border-b ${
            idx === 0 ? "border-panel-stack/30 text-panel-stack" : "border-border text-muted-foreground"
          }`}>
            {idx === 0 && <span className="inline-block w-1.5 h-1.5 rounded-full bg-panel-stack mr-2 animate-pulse" />}
            {frame.methodName}()
          </div>
          <div className="px-3 py-2 space-y-1">
            {frame.variables.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">Keine Variablen</p>
            ) : (
              frame.variables.map((v) => (
                <div key={v.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 text-xs font-code">
                  <div className="min-w-0 flex items-center gap-2 overflow-hidden">
                    <span className="text-code-type shrink-0 max-w-[8.5rem] truncate">{v.type}</span>
                    <span className="text-foreground truncate">{v.name}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-muted-foreground">=</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-xs whitespace-nowrap transition-all duration-500 ${
                        v.changed
                          ? "bg-primary/20 text-primary font-bold value-changed"
                          : v.isReference
                            ? "text-accent"
                            : "text-foreground bg-secondary/50"
                      }`}
                    >
                      {v.value}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
