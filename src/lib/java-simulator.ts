export interface Variable {
  name: string;
  type: string;
  value: string;
  changed?: boolean;
  isReference?: boolean;
  refId?: string;
}

export interface StackFrame {
  methodName: string;
  variables: Variable[];
}

export interface HeapObject {
  id: string;
  type: string;
  label: string;
  values?: string[];
  indices?: number[];
  highlightIndex?: number;
}

export interface ExecutionStep {
  lineNumber: number;
  stackFrames: StackFrame[];
  heapObjects: HeapObject[];
  consoleOutput: string[];
  explanation: string;
}

export interface JavaExample {
  id: string;
  title: string;
  description: string;
  code: string;
  steps: ExecutionStep[];
}

const arrayLoopExample: JavaExample = {
  id: "array-loop",
  title: "Array & Schleife",
  description: "Grundlagen: Array-Zugriff und For-Schleife",
  code: `public class Main {
    public static void main(String[] args) {
        int summe = 0;
        int[] zahlen = {3, 7, 2, 5};

        for (int i = 0; i < zahlen.length; i++) {
            summe = summe + zahlen[i];
            System.out.println("Summe: " + summe);
        }

        System.out.println("Ergebnis: " + summe);
    }
}`,
  steps: [
    {
      lineNumber: 3,
      stackFrames: [{ methodName: "main", variables: [{ name: "summe", type: "int", value: "0", changed: true }] }],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Die Variable 'summe' wird erstellt und mit dem Wert 0 initialisiert. Sie speichert später die Gesamtsumme aller Array-Elemente.",
    },
    {
      lineNumber: 4,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "0" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1", changed: true },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: [],
      explanation: "Ein neues int-Array mit 4 Elementen {3, 7, 2, 5} wird auf dem Heap erstellt. Die Variable 'zahlen' speichert eine Referenz (Verweis) auf dieses Array.",
    },
    {
      lineNumber: 6,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "0" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "0", changed: true },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: [],
      explanation: "Die for-Schleife beginnt. Die Schleifenvariable 'i' wird mit 0 initialisiert. Bedingung: i (0) < zahlen.length (4) → wahr ✓. Die Schleife wird betreten.",
    },
    {
      lineNumber: 7,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "3", changed: true },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "0" },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3], highlightIndex: 0 }],
      consoleOutput: [],
      explanation: "zahlen[0] wird gelesen → Wert ist 3. Berechnung: summe = 0 + 3 = 3. Die Variable 'summe' wird auf 3 aktualisiert.",
    },
    {
      lineNumber: 8,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "3" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "0" },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: ["Summe: 3"],
      explanation: "System.out.println gibt den aktuellen Wert von 'summe' (3) auf der Konsole aus.",
    },
    {
      lineNumber: 6,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "3" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "1", changed: true },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: ["Summe: 3"],
      explanation: "i wird um 1 erhöht (i++): i = 1. Bedingung: i (1) < zahlen.length (4) → wahr ✓. Nächster Schleifendurchlauf.",
    },
    {
      lineNumber: 7,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "10", changed: true },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "1" },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3], highlightIndex: 1 }],
      consoleOutput: ["Summe: 3"],
      explanation: "zahlen[1] wird gelesen → Wert ist 7. Berechnung: summe = 3 + 7 = 10.",
    },
    {
      lineNumber: 8,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "10" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "1" },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: ["Summe: 3", "Summe: 10"],
      explanation: "Ausgabe: \"Summe: 10\".",
    },
    {
      lineNumber: 6,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "10" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "2", changed: true },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: ["Summe: 3", "Summe: 10"],
      explanation: "i++ → i = 2. Bedingung: 2 < 4 → wahr ✓.",
    },
    {
      lineNumber: 7,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "12", changed: true },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "2" },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3], highlightIndex: 2 }],
      consoleOutput: ["Summe: 3", "Summe: 10"],
      explanation: "zahlen[2] → 2. summe = 10 + 2 = 12.",
    },
    {
      lineNumber: 8,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "12" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "2" },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: ["Summe: 3", "Summe: 10", "Summe: 12"],
      explanation: "Ausgabe: \"Summe: 12\".",
    },
    {
      lineNumber: 6,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "12" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "3", changed: true },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: ["Summe: 3", "Summe: 10", "Summe: 12"],
      explanation: "i++ → i = 3. Bedingung: 3 < 4 → wahr ✓. Letzter Durchlauf.",
    },
    {
      lineNumber: 7,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "17", changed: true },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "3" },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3], highlightIndex: 3 }],
      consoleOutput: ["Summe: 3", "Summe: 10", "Summe: 12"],
      explanation: "zahlen[3] → 5. summe = 12 + 5 = 17.",
    },
    {
      lineNumber: 8,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "17" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "3" },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: ["Summe: 3", "Summe: 10", "Summe: 12", "Summe: 17"],
      explanation: "Ausgabe: \"Summe: 17\".",
    },
    {
      lineNumber: 6,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "17" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
        { name: "i", type: "int", value: "4", changed: true },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: ["Summe: 3", "Summe: 10", "Summe: 12", "Summe: 17"],
      explanation: "i++ → i = 4. Bedingung: i (4) < zahlen.length (4) → falsch ✗. Die Schleife wird beendet.",
    },
    {
      lineNumber: 11,
      stackFrames: [{ methodName: "main", variables: [
        { name: "summe", type: "int", value: "17" },
        { name: "zahlen", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1" },
      ] }],
      heapObjects: [{ id: "arr1", type: "int[]", label: "int[4]", values: ["3", "7", "2", "5"], indices: [0, 1, 2, 3] }],
      consoleOutput: ["Summe: 3", "Summe: 10", "Summe: 12", "Summe: 17", "Ergebnis: 17"],
      explanation: "Die Schleifenvariable 'i' existiert nicht mehr (nur innerhalb der Schleife gültig). Die finale Summe 17 wird ausgegeben. Programm beendet. ✓",
    },
  ],
};

