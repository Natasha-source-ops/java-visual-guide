import type { HeapObject } from "@/lib/java-simulator";
import { Box } from "lucide-react";

interface HeapPanelProps {
  heapObjects: HeapObject[];
}

function parseField(raw: string): { field: string; value: string } | null {
  const match = raw.match(/^\s*([^=]+?)\s*=\s*(.+)\s*$/);
  if (!match) return null;
  return { field: match[1].trim(), value: match[2].trim() };
}

export default function HeapPanel({ heapObjects }: HeapPanelProps) {
  if (heapObjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3 rounded-lg border border-dashed border-border bg-card/40">
        <Box className="w-8 h-8 opacity-40" />
        <p className="text-sm">Noch keine Objekte auf dem Heap.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-1">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-panel-heap" />
          <h3 className="text-xs font-semibold text-panel-heap uppercase tracking-wider">Heap (Speicher)</h3>
        </div>
        <span className="text-[11px] text-muted-foreground font-code">
          {heapObjects.length} Objekt{heapObjects.length === 1 ? "" : "e"}
        </span>
      </div>

      {heapObjects.map((obj) => {
        const values = obj.values ?? [];
        const isArrayLike = Boolean(obj.indices?.length) && obj.indices!.length === values.length;
        const colCount = Math.max(values.length, 1);

        return (
          <div
            key={obj.id}
            className="rounded-lg border border-slate-300 bg-white text-slate-900 shadow-sm overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-slate-200 bg-slate-100 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold font-code truncate">{obj.label}</p>
                <p className="text-[11px] text-slate-600 truncate">{obj.type}</p>
              </div>
              <span className="px-2 py-0.5 rounded border border-slate-300 bg-white text-[10px] font-code text-slate-600 shrink-0">
                @{obj.id}
              </span>
            </div>

            <div className="p-3">
              {values.length === 0 ? (
                <p className="text-xs text-slate-500 italic">Keine Felder</p>
              ) : isArrayLike ? (
                <div className="space-y-1.5">
                  <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${colCount}, minmax(3.25rem, 1fr))` }}
                  >
                    {obj.indices?.map((index) => (
                      <div
                        key={`${obj.id}-idx-${index}`}
                        className="h-6 flex items-center justify-center rounded border border-slate-200 bg-slate-50 text-[10px] font-code text-slate-600"
                      >
                        [{index}]
                      </div>
                    ))}
                  </div>
                  <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${colCount}, minmax(3.25rem, 1fr))` }}
                  >
                    {values.map((val, i) => (
                      <div
                        key={`${obj.id}-val-${i}`}
                        className={`h-9 px-1 flex items-center justify-center rounded border text-xs font-code transition-all duration-500 ${
                          obj.highlightIndex === i
                            ? "border-primary bg-primary/10 text-primary value-changed shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.35)]"
                            : "border-slate-300 bg-white text-slate-900"
                        }`}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {values.map((raw, index) => {
                    const parsed = parseField(raw);
                    if (!parsed) {
                      return (
                        <div
                          key={`${obj.id}-raw-${index}`}
                          className="px-2 py-1.5 rounded border border-slate-200 bg-slate-50 text-xs font-code text-slate-700"
                        >
                          {raw}
                        </div>
                      );
                    }

                    const isReference = parsed.value.includes("→");

                    return (
                      <div
                        key={`${obj.id}-field-${parsed.field}-${index}`}
                        className="grid grid-cols-[1fr_auto] items-center gap-2 px-2 py-1.5 rounded border border-slate-200 bg-slate-50"
                      >
                        <span className="text-xs font-code text-slate-700 truncate">{parsed.field}</span>
                        <span
                          className={`px-2 py-0.5 rounded border text-xs font-code shrink-0 ${
                            isReference
                              ? "border-sky-300 bg-sky-50 text-sky-700"
                              : "border-slate-300 bg-white text-slate-900"
                          }`}
                        >
                          {parsed.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
