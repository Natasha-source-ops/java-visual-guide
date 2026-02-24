import { useState, useCallback, useRef } from "react";
import { javaExamples, type ExecutionStep } from "@/lib/java-simulator";
import CodeEditor from "@/components/CodeEditor";
import StackPanel from "@/components/StackPanel";
import HeapPanel from "@/components/HeapPanel";
import ConsoleOutput from "@/components/ConsoleOutput";
import ExplanationPanel from "@/components/ExplanationPanel";
import QuizPanel from "@/components/QuizPanel";
import ControlBar from "@/components/ControlBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code2, GraduationCap, Brain } from "lucide-react";

const emptyStep: ExecutionStep = {
  lineNumber: -1,
  stackFrames: [],
  heapObjects: [],
  consoleOutput: [],
  explanation: "",
};

interface QuizAnswer {
  question1?: string;
  line?: number;
  snippet?: string;
  concept?: string;
  question4?: string;
}

const VORLESUNG3 = "VL 03 - Instanzen, Klassen, Pakete";
const VORLESUNG4 = "04-Typen, Module, Schnittstellen 11.05.25";

function buildQuizOptions(correctLine: number, currentLine: number, maxLine: number, tracedLines: number[]) {
  const candidates = new Set<number>();
  if (correctLine > 0) candidates.add(correctLine);
  if (currentLine > 0) candidates.add(currentLine);
  if (correctLine - 1 > 0) candidates.add(correctLine - 1);
  if (correctLine + 1 <= maxLine) candidates.add(correctLine + 1);
  if (currentLine - 1 > 0) candidates.add(currentLine - 1);
  if (currentLine + 1 <= maxLine) candidates.add(currentLine + 1);

  for (const line of tracedLines) {
    if (line > 0 && line <= maxLine) candidates.add(line);
    if (candidates.size >= 8) break;
  }

  const sorted = Array.from(candidates).sort((a, b) => a - b);
  if (sorted.length <= 4) return sorted;

  const trimmed = sorted.slice(0, 4);
  if (!trimmed.includes(correctLine)) {
    trimmed[trimmed.length - 1] = correctLine;
  }
  return Array.from(new Set(trimmed)).sort((a, b) => a - b);
}