const methodCallExample: JavaExample = {
  id: "method-call",
  title: "Methodenaufruf",
  description: "Methoden mit Parametern, Rückgabewert & Call Stack",
  code: `public class Main {
    public static int verdoppeln(int x) {
        int ergebnis = x * 2;
        return ergebnis;
    }

    public static void main(String[] args) {
        int zahl = 5;
        int doppelt = verdoppeln(zahl);
        System.out.println("Ergebnis: " + doppelt);
    }
}`,
  steps: [
    {
      lineNumber: 8,
      stackFrames: [{ methodName: "main", variables: [{ name: "zahl", type: "int", value: "5", changed: true }] }],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Das Programm startet in der main-Methode. Die Variable 'zahl' wird mit dem Wert 5 initialisiert.",
    },
    {
      lineNumber: 9,
      stackFrames: [
        { methodName: "main", variables: [{ name: "zahl", type: "int", value: "5" }] },
        { methodName: "verdoppeln", variables: [{ name: "x", type: "int", value: "5", changed: true }] },
      ],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Die Methode 'verdoppeln' wird aufgerufen. Der Wert von 'zahl' (5) wird als Parameter 'x' übergeben. Ein neuer Stack-Frame wird erstellt. ⬆️ Sprung zur Methode!",
    },
    {
      lineNumber: 3,
      stackFrames: [
        { methodName: "main", variables: [{ name: "zahl", type: "int", value: "5" }] },
        { methodName: "verdoppeln", variables: [
          { name: "x", type: "int", value: "5" },
          { name: "ergebnis", type: "int", value: "10", changed: true },
        ] },
      ],
      heapObjects: [],
      consoleOutput: [],
      explanation: "In der Methode 'verdoppeln': ergebnis = x * 2 = 5 * 2 = 10. Die lokale Variable 'ergebnis' wird erstellt.",
    },
    {
      lineNumber: 4,
      stackFrames: [
        { methodName: "main", variables: [
          { name: "zahl", type: "int", value: "5" },
          { name: "doppelt", type: "int", value: "10", changed: true },
        ] },
      ],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Die Methode gibt den Wert 10 zurück (return ergebnis). Der Stack-Frame von 'verdoppeln' wird entfernt. ⬇️ Zurück zu main! Der Rückgabewert 10 wird in 'doppelt' gespeichert.",
    },
    {
      lineNumber: 10,
      stackFrames: [
        { methodName: "main", variables: [
          { name: "zahl", type: "int", value: "5" },
          { name: "doppelt", type: "int", value: "10" },
        ] },
      ],
      heapObjects: [],
      consoleOutput: ["Ergebnis: 10"],
      explanation: "Ausgabe: \"Ergebnis: 10\". Das Programm ist beendet. ✓",
    },
  ],
};

export const javaExamples: JavaExample[] = [arrayLoopExample, methodCallExample];

export function getExample(id: string): JavaExample | undefined {
  return javaExamples.find((e) => e.id === id);
}
