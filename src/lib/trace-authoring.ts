import type { ExecutionStep, JavaExample } from "@/lib/java-simulator";

export type TraceDifficulty = "basic" | "intermediate" | "exam";

export interface AuthoredTrace extends JavaExample {
  topic?: string;
  learningGoals?: string[];
  sourceRefs?: string[];
  difficulty?: TraceDifficulty;
}

export interface TraceValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateAuthoredTrace(trace: AuthoredTrace): TraceValidationResult {
  const errors: string[] = [];

  if (!trace.id?.trim()) errors.push("Missing trace id.");
  if (!trace.title?.trim()) errors.push("Missing trace title.");
  if (!trace.code?.trim()) errors.push("Missing code block.");
  if (!Array.isArray(trace.steps) || trace.steps.length === 0) errors.push("Trace must contain at least one step.");

  trace.steps.forEach((step: ExecutionStep, idx: number) => {
    if (typeof step.lineNumber !== "number") {
      errors.push(`Step ${idx + 1}: lineNumber must be a number.`);
    }
    if (!Array.isArray(step.stackFrames)) {
      errors.push(`Step ${idx + 1}: stackFrames must be an array.`);
    }
    if (!Array.isArray(step.heapObjects)) {
      errors.push(`Step ${idx + 1}: heapObjects must be an array.`);
    }
    if (!Array.isArray(step.consoleOutput)) {
      errors.push(`Step ${idx + 1}: consoleOutput must be an array.`);
    }
    if (typeof step.explanation !== "string") {
      errors.push(`Step ${idx + 1}: explanation must be a string.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function authoredTraceToExample(trace: AuthoredTrace): JavaExample {
  return {
    id: trace.id,
    title: trace.title,
    description: trace.description,
    code: trace.code,
    steps: trace.steps,
  };
}
