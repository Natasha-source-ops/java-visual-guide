import { Brain, CheckCircle2, XCircle, ArrowRightCircle, FileCode2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/lib/java-simulator";

interface QuizPanelProps {
  currentLine: number;
  hasNextStep: boolean;
  lineOptions: number[];
  correctLine: number;
  codeLines: string[];
  customQuestion1?: QuizQuestion;
  customQuestion2?: QuizQuestion;
  customQuestion3?: QuizQuestion;
  customQuestion4?: QuizQuestion;
  selectedQuestion1?: string;
  selectedLine?: number;
  selectedSnippet?: string;
  selectedConcept?: string;
  selectedQuestion4?: string;
  onSelectQuestion1: (answer: string) => void;
  onSelectLine: (line: number) => void;
  onSelectSnippet: (snippet: string) => void;
  onSelectConcept: (concept: string) => void;
  onSelectQuestion4: (answer: string) => void;
}

const CONCEPT_OPTIONS = [
  "Objekterzeugung (new)",
  "Methodenaufruf",
  "Zuweisung/Aktualisierung",
  "Bedingungspruefung",
  "Schleifenkontrolle",
  "Konsolenausgabe",
  "Rueckgabe",
  "Deklaration/Definition",
];

function cleanLine(line: string): string {
  const trimmed = line.trim();
  return trimmed.length === 0 ? "(leer)" : trimmed;
}

function classifyLine(line: string): string {
  const t = line.trim();
  if (!t) return "Deklaration/Definition";
  if (/\bnew\b/.test(t)) return "Objekterzeugung (new)";
  if (/System\.out\.print/.test(t)) return "Konsolenausgabe";
  if (/^\s*(if|else if)\s*\(/.test(t)) return "Bedingungspruefung";
  if (/^\s*(for|while|do)\b/.test(t)) return "Schleifenkontrolle";
  if (/\breturn\b/.test(t)) return "Rueckgabe";
  if (/(^|\s)[\w<>\[\]]+\s+\w+\s*(=|;|\()/.test(t) && !/^\s*(if|for|while)\b/.test(t)) {
    if (/\w+\s+\w+\s*\(/.test(t)) return "Deklaration/Definition";
  }
  if (/=/.test(t) && !/(==|!=|<=|>=)/.test(t)) return "Zuweisung/Aktualisierung";
  if (/\w+\s*\(.*\)\s*;/.test(t)) return "Methodenaufruf";
  return "Deklaration/Definition";
}

function buildSnippetOptions(lineOptions: number[], codeLines: string[], correctLine: number): string[] {
  const choices = new Set<string>();
  lineOptions.forEach((line) => {
    if (line > 0 && line <= codeLines.length) {
      choices.add(cleanLine(codeLines[line - 1]));
    }
  });
  if (correctLine > 0 && correctLine <= codeLines.length) {
    choices.add(cleanLine(codeLines[correctLine - 1]));
  }
  for (let i = 0; i < codeLines.length && choices.size < 4; i++) {
    choices.add(cleanLine(codeLines[i]));
  }
  return Array.from(choices).slice(0, 4);
}

function buildConceptOptions(correctConcept: string): string[] {
  const options = [correctConcept, ...CONCEPT_OPTIONS.filter((c) => c !== correctConcept).slice(0, 3)];
  return Array.from(new Set(options));
}

export default function QuizPanel({
  currentLine,
  hasNextStep,
  lineOptions,
  correctLine,
  codeLines,
  customQuestion1,
  customQuestion2,
  customQuestion3,
  customQuestion4,
  selectedQuestion1,
  selectedLine,
  selectedSnippet,
  selectedConcept,
  selectedQuestion4,
  onSelectQuestion1,
  onSelectLine,
  onSelectSnippet,
  onSelectConcept,
  onSelectQuestion4,
}: QuizPanelProps) {
  if (!hasNextStep) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Brain className="w-8 h-8 opacity-40" />
        <p className="text-sm">Keine weiteren Schritte. Quiz abgeschlossen.</p>
      </div>
    );
  }

  const correctSnippet = correctLine > 0 && correctLine <= codeLines.length
    ? cleanLine(codeLines[correctLine - 1])
    : "(unbekannt)";
  const snippetOptions = buildSnippetOptions(lineOptions, codeLines, correctLine);
  const correctConcept = classifyLine(correctSnippet);
  const conceptOptions = buildConceptOptions(correctConcept);
  const totalQuestions = customQuestion4 ? 4 : 3;

  const question1Options = customQuestion1?.options ?? [];
  const question1Correct = customQuestion1?.correctOption;
  const question1Prompt = customQuestion1?.prompt;
  const question1Explanation = customQuestion1?.explanation;

  const question2Options = customQuestion2?.options ?? snippetOptions;
  const question2Correct = customQuestion2?.correctOption ?? correctSnippet;
  const question2Prompt = customQuestion2?.prompt ?? "Welcher Code steht in der naechsten ausgefuehrten Zeile?";
  const question2Explanation = customQuestion2?.explanation;

  const question3Options = customQuestion3?.options ?? conceptOptions;
  const question3Correct = customQuestion3?.correctOption ?? correctConcept;
  const question3Prompt = customQuestion3?.prompt ?? "Was macht die naechste Zeile hauptsaechlich?";
  const question3Explanation = customQuestion3?.explanation;

  const question4Options = customQuestion4?.options ?? [];
  const question4Correct = customQuestion4?.correctOption;
  const question4Prompt = customQuestion4?.prompt;
  const question4Explanation = customQuestion4?.explanation;

  const question1Answered = typeof selectedQuestion1 === "string";
  const question1CorrectlyAnswered = question1Answered && selectedQuestion1 === question1Correct;

  const lineAnswered = typeof selectedLine === "number";
  const lineCorrect = lineAnswered && selectedLine === correctLine;

  const snippetAnswered = typeof selectedSnippet === "string";
  const snippetCorrect = snippetAnswered && selectedSnippet === question2Correct;

  const conceptAnswered = typeof selectedConcept === "string";
  const conceptCorrect = conceptAnswered && selectedConcept === question3Correct;

  const question4Answered = typeof selectedQuestion4 === "string";
  const question4CorrectlyAnswered = question4Answered && selectedQuestion4 === question4Correct;
  const firstAnswered = customQuestion1 ? question1Answered : lineAnswered;
  const firstCorrect = customQuestion1 ? question1CorrectlyAnswered : lineCorrect;
  const answeredCount =
    (firstAnswered ? 1 : 0) +
    (snippetAnswered ? 1 : 0) +
    (conceptAnswered ? 1 : 0) +
    (customQuestion4 && question4Answered ? 1 : 0);
  const rightCount =
    (firstCorrect ? 1 : 0) +
    (snippetCorrect ? 1 : 0) +
    (conceptCorrect ? 1 : 0) +
    (customQuestion4 && question4CorrectlyAnswered ? 1 : 0);
  const wrongCount = answeredCount - rightCount;
  const skippedCount = totalQuestions - answeredCount;
  const accuracy = Math.round((rightCount / totalQuestions) * 100);
  const quizComplete = answeredCount === totalQuestions;

  return (
    <div className="h-full flex flex-col p-1">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">Quiz Mode</h3>
      </div>

      <div className="rounded-md border border-primary/20 bg-primary/5 p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ArrowRightCircle className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              {customQuestion1 ? `Frage 1/${totalQuestions}: Grundlagen` : `Frage 1/${totalQuestions}: Naechste Zeile`}
            </p>
          </div>
          {customQuestion1 ? (
            <>
              <p className="text-xs text-muted-foreground">{question1Prompt}</p>
              <div className="grid grid-cols-1 gap-2">
                {question1Options.map((option) => {
                  const isSelected = selectedQuestion1 === option;
                  const isRight = question1Answered && option === question1Correct;
                  const isWrongSelected = question1Answered && isSelected && option !== question1Correct;
                  return (
                    <Button
                      key={`quiz-q1-${option}`}
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectQuestion1(option)}
                      className={`justify-start text-left h-auto py-2 whitespace-normal ${
                        isRight
                          ? "border-green-500/60 bg-green-500/10 text-green-700"
                          : isWrongSelected
                            ? "border-destructive/60 bg-destructive/10 text-destructive"
                            : isSelected
                              ? "border-primary/60 bg-primary/10 text-primary"
                              : ""
                      }`}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>
              {question1Answered && (
                <div className={`rounded-md border p-3 text-xs ${question1CorrectlyAnswered ? "border-green-500/40 bg-green-500/10 text-green-700" : "border-amber-500/40 bg-amber-500/10 text-amber-700"}`}>
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    {question1CorrectlyAnswered ? <><CheckCircle2 className="w-4 h-4" />Richtig</> : <><XCircle className="w-4 h-4" />Noch nicht korrekt</>}
                  </div>
                  <p>Korrekte Antwort:</p>
                  <p className="mt-1">{question1Correct}</p>
                  {question1Explanation && (
                    <p className="mt-2 text-foreground/80">{question1Explanation}</p>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                {currentLine > 0
                  ? `Welche Zeile wird als naechstes nach Zeile ${currentLine} ausgefuehrt?`
                  : "Welche Zeile wird als erstes ausgefuehrt?"}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {lineOptions.map((line) => {
                  const isSelected = selectedLine === line;
                  const isRight = lineAnswered && line === correctLine;
                  const isWrongSelected = lineAnswered && isSelected && line !== correctLine;
                  return (
                    <Button
                      key={`quiz-line-${line}`}
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectLine(line)}
                      className={`justify-start font-code ${
                        isRight
                          ? "border-green-500/60 bg-green-500/10 text-green-700"
                          : isWrongSelected
                            ? "border-destructive/60 bg-destructive/10 text-destructive"
                            : isSelected
                              ? "border-primary/60 bg-primary/10 text-primary"
                              : ""
                      }`}
                    >
                      Zeile {line}
                    </Button>
                  );
                })}
              </div>

              {lineAnswered && (
                <div className={`rounded-md border p-3 text-xs ${lineCorrect ? "border-green-500/40 bg-green-500/10 text-green-700" : "border-amber-500/40 bg-amber-500/10 text-amber-700"}`}>
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    {lineCorrect ? <><CheckCircle2 className="w-4 h-4" />Richtig</> : <><XCircle className="w-4 h-4" />Noch nicht korrekt</>}
                  </div>
                  <p>Korrekte Zeile: <span className="font-code">Zeile {correctLine}</span></p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">{`Frage 2/${totalQuestions}: Richtiger Code`}</p>
          </div>
          <p className="text-xs text-muted-foreground">{question2Prompt}</p>

          <div className="grid grid-cols-1 gap-2">
            {question2Options.map((snippet) => {
              const isSelected = selectedSnippet === snippet;
              const isRight = snippetAnswered && snippet === question2Correct;
              const isWrongSelected = snippetAnswered && isSelected && snippet !== question2Correct;
              return (
                <Button
                  key={`quiz-snippet-${snippet}`}
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectSnippet(snippet)}
                  className={`justify-start text-left font-code h-auto py-2 whitespace-normal ${
                    isRight
                      ? "border-green-500/60 bg-green-500/10 text-green-700"
                      : isWrongSelected
                        ? "border-destructive/60 bg-destructive/10 text-destructive"
                        : isSelected
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : ""
                  }`}
                >
                  {snippet}
                </Button>
              );
            })}
          </div>

          {snippetAnswered && (
            <div className={`rounded-md border p-3 text-xs ${snippetCorrect ? "border-green-500/40 bg-green-500/10 text-green-700" : "border-amber-500/40 bg-amber-500/10 text-amber-700"}`}>
              <div className="flex items-center gap-1.5 font-semibold mb-1">
                {snippetCorrect ? <><CheckCircle2 className="w-4 h-4" />Richtig</> : <><XCircle className="w-4 h-4" />Noch nicht korrekt</>}
              </div>
              <p>Korrekte Antwort:</p>
              <p className="font-code mt-1">{question2Correct}</p>
              {question2Explanation && (
                <p className="mt-2 text-foreground/80">{question2Explanation}</p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">{`Frage 3/${totalQuestions}: Code-Intention`}</p>
          </div>
          <p className="text-xs text-muted-foreground">{question3Prompt}</p>

          <div className="grid grid-cols-1 gap-2">
            {question3Options.map((concept) => {
              const isSelected = selectedConcept === concept;
              const isRight = conceptAnswered && concept === question3Correct;
              const isWrongSelected = conceptAnswered && isSelected && concept !== question3Correct;
              return (
                <Button
                  key={`quiz-concept-${concept}`}
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectConcept(concept)}
                  className={`justify-start ${
                    isRight
                      ? "border-green-500/60 bg-green-500/10 text-green-700"
                      : isWrongSelected
                        ? "border-destructive/60 bg-destructive/10 text-destructive"
                        : isSelected
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : ""
                  }`}
                >
                  {concept}
                </Button>
              );
            })}
          </div>

          {conceptAnswered && (
            <div className={`rounded-md border p-3 text-xs ${conceptCorrect ? "border-green-500/40 bg-green-500/10 text-green-700" : "border-amber-500/40 bg-amber-500/10 text-amber-700"}`}>
              <div className="flex items-center gap-1.5 font-semibold mb-1">
                {conceptCorrect ? <><CheckCircle2 className="w-4 h-4" />Richtig</> : <><XCircle className="w-4 h-4" />Noch nicht korrekt</>}
              </div>
              <p>Korrekte Einordnung: <span className="font-semibold">{question3Correct}</span></p>
              {question3Explanation && (
                <p className="mt-2 text-foreground/80">{question3Explanation}</p>
              )}
            </div>
          )}
        </div>

        {customQuestion4 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Frage 4/4: Prinzip</p>
            </div>
            <p className="text-xs text-muted-foreground">{question4Prompt}</p>

            <div className="grid grid-cols-1 gap-2">
              {question4Options.map((option) => {
                const isSelected = selectedQuestion4 === option;
                const isRight = question4Answered && option === question4Correct;
                const isWrongSelected = question4Answered && isSelected && option !== question4Correct;
                return (
                  <Button
                    key={`quiz-q4-${option}`}
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectQuestion4(option)}
                    className={`justify-start text-left h-auto py-2 whitespace-normal ${
                      isRight
                        ? "border-green-500/60 bg-green-500/10 text-green-700"
                        : isWrongSelected
                          ? "border-destructive/60 bg-destructive/10 text-destructive"
                          : isSelected
                            ? "border-primary/60 bg-primary/10 text-primary"
                            : ""
                    }`}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>

            {question4Answered && (
              <div className={`rounded-md border p-3 text-xs ${question4CorrectlyAnswered ? "border-green-500/40 bg-green-500/10 text-green-700" : "border-amber-500/40 bg-amber-500/10 text-amber-700"}`}>
                <div className="flex items-center gap-1.5 font-semibold mb-1">
                  {question4CorrectlyAnswered ? <><CheckCircle2 className="w-4 h-4" />Richtig</> : <><XCircle className="w-4 h-4" />Noch nicht korrekt</>}
                </div>
                <p>Korrekte Antwort:</p>
                <p className="mt-1">{question4Correct}</p>
                {question4Explanation && (
                  <p className="mt-2 text-foreground/80">{question4Explanation}</p>
                )}
              </div>
            )}
          </div>
        )}

        {quizComplete && (
          <div className="rounded-md border border-primary/30 bg-background p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <CheckCircle2 className="w-4 h-4" />
              Geschafft! Quiz abgeschlossen.
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md border border-border p-2">
                <p className="text-muted-foreground">Punktzahl</p>
                <p className="font-semibold">{rightCount}/{totalQuestions}</p>
              </div>
              <div className="rounded-md border border-border p-2">
                <p className="text-muted-foreground">Genauigkeit</p>
                <p className="font-semibold">{accuracy}%</p>
              </div>
              <div className="rounded-md border border-border p-2">
                <p className="text-muted-foreground">Richtig</p>
                <p className="font-semibold">{rightCount}</p>
              </div>
              <div className="rounded-md border border-border p-2">
                <p className="text-muted-foreground">Falsch</p>
                <p className="font-semibold">{wrongCount}</p>
              </div>
              <div className="rounded-md border border-border p-2 col-span-2">
                <p className="text-muted-foreground">Uebersprungen</p>
                <p className="font-semibold">{skippedCount}</p>
              </div>
            </div>

            <div className="rounded-md border border-border p-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Brain className="w-4 h-4 text-primary" />
                Staerken und Entwicklungsbereiche
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Erhalte eine Zusammenfassung deiner wichtigsten Staerken und entdecke Bereiche, auf die du dich beim Lernen als Naechstes konzentrieren kannst.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
