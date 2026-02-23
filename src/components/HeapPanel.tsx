import type { HeapObject } from "@/lib/java-simulator";
import { Box } from "lucide-react";

interface HeapPanelProps {
  heapObjects: HeapObject[];
}

export default function HeapPanel({ heapObjects }: HeapPanelProps) {
  if (heapObjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
        <Box className="w-8 h-8 opacity-40" />
        <p className="text-sm">Noch keine Objekte auf dem Heap.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-1">
      <div className="flex items-center gap-2 mb-2">
        <Box className="w-4 h-4 text-panel-heap" />
        <h3 className="text-xs font-semibold text-panel-heap uppercase tracking-wider">Heap (Speicher)</h3>
      </div>
      {heapObjects.map((obj) => (
        <div
          key={obj.id}
          className="rounded-md border border-panel-heap/30 bg-panel-heap/5"
        >
          <div className="px-3 py-1.5 text-xs font-code font-semibold border-b border-panel-heap/20 text-panel-heap">
            {obj.label}
            <span className="text-muted-foreground ml-2 font-normal">#{obj.id}</span>
          </div>
          {obj.values && (
            <div className="p-3">
              {/* Index row */}
              <div className="flex gap-0.5 mb-1">
                {obj.indices?.map((i) => (
                  <div
                    key={i}
                    className="w-12 text-center text-[10px] text-muted-foreground font-code"
                  >
                    [{i}]
                  </div>
                ))}
              </div>
              {/* Value row */}
              <div className="flex gap-0.5">
                {obj.values.map((val, i) => (
                  <div
                    key={i}
                    className={`w-12 h-10 flex items-center justify-center text-sm font-code font-semibold rounded border transition-all duration-500 ${
                      obj.highlightIndex === i
                        ? "border-primary bg-primary/20 text-primary value-changed"
                        : "border-panel-heap/30 bg-secondary/40 text-foreground"
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
