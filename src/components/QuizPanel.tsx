import { useEffect, useMemo, useState } from "react";
import { Brain, CheckCircle2, Lightbulb, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { QuizQuestion, CodingExercise } from "@/lib/java-simulator";

interface QuizPanelProps {
  currentLine: number;
  hasNextStep: boolean;
  lineOptions: number[];
  correctLine: number;
  codeLines: string[];
  showGeneratedQuiz?: boolean;
  studyGuideTitle?: string;
  studyGuideContent?: string;
  customQuestions?: QuizQuestion[];
  codingExercises?: CodingExercise[];
  customQuestion1?: QuizQuestion;
  customQuestion2?: QuizQuestion;
  customQuestion3?: QuizQuestion;
  customQuestion4?: QuizQuestion;
  selectedCustomQuestionAnswers?: Record<string, string>;
  selectedQuestion1?: string;
  selectedLine?: number;
  selectedSnippet?: string;
  selectedConcept?: string;
  selectedQuestion4?: string;
  onSelectCustomQuestionAnswer?: (questionIndex: number, answer: string) => void;
  onSelectQuestion1: (answer: string) => void;
  onSelectLine: (line: number) => void;
  onSelectSnippet: (snippet: string) => void;
  onSelectConcept: (concept: string) => void;
  onSelectQuestion4: (answer: string) => void;
}

interface OpenQuestionItem {
  id: string;
  title: string;
  prompt: string;
  hintQuestion: string;
  expectedAnswer: string;
  explanation?: string;
  starterCode?: string;
}

interface EvaluationResult {
  isCorrect: boolean;
  verdict: "correct" | "partial" | "wrong";
  score: number;
  feedback: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  recognizedParts: string[];
}

type ReviewTag = "unsure" | "wrong";
type QuizViewMode = "all" | "review";

interface PersistedQuizState {
  openAnswers: Record<string, string>;
  showHints: Record<string, boolean>;
  showSolutions: Record<string, boolean>;
  evaluations: Record<string, EvaluationResult>;
  reviewTags: Record<string, ReviewTag>;
  viewMode: QuizViewMode;
}

const STOP_WORDS = new Set([
  "der",
  "die",
  "das",
  "und",
  "oder",
  "mit",
  "ohne",
  "dass",
  "weil",
  "wenn",
  "dann",
  "eine",
  "einer",
  "einem",
  "einen",
  "eines",
  "ist",
  "sind",
  "wird",
  "werden",
  "wurde",
  "wurden",
  "sein",
  "seine",
  "ihr",
  "ihre",
  "am",
  "im",
  "in",
  "auf",
  "zu",
  "von",
  "fuer",
  "als",
  "des",
  "dem",
  "den",
  "bei",
  "auch",
  "nur",
  "nicht",
  "mehr",
  "durch",
  "dies",
  "diese",
  "dieser",
  "dieses",
  "man",
  "kann",
  "wird",
  "klasse",
  "klassen",
  "interface",
  "interfaces",
  "musterlosung",
  "beispiel",
  "typen",
  "definiert",
  "genau",
  "are",
  "is",
  "the",
  "a",
  "an",
  "to",
  "for",
  "of",
  "on",
  "with",
  "and",
  "or",
  "be",
]);

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractKeywords(text: string, limit: number): string[] {
  const words = normalizeText(text).split(" ").filter(Boolean);
  const result: string[] = [];
  const seen = new Set<string>();

  for (const word of words) {
    if (seen.has(word)) continue;
    if (word.length < 3) continue;
    if (STOP_WORDS.has(word)) continue;
    seen.add(word);
    result.push(word);
    if (result.length >= limit) break;
  }

  return result;
}

function formatKeywordList(words: string[]): string {
  if (words.length === 0) return "-";
  return words.map((w) => `\`${w}\``).join(", ");
}

function shortenText(text: string, maxLength: number): string {
  const clean = text.trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 3)}...`;
}

function extractRecognizedParts(answerRaw: string, matchedKeywords: string[]): string[] {
  if (matchedKeywords.length === 0) return [];

  const fragments = answerRaw
    .split(/[\n.;!?]+/)
    .map((fragment) => fragment.trim())
    .filter(Boolean);

  const recognized: string[] = [];
  const seen = new Set<string>();
  for (const fragment of fragments) {
    const normalized = normalizeText(fragment);
    const hasMatch = matchedKeywords.some((keyword) => normalized.includes(keyword));
    if (!hasMatch) continue;
    const short = shortenText(fragment, 110);
    if (seen.has(short)) continue;
    seen.add(short);
    recognized.push(short);
    if (recognized.length >= 3) break;
  }

  if (recognized.length === 0) {
    recognized.push(`Kernbegriffe korrekt erkannt: ${formatKeywordList(matchedKeywords.slice(0, 4))}`);
  }

  return recognized;
}

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

function extractLineRefs(text: string): string[] {
  const matches = text.match(/zeile\s+\d+/gi) ?? [];
  return Array.from(new Set(matches.map((m) => m.trim())));
}

function extractCodeTerms(text: string): string[] {
  const candidates = text.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) ?? [];
  const blocked = new Set([
    "welche",
    "warum",
    "wieso",
    "erklaeren",
    "erklaere",
    "beschreiben",
    "beschreibe",
    "gegeben",
    "folgende",
    "methode",
    "klasse",
    "programms",
    "ausgabe",
    "werte",
    "true",
    "false",
    "null",
  ]);

  const terms: string[] = [];
  const seen = new Set<string>();
  for (const raw of candidates) {
    const t = raw.toLowerCase();
    if (blocked.has(t)) continue;
    if (t.length < 3) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    terms.push(raw);
    if (terms.length >= 4) break;
  }
  return terms;
}

function inferHintQuestion(
  prompt: string,
  expectedAnswer: string,
  explanation?: string,
  starterCode?: string,
): string {
  const lower = prompt.toLowerCase();
  const lines = extractLineRefs(prompt);
  const codeTerms = extractCodeTerms(`${prompt} ${expectedAnswer}`);
  const lineNote = lines.length > 0 ? `Fokussiere zuerst ${lines.join(", ")}.` : "";
  const termNote = codeTerms.length > 0 ? `Achte auf: ${codeTerms.join(", ")}.` : "";

  if (starterCode || lower.includes("implementiere") || lower.includes("schreiben sie die methode") || lower.includes("signatur")) {
    return [
      "Beginne mit der Signatur: Welche Eingabe und welcher Rueckgabetyp sind gefordert?",
      "Setze zuerst den kleinsten gueltigen Fall um (z. B. leerer Input/Basisfall), dann den allgemeinen Fall.",
      lineNote,
      termNote,
    ].filter(Boolean).join(" ");
  }

  if (lower.includes("ausgabe") || lower.includes("konsolenausgabe") || lower.includes("output")) {
    return [
      "Simuliere den Ablauf Schritt fuer Schritt und notiere nach jeder relevanten Zeile die aktuellen Werte.",
      "Nutze nur den Zustand direkt vor der Ausgabezeile.",
      lineNote,
      termNote,
    ].filter(Boolean).join(" ");
  }

  if (lower.includes("warum") || lower.includes("begruenden") || lower.includes("erklaeren") || lower.includes("erklaere")) {
    return [
      "Beantworte in 3 Teilen: Regel in Java -> Stelle im Code -> konkrete Auswirkung.",
      lineNote,
      termNote,
      explanation ? "Pruefe, welches Kernprinzip in der Erklaerung angesprochen wird." : "",
    ].filter(Boolean).join(" ");
  }

  if (lower.includes("unterschied")) {
    return [
      "Vergleiche beide Seiten entlang von 2-3 klaren Achsen (z. B. Typ, Speicherort, Laufzeitverhalten).",
      "Nenne fuer jede Achse einen konkreten Bezug zum gegebenen Code.",
      lineNote,
      termNote,
    ].filter(Boolean).join(" ");
  }

  if (lower.includes("rekursion") || lower.includes("rekursiv") || lower.includes("basisfall")) {
    return [
      "Markiere zuerst den Basisfall und danach den rekursiven Schritt.",
      "Pruefe, ob das Problem pro Aufruf kleiner wird.",
      lineNote,
      termNote,
    ].filter(Boolean).join(" ");
  }

  if (lower.includes("stream") || lower.includes("reduce") || lower.includes("collect") || lower.includes("map(") || lower.includes("filter(")) {
    return [
      "Gehe die Stream-Kette Operator fuer Operator durch und notiere das Zwischenresultat nach jedem Schritt.",
      "Frage dich: Transformation, Filterung oder Aggregation?",
      lineNote,
      termNote,
    ].filter(Boolean).join(" ");
  }

  if (lower.includes("map") || lower.includes("hashmap") || lower.includes("set") || lower.includes("list") || lower.includes("queue")) {
    return [
      "Identifiziere zuerst die Datenstruktur und ihre Regeln (Reihenfolge, Duplikate, Schluessel).",
      "Wende dann genau diese Regel auf den konkreten Codefall an.",
      lineNote,
      termNote,
    ].filter(Boolean).join(" ");
  }

  return [
    "Suche die 1-2 entscheidenden Codezeilen und beschreibe, wie sie den Endzustand bestimmen.",
    lineNote,
    termNote,
  ].filter(Boolean).join(" ");
}

function getHintQuestion(
  explicitHint: string | undefined,
  prompt: string | undefined,
  expectedAnswer: string,
  explanation?: string,
  starterCode?: string,
): string {
  if (explicitHint && explicitHint.trim().length > 0) {
    return explicitHint;
  }
  return inferHintQuestion(prompt ?? "", expectedAnswer, explanation, starterCode);
}

export default function QuizPanel({
  currentLine,
  hasNextStep,
  correctLine,
  codeLines,
  showGeneratedQuiz = true,
  studyGuideTitle,
  studyGuideContent,
  customQuestions,
  codingExercises,
  customQuestion1,
  customQuestion2,
  customQuestion3,
  customQuestion4,
}: QuizPanelProps) {
  const [openAnswers, setOpenAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showSolutions, setShowSolutions] = useState<Record<string, boolean>>({});
  const [evaluations, setEvaluations] = useState<Record<string, EvaluationResult>>({});
  const [reviewTags, setReviewTags] = useState<Record<string, ReviewTag>>({});
  const [viewMode, setViewMode] = useState<QuizViewMode>("all");

  const hasCustomMode = (customQuestions?.length ?? 0) > 0 || (codingExercises?.length ?? 0) > 0;
  const resetKey = useMemo(() => {
    if (hasCustomMode) {
      const qKey = (customQuestions ?? []).map((q) => q.prompt).join("|");
      const cKey = (codingExercises ?? []).map((c) => c.title).join("|");
      return `custom:${qKey}::coding:${cKey}`;
    }

    return `legacy:${currentLine}:${correctLine}:${hasNextStep}:${customQuestion1?.prompt ?? ""}:${customQuestion2?.prompt ?? ""}:${customQuestion3?.prompt ?? ""}:${customQuestion4?.prompt ?? ""}`;
  }, [
    hasCustomMode,
    customQuestions,
    codingExercises,
    currentLine,
    correctLine,
    hasNextStep,
    customQuestion1,
    customQuestion2,
    customQuestion3,
    customQuestion4,
  ]);

  const storageKey = useMemo(() => `quiz-progress:${resetKey}`, [resetKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistedQuizState>;
        setOpenAnswers(parsed.openAnswers ?? {});
        setShowHints(parsed.showHints ?? {});
        setShowSolutions(parsed.showSolutions ?? {});
        setEvaluations(parsed.evaluations ?? {});
        setReviewTags(parsed.reviewTags ?? {});
        setViewMode(parsed.viewMode === "review" ? "review" : "all");
        return;
      }
    } catch {
      // Fallback to empty state if persisted data is invalid.
    }

    setOpenAnswers({});
    setShowHints({});
    setShowSolutions({});
    setEvaluations({});
    setReviewTags({});
    setViewMode("all");
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const payload: PersistedQuizState = {
      openAnswers,
      showHints,
      showSolutions,
      evaluations,
      reviewTags,
      viewMode,
    };

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // Ignore storage quota and serialization errors.
    }
  }, [storageKey, openAnswers, showHints, showSolutions, evaluations, reviewTags, viewMode]);

  function setAnswer(id: string, value: string) {
    setOpenAnswers((prev) => ({ ...prev, [id]: value }));
    setEvaluations((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function toggleHint(id: string) {
    setShowHints((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleSolution(id: string) {
    setShowSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function clearAnswer(id: string) {
    setOpenAnswers((prev) => ({ ...prev, [id]: "" }));
    setEvaluations((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function setReviewTag(id: string, tag: ReviewTag) {
    setReviewTags((prev) => {
      if (prev[id] === tag) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: tag };
    });
  }

  function clearAllReviewTags() {
    setReviewTags({});
  }

  function getVisibleItems(items: OpenQuestionItem[]): OpenQuestionItem[] {
    if (viewMode === "all") return items;
    return items.filter((item) => Boolean(reviewTags[item.id]));
  }

  function evaluateAnswer(item: OpenQuestionItem, answerRaw: string): EvaluationResult {
    const answer = normalizeText(answerRaw);
    const expected = normalizeText(item.expectedAnswer);
    const isCodingPrompt = Boolean(item.starterCode);

    if (!answer) {
      return {
        isCorrect: false,
        verdict: "wrong",
        score: 0,
        feedback: "Noch keine auswertbare Antwort. Schreibe zuerst eine Lösung und pruefe dann erneut.",
        matchedKeywords: [],
        missingKeywords: extractKeywords(item.expectedAnswer, isCodingPrompt ? 10 : 8),
        recognizedParts: [],
      };
    }

    if (answer === expected) {
      const exactRecognized = [
        "Du hast die erwartete Lösung vollstaendig und inhaltlich korrekt wiedergegeben.",
      ];
      return {
        isCorrect: true,
        verdict: "correct",
        score: 1,
        feedback: "Richtig. Deine Antwort entspricht exakt der erwarteten Lösung.",
        matchedKeywords: extractKeywords(item.expectedAnswer, isCodingPrompt ? 10 : 8),
        missingKeywords: [],
        recognizedParts: exactRecognized,
      };
    }

    const expectedKeywords = extractKeywords(item.expectedAnswer, isCodingPrompt ? 12 : 10);
    const answerWordSet = new Set(answer.split(" ").filter(Boolean));
    const matchedKeywords = expectedKeywords.filter((keyword) => answerWordSet.has(keyword));
    const missingKeywords = expectedKeywords.filter((keyword) => !answerWordSet.has(keyword));
    const recognizedParts = extractRecognizedParts(answerRaw, matchedKeywords);
    const score = expectedKeywords.length > 0 ? matchedKeywords.length / expectedKeywords.length : 0;

    const shortExpected = expectedKeywords.length <= 3;
    const partialExactMatch =
      answer.includes(expected) ||
      (expected.length >= 16 && expected.includes(answer));
    const minScore = isCodingPrompt ? 0.5 : 0.45;
    const isCorrect = partialExactMatch || (shortExpected ? score >= 0.66 : score >= minScore);

    if (isCorrect) {
      const isPartial = missingKeywords.length > 0;
      return {
        isCorrect: true,
        verdict: isPartial ? "partial" : "correct",
        score,
        feedback: isPartial
          ? `Teilweise richtig. Du deckst die Kernidee ab (${matchedKeywords.length}/${expectedKeywords.length} Kernbegriffe erkannt). Fuer eine vollstaendige Antwort kannst du noch ergaenzen: ${formatKeywordList(missingKeywords.slice(0, 4))}.`
          : `Richtig. Du deckst die Kernidee ab (${matchedKeywords.length}/${expectedKeywords.length} Kernbegriffe erkannt). Die wesentlichen Punkte sind vollstaendig enthalten.`,
        matchedKeywords,
        missingKeywords,
        recognizedParts,
      };
    }

    return {
      isCorrect: false,
      verdict: "wrong",
      score,
      feedback:
        `Falsch bzw. noch unvollstaendig. Aktuell erkannt: ${matchedKeywords.length}/${expectedKeywords.length} Kernbegriffe. ` +
        `Pruefe besonders diese fehlenden Punkte: ${formatKeywordList(missingKeywords.slice(0, 6))}.`,
      matchedKeywords,
      missingKeywords,
      recognizedParts,
    };
  }

  function checkAnswer(item: OpenQuestionItem) {
    const answer = openAnswers[item.id] ?? "";
    const result = evaluateAnswer(item, answer);
    setEvaluations((prev) => ({ ...prev, [item.id]: result }));
    setShowSolutions((prev) => ({ ...prev, [item.id]: true }));
    setReviewTags((prev) => {
      const current = prev[item.id];
      if (!result.isCorrect) {
        if (current === "unsure") return prev;
        return { ...prev, [item.id]: "wrong" };
      }
      if (current === "wrong") {
        const next = { ...prev };
        delete next[item.id];
        return next;
      }
      return prev;
    });
  }

  function renderReviewToolbar(allItems: OpenQuestionItem[]) {
    const reviewCount = allItems.filter((item) => Boolean(reviewTags[item.id])).length;
    if (reviewCount === 0 && viewMode === "all") {
      return null;
    }

    return (
      <div className="rounded-md border border-border/70 bg-background/80 p-2 text-[11px] space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p className="font-medium text-muted-foreground">Wiederholung</p>
          <p className="text-muted-foreground/90">
            Markiert: <span className="font-semibold">{reviewCount}</span> / {allItems.length}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            className="h-7 px-2 text-[11px]"
            variant={viewMode === "all" ? "default" : "outline"}
            onClick={() => setViewMode("all")}
          >
            Alle Fragen
          </Button>
          <Button
            size="sm"
            className="h-7 px-2 text-[11px]"
            variant={viewMode === "review" ? "default" : "outline"}
            onClick={() => setViewMode("review")}
          >
            Nur Wiederholung
          </Button>
          <Button
            size="sm"
            className="h-7 px-2 text-[11px]"
            variant="ghost"
            onClick={clearAllReviewTags}
            disabled={reviewCount === 0}
          >
            Markierungen leeren
          </Button>
        </div>
      </div>
    );
  }

  function renderOpenQuestion(item: OpenQuestionItem) {
    const answer = openAnswers[item.id] ?? "";
    const hintVisible = showHints[item.id] ?? false;
    const solutionVisible = showSolutions[item.id] ?? false;
    const evaluation = evaluations[item.id];
    const reviewTag = reviewTags[item.id];

    return (
      <div key={item.id} className="rounded-md border border-border bg-background p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold">{item.title}</p>
          {reviewTag && (
            <span
              className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {reviewTag === "unsure" ? "Unsicher" : "Wiederholen"}
            </span>
          )}
        </div>

        <p className="text-xs whitespace-pre-wrap leading-5 text-muted-foreground">{item.prompt}</p>

        {item.starterCode && (
          <pre className="rounded-md border border-border bg-muted/30 p-3 text-xs overflow-x-auto">
            <code>{item.starterCode}</code>
          </pre>
        )}

        <div className="space-y-2">
          <p className="text-xs font-medium">Deine Antwort / Lösung</p>
          <Textarea
            value={answer}
            onChange={(event) => setAnswer(item.id, event.target.value)}
            placeholder="Schreibe hier deine Antwort..."
            className="min-h-32 font-mono text-xs"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button size="sm" onClick={() => checkAnswer(item)}>
            Antwort pruefen
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-[11px] text-muted-foreground"
            onClick={() => setReviewTag(item.id, "unsure")}
          >
            {reviewTag === "unsure" ? "Unsicher ✓" : "Unsicher"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-[11px] text-muted-foreground"
            onClick={() => setReviewTag(item.id, "wrong")}
          >
            {reviewTag === "wrong" ? "Wiederholen ✓" : "Wiederholen"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => toggleHint(item.id)}>
            {hintVisible ? "Hint ausblenden" : "Hint anzeigen"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => toggleSolution(item.id)}>
            {solutionVisible ? "Musterlösung ausblenden" : "Musterlösung anzeigen"}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => clearAnswer(item.id)}>
            Eingabe leeren
          </Button>
        </div>

        {evaluation && (
          <div
            className={
              evaluation.verdict === "correct"
                ? "rounded-md border border-green-500/30 bg-green-500/10 p-3 text-xs"
                : evaluation.verdict === "partial"
                ? "rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs"
                : "rounded-md border border-red-500/30 bg-red-500/10 p-3 text-xs"
            }
          >
            <p
              className={
                evaluation.verdict === "correct"
                  ? "font-semibold text-green-700"
                  : evaluation.verdict === "partial"
                  ? "font-semibold text-amber-700"
                  : "font-semibold text-red-700"
              }
            >
              {evaluation.verdict === "correct"
                ? "Richtig"
                : evaluation.verdict === "partial"
                ? "Teilweise richtig"
                : "Falsch"}
            </p>
            <p className="mt-1 leading-5 text-foreground/90">{evaluation.feedback}</p>
            <p className="mt-2 text-foreground/80">
              Bewertung: {(evaluation.score * 100).toFixed(0)}%
            </p>
            <p className="mt-1 text-foreground/80">
              Getroffen: {formatKeywordList(evaluation.matchedKeywords.slice(0, 6))}
            </p>
            {evaluation.recognizedParts.length > 0 && (
              <div className="mt-2 rounded-md border border-border/60 bg-background/40 p-2">
                <p className="font-medium text-foreground/90">Das hast du richtig erkannt:</p>
                {evaluation.recognizedParts.map((part, idx) => (
                  <p key={`${item.id}-recognized-${idx}`} className="mt-1 text-foreground/80">
                    - {part}
                  </p>
                ))}
              </div>
            )}
            <p className="mt-1 text-foreground/80">
              Fehlt noch: {formatKeywordList(evaluation.missingKeywords.slice(0, 6))}
            </p>
            <p className="mt-2 whitespace-pre-wrap leading-5 text-foreground/80">
              {item.explanation
                ? `Detaillierte Erklaerung: ${item.explanation}`
                : `Detaillierte Erklaerung: Erwartet wird vor allem die Kernidee aus der Musterlösung: ${item.expectedAnswer}`}
            </p>
          </div>
        )}

        {hintVisible && (
          <div className="rounded-md border border-blue-500/30 bg-blue-500/10 p-3 text-xs">
            <p className="font-semibold text-blue-700 mb-1">Leitfrage (Hint)</p>
            <p className="text-foreground/90">{item.hintQuestion}</p>
          </div>
        )}

        {solutionVisible && (
          <div className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-xs">
            <p className="font-semibold text-green-700 mb-2">Musterlösung / Erwartete Antwort</p>
            <p className="whitespace-pre-wrap leading-5 text-foreground/90">{item.expectedAnswer}</p>
            {item.explanation && (
              <p className="mt-2 whitespace-pre-wrap leading-5 text-foreground/80">{item.explanation}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  if (!showGeneratedQuiz) {
    return (
      <div className="h-full flex flex-col p-1">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">
            {studyGuideTitle ?? "Aufgaben und Musterlösung"}
          </h3>
        </div>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-4 text-xs whitespace-pre-wrap leading-6 overflow-auto">
          {studyGuideContent ?? "Keine Aufgaben hinterlegt."}
        </div>
      </div>
    );
  }

  if (customQuestions && customQuestions.length > 0) {
    const theoryItems: OpenQuestionItem[] = customQuestions.map((q, idx) => ({
      id: `custom-${idx}`,
      title: `Frage ${idx + 1}/${customQuestions.length}`,
      prompt: q.prompt,
      hintQuestion: getHintQuestion(q.hintQuestion, q.prompt, q.correctOption, q.explanation),
      expectedAnswer: q.correctOption,
      explanation: q.explanation,
    }));

    const codingItems: OpenQuestionItem[] = (codingExercises ?? []).map((c, idx) => ({
      id: `custom-coding-${idx}`,
      title: `Code ${idx + 1}/${codingExercises?.length ?? 0}: ${c.title}`,
      prompt: c.prompt,
      hintQuestion: getHintQuestion(c.hintQuestion, c.prompt, c.referenceSolution ?? "", undefined, c.starterCode),
      expectedAnswer: c.referenceSolution ?? "Keine Musterlösung hinterlegt.",
      starterCode: c.starterCode,
    }));

    const allItems = [...theoryItems, ...codingItems];
    const total = allItems.length;
    const answered = allItems.filter((item) => (openAnswers[item.id] ?? "").trim().length > 0).length;
    const visibleTheoryItems = getVisibleItems(theoryItems);
    const visibleCodingItems = getVisibleItems(codingItems);
    const visibleCount = visibleTheoryItems.length + visibleCodingItems.length;

    return (
      <div className="h-full flex flex-col p-1">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">Open Response Mode</h3>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 p-4 space-y-4 overflow-auto">
          <div className="rounded-md border border-primary/30 bg-background p-3 text-xs">
            <p className="font-semibold">Freie Antworten mit Leitfragen</p>
            <p className="text-muted-foreground mt-1">
              Formuliere jede Antwort selbst. Nutze Hints als Leitfragen und pruefe danach mit der Musterlösung.
            </p>
            <p className="mt-2">Bearbeitet: <span className="font-semibold">{answered}/{total}</span></p>
          </div>

          {renderReviewToolbar(allItems)}

          {visibleTheoryItems.map(renderOpenQuestion)}

          {visibleCodingItems.length > 0 && (
            <div className="pt-2 border-t border-primary/20 space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Code-Aufgaben</p>
              </div>
              {visibleCodingItems.map(renderOpenQuestion)}
            </div>
          )}

          {viewMode === "review" && visibleCount === 0 && (
            <div className="rounded-md border border-border/70 bg-background/80 p-2 text-[11px] text-muted-foreground">
              Keine markierten Fragen.
            </div>
          )}

          {answered === total && (
            <div className="rounded-md border border-primary/30 bg-background p-4 text-xs">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <CheckCircle2 className="w-4 h-4" />
                Alle Aufgaben bearbeitet.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (codingExercises && codingExercises.length > 0) {
    const codingItems: OpenQuestionItem[] = codingExercises.map((c, idx) => ({
      id: `coding-${idx}`,
      title: `Aufgabe ${idx + 1}/${codingExercises.length}: ${c.title}`,
      prompt: c.prompt,
      hintQuestion: getHintQuestion(c.hintQuestion, c.prompt, c.referenceSolution ?? "", undefined, c.starterCode),
      expectedAnswer: c.referenceSolution ?? "Keine Musterlösung hinterlegt.",
      starterCode: c.starterCode,
    }));

    const answered = codingItems.filter((item) => (openAnswers[item.id] ?? "").trim().length > 0).length;
    const visibleCodingItems = getVisibleItems(codingItems);

    return (
      <div className="h-full flex flex-col p-1">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">Code Practice</h3>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 p-4 space-y-4 overflow-auto">
          <div className="rounded-md border border-primary/30 bg-background p-3 text-xs">
            <p className="font-semibold">Schreibaufgaben</p>
            <p className="text-muted-foreground mt-1">Bearbeitet: <span className="font-semibold">{answered}/{codingItems.length}</span></p>
          </div>
          {renderReviewToolbar(codingItems)}
          {visibleCodingItems.map(renderOpenQuestion)}
          {viewMode === "review" && visibleCodingItems.length === 0 && (
            <div className="rounded-md border border-border/70 bg-background/80 p-2 text-[11px] text-muted-foreground">
              Keine markierten Fragen.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!hasNextStep) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Brain className="w-8 h-8 opacity-40" />
        <p className="text-sm">Keine weiteren Schritte. Aufgaben abgeschlossen.</p>
      </div>
    );
  }

  const correctSnippet = correctLine > 0 && correctLine <= codeLines.length
    ? cleanLine(codeLines[correctLine - 1])
    : "(unbekannt)";
  const correctConcept = classifyLine(correctSnippet);

  const q1Prompt = customQuestion1?.prompt
    ?? (currentLine > 0
      ? `Welche Zeile wird als naechstes nach Zeile ${currentLine} ausgefuehrt?`
      : "Welche Zeile wird als erstes ausgefuehrt?");
  const q1Expected = customQuestion1?.correctOption ?? `Zeile ${correctLine}`;
  const q1Explanation = customQuestion1?.explanation
    ?? `Nach dem aktuellen Schritt folgt laut Ausfuehrungspfad Zeile ${correctLine}.`;

  const q2Prompt = customQuestion2?.prompt ?? "Welcher Code steht in der naechsten ausgefuehrten Zeile?";
  const q2Expected = customQuestion2?.correctOption ?? correctSnippet;
  const q2Explanation = customQuestion2?.explanation ?? "Vergleiche Kontrollfluss und exakten Code in der naechsten Zeile.";

  const q3Prompt = customQuestion3?.prompt ?? "Was macht die naechste Zeile hauptsaechlich?";
  const q3Expected = customQuestion3?.correctOption ?? correctConcept;
  const q3Explanation = customQuestion3?.explanation ?? "Ordne die Zeile nach ihrer Hauptabsicht ein (z. B. Aufruf, Ausgabe, Rueckgabe).";

  const openItems: OpenQuestionItem[] = [
    {
      id: "legacy-q1",
      title: `Frage 1/${customQuestion4 ? 4 : 3}: Naechster Schritt`,
      prompt: q1Prompt,
      hintQuestion: getHintQuestion(customQuestion1?.hintQuestion, q1Prompt, q1Expected, q1Explanation),
      expectedAnswer: q1Expected,
      explanation: q1Explanation,
    },
    {
      id: "legacy-q2",
      title: `Frage 2/${customQuestion4 ? 4 : 3}: Code`,
      prompt: q2Prompt,
      hintQuestion: getHintQuestion(customQuestion2?.hintQuestion, q2Prompt, q2Expected, q2Explanation),
      expectedAnswer: q2Expected,
      explanation: q2Explanation,
    },
    {
      id: "legacy-q3",
      title: `Frage 3/${customQuestion4 ? 4 : 3}: Intention`,
      prompt: q3Prompt,
      hintQuestion: getHintQuestion(customQuestion3?.hintQuestion, q3Prompt, q3Expected, q3Explanation),
      expectedAnswer: q3Expected,
      explanation: q3Explanation,
    },
  ];

  if (customQuestion4) {
    openItems.push({
      id: "legacy-q4",
      title: "Frage 4/4: Prinzip",
      prompt: customQuestion4.prompt,
      hintQuestion: getHintQuestion(
        customQuestion4.hintQuestion,
        customQuestion4.prompt,
        customQuestion4.correctOption,
        customQuestion4.explanation,
      ),
      expectedAnswer: customQuestion4.correctOption,
      explanation: customQuestion4.explanation,
    });
  }

  const answered = openItems.filter((item) => (openAnswers[item.id] ?? "").trim().length > 0).length;
  const visibleOpenItems = getVisibleItems(openItems);

  return (
    <div className="h-full flex flex-col p-1">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">Open Response Mode</h3>
      </div>

      <div className="rounded-md border border-primary/20 bg-primary/5 p-4 space-y-4 overflow-auto">
        <div className="rounded-md border border-primary/30 bg-background p-3 text-xs">
          <p className="font-semibold">Freie Antworten</p>
          <p className="text-muted-foreground mt-1">
            Beantworte jede Frage frei. Nutze Hints als Leitfrage und vergleiche danach mit der erwarteten Antwort.
          </p>
          <p className="mt-2">Bearbeitet: <span className="font-semibold">{answered}/{openItems.length}</span></p>
        </div>

        {renderReviewToolbar(openItems)}

        {visibleOpenItems.map(renderOpenQuestion)}

        {viewMode === "review" && visibleOpenItems.length === 0 && (
          <div className="rounded-md border border-border/70 bg-background/80 p-2 text-[11px] text-muted-foreground">
            Keine markierten Fragen.
          </div>
        )}

        {answered === openItems.length && (
          <div className="rounded-md border border-primary/30 bg-background p-4 text-xs">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <CheckCircle2 className="w-4 h-4" />
              Alle Fragen bearbeitet.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
