# Trace Authoring Format (Safe Java Concept Tutor)

Use this format to create new teaching traces without executing user code.

## Goal

- Keep lessons safe (no runtime code execution).
- Teach flow (line-by-line stack/heap updates).
- Reuse the same format in UI + quiz mode.

## Required shape

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "topic": "optional string",
  "difficulty": "basic | intermediate | exam",
  "learningGoals": ["optional", "list", "of goals"],
  "sourceRefs": ["optional source refs"],
  "code": "full Java code as one string",
  "steps": [
    {
      "lineNumber": 1,
      "stackFrames": [
        {
          "methodName": "main",
          "variables": [
            {
              "name": "x",
              "type": "int",
              "value": "5",
              "changed": true
            }
          ]
        }
      ],
      "heapObjects": [
        {
          "id": "obj1",
          "type": "Student",
          "label": "Student#1",
          "values": ["name = \"Mina\"", "semester = 2"],
          "highlightIndex": 1
        }
      ],
      "consoleOutput": ["optional lines"],
      "explanation": "Short explanation for this exact step."
    }
  ]
}
```

## Authoring checklist

1. `lineNumber` must match a real code line in `code`.
2. Every state change should be visible in exactly one step.
3. Use `changed: true` only where a value actually changed.
4. Keep `explanation` causal: what happened and why now.
5. For references, use a readable value like `-> Student#1`.
6. For arrays, provide `indices` and `values`.

## Suggested workflow

1. Write a 10-30 line Java snippet for one concept.
2. Manually dry-run it on paper.
3. Convert each meaningful state transition into one `step`.
4. Validate with `validateAuthoredTrace(...)` in `src/lib/trace-authoring.ts`.
5. Add the authored trace to `javaExamples`.
6. Open Quiz tab and verify "next line" predictions follow your steps.

## Current quiz behavior

- Quiz asks: "Which line executes next?"
- Correct answer is inferred from the next `ExecutionStep.lineNumber`.
- Better traces (accurate line order) automatically produce better quizzes.
