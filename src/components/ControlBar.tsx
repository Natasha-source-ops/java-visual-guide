import { ChevronLeft, ChevronRight, FastForward, RotateCcw, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ControlBarProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onRunAll: () => void;
  isRunning: boolean;
}

export default function ControlBar({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onReset,
  onRunAll,
  isRunning,
}: ControlBarProps) {
  const hasStarted = currentStep >= 0;
  const isFinished = currentStep >= totalSteps - 1;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        disabled={!hasStarted}
        className="gap-1.5"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Zurücksetzen
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onPrev}
        disabled={currentStep <= 0}
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Zurück
      </Button>

      <Button
        size="sm"
        onClick={onNext}
        disabled={isFinished || isRunning}
        className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {hasStarted ? (
          <>
            <ChevronRight className="w-4 h-4" />
            Nächster Schritt
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5" />
            Start
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onRunAll}
        disabled={isFinished || isRunning}
        className="gap-1.5"
      >
        <FastForward className="w-3.5 h-3.5" />
        Ausführen
      </Button>

      <div className="ml-auto text-xs text-muted-foreground font-code">
        {hasStarted ? (
          <span>
            Schritt <span className="text-primary font-semibold">{currentStep + 1}</span> / {totalSteps}
          </span>
        ) : (
          <span>Bereit</span>
        )}
      </div>
    </div>
  );
}
