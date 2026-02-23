import { useState, useCallback, useRef } from "react";
import { javaExamples, type ExecutionStep } from "@/lib/java-simulator";
import CodeEditor from "@/components/CodeEditor";
import StackPanel from "@/components/StackPanel";
import HeapPanel from "@/components/HeapPanel";
import ConsoleOutput from "@/components/ConsoleOutput";
import ExplanationPanel from "@/components/ExplanationPanel";
import ControlBar from "@/components/ControlBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code2, GraduationCap } from "lucide-react";

const emptyStep: ExecutionStep = {
  lineNumber: -1,
  stackFrames: [],
  heapObjects: [],
  consoleOutput: [],
  explanation: "",
};

export default function Index() {
  const [selectedExampleId, setSelectedExampleId] = useState(javaExamples[0].id);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const runRef = useRef(false);

  const example = javaExamples.find((e) => e.id === selectedExampleId) ?? javaExamples[0];
  const steps = example.steps;
  const step = currentStep >= 0 ? steps[currentStep] : emptyStep;

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleReset = useCallback(() => {
    runRef.current = false;
    setIsRunning(false);
    setCurrentStep(-1);
  }, []);

  const handleRunAll = useCallback(() => {
    runRef.current = true;
    setIsRunning(true);
    let s = currentStep < 0 ? 0 : currentStep;
    setCurrentStep(s);

    const interval = setInterval(() => {
      if (!runRef.current) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }
      s += 1;
      if (s >= steps.length) {
        clearInterval(interval);
        setIsRunning(false);
        runRef.current = false;
        return;
      }
      setCurrentStep(s);
    }, 800);
  }, [currentStep, steps.length]);

  const handleExampleChange = useCallback((id: string) => {
    runRef.current = false;
    setIsRunning(false);
    setSelectedExampleId(id);
    setCurrentStep(-1);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <h1 className="text-base font-bold text-foreground">Java Tutor</h1>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">HTW Berlin – Interaktiver Ausführungsvisualisierer</span>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedExampleId} onValueChange={handleExampleChange}>
            <SelectTrigger className="w-[200px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {javaExamples.map((ex) => (
                <SelectItem key={ex.id} value={ex.id}>
                  <div>
                    <div className="font-medium">{ex.title}</div>
                    <div className="text-xs text-muted-foreground">{ex.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Controls */}
      <div className="px-4 py-2 border-b border-border bg-card/50 shrink-0">
        <ControlBar
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onReset={handleReset}
          onRunAll={handleRunAll}
          isRunning={isRunning}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-1 min-h-0">
        {/* Left: Code Editor */}
        <div className="w-1/2 lg:w-[55%] p-3 min-h-0">
          <CodeEditor code={example.code} currentLine={step.lineNumber} />
        </div>

        {/* Right: Visualization panels */}
        <div className="w-1/2 lg:w-[45%] border-l border-border p-3 min-h-0 flex flex-col">
          <Tabs defaultValue="stack" className="flex flex-col flex-1 min-h-0">
            <TabsList className="bg-secondary/50 shrink-0">
              <TabsTrigger value="stack" className="text-xs gap-1 data-[state=active]:text-panel-stack">
                Stack
              </TabsTrigger>
              <TabsTrigger value="heap" className="text-xs gap-1 data-[state=active]:text-panel-heap">
                Heap
              </TabsTrigger>
              <TabsTrigger value="console" className="text-xs gap-1 data-[state=active]:text-panel-console">
                Konsole
              </TabsTrigger>
              <TabsTrigger value="explanation" className="text-xs gap-1 data-[state=active]:text-panel-explanation">
                Erklärung
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-auto mt-2 min-h-0">
              <TabsContent value="stack" className="h-full mt-0">
                <StackPanel stackFrames={step.stackFrames} />
              </TabsContent>
              <TabsContent value="heap" className="h-full mt-0">
                <HeapPanel heapObjects={step.heapObjects} />
              </TabsContent>
              <TabsContent value="console" className="h-full mt-0">
                <ConsoleOutput lines={step.consoleOutput} />
              </TabsContent>
              <TabsContent value="explanation" className="h-full mt-0">
                <ExplanationPanel explanation={step.explanation} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