export default function Index() {
  const [selectedExampleId, setSelectedExampleId] = useState(javaExamples[0].id);
  const [selectedSemester, setSelectedSemester] = useState<"semester1" | "semester2">(javaExamples[0].semester);
  const [selectedLecture, setSelectedLecture] = useState<string>(VORLESUNG3);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, QuizAnswer>>({});
  const runRef = useRef(false);
  const semester1Examples = javaExamples.filter((exampleItem) => exampleItem.semester === "semester1");
  const semester2Examples = javaExamples.filter((exampleItem) => exampleItem.semester === "semester2");
  const semester2Lectures = [VORLESUNG3, VORLESUNG4];
  const semesterExamples =
    selectedSemester === "semester1"
      ? semester1Examples
      : semester2Examples.filter((exampleItem) => exampleItem.lecture === selectedLecture);

  const example =
    semesterExamples.find((e) => e.id === selectedExampleId) ??
    semesterExamples[0] ??
    javaExamples[0];
  const steps = example.steps;
  const step = currentStep >= 0 ? steps[currentStep] : emptyStep;
  const previousLine = currentStep > 0 ? steps[currentStep - 1].lineNumber : -1;
  const hasNextStep = currentStep < steps.length - 1;
  const nextStepIndex = currentStep < 0 ? 0 : currentStep + 1;
  const nextStep = hasNextStep ? steps[nextStepIndex] : undefined;
  const correctNextLine = nextStep?.lineNumber ?? -1;
  const tracedLines = Array.from(new Set(steps.map((s) => s.lineNumber).filter((line) => line > 0)));
  const quizOptions = buildQuizOptions(
    correctNextLine,
    step.lineNumber,
    example.code.split("\n").length,
    tracedLines,
  );
  const quizKey = `${selectedExampleId}:${currentStep}`;
  const selectedQuizAnswer = quizAnswers[quizKey] ?? {};

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
    setQuizAnswers({});
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
    setQuizAnswers({});
  }, []);

  const handleSemesterChange = useCallback((semester: "semester1" | "semester2") => {
    runRef.current = false;
    setIsRunning(false);
    setCurrentStep(-1);
    setQuizAnswers({});
    setSelectedSemester(semester);

    if (semester === "semester2") {
      setSelectedLecture(VORLESUNG3);
    }

    const nextSemesterExamples =
      semester === "semester1"
        ? semester1Examples
        : semester2Examples.filter((exampleItem) => exampleItem.lecture === VORLESUNG3);
    const firstExample = nextSemesterExamples[0];
    if (firstExample) {
      setSelectedExampleId(firstExample.id);
    }
  }, [semester1Examples, semester2Examples]);

  const handleLectureChange = useCallback((lecture: string) => {
    runRef.current = false;
    setIsRunning(false);
    setCurrentStep(-1);
    setQuizAnswers({});
    setSelectedLecture(lecture);

    const firstExample = semester2Examples.find((exampleItem) => exampleItem.lecture === lecture);
    if (firstExample) {
      setSelectedExampleId(firstExample.id);
    }
  }, [semester2Examples]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <h1 className="text-base font-bold text-foreground">Java Tutor</h1>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline">Interaktiver Ausführungsvisualisierer</span>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedSemester} onValueChange={(value) => handleSemesterChange(value as "semester1" | "semester2")}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester1">Semester 1</SelectItem>
              <SelectItem value="semester2">Semester 2</SelectItem>
            </SelectContent>
          </Select>

          {selectedSemester === "semester2" ? (
            <Select value={selectedLecture} onValueChange={handleLectureChange}>
              <SelectTrigger className="w-[320px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {semester2Lectures.map((lecture) => (
                  <SelectItem key={lecture} value={lecture}>
                    <span className="truncate">{lecture}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}

          {selectedSemester === "semester2" ? (
            <Select value={selectedExampleId} onValueChange={handleExampleChange}>
              <SelectTrigger className="w-[280px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {semesterExamples.map((ex) => (
                  <SelectItem key={ex.id} value={ex.id}>
                    <div className="flex flex-col">
                      <span className="font-medium text-xs">{ex.title}</span>
                      <span className="text-[11px] text-muted-foreground">{ex.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}

          {selectedSemester === "semester1" ? (
            <Select value={selectedExampleId} onValueChange={handleExampleChange}>
              <SelectTrigger className="w-[260px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {semesterExamples.map((ex) => (
                  <SelectItem key={ex.id} value={ex.id}>
                    <div className="flex flex-col">
                      <span className="font-medium text-xs">{ex.title}</span>
                      <span className="text-[11px] text-muted-foreground">{ex.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
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
          <CodeEditor
            code={example.code}
            currentLine={step.lineNumber}
            previousLine={previousLine}
          />
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
              <TabsTrigger value="quiz" className="text-xs gap-1 data-[state=active]:text-primary">
                <Brain className="w-3 h-3" />
                Quiz
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
              <TabsContent value="quiz" className="h-full mt-0">
                <QuizPanel
                  currentLine={step.lineNumber}
                  hasNextStep={hasNextStep}
                  lineOptions={quizOptions}
                  correctLine={correctNextLine}
                  codeLines={example.code.split("\n")}
                  customQuestion1={example.customQuestion1}
                  customQuestion2={example.customQuestion2}
                  customQuestion3={example.customQuestion3}
                  customQuestion4={example.customQuestion4}
                  selectedQuestion1={selectedQuizAnswer.question1}
                  selectedLine={selectedQuizAnswer.line}
                  selectedSnippet={selectedQuizAnswer.snippet}
                  selectedConcept={selectedQuizAnswer.concept}
                  selectedQuestion4={selectedQuizAnswer.question4}
                  onSelectQuestion1={(question1) =>
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [quizKey]: {
                        ...(prev[quizKey] ?? {}),
                        question1,
                      },
                    }))
                  }
                  onSelectLine={(line) =>
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [quizKey]: {
                        ...(prev[quizKey] ?? {}),
                        line,
                      },
                    }))
                  }
                  onSelectSnippet={(snippet) =>
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [quizKey]: {
                        ...(prev[quizKey] ?? {}),
                        snippet,
                      },
                    }))
                  }
                  onSelectConcept={(concept) =>
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [quizKey]: {
                        ...(prev[quizKey] ?? {}),
                        concept,
                      },
                    }))
                  }
                  onSelectQuestion4={(question4) =>
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [quizKey]: {
                        ...(prev[quizKey] ?? {}),
                        question4,
                      },
                    }))
                  }
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
