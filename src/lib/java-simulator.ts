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

export interface QuizQuestion {
  prompt: string;
  options: string[];
  correctOption: string;
  explanation: string;
  hintQuestion?: string;
}

export interface CodingExercise {
  title: string;
  prompt: string;
  starterCode?: string;
  referenceSolution?: string;
  hintQuestion?: string;
}

export interface JavaExample {
  id: string;
  title: string;
  description: string;
  semester: "semester1" | "semester2";
  lecture?: string;
  disableQuizQuestions?: boolean;
  studyGuideTitle?: string;
  studyGuideContent?: string;
  customQuestions?: QuizQuestion[];
  codingExercises?: CodingExercise[];
  customQuestion1?: QuizQuestion;
  customQuestion2?: QuizQuestion;
  customQuestion3?: QuizQuestion;
  customQuestion4?: QuizQuestion;
  code: string;
  steps: ExecutionStep[];
}

const arrayLoopExample: JavaExample = {
  id: "array-loop",
  title: "Array & Schleife",
  description: "Grundlagen: Array-Zugriff und For-Schleife",
  semester: "semester1",
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
  semester: "semester1",
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

const instanzReferenzExample: JavaExample = {
  id: "instanz-referenz",
  title: "Instanzen & Referenzen",
  description: "Wie 'new', Konstruktor und Referenzen zusammenspielen",
  semester: "semester2",
  lecture: "VL 03 - Instanzen, Klassen, Pakete",
  code: `public class BankKonto {
    String inhaber;
    double kontostand;

    BankKonto(String inhaber, double startguthaben) {
        this.inhaber = inhaber;
        this.kontostand = startguthaben;
    }

    void einzahlen(double betrag) {
        this.kontostand = this.kontostand + betrag;
    }

    public static void main(String[] args) {
        BankKonto konto1 = new BankKonto("Aylin", 100.0);
        BankKonto konto2 = konto1;
        konto2.einzahlen(50.0);

        System.out.println(konto1.inhaber + " -> " + konto1.kontostand);
    }
}`,
  steps: [
    {
      lineNumber: 15,
      stackFrames: [{
        methodName: "main",
        variables: [
          { name: "konto1", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1", changed: true },
        ],
      }],
      heapObjects: [{
        id: "konto1",
        type: "BankKonto",
        label: "BankKonto#1",
        values: ['inhaber = "Aylin"', "kontostand = 100.0"],
      }],
      consoleOutput: [],
      explanation: "Mit 'new' wird ein Objekt auf dem Heap erzeugt. Die Referenz landet in 'konto1'. Der Konstruktor initialisiert den Zustand (inhaber, kontostand).",
    },
    {
      lineNumber: 16,
      stackFrames: [{
        methodName: "main",
        variables: [
          { name: "konto1", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1" },
          { name: "konto2", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1", changed: true },
        ],
      }],
      heapObjects: [{
        id: "konto1",
        type: "BankKonto",
        label: "BankKonto#1",
        values: ['inhaber = "Aylin"', "kontostand = 100.0"],
      }],
      consoleOutput: [],
      explanation: "'konto2 = konto1' erzeugt KEIN neues Objekt. Beide Variablen zeigen nun auf dieselbe Instanz.",
    },
    {
      lineNumber: 17,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "konto1", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1" },
            { name: "konto2", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1" },
          ],
        },
        {
          methodName: "einzahlen",
          variables: [
            { name: "this", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1", changed: true },
            { name: "betrag", type: "double", value: "50.0", changed: true },
          ],
        },
      ],
      heapObjects: [{
        id: "konto1",
        type: "BankKonto",
        label: "BankKonto#1",
        values: ['inhaber = "Aylin"', "kontostand = 100.0"],
      }],
      consoleOutput: [],
      explanation: "Methodenaufruf ueber Referenz: 'konto2.einzahlen(50.0)'. Im neuen Stack-Frame zeigt 'this' auf dieselbe Instanz.",
    },
    {
      lineNumber: 11,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "konto1", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1" },
            { name: "konto2", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1" },
          ],
        },
        {
          methodName: "einzahlen",
          variables: [
            { name: "this", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1" },
            { name: "betrag", type: "double", value: "50.0" },
          ],
        },
      ],
      heapObjects: [{
        id: "konto1",
        type: "BankKonto",
        label: "BankKonto#1",
        values: ['inhaber = "Aylin"', "kontostand = 150.0"],
        highlightIndex: 1,
      }],
      consoleOutput: [],
      explanation: "Die Instanzvariable wird geaendert: 100.0 + 50.0 = 150.0. Aenderung passiert am Objekt auf dem Heap.",
    },
    {
      lineNumber: 19,
      stackFrames: [{
        methodName: "main",
        variables: [
          { name: "konto1", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1" },
          { name: "konto2", type: "BankKonto", value: "→ Konto#1", isReference: true, refId: "konto1" },
        ],
      }],
      heapObjects: [{
        id: "konto1",
        type: "BankKonto",
        label: "BankKonto#1",
        values: ['inhaber = "Aylin"', "kontostand = 150.0"],
      }],
      consoleOutput: ["Aylin -> 150.0"],
      explanation: "Ausgabe ueber 'konto1' bestaetigt den gemeinsamen Zustand: Beide Referenzen zeigen auf genau dasselbe Objekt.",
    },
  ],
};

const instanzVsKlassenvariablenExample: JavaExample = {
  id: "instanz-vs-klassenvariablen",
  title: "Instanz vs. Klassenvariable",
  description: "Unterschied zwischen Objektzustand und 'static' Kontext",
  semester: "semester2",
  lecture: "VL 03 - Instanzen, Klassen, Pakete",
  code: `public class Student {
    String name;
    int semester;
    static int anzahl = 0;

    Student(String name, int semester) {
        this.name = name;
        this.semester = semester;
        Student.anzahl++;
    }

    void naechstesSemester() {
        this.semester++;
    }

    public static void main(String[] args) {
        Student s1 = new Student("Mina", 2);
        Student s2 = new Student("Noah", 1);
        s1.naechstesSemester();

        System.out.println("s1 Semester: " + s1.semester);
        System.out.println("Objekte: " + Student.anzahl);
    }
}`,
  steps: [
    {
      lineNumber: 4,
      stackFrames: [
        {
          methodName: "Klasse Student",
          variables: [{ name: "anzahl", type: "int", value: "0", changed: true }],
        },
      ],
      heapObjects: [],
      consoleOutput: [],
      explanation: "'anzahl' ist eine Klassenvariable (static): Sie gehoert zur Klasse, nicht zu einer einzelnen Instanz.",
    },
    {
      lineNumber: 17,
      stackFrames: [
        {
          methodName: "Klasse Student",
          variables: [{ name: "anzahl", type: "int", value: "1", changed: true }],
        },
        {
          methodName: "main",
          variables: [{ name: "s1", type: "Student", value: "→ Student#1", isReference: true, refId: "stu1", changed: true }],
        },
      ],
      heapObjects: [{
        id: "stu1",
        type: "Student",
        label: "Student#1",
        values: ['name = "Mina"', "semester = 2"],
      }],
      consoleOutput: [],
      explanation: "Erste Instanz erzeugt. Instanzdaten (name, semester) liegen am Objekt. Klassenzaehler 'anzahl' steigt auf 1.",
    },
    {
      lineNumber: 18,
      stackFrames: [
        {
          methodName: "Klasse Student",
          variables: [{ name: "anzahl", type: "int", value: "2", changed: true }],
        },
        {
          methodName: "main",
          variables: [
            { name: "s1", type: "Student", value: "→ Student#1", isReference: true, refId: "stu1" },
            { name: "s2", type: "Student", value: "→ Student#2", isReference: true, refId: "stu2", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "stu1", type: "Student", label: "Student#1", values: ['name = "Mina"', "semester = 2"] },
        { id: "stu2", type: "Student", label: "Student#2", values: ['name = "Noah"', "semester = 1"] },
      ],
      consoleOutput: [],
      explanation: "Zweite Instanz erzeugt. Jede Instanz hat eigene Instanzvariablen, aber beide teilen sich die eine Klassenvariable 'anzahl'.",
    },
    {
      lineNumber: 19,
      stackFrames: [
        {
          methodName: "Klasse Student",
          variables: [{ name: "anzahl", type: "int", value: "2" }],
        },
        {
          methodName: "main",
          variables: [
            { name: "s1", type: "Student", value: "→ Student#1", isReference: true, refId: "stu1" },
            { name: "s2", type: "Student", value: "→ Student#2", isReference: true, refId: "stu2" },
          ],
        },
        {
          methodName: "naechstesSemester",
          variables: [{ name: "this", type: "Student", value: "→ Student#1", isReference: true, refId: "stu1", changed: true }],
        },
      ],
      heapObjects: [
        { id: "stu1", type: "Student", label: "Student#1", values: ['name = "Mina"', "semester = 2"] },
        { id: "stu2", type: "Student", label: "Student#2", values: ['name = "Noah"', "semester = 1"] },
      ],
      consoleOutput: [],
      explanation: "Instanzmethode arbeitet auf genau einer Instanz ('this'). Hier wird nur Student#1 veraendert.",
    },
    {
      lineNumber: 13,
      stackFrames: [
        {
          methodName: "Klasse Student",
          variables: [{ name: "anzahl", type: "int", value: "2" }],
        },
        {
          methodName: "main",
          variables: [
            { name: "s1", type: "Student", value: "→ Student#1", isReference: true, refId: "stu1" },
            { name: "s2", type: "Student", value: "→ Student#2", isReference: true, refId: "stu2" },
          ],
        },
        {
          methodName: "naechstesSemester",
          variables: [{ name: "this", type: "Student", value: "→ Student#1", isReference: true, refId: "stu1" }],
        },
      ],
      heapObjects: [
        { id: "stu1", type: "Student", label: "Student#1", values: ['name = "Mina"', "semester = 3"], highlightIndex: 1 },
        { id: "stu2", type: "Student", label: "Student#2", values: ['name = "Noah"', "semester = 1"] },
      ],
      consoleOutput: [],
      explanation: "Nur die Instanzvariable von s1 aendert sich (2 -> 3). s2 und die Klassenvariable bleiben unveraendert.",
    },
    {
      lineNumber: 22,
      stackFrames: [
        {
          methodName: "Klasse Student",
          variables: [{ name: "anzahl", type: "int", value: "2" }],
        },
        {
          methodName: "main",
          variables: [
            { name: "s1", type: "Student", value: "→ Student#1", isReference: true, refId: "stu1" },
            { name: "s2", type: "Student", value: "→ Student#2", isReference: true, refId: "stu2" },
          ],
        },
      ],
      heapObjects: [
        { id: "stu1", type: "Student", label: "Student#1", values: ['name = "Mina"', "semester = 3"] },
        { id: "stu2", type: "Student", label: "Student#2", values: ['name = "Noah"', "semester = 1"] },
      ],
      consoleOutput: ["s1 Semester: 3", "Objekte: 2"],
      explanation: "Die Konsole zeigt den Unterschied klar: Instanzzustand kommt von einem Objekt, Klassenzustand von der Klasse.",
    },
  ],
};

const packageImportExample: JavaExample = {
  id: "pakete-import",
  title: "Pakete & Import",
  description: "Namensraeume strukturieren Klassen und vermeiden Kollisionen",
  semester: "semester2",
  lecture: "VL 03 - Instanzen, Klassen, Pakete",
  code: `// Datei: src/uni/modell/Kurs.java
package uni.modell;

public class Kurs {
    String titel;

    Kurs(String titel) {
        this.titel = titel;
    }
}

// Datei: src/app/Main.java
package app;

import uni.modell.Kurs;

public class Main {
    public static void main(String[] args) {
        Kurs oop = new Kurs("Objektorientierung");
        System.out.println(oop.titel);
    }
}`,
  steps: [
    {
      lineNumber: 2,
      stackFrames: [],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Die Klasse 'Kurs' liegt im Paket 'uni.modell'. Pakete gruppieren Klassen fachlich und erzeugen klare Namensraeume.",
    },
    {
      lineNumber: 15,
      stackFrames: [],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Mit 'import uni.modell.Kurs' wird der vollqualifizierte Name verkuerzt. Ohne Import muesstest du 'uni.modell.Kurs' ausschreiben.",
    },
    {
      lineNumber: 19,
      stackFrames: [
        { methodName: "main", variables: [{ name: "oop", type: "Kurs", value: "→ Kurs#1", isReference: true, refId: "kurs1", changed: true }] },
        { methodName: "Kurs(...)", variables: [{ name: "titel", type: "String", value: "\"Objektorientierung\"", changed: true }] },
      ],
      heapObjects: [{ id: "kurs1", type: "Kurs", label: "Kurs#1", values: ["titel = null"] }],
      consoleOutput: [],
      explanation: "Im Paket 'app' wird eine Instanz aus einem anderen Paket erzeugt. Konstruktoraufruf legt den Grundzustand fest.",
    },
    {
      lineNumber: 8,
      stackFrames: [
        { methodName: "main", variables: [{ name: "oop", type: "Kurs", value: "→ Kurs#1", isReference: true, refId: "kurs1" }] },
        { methodName: "Kurs(...)", variables: [{ name: "titel", type: "String", value: "\"Objektorientierung\"" }] },
      ],
      heapObjects: [{ id: "kurs1", type: "Kurs", label: "Kurs#1", values: ['titel = "Objektorientierung"'], highlightIndex: 0 }],
      consoleOutput: [],
      explanation: "Konstruktorinitialisierung: this.titel uebernimmt den Parameterwert.",
    },
    {
      lineNumber: 20,
      stackFrames: [{ methodName: "main", variables: [{ name: "oop", type: "Kurs", value: "→ Kurs#1", isReference: true, refId: "kurs1" }] }],
      heapObjects: [{ id: "kurs1", type: "Kurs", label: "Kurs#1", values: ['titel = "Objektorientierung"'] }],
      consoleOutput: ["Objektorientierung"],
      explanation: "Das Programm verwendet nun die importierte Klasse normal. Paketstruktur aendert nicht die Objektlogik, nur Organisation und Sichtbarkeit.",
    },
  ],
};

const staticKeywordExample: JavaExample = {
  id: "static-schluesselwort",
  title: "Schluesselwort static",
  description: "Instanzvariablen vs. Klassenvariable in einem Ablauf",
  semester: "semester2",
  lecture: "VL 03 - Instanzen, Klassen, Pakete",
  customQuestion2: {
    prompt: "Warum waere ein Zugriff wie 'a = 5;' in der statischen Methode increaseC() unzulaessig?",
    options: [
      "A) Weil 'a' privat ist.",
      "B) Weil statische Methoden keinen impliziten Objektbezug (this) haben.",
      "C) Weil int-Variablen nicht in Methoden geaendert werden duerfen.",
      "D) Weil die Methode increaseC() void ist.",
    ],
    correctOption: "B) Weil statische Methoden keinen impliziten Objektbezug (this) haben.",
    explanation: "Instanzvariablen wie 'a' gehoeren zu einem konkreten Objekt. Eine statische Methode arbeitet ohne Objektinstanz und hat daher keinen direkten Zugriff auf Instanzzustand.",
  },
  customQuestion3: {
    prompt: "Wenn am Ende von main zusaetzlich 'Klasse objekt2 = new Klasse();' ausgefuehrt wird: Welche Werte haben objekt2.a und Klasse.c direkt danach?",
    options: [
      "A) objekt2.a = 0 und Klasse.c = 3",
      "B) objekt2.a = 1 und Klasse.c = 3",
      "C) objekt2.a = 0 und Klasse.c = 0",
      "D) objekt2.a = 3 und Klasse.c = 3",
    ],
    correctOption: "A) objekt2.a = 0 und Klasse.c = 3",
    explanation: "Neue Instanzen starten mit Defaultwerten (int -> 0). Die Klassenvariable c ist bereits auf 3 erhoeht worden und bleibt fuer alle Instanzen gemeinsam.",
  },
  code: `public class Klasse {
    int a;
    int b;
    static int c;

    void increaseAll() {
        a += 1;
        b += 1;
        c += 1;
    }

    static void increaseC() {
        c += 1;
    }

    public static void main(String[] args) {
        Klasse objekt = new Klasse();
        objekt.increaseAll();
        objekt.increaseC();
        Klasse.increaseC();
        System.out.println(objekt.a + " " + objekt.b + " " + objekt.c);
    }
}`,
  steps: [
    {
      lineNumber: 16,
      stackFrames: [
        { methodName: "Klasse Klasse", variables: [{ name: "c", type: "int", value: "0", changed: true }] },
        { methodName: "main", variables: [{ name: "objekt", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1", changed: true }] },
      ],
      heapObjects: [{ id: "klass1", type: "Klasse", label: "Klasse#1", values: ["a = 0", "b = 0"] }],
      consoleOutput: [],
      explanation: "Ein neues Objekt wird erzeugt. Instanzvariablen a und b starten mit 0. Klassenvariable c startet ebenfalls bei 0.",
    },
    {
      lineNumber: 17,
      stackFrames: [
        { methodName: "Klasse Klasse", variables: [{ name: "c", type: "int", value: "0" }] },
        { methodName: "main", variables: [{ name: "objekt", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
        { methodName: "increaseAll", variables: [{ name: "this", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1", changed: true }] },
      ],
      heapObjects: [{ id: "klass1", type: "Klasse", label: "Klasse#1", values: ["a = 0", "b = 0"] }],
      consoleOutput: [],
      explanation: "Aufruf der Instanzmethode increaseAll() auf objekt.",
    },
    {
      lineNumber: 7,
      stackFrames: [
        { methodName: "Klasse Klasse", variables: [{ name: "c", type: "int", value: "0" }] },
        { methodName: "main", variables: [{ name: "objekt", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
        { methodName: "increaseAll", variables: [{ name: "this", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
      ],
      heapObjects: [{ id: "klass1", type: "Klasse", label: "Klasse#1", values: ["a = 1", "b = 0"], highlightIndex: 0 }],
      consoleOutput: [],
      explanation: "a wird um 1 erhoeht (0 -> 1).",
    },
    {
      lineNumber: 8,
      stackFrames: [
        { methodName: "Klasse Klasse", variables: [{ name: "c", type: "int", value: "0" }] },
        { methodName: "main", variables: [{ name: "objekt", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
        { methodName: "increaseAll", variables: [{ name: "this", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
      ],
      heapObjects: [{ id: "klass1", type: "Klasse", label: "Klasse#1", values: ["a = 1", "b = 1"], highlightIndex: 1 }],
      consoleOutput: [],
      explanation: "b wird um 1 erhoeht (0 -> 1).",
    },
    {
      lineNumber: 9,
      stackFrames: [
        { methodName: "Klasse Klasse", variables: [{ name: "c", type: "int", value: "1", changed: true }] },
        { methodName: "main", variables: [{ name: "objekt", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
        { methodName: "increaseAll", variables: [{ name: "this", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
      ],
      heapObjects: [{ id: "klass1", type: "Klasse", label: "Klasse#1", values: ["a = 1", "b = 1"] }],
      consoleOutput: [],
      explanation: "Klassenvariable c wird ebenfalls um 1 erhoeht (0 -> 1).",
    },
    {
      lineNumber: 18,
      stackFrames: [
        { methodName: "Klasse Klasse", variables: [{ name: "c", type: "int", value: "2", changed: true }] },
        { methodName: "main", variables: [{ name: "objekt", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
      ],
      heapObjects: [{ id: "klass1", type: "Klasse", label: "Klasse#1", values: ["a = 1", "b = 1"] }],
      consoleOutput: [],
      explanation: "Statischer Methodenaufruf ueber Instanz (objekt.increaseC()) erhoeht c auf 2.",
    },
    {
      lineNumber: 19,
      stackFrames: [
        { methodName: "Klasse Klasse", variables: [{ name: "c", type: "int", value: "3", changed: true }] },
        { methodName: "main", variables: [{ name: "objekt", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
      ],
      heapObjects: [{ id: "klass1", type: "Klasse", label: "Klasse#1", values: ["a = 1", "b = 1"] }],
      consoleOutput: [],
      explanation: "Statischer Methodenaufruf ueber Klassennamen (Klasse.increaseC()) erhoeht c auf 3.",
    },
    {
      lineNumber: 20,
      stackFrames: [
        { methodName: "Klasse Klasse", variables: [{ name: "c", type: "int", value: "3" }] },
        { methodName: "main", variables: [{ name: "objekt", type: "Klasse", value: "→ Klasse#1", isReference: true, refId: "klass1" }] },
      ],
      heapObjects: [{ id: "klass1", type: "Klasse", label: "Klasse#1", values: ["a = 1", "b = 1"] }],
      consoleOutput: ["1 1 3"],
      explanation: "Ausgabe bestaetigt den Endzustand: a=1, b=1 und c=3.",
    },
  ],
};

const typenModuleSchnittstellenExample: JavaExample = {
  id: "typen-module-schnittstellen",
  title: "Shop: Typen, Records und Interfaces",
  description: "IPriceable, IDescribable, record Address und Type-Cast",
  semester: "semester2",
  lecture: "04-Typen, Module, Schnittstellen 11.05.25",
  customQuestions: [
    {
      prompt: "1a) Nennen Sie den Unterschied zwischen primitiven Datentypen und Referenztypen in Java. Wo werden sie jeweils im Speicher abgelegt?",
      options: [],
      correctOption: "Primitive Typen (`int`, `double`, `boolean`, `char`, ...) werden direkt auf dem Stack gehalten; der Wert steckt in der Variable. Referenztypen (Klassen, Arrays, Interfaces) liegen als Objekte im Heap, waehrend die Variable auf dem Stack nur eine Referenz auf das Objekt speichert. Bei primitiven Werten wird bei Uebergabe eine Wertkopie erstellt (pass-by-value). Bei Referenztypen wird die Referenz kopiert; dadurch zeigen beide Referenzen auf dasselbe Objekt.",
      explanation: "Musterloesung: Stack/Heap sauber trennen und Uebergabeverhalten erklaeren.",
      hintQuestion: "Denken Sie an Stack und Heap. Was passiert mit den Daten, wenn eine Methode beendet wird? Wo lebt ein Objekt, das mit new erzeugt wurde?",
    },
    {
      prompt: "1b) Zeile 63 fuehrt eine explizite Typumwandlung (narrowing cast) durch. Warum ist hier ein expliziter Cast notwendig und welches Risiko entsteht dabei?",
      options: [],
      correctOption: "`totalPrice()` liefert `double`, die Zielvariable `x` ist `int`. Da `double` ein groesserer Typ ist, waere eine automatische Umwandlung potenziell verlustbehaftet und wird ohne expliziten Cast vom Compiler nicht erlaubt. Mit `(int)` erfolgt ein Narrowing-Cast: Nachkommastellen werden abgeschnitten (kein Runden). Risiko: Datenverlust (`1044.97 -> 1044`) und bei sehr grossen Werten moeglicher Wertebereichsverlust fuer `int`.",
      explanation: "Musterloesung: expliziter Cast wegen Narrowing + klares Risiko benennen.",
      hintQuestion: "Warum akzeptiert der Compiler ohne Cast-Operator keinen Code? Was kann passieren, wenn der double-Wert z. B. 1044.97 beträgt — was steht dann in x?",
    },
    {
      prompt: "1c) Welche der folgenden Zuweisungen sind implizit moeglich, welche erfordern einen expliziten Cast? Begruenden Sie kurz: `int i = 42L; double d = 3.14f; byte b = 200; float f = 10;`",
      options: [],
      correctOption: "`int i = 42L;` -> Fehler ohne Cast, weil `long -> int` Narrowing ist (korrekt: `int i = (int) 42L;`). `double d = 3.14f;` -> implizit moeglich (`float -> double`, Widening). `byte b = 200;` -> Fehler/kein gueltiger impliziter Cast; 200 liegt ausserhalb des `byte`-Bereichs (-128..127), mit Cast waere es bewusst verlustbehaftet. `float f = 10;` -> implizit moeglich (`int -> float`, Widening).",
      explanation: "Musterloesung: Richtung der Umwandlung entscheidet (Widening implizit, Narrowing explizit).",
      hintQuestion: "Merken Sie sich die Reihenfolge: byte -> short -> char -> int -> long -> float -> double. Geht die Umwandlung in Richtung \"groeßerer Typ\", ist sie implizit moeglich.",
    },
    {
      prompt: "1d) Was ist ein Record-Datentyp in Java (Zeile 17)? Welche Methoden generiert der Compiler automatisch und was unterscheidet ihn von einer normalen Klasse?",
      options: [],
      correctOption: "Ein `record` ist ein kompakter Klassentyp fuer unveraenderliche (immutable) zusammengesetzte Daten. Der Compiler erzeugt automatisch den Konstruktor, Accessor-Methoden (ohne `get`-Praefix), sowie `equals()`, `hashCode()` und `toString()`. Gegenueber einer normalen Klasse gibt es deutlich weniger Boilerplate und typischerweise keine Setter fuer nachtraegliche Aenderungen.",
      explanation: "Musterloesung: Record = kompakt + immutable + automatisch generierte Standardmethoden.",
      hintQuestion: "Ueberlegen Sie: Kann man Attribute eines Records nachtraeglich veraendern? Welche Boilerplate-Methoden muesste man bei einer normalen Klasse selbst schreiben?",
    },
    {
      prompt: "1e) Erklaeren Sie den Unterschied zwischen pass-by-value und pass-by-reference anhand eines Beispiels aus dem Code.",
      options: [],
      correctOption: "Pass-by-value im Beispiel: `getPrice()` liefert einen primitiven `double`; in `sum += item.getPrice()` wird mit einer Wertkopie gerechnet, das Feld `price` im Objekt bleibt unveraendert. Referenzfall im Beispiel: `addr` (Zeilen 59 und 61) wird als Objekt-Referenz weitergereicht; beide `PhysicalProduct`-Objekte zeigen auf dieselbe `Address`-Instanz. Wuerde diese Referenz auf ein mutierbares Objekt zeigen, waeren Objekt-Aenderungen ueber beide Referenzen sichtbar.",
      explanation: "Musterloesung: primitiver Wert vs. gemeinsam genutztes Referenzziel sauber unterscheiden.",
      hintQuestion: "Was passiert, wenn getPrice() den primitiven double-Wert zurueckgibt und dieser an eine Methode uebergeben wird? Was passiert, wenn das addr-Objekt uebergeben wird?",
    },
    {
      prompt: "1f) Zeile 72 fuehrt zu einem Compiler-Fehler. Erklaeren Sie das Problem und nennen Sie eine Loesung.",
      options: [],
      correctOption: "`d` ist vom deklarierten Typ `IDescribable`. Dieses Interface deklariert nur `getDescription()`, aber nicht `getPrice()`. Deshalb ist `d.getPrice()` zur Compile-Zeit nicht sichtbar (`cannot find symbol`). Loesung: `d` als `IPriceable` bzw. `DigitalProduct` deklarieren oder explizit casten (`((IPriceable) d).getPrice()`), sofern der Laufzeittyp das Interface wirklich implementiert.",
      explanation: "Musterloesung: deklarierter Typ steuert Methodensichtbarkeit.",
      hintQuestion: "Schauen Sie genau auf den deklarierten Typ der Variable d (Zeile 70). Welche Methoden stellt das Interface IDescribable bereit? Was fehlt in diesem Interface?",
    },
    {
      prompt: "2a) Was versteht man unter dem DRY-Prinzip (Don't Repeat Yourself)? Zeigen Sie anhand des Code-Beispiels, wie DRY umgesetzt wurde.",
      options: [],
      correctOption: "DRY bedeutet, dass dieselbe Logik nicht mehrfach dupliziert wird. Im Code ist die Summierungslogik zentral in `totalPrice()` ausgelagert, statt sie an mehreren Stellen in `main()` zu wiederholen. Vorteil: Aenderungen (z. B. Rabattregel) muessen nur einmal vorgenommen werden.",
      explanation: "Musterloesung: DRY reduziert Duplikate und senkt Wartungsaufwand.",
      hintQuestion: "Schauen Sie sich die Methode totalPrice() an. Muesste man ohne DRY die Summierungslogik mehrfach schreiben? Was waere der Nachteil von dupliziertem Code?",
    },
    {
      prompt: "2b) Beschreiben Sie das Prinzip des Information Hiding nach Parnas. Warum ist eine Modularisierung nach Prozess-Schritten laut Parnas problematisch?",
      options: [],
      correctOption: "Nach Parnas wird Software in Module zerlegt, von denen jedes eine wahrscheinlich aendernde Designentscheidung verbirgt. Problem bei Modularisierung nach Prozess-Schritten: Aenderungen in einem Schritt greifen oft in viele andere Schritte ein und erzeugen enge Kopplung. Besser ist eine Zerlegung nach Verantwortlichkeiten und Aenderungswahrscheinlichkeit mit klaren Schnittstellen.",
      explanation: "Musterloesung: Modulgrenzen entlang versteckter Implementierungsentscheidungen, nicht entlang Ablaufphasen.",
      hintQuestion: "Stellen Sie sich einen Online-Shop-Bestellprozess vor. Was aendert sich haeufiger: der Ablauf der Schritte oder die Implementierung einzelner Funktionsbereiche? Was ist das Ziel von Information Hiding?",
    },
    {
      prompt: "2c) Welche Vorteile bietet das prozedurale Programmierparadigma (Auslagerung von Code in parametrisierte Methoden) gegenueber direktem, sequentiellem Code? Nennen Sie drei konkrete Vorteile.",
      options: [],
      correctOption: "Drei Vorteile: (1) geringere Redundanz, weil Logik nur einmal implementiert wird, (2) bessere Lesbarkeit durch sprechende Methodennamen wie `totalPrice()`, (3) hohe Wiederverwendbarkeit, da dieselbe Methode fuer unterschiedliche Eingaben genutzt werden kann.",
      explanation: "Musterloesung: weniger Copy-Paste, klarere Struktur, einfachere Wartung.",
      hintQuestion: "Was waere der Nachteil, wenn Sie in main() die Summierungsschleife dreimal ausschreiben wuerden? Was wuerde passieren, wenn Sie einen Fehler in der Logik beheben muessen?",
    },
    {
      prompt: "2d) Erklaeren Sie, was in Java ein Modul im Sinne von Information Hiding ist. Wie wird das Konzept im Code umgesetzt? Identifizieren Sie mindestens zwei Module.",
      options: [],
      correctOption: "Ein Modul kapselt interne Entscheidungen und stellt nur eine stabile Schnittstelle bereit. Im Code sind mindestens `PhysicalProduct` und `DigitalProduct` eigene Module: beide verbergen interne Felder, nach aussen zaehlt nur das Interface-Verhalten (`IPriceable`, `IDescribable`). Auch `Address` kapselt Adressstruktur. So koennen Implementierungen ausgetauscht werden, ohne aufrufenden Code zu brechen.",
      explanation: "Musterloesung: Module ueber Verantwortung + Kapselung statt ueber Ablaufschritte.",
      hintQuestion: "Ein Modul im Sinne von Parnas verbirgt eine Designentscheidung. Denken Sie: Was verbirgt die Klasse PhysicalProduct vor dem Rest der Anwendung? Was verbirgt DigitalProduct?",
    },
    {
      prompt: "3a) Was sind Interfaces in Java? Nennen Sie drei wesentliche Eigenschaften von Interfaces.",
      options: [],
      correctOption: "Interfaces sind Vertragstypen. Eigenschaften: (1) nicht direkt instanziierbar, (2) definieren Methodensignaturen (und ggf. Default-Methoden), (3) Klassen binden sich mit `implements` und muessen die geforderten Methoden bereitstellen.",
      explanation: "Interfaces foerdern lose Kopplung und Polymorphie.",
      hintQuestion: "Kann man von einem Interface direkt ein Objekt mit new erzeugen? Was steht in einem Interface — Deklaration oder Implementierung? Welches Schluesselwort verwendet eine Klasse, um ein Interface zu nutzen?",
    },
    {
      prompt: "3b) Benennen Sie alle \"Ist-Ein\"-Beziehungen im Code-Beispiel und geben Sie die Zeilennummern an.",
      options: [],
      correctOption: "`PhysicalProduct implements IPriceable, IDescribable` (Zeile 19). `DigitalProduct implements IPriceable, IDescribable` (Zeile 34). Eine `interface extends interface`-Beziehung gibt es im gezeigten Code nicht.",
      explanation: "Ist-Ein entsteht hier durch Interface-Implementierung.",
      hintQuestion: "Schauen Sie nach den Schluesselwoertern implements und extends. Welche Klassen implementieren welche Interfaces? Gilt auch: Interface extends Interface?",
    },
    {
      prompt: "3c) Die Methode `totalPrice()` (Zeile 48) akzeptiert `List<IPriceable>` statt `List<PhysicalProduct>`. Welches Prinzip steckt dahinter und welchen Vorteil bietet diese Entscheidung?",
      options: [],
      correctOption: "Prinzip: Programmieren gegen Abstraktion/Interface. Vorteil: `totalPrice` arbeitet mit allen aktuellen und zukuenftigen Typen, die `IPriceable` implementieren (z. B. `PhysicalProduct`, `DigitalProduct`, spaeter `Subscription`).",
      explanation: "Das reduziert Kopplung und erhoeht Erweiterbarkeit.",
      hintQuestion: "Koennte totalPrice() auch mit zukuenftigen Produkttypen (z. B. Subscription) aufgerufen werden, wenn diese IPriceable implementieren? Was waere der Nachteil, wenn man PhysicalProduct direkt als Typ verwenden wuerde?",
    },
    {
      prompt: "3d) Was ist eine Default-Methode in einem Interface (Zeile 8–10)? Erklaeren Sie, was `item.getPriceLabel()` in Zeile 67 fuer ein `PhysicalProduct` ausgibt, wenn die Klasse diese Methode nicht ueberschreibt.",
      options: [],
      correctOption: "Eine Default-Methode ist eine bereits implementierte Methode im Interface (`default`). Wenn `PhysicalProduct` sie nicht ueberschreibt, wird `IPriceable.getPriceLabel()` genutzt. Fuer den Laptop ergibt das `999.99 EUR`.",
      explanation: "Die Methode baut den Text aus `getPrice() + \" EUR\"`.",
      hintQuestion: "Welchen Wert gibt getPrice() fuer den Laptop zurueck? Wie setzt sich der String in getPriceLabel() zusammen? Schauen Sie sich die Default-Implementierung an.",
    },
    {
      prompt: "3e) Eine Klasse kann mehrere Interfaces implementieren. Zeigen Sie dies anhand des Code-Beispiels und erklaeren Sie den Unterschied zur Vererbung (`extends`), bei der nur eine Elternklasse moeglich ist.",
      options: [],
      correctOption: "`PhysicalProduct` und `DigitalProduct` implementieren jeweils zwei Interfaces (`IPriceable`, `IDescribable`). In Java kann eine Klasse mehrere Interfaces, aber nur eine Klasse per `extends` erben. Interfaces liefern Vertraege, Klassenvererbung liefert konkreten Basiskode/Zustand.",
      explanation: "Mehrfach-Interface-Implementierung ermoeglicht flexible Typkombinationen.",
      hintQuestion: "Schauen Sie sich Zeile 19 und 34 an. Welche Interfaces implementieren diese Klassen? Was waere der Unterschied, wenn PhysicalProduct von DigitalProduct erben wuerde?",
    },
    {
      prompt: "3f) Zeichnen Sie ein UML-Klassendiagramm fuer alle Interfaces und Klassen aus dem Code-Beispiel. Verwenden Sie korrekte UML-Notationen.",
      options: [],
      correctOption: "Textuell: `<<interface>> IPriceable` mit `getPrice()` und `getPriceLabel()`. `<<interface>> IDescribable` mit `getDescription()`. `PhysicalProduct ..|> IPriceable` und `PhysicalProduct ..|> IDescribable`; Attribute `name`, `price`, `deliveryAddress: Address`. `DigitalProduct ..|> IPriceable` und `DigitalProduct ..|> IDescribable`; Attribute `name`, `price`. `Shop` nutzt `List<IPriceable>` und `totalPrice(...)`. `Address` ist record und wird von `PhysicalProduct` referenziert (Assoziation/Komposition-nahe Besitzbeziehung).",
      explanation: "Implementierung: gestrichelte Linie mit Dreieckspfeil zum Interface.",
      hintQuestion: "Interfaces im Diagramm mit <> beschriften. Implementierung: gestrichelter Pfeil. Denken Sie an Address und die Kompositionsbeziehung zu PhysicalProduct. Klassen Shop, PhysicalProduct, DigitalProduct, Address, IPriceable, IDescribable muessen alle vorkommen.",
    },
    {
      prompt: "3g) Erklaeren Sie, warum es eine Interface-Hierarchie in Java gibt (`interface extends interface`). Schreiben Sie ein kleines Beispiel, in dem `IPriceable` `IDescribable` erweitert.",
      options: [],
      correctOption: "Interface-Hierarchie erlaubt Vertragsbündelung und Wiederverwendung. Beispiel:\n`interface IPriceable extends IDescribable { double getPrice(); default String getPriceLabel(){ return getPrice()+\" EUR\"; } }`\nEine Klasse, die `IPriceable` implementiert, muss dann sowohl `getPrice()` als auch `getDescription()` (aus `IDescribable`) bereitstellen.",
      explanation: "So lassen sich spezialisierte Interfaces aus allgemeineren aufbauen.",
      hintQuestion: "Was bedeutet es, wenn ein Interface ein anderes Interface erweitert? Welche Methoden muss eine Klasse dann implementieren, die das erweiterte Interface implementiert? Welchen Vorteil hat das?",
    },
    {
      prompt: "4a) Nennen Sie drei Unterschiede zwischen Arrays und Listen in Java.",
      options: [],
      correctOption: "Beispiele: (1) Array hat feste Groesse, Liste ist dynamisch. (2) Arrays koennen auch primitive Typen direkt halten (`int[]`), `List` arbeitet mit Referenztypen/Wrappern. (3) Einfuegen/Loeschen ist bei Listen flexibler, bei Arrays unhandlicher.",
      explanation: "Listen bieten API-Komfort (`add`, `remove`, ...), Arrays sind statischer.",
      hintQuestion: "Denken Sie an: Groeße, Datentypen der Elemente, Aufwand fuer Einfuegen/Loeschen. Was muss man bei der Erstellung eines Arrays festlegen, was bei einer Liste nicht?",
    },
    {
      prompt: "4b) Zeile 58 deklariert: `List<IPriceable> cart = new ArrayList<>();` Warum wird der Variablentyp als `List` (Interface) und nicht direkt als `ArrayList` (Klasse) deklariert?",
      options: [],
      correctOption: "Das folgt dem Interface-Prinzip: Nutzung ueber den abstrakten Typ (`List`) statt konkrete Implementierung. Vorteil: Implementierung kann spaeter leicht gewechselt werden (z. B. `LinkedList`), ohne den restlichen Code stark anzupassen.",
      explanation: "Lose Kopplung verbessert Austauschbarkeit und Wartbarkeit.",
      hintQuestion: "Was waere noetig, um die Implementierung von ArrayList auf LinkedList zu wechseln? Wuerde der Rest des Codes davon betroffen sein?",
    },
    {
      prompt: "4c) Was gibt `System.out.println(\"Gesamt: \" + totalPrice(cart))` in Zeile 64 aus? Zeigen Sie die Berechnung Schritt fuer Schritt.",
      options: [],
      correctOption: "Ausgabe: `Gesamt: 1044.97`. Berechnung: `999.99 + 14.99 + 29.99 = 1044.97`.",
      explanation: "Die drei Produkte werden in Zeile 59–61 in den Warenkorb gelegt.",
      hintQuestion: "Addieren Sie die Preise aller Produkte in der cart-Liste. Welche Produkte wurden in den Zeilen 59–61 hinzugefuegt?",
    },
    {
      prompt: "4d) Erklaeren Sie, was generische Datentypen sind (z. B. `List<IPriceable>`). Welchen Vorteil bieten sie gegenueber einer Liste ohne Typangabe (`List` ohne `<>`)?",
      options: [],
      correctOption: "Generics parameterisieren Container mit Typen. `List<IPriceable>` garantiert zur Compile-Zeit, dass nur passende Elemente hineinkommen und beim Lesen kein unsicherer Cast noetig ist. Ohne Generics (`raw type`) steigen Cast-Aufwand und Laufzeitfehler-Risiko.",
      explanation: "Generics verschieben viele Fehler von Laufzeit auf Compile-Zeit.",
      hintQuestion: "Was passiert ohne generischen Typ, wenn Sie ein Element aus der Liste holen? Was prueft der Compiler bei einer typisierten Liste? Wann treten Fehler auf — zur Kompilierzeit oder zur Laufzeit?",
    },
  ],
  codingExercises: [
    {
      title: "2e - DRY-Methode fuer Mehrwertsteuer",
      prompt: "Schreiben Sie eine parametrisierte Methode nach DRY fuer den redundanten Code: `double vatA = 999.99 * 0.19; double vatB = 14.99 * 0.19; double vatC = 29.99 * 0.19;`",
      starterCode: "public static double calculateVat(double netPrice) {\n    // TODO\n}\n\npublic static void example() {\n    double vatA = calculateVat(999.99);\n    double vatB = calculateVat(14.99);\n    double vatC = calculateVat(29.99);\n}",
      referenceSolution: "public static double calculateVat(double netPrice) {\n    return netPrice * 0.19;\n}\n\npublic static void example() {\n    double vatA = calculateVat(999.99);\n    double vatB = calculateVat(14.99);\n    double vatC = calculateVat(29.99);\n}",
      hintQuestion: "Welcher Teil des Codes aendert sich (Variable) und welcher bleibt gleich (Konstante)? Der veraenderliche Teil wird zum Parameter. Was soll die Methode zurueckgeben?",
    },
    {
      title: "4e - filterExpensive(List<IPriceable>, threshold)",
      prompt: "Implementieren Sie `filterExpensive(List<IPriceable> items, double threshold)`, die eine neue Liste mit allen Produkten zurueckgibt, deren Preis groesser als `threshold` ist.",
      starterCode: "public static List<IPriceable> filterExpensive(List<IPriceable> items, double threshold) {\n    // TODO\n}",
      referenceSolution: "public static List<IPriceable> filterExpensive(List<IPriceable> items, double threshold) {\n    List<IPriceable> result = new ArrayList<>();\n    for (IPriceable item : items) {\n        if (item.getPrice() > threshold) {\n            result.add(item);\n        }\n    }\n    return result;\n}",
      hintQuestion: "Welchen Rueckgabetyp hat die Methode? Erstellen Sie zunaechst eine leere Liste. Verwenden Sie eine for-Schleife und getPrice(). Welches Interface verwenden Sie als Rueckgabetyp — List oder ArrayList?",
    },
  ],
  code: `package de.htwberlin.wi.shop;

import java.util.ArrayList;
import java.util.List;

interface IPriceable {
    double getPrice();
    default String getPriceLabel() {
        return getPrice() + " EUR";
    }
}

interface IDescribable {
    String getDescription();
}

record Address(String street, String city) { }

class PhysicalProduct implements IPriceable, IDescribable {
    private String name;
    private double price;
    private Address deliveryAddress;

    public PhysicalProduct(String name, double price, Address addr) {
        this.name = name;
        this.price = price;
        this.deliveryAddress = addr;
    }

    @Override public double getPrice() { return price; }
    @Override public String getDescription() { return name + " -> " + deliveryAddress.city(); }
}

class DigitalProduct implements IPriceable, IDescribable {
    private String name;
    private double price;

    public DigitalProduct(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override public double getPrice() { return price; }
    @Override public String getDescription() { return name + " (Download)"; }
}

public class Shop {
    public static double totalPrice(List<IPriceable> items) {
        double sum = 0;
        for (IPriceable item : items) {
            sum += item.getPrice();
        }
        return sum;
    }

    public static void main(String[] args) {
        Address addr = new Address("Hauptstr. 1", "Berlin");
        List<IPriceable> cart = new ArrayList<>();
        cart.add(new PhysicalProduct("Laptop", 999.99, addr));
        cart.add(new DigitalProduct("E-Book", 14.99));
        cart.add(new PhysicalProduct("Mouse", 29.99, addr));

        int x = (int) totalPrice(cart);
        System.out.println("Gesamt: " + totalPrice(cart));

        for (IPriceable item : cart) {
            System.out.println(item.getPriceLabel());
        }

        IDescribable d = new DigitalProduct("Course", 49.99);
        System.out.println(d.getDescription());
        System.out.println(d.getPrice()); // Zeile 72
    }
}`,
  steps: [
    {
      lineNumber: 57,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "addr", type: "Address", value: "→ Addr#1", isReference: true, refId: "addr1", changed: true }],
        },
      ],
      heapObjects: [{ id: "addr1", type: "Address(record)", label: "Addr#1", values: ['street = "Hauptstr. 1"', 'city = "Berlin"'] }],
      consoleOutput: [],
      explanation: "In Zeile 57 passiert technisch Folgendes: (1) `new Address(\"Hauptstr. 1\", \"Berlin\")` reserviert Speicher im Heap und erstellt das Record-Objekt `Addr#1`. (2) Die Record-Komponenten werden gesetzt: `street = \"Hauptstr. 1\"`, `city = \"Berlin\"`. (3) Im Stack-Frame von `main` wird die lokale Variable `addr` angelegt und mit der Referenz auf `Addr#1` gefuellt. Wichtig: In `addr` liegt nicht die Adresse selbst als Datenkopie, sondern nur der Verweis auf das Objekt im Heap.",
    },
    {
      lineNumber: 58,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "addr", type: "Address", value: "→ Addr#1", isReference: true, refId: "addr1" },
            { name: "cart", type: "List<IPriceable>", value: "→ Cart#1", isReference: true, refId: "cart1", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "addr1", type: "Address(record)", label: "Addr#1", values: ['street = "Hauptstr. 1"', 'city = "Berlin"'] },
        { id: "cart1", type: "ArrayList<IPriceable>", label: "Cart#1", values: [] },
      ],
      consoleOutput: [],
      explanation: "Hier wird `cart` als `List<IPriceable>` deklariert, aber mit `new ArrayList<>()` instanziiert. Das zeigt das Interface-Prinzip: Der Code arbeitet gegen die Abstraktion `List`, die konkrete Implementierung ist `ArrayList`. Im Heap entsteht eine leere Liste (`Cart#1`), im Stack wird die Referenz in `cart` gespeichert.",
    },
    {
      lineNumber: 61,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "addr", type: "Address", value: "→ Addr#1", isReference: true, refId: "addr1" },
            { name: "cart", type: "List<IPriceable>", value: "→ Cart#1", isReference: true, refId: "cart1" },
          ],
        },
      ],
      heapObjects: [
        { id: "addr1", type: "Address(record)", label: "Addr#1", values: ['street = "Hauptstr. 1"', 'city = "Berlin"'] },
        { id: "pp1", type: "PhysicalProduct", label: "Product#1", values: ['name = "Laptop"', "price = 999.99", "deliveryAddress = -> Addr#1"] },
        { id: "dp1", type: "DigitalProduct", label: "Product#2", values: ['name = "E-Book"', "price = 14.99"] },
        { id: "pp2", type: "PhysicalProduct", label: "Product#3", values: ['name = "Mouse"', "price = 29.99", "deliveryAddress = -> Addr#1"] },
        { id: "cart1", type: "ArrayList<IPriceable>", label: "Cart#1", values: ["→ Product#1", "→ Product#2", "→ Product#3"] },
      ],
      consoleOutput: [],
      explanation: "Nach den `add`-Aufrufen (Zeilen 59-61) enthaelt `cart` drei Objekte: zwei `PhysicalProduct` und ein `DigitalProduct`. Beide Klassen implementieren `IPriceable`, daher sind sie im selben `List<IPriceable>`-Container zulaessig (Polymorphie). Die beiden `PhysicalProduct`-Objekte referenzieren dieselbe `Address`-Instanz `Addr#1`.",
    },
    {
      lineNumber: 63,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "x", type: "int", value: "1044", changed: true },
          ],
        },
      ],
      heapObjects: [{ id: "cart1", type: "ArrayList<IPriceable>", label: "Cart#1", values: ["→ Product#1", "→ Product#2", "→ Product#3"] }],
      consoleOutput: [],
      explanation: "`totalPrice(cart)` liefert einen `double`-Wert (`1044.97`). Mit `(int)` wird bewusst ein Narrowing-Cast erzwungen, weil `int` keine Nachkommastellen speichern kann. Java schneidet dabei ab statt zu runden, daher wird `x = 1044`.",
    },
    {
      lineNumber: 64,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "x", type: "int", value: "1044" }],
        },
      ],
      heapObjects: [],
      consoleOutput: ["Gesamt: 1044.97"],
      explanation: "Die Methode `totalPrice(cart)` wird erneut aufgerufen und als `double` in den Ausgabestring eingebettet. Die Konsole zeigt deshalb `Gesamt: 1044.97`. Wichtig: Dieser Aufruf ist unabhaengig von `x`; `x` speichert nur die abgeschnittene Ganzzahl.",
    },
    {
      lineNumber: 67,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "item", type: "IPriceable", value: "→ Product#3", isReference: true, refId: "pp2", changed: true }],
        },
      ],
      heapObjects: [],
      consoleOutput: ["Gesamt: 1044.97", "999.99 EUR", "14.99 EUR", "29.99 EUR"],
      explanation: "In der for-each-Schleife ist `item` als `IPriceable` typisiert. Pro Element wird `item.getPriceLabel()` aufgerufen. Da weder `PhysicalProduct` noch `DigitalProduct` diese Methode ueberschreiben, verwendet Java die Default-Methode aus dem Interface `IPriceable`, die `getPrice() + \" EUR\"` liefert.",
    },
    {
      lineNumber: 71,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "d", type: "IDescribable", value: "→ Product#4", isReference: true, refId: "dp2", changed: true }],
        },
      ],
      heapObjects: [{ id: "dp2", type: "DigitalProduct", label: "Product#4", values: ['name = "Course"', "price = 49.99"] }],
      consoleOutput: ["Gesamt: 1044.97", "999.99 EUR", "14.99 EUR", "29.99 EUR", "Course (Download)"],
      explanation: "`d` wird als `IDescribable` deklariert, zeigt aber zur Laufzeit auf ein `DigitalProduct`. Dadurch sind ueber `d` nur Methoden sichtbar, die `IDescribable` deklariert (hier: `getDescription()`). Der Aufruf in Zeile 71 ist gueltig und gibt `Course (Download)` aus.",
    },
    {
      lineNumber: 72,
      stackFrames: [{ methodName: "Compiler", variables: [{ name: "error", type: "String", value: "cannot find symbol: method getPrice() in IDescribable", changed: true }] }],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Zeile 72 scheitert bereits bei der Kompilierung: Der statische Typ von `d` ist `IDescribable`, und dieses Interface enthaelt keine Methode `getPrice()`. Deshalb meldet der Compiler `cannot find symbol`. Loesbar waere das z. B. durch einen sicheren Cast auf `IPriceable` oder durch eine passendere Typdeklaration.",
    },
  ],
};

const stackHeapDemoExample: JavaExample = {
  id: "stack-heap-demo",
  title: "Stack vs Heap Demo",
  description: "Pass-by-Value, Referenzen und Garbage Collector",
  semester: "semester2",
  lecture: "04-Typen, Module, Schnittstellen 11.05.25",
  customQuestion1: {
    prompt: "Wo werden in Java die eigentlichen Daten eines Objekts (z. B. einer ArrayList) gespeichert?",
    options: [
      "A) Auf dem Heap.",
      "B) Direkt in der CPU.",
      "C) Auf dem Stack.",
    ],
    correctOption: "A) Auf dem Heap.",
    explanation: "Objektzustand liegt auf dem Heap; auf dem Stack liegt bei Referenztypen nur die Referenz.",
  },
  customQuestion2: {
    prompt: "Was passiert bei 'Pass-by-Value' mit einer primitiven Variable?",
    options: [
      "A) Zwei Variablen teilen sich denselben Speicherplatz.",
      "B) Es wird eine eigenstaendige Kopie des Wertes erstellt.",
    ],
    correctOption: "B) Es wird eine eigenstaendige Kopie des Wertes erstellt.",
    explanation: "Aenderungen an der Kopie haben keinen Einfluss auf das Original.",
  },
  customQuestion3: {
    prompt: "Wer raeumt im Heap auf, wenn ein Objekt nicht mehr benoetigt wird?",
    options: [
      "A) Der Programmierer muss den Speicher manuell loeschen.",
      "B) Der Garbage Collector.",
    ],
    correctOption: "B) Der Garbage Collector.",
    explanation: "Der GC erkennt Objekte ohne Referenzen und gibt deren Speicher automatisch frei.",
  },
  customQuestion4: {
    prompt: "Was wird auf dem Stack gespeichert, wenn du 'String s = new String();' schreibst?",
    options: [
      "A) Der gesamte Inhalt des Textes.",
      "B) Nur die Referenz (Adresse), die zum Objekt im Heap fuehrt.",
      "C) Das komplette Objekt selbst.",
    ],
    correctOption: "B) Nur die Referenz (Adresse), die zum Objekt im Heap fuehrt.",
    explanation: "Der String selbst liegt als Objekt im Heap; die lokale Variable auf dem Stack haelt nur die Referenz.",
  },
  code: `public class StackHeapDemo {
    public static void main(String[] args) {
        int a = 10;
        int b = a;
        b = 20;

        StringBuilder text1 = new StringBuilder("Hallo");
        StringBuilder text2 = text1;
        text2.append(" Welt");

        System.out.println(text1);
    }
}`,
  steps: [
    {
      lineNumber: 3,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "a", type: "int", value: "10", changed: true }],
        },
      ],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Primitive Variable `a` wird auf dem Stack-Frame angelegt.",
    },
    {
      lineNumber: 4,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "a", type: "int", value: "10" },
            { name: "b", type: "int", value: "10", changed: true },
          ],
        },
      ],
      heapObjects: [],
      consoleOutput: [],
      explanation: "`b = a` kopiert den Wert 10. Beide Variablen sind unabhaengige primitive Werte.",
    },
    {
      lineNumber: 5,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "a", type: "int", value: "10" },
            { name: "b", type: "int", value: "20", changed: true },
          ],
        },
      ],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Nur `b` wird veraendert. `a` bleibt 10 (Pass-by-Value mit Kopien bei primitiven Typen).",
    },
    {
      lineNumber: 7,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "text1", type: "StringBuilder", value: "→ SB#1", isReference: true, refId: "sb1", changed: true }],
        },
      ],
      heapObjects: [{ id: "sb1", type: "StringBuilder", label: "SB#1", values: ['value = "Hallo"'] }],
      consoleOutput: [],
      explanation: "`new StringBuilder(\"Hallo\")` erzeugt ein Objekt auf dem Heap. `text1` speichert nur die Referenz.",
    },
    {
      lineNumber: 8,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "text1", type: "StringBuilder", value: "→ SB#1", isReference: true, refId: "sb1" },
            { name: "text2", type: "StringBuilder", value: "→ SB#1", isReference: true, refId: "sb1", changed: true },
          ],
        },
      ],
      heapObjects: [{ id: "sb1", type: "StringBuilder", label: "SB#1", values: ['value = "Hallo"'] }],
      consoleOutput: [],
      explanation: "`text2 = text1` erzeugt kein neues Objekt. Beide Referenzen zeigen auf dasselbe Heap-Objekt.",
    },
    {
      lineNumber: 9,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "text1", type: "StringBuilder", value: "→ SB#1", isReference: true, refId: "sb1" },
            { name: "text2", type: "StringBuilder", value: "→ SB#1", isReference: true, refId: "sb1" },
          ],
        },
      ],
      heapObjects: [{ id: "sb1", type: "StringBuilder", label: "SB#1", values: ['value = "Hallo Welt"'], highlightIndex: 0 }],
      consoleOutput: [],
      explanation: "`append` veraendert den Zustand des einen gemeinsamen Objekts auf dem Heap.",
    },
    {
      lineNumber: 11,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "text1", type: "StringBuilder", value: "→ SB#1", isReference: true, refId: "sb1" },
            { name: "text2", type: "StringBuilder", value: "→ SB#1", isReference: true, refId: "sb1" },
          ],
        },
      ],
      heapObjects: [{ id: "sb1", type: "StringBuilder", label: "SB#1", values: ['value = "Hallo Welt"'] }],
      consoleOutput: ["Hallo Welt"],
      explanation: "Ausgabe ueber `text1` zeigt die Aenderung, die ueber `text2` gemacht wurde, weil beide dieselbe Instanz teilen.",
    },
  ],
};

const bauenTestenTeilenExample: JavaExample = {
  id: "bauen-testen-teilen",
  title: "BankAccount mit JUnit-Tests",
  description: "Produktionscode und Testklasse fuer deposit/withdraw",
  semester: "semester2",
  lecture: "VL 02- Bauen, Testen, Teilen",
  customQuestions: [
    {
      prompt: "1a) Nennen Sie vier Entwicklungsmodelle, die in der Softwareentwicklung eingesetzt werden. Erlaeutern Sie in 1-2 Saetzen, was agile Entwicklung von Wasserfall-Entwicklung unterscheidet.",
      options: [],
      correctOption: "Vier gaengige Entwicklungsmodelle sind: Agil, Wasserfall, V-Modell und Spiralmodell. Wasserfall arbeitet sequentiell mit frueh festgelegten Anforderungen und teuren spaeten Aenderungen. Agile Entwicklung arbeitet iterativ in kurzen Zyklen (z. B. Sprints), mit kontinuierlichem Feedback und laufender Anforderungsanpassung.",
      explanation: "Musterloesung: Modelle korrekt nennen und den Gegensatz linear vs. iterativ klar machen.",
      hintQuestion: "Denken Sie an lineare vs. iterative Ansaetze. Wann werden Anforderungen festgelegt — am Anfang oder fortlaufend?",
    },
    {
      prompt: "1b) Beschreiben Sie den Build-Prozess in Java. Nennen Sie mindestens fuenf Schritte, die ein Build-Werkzeug wie Gradle ausfuehrt.",
      options: [],
      correctOption: "Typischer Build-Prozess mit Gradle: (1) Ressourcen vorbereiten/einbinden (prepare resources), (2) Abhaengigkeiten aufloesen (Dependency Management), (3) kompilieren (`.java` -> `.class`), (4) automatisiert testen (JUnit), (5) paketieren (z. B. `.jar`). Optional folgen weitere Schritte wie Verifikation/Publish/Deployment.",
      explanation: "Musterloesung: Mindestens fuenf Build-Schritte und deren Zweck benennen.",
      hintQuestion: "Ueberlegen Sie, was zwischen \"Quellcode schreiben\" und \"fertige Anwendung ausliefern\" passiert. Welche Gradle-Phasen kennen Sie (z. B. aus dem Maven-Lifecycle)?",
    },
    {
      prompt: "1c) Was unterscheidet einen Kompilierfehler von einem roten Test? Welche Konsequenz hat jeder der beiden Fehlertypen fuer die Ausfuehrung der Tests?",
      options: [],
      correctOption: "Kompilierfehler bedeutet: Der Code kann nicht uebersetzt werden (z. B. Syntax/Import-Fehler), `compileJava` schlaegt fehl. Konsequenz: Tests laufen nicht, weil kein ausfuehrbarer Stand vorliegt. Ein roter Test bedeutet: Code kompiliert, aber mindestens eine Assertion scheitert zur Laufzeit. Konsequenz: Testphase (`gradle test`) laeuft, endet aber mit FAILED und konkreten Assertion-Fehlermeldungen.",
      explanation: "Musterloesung: Kompilierfehler blockiert Teststart, roter Test liefert inhaltlichen Fehlhinweis.",
      hintQuestion: "Was passiert mit den Tests, wenn der Compiler scheitert? Was passiert, wenn der Build erfolgreich ist, aber eine Assertion fehlschlaegt?",
    },
    {
      prompt: "1d) Erklaeren Sie den Unterschied zwischen Validierung und Verifikation im V-Modell.",
      options: [],
      correctOption: "Verifikation: \"Bauen wir das Produkt richtig?\" -> prueft gegen Spezifikation, typischerweise u. a. Unit-, Integrations- und Systemtests. Validierung: \"Bauen wir das richtige Produkt?\" -> prueft gegen fachliche Nutzeranforderungen, typischerweise Abnahmetest. Im V-Modell sind Testebenen den Entwicklungsstufen zugeordnet; Validierung gipfelt im Abnahmetest.",
      explanation: "Musterloesung: beide Leitfragen korrekt und passende Testtypen nennen.",
      hintQuestion: "Validierung: \"Bauen wir das richtige Produkt?\" Verifikation: \"Bauen wir das Produkt richtig?\" Welcher Test-Typ im V-Modell gehoert zu welchem Begriff?",
    },
    {
      prompt: "1e) Was ist der Unterschied zwischen manuellen und automatisierten Tests? Nennen Sie je zwei Vorteile und zwei Nachteile automatisierter Tests.",
      options: [],
      correctOption: "Manuelle Tests werden vom Menschen ausgefuehrt (flexibel, gut fuer explorative/usability-lastige Pruefungen), sind aber zeitaufwaendig und fehleranfaellig. Automatisierte Tests laufen skriptgesteuert. Vorteile automatisierter Tests: (1) sehr schnell/wiederholbar, (2) starker Regressionsschutz. Nachteile: (1) hoher initialer Einrichtungsaufwand, (2) erfordert Programmierkenntnisse und Pflegeaufwand.",
      explanation: "Musterloesung: Unterschiede plus je zwei Vor- und Nachteile automatisierter Tests benennen.",
      hintQuestion: "Wer fuehrt den Test aus — Mensch oder Skript? Was kostet initial mehr Aufwand? Welcher Ansatz ist besser fuer Regressionstest?",
    },
    {
      prompt: "2a) Was ist eine Assertion in einem automatisierten Test? Nennen Sie drei JUnit-Assertions aus dem Code-Beispiel und erklaeren Sie jeweils, was sie pruefen.",
      options: [],
      correctOption: "Eine Assertion ist eine testbare Zusicherung ueber erwartetes Verhalten/Zustand; faellt sie, wird der Test rot. Beispiele: `assertEquals(150.0, acc.getBalance())` prueft den Kontostand nach `deposit(50.0)`, `assertEquals(125.0, acc.getBalance())` prueft den Kontostand nach `withdraw(75.0)`, `assertThrows(IllegalStateException.class, () -> acc.withdraw(100.0))` prueft die erwartete Exception bei Unterdeckung.",
      explanation: "Musterloesung: Definition von Assertion plus konkrete Zuordnung aus dem Code.",
      hintQuestion: "Schauen Sie sich die Zeilen 43, 51, 58 und 66 an. Was genau wird mit assertEquals, assertThrows verglichen?",
    },
    {
      prompt: "2b) Was bedeuten die Annotationen `@Test` und `@DisplayName`? In welchem Ordner muessen Testklassen in einem Gradle-Projekt abgelegt werden?",
      options: [],
      correctOption: "`@Test` markiert eine Methode als ausfuehrbaren JUnit-Testfall. `@DisplayName` gibt eine lesbare Beschreibung fuer Reports/Runner aus. In Gradle gehoeren Testklassen in `src/test/java` (Produktionscode in `src/main/java`).",
      explanation: "Musterloesung: Bedeutung beider Annotationen plus korrekte Ordnerstruktur.",
      hintQuestion: "Wie findet Gradle die Tests automatisch? Schauen Sie sich die Projektstruktur an: src/main vs. src/test.",
    },
    {
      prompt: "2c) Was bedeutet es, wenn ein Test rot ist? Interpretieren Sie: `AssertionFailedError: expected: <150.0> but was: <100.0>`.",
      options: [],
      correctOption: "Ein roter Test bedeutet: eine Assertion ist fehlgeschlagen. In der Meldung ist `expected` der Sollwert (150.0) und `was` der Istwert (100.0). Das deutet auf eine fehlerhafte `deposit()`-Implementierung hin (z. B. `balance += amount` fehlt/wird nicht erreicht). Konsequenz im TDD: Implementierung korrigieren, bis der Test gruen ist.",
      explanation: "Musterloesung: Fehlermeldung in Soll/Ist zerlegen und auf Implementierungsfehler abbilden.",
      hintQuestion: "Welche Assertion hat diese Meldung erzeugt? Was bedeuten \"expected\" und \"was\"? Was hat die Implementierung falsch gemacht?",
    },
    {
      prompt: "2d) Erlaeutern Sie die drei Ziele von Software-Tests laut Vorlesung: Regression, Test-driven und Test-first. Geben Sie fuer jedes Ziel an, wann man es anwendet.",
      options: [],
      correctOption: "Regression: bestehenden funktionierenden Code nachtraeglich absichern, damit spaetere Aenderungen nichts brechen. Test-driven (roter Test bei bestehender Implementierung/Bug): erst fehlenden Test fuer den Bug schreiben, dann fixen bis gruen. Test-first (roter Test ohne Implementierung): Verhalten vor Implementierung spezifizieren, dann Implementierung bis Test gruen.",
      explanation: "Musterloesung: drei Ziele mit jeweiligem Einsatzzeitpunkt klar trennen.",
      hintQuestion: "Wann schreibt man Tests vor der Implementierung? Wann schreibt man sie, weil man einen Bug gefunden hat? Wann schreibt man sie, damit funktionierender Code nicht kaputt geht?",
    },
    {
      prompt: "2e) Was ist eine Living Documentation? Warum sind Tests als Dokumentation besser geeignet als Code-Kommentare? Wie viele Tests pro oeffentlicher Methode werden als Minimum empfohlen?",
      options: [],
      correctOption: "Living Documentation bedeutet: automatisierte Tests dokumentieren das Soll-Verhalten ausfuehrbar und werden bei jeder Aenderung mitgeprueft. Gegenueber Kommentaren sind Tests robuster, weil veraltete Erwartungen als rote Tests sichtbar werden, waehrend Kommentare still veralten. Empfohlenes Minimum: mindestens 2 Testfaelle pro oeffentlicher Methode.",
      explanation: "Musterloesung: ausfuehrbare Doku + Vorteil gegenueber Kommentaren + Mindestanzahl nennen.",
      hintQuestion: "Was passiert mit Kommentaren, wenn sich der Code aendert? Koennen Tests \"veralten\" ohne es zu zeigen?",
    },
    {
      prompt: "2f) Schreiben Sie einen vollstaendigen JUnit-Test fuer: Wenn zwei `BankAccount`-Objekte nacheinander erstellt werden, soll `getCount()` den Wert 2 zurueckgeben.",
      options: [],
      correctOption: "Beispiel:\n`@Test`\n`@DisplayName(\"account count increases with each new account\")`\n`void testAccountCount() {`\n`  int countBefore = BankAccount.getCount();`\n`  new BankAccount(\"Eve\", 100.0);`\n`  new BankAccount(\"Frank\", 200.0);`\n`  assertEquals(countBefore + 2, BankAccount.getCount());`\n`}`",
      explanation: "Musterloesung: Wegen statischem Zaehler Testisolation beachten (`countBefore + 2` statt harter 2).",
      hintQuestion: "Vergessen Sie nicht @Test und @DisplayName. Erstellen Sie zwei Objekte. Welche Assertion prueft auf Gleichheit? Vorsicht: accountCount ist statisch — was bedeutet das fuer die Testisolation?",
    },
    {
      prompt: "2g) Erklaeren Sie den TDD-Zyklus (rot-gruen-refactor). Welchen Vorteil hat das Schreiben von Tests vor der Implementierung?",
      options: [],
      correctOption: "Red: Test fuer neue Funktionalitaet schreiben, der zunaechst fehlschlaegt. Green: minimale Implementierung bauen, bis der Test besteht. Refactor: Code aufraeumen/verbessern, waehrend alle Tests grün bleiben. Vorteil test-first: praezisere Spezifikation, fruehes Feedback, bessere Testabdeckung und sichereres Refactoring.",
      explanation: "Musterloesung: alle drei Phasen korrekt und mit jeweiligem Ziel erklaeren.",
      hintQuestion: "Welche drei Phasen gibt es? Was passiert in jeder Phase mit den Tests? Welchen Effekt hat TDD auf die Testabdeckung und die Qualitaet der Spezifikation?",
    },
    {
      prompt: "3a) Was ist Git und was unterscheidet es von GitHub? Nennen Sie je drei Git-spezifische und drei GitHub-spezifische Begriffe.",
      options: [],
      correctOption: "Git ist ein dezentrales Versionsverwaltungssystem, das lokal funktioniert (Tool + Historienformat). GitHub ist ein gehosteter Online-Service fuer Zusammenarbeit auf Git-Repositories. Git-spezifische Begriffe: Repository, Commit, Branch (auch Merge/Tag/Clone/Stash moeglich). GitHub-spezifische Begriffe: Fork, Pull Request, Issues.",
      explanation: "Musterloesung: Git und GitHub klar trennen und Begriffe korrekt zuordnen.",
      hintQuestion: "Git = Kommandozeilenwerkzeug / Dateiformat. GitHub = gehosteter Online-Service. Welche Begriffe kennt nur GitHub (z. B. Pull Request)?",
    },
    {
      prompt: "3b) Erklaeren Sie: Repository, Commit, Branch, Merge, Konflikt.",
      options: [],
      correctOption: "Repository: Projekt inkl. kompletter Versionshistorie (`.git`). Commit: gespeicherter Snapshot mit eindeutiger ID (Hash). Branch: paralleler Entwicklungszweig mit eigenen Commits. Merge: Zusammenfuehren von Branches in einen Zielzweig. Konflikt: entsteht bei widerspruechlichen Aenderungen an derselben Stelle und muss manuell geloest werden.",
      explanation: "Musterloesung: alle fuenf Konzepte getrennt, kurz und korrekt definieren.",
      hintQuestion: "Was enthaelt ein Repository? Was ist ein Commit vs. ein Branch? Wann entsteht ein Konflikt und wie wird er aufgeloest?",
    },
    {
      prompt: "3c) Ordnen Sie die Befehle den Bereichen zu (workspace, index, local repository, remote repository): `git add .`, `git commit -m \"...\"`, `git push`, `git pull`, `git stash`.",
      options: [],
      correctOption: "`git add .` bewegt Aenderungen von Workspace in den Index (Stage). `git commit -m` uebernimmt Stage in das lokale Repository. `git push` uebertraegt lokale Commits ins Remote Repository. `git pull` holt Remote-Aenderungen lokal und integriert sie. `git stash` lagert uncommittete Workspace/Index-Aenderungen temporaer in den Stash-Bereich aus.",
      explanation: "Musterloesung: Befehle entlang des Flusses workspace -> index -> local -> remote zuordnen.",
      hintQuestion: "Denken Sie an den Ablauf: Dateien aendern -> stagen -> committen -> pushen. Was passiert mit git stash? Wo landen die Aenderungen jeweils?",
    },
    {
      prompt: "3d) Beschreiben Sie einen typischen Git-Workflow fuer ein Team-Projekt mit Feature-Branches.",
      options: [],
      correctOption: "Typischer Feature-Workflow: (1) `git checkout -b feature/...` Branch erstellen, (2) implementieren + Tests ausfuehren, (3) `git add`/`git commit` in kleinen sinnvollen Schritten, (4) `git push origin feature/...`, (5) Pull Request erstellen, Review + CI abwarten, (6) nach Freigabe in `main`/`develop` mergen, optional taggen und Branch bereinigen.",
      explanation: "Musterloesung: Branching, PR, Review/CI und Merge als Teamablauf benennen.",
      hintQuestion: "Wie beginnt man einen Feature-Branch? Wie landet das Feature auf dem Hauptbranch? Was ist ein Pull Request? Welche Rolle spielen Tags?",
    },
    {
      prompt: "3e) Was ist der Unterschied zwischen `git revert` und `git reset --hard HEAD~1`? Welcher Befehl ist im Team gefaehrlicher und warum?",
      options: [],
      correctOption: "`git revert` erzeugt einen neuen Commit, der einen frueheren Commit rueckgaengig macht; Historie bleibt intakt. `git reset --hard HEAD~1` setzt den Branch-Zeiger zurueck und verwirft lokale Aenderungen/History-Stand. In Team-Branches ist `reset --hard` gefaehrlicher (insb. mit force push), weil oeffentliche Historie umgeschrieben wird.",
      explanation: "Musterloesung: In geteilten Branches bevorzugt `revert`; `reset --hard` nur lokal und vorsichtig.",
      hintQuestion: "Was passiert mit der Commit-History bei revert? Was passiert bei reset --hard? Was koennten Kollegen sehen, die bereits gepusht haben?",
    },
    {
      prompt: "3f) Sie und ein Kollege haben dieselbe Zeile in `BankAccount.java` geaendert. Was passiert beim `git merge` und wie loesen Sie den Konflikt?",
      options: [],
      correctOption: "Beim Merge erkennt Git die kollidierenden Aenderungen und setzt Konfliktmarkierungen (`<<<<<<<`, `=======`, `>>>>>>>`) in die Datei. Man loest den Konflikt manuell (eigene/fremde/kombinierte Version), entfernt Marker, fuehrt danach `git add BankAccount.java` und einen Merge-Commit aus.",
      explanation: "Musterloesung: Konfliktmarker erkennen, manuell entscheiden, sauber abschliessen.",
      hintQuestion: "Was zeigt Git in der Datei, wenn ein Konflikt auftritt (Konfliktmarkierungen)? Wer entscheidet, welche Version \"gewinnt\"?",
    },
    {
      prompt: "3g) Nennen Sie drei Best Practices fuer gute Commit-Nachrichten und erklaeren Sie, warum eine aussagekraeftige Commit-History wichtig ist.",
      options: [],
      correctOption: "Best Practices: (1) praeziser Betreff mit Inhalt und Grund statt vager Texte wie `fix`, (2) Imperativ-Form (`Add`, `Fix`, `Remove`), (3) kleine thematisch fokussierte Commits mit optionalem Body fuer Kontext. Eine gute History ist wichtig fuer Reviews, Debugging (`git log`/`bisect`), Nachvollziehbarkeit und Team-Onboarding.",
      explanation: "Musterloesung: Commit-Messages sind dauerhafte Projektdokumentation.",
      hintQuestion: "Was sollte in einer Commit-Nachricht stehen — \"fix\" oder \"Fix NullPointer in BankAccount.withdraw() when amount equals balance\"? Wer liest Commit-Nachrichten?",
    },
    {
      prompt: "4a) Schreiben Sie einen Test-first-Test (roter Test), der prueft, ob `withdraw(50.0)` bei Kontostand `0.0` eine `IllegalStateException` wirft.",
      options: [],
      correctOption: "Beispiel:\n`@Test`\n`@DisplayName(\"withdraw throws when balance is zero\")`\n`void testWithdrawFromZeroBalance() {`\n`  BankAccount acc = new BankAccount(\"Eve\", 0.0);`\n`  assertThrows(IllegalStateException.class, () -> acc.withdraw(50.0));`\n`}`",
      explanation: "Der Test beschreibt zuerst das erwartete Fehlerverhalten und kann vor Implementierung rot starten.",
      hintQuestion: "Welche Assertion prueft auf geworfene Exceptions? Schauen Sie sich testOverdraft() an. Der Test soll zunaechst rot sein — also fuer eine Implementierung, die noch fehlt oder fehlerhaft ist.",
    },
    {
      prompt: "4b) Schreiben Sie einen vollstaendigen Gradle-Build-Ablauf als nummerierte Liste fuer das BankAccount-Projekt, vom Quellcode bis zum ausfuehrbaren JAR.",
      options: [],
      correctOption: "Beispielablauf: 1) `gradle clean` (alte Artefakte entfernen), 2) Quellen/Abhaengigkeiten aufloesen, 3) `compileJava` (Produktionscode kompilieren), 4) `compileTestJava` (Tests kompilieren), 5) `test` (JUnit ausfuehren, Reports erzeugen), 6) `jar`/`build` (Artefakt bauen), 7) optional `publish`/Deployment.",
      explanation: "Wichtig ist die Reihenfolge von Kompilierung, Test und Packaging inklusive erzeugter Ergebnisse.",
      hintQuestion: "Denken Sie an: Validierung, Kompilierung, Test, Package. Was erzeugt gradle test? Was erzeugt gradle build?",
    },
  ],
  code: `package de.htwberlin.wi.banking;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

// Produktionscode
class BankAccount {
    private double balance;
    private String owner;
    private static int accountCount = 0;

    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
        accountCount++;
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be > 0");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be > 0");
        if (amount > balance) throw new IllegalStateException("Insufficient funds");
        balance -= amount;
    }

    public double getBalance() { return balance; }
    public String getOwner() { return owner; }
    public static int getCount() { return accountCount; }
}

// Testklasse
class BankAccountTest {

    @Test
    @DisplayName("deposit increases balance correctly")
    void testDeposit() {
        BankAccount acc = new BankAccount("Alice", 100.0);
        acc.deposit(50.0);
        assertEquals(150.0, acc.getBalance());
    }

    @Test
    @DisplayName("withdraw reduces balance correctly")
    void testWithdraw() {
        BankAccount acc = new BankAccount("Bob", 200.0);
        acc.withdraw(75.0);
        assertEquals(125.0, acc.getBalance());
    }

    @Test
    @DisplayName("withdraw throws on insufficient funds")
    void testOverdraft() {
        BankAccount acc = new BankAccount("Carol", 50.0);
        assertThrows(IllegalStateException.class,
            () -> acc.withdraw(100.0));
    }

    @Test
    @DisplayName("deposit throws on negative amount")
    void testNegativeDeposit() {
        BankAccount acc = new BankAccount("Dave", 0.0);
        assertThrows(IllegalArgumentException.class,
            () -> acc.deposit(-10.0));
    }
}`,
  steps: [
    {
      lineNumber: 41,
      stackFrames: [
        { methodName: "Klasse BankAccount", variables: [{ name: "accountCount", type: "int", value: "1", changed: true }] },
        { methodName: "testDeposit", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#1", isReference: true, refId: "acc1", changed: true }] },
      ],
      heapObjects: [{ id: "acc1", type: "BankAccount", label: "Account#1", values: ['owner = "Alice"', "balance = 100.0"] }],
      consoleOutput: [],
      explanation: "Im Test `testDeposit` wird ein Konto fuer Alice angelegt. Der Konstruktor setzt `owner`, `balance` und erhoeht den statischen Zaehler `accountCount` auf 1.",
    },
    {
      lineNumber: 42,
      stackFrames: [
        { methodName: "Klasse BankAccount", variables: [{ name: "accountCount", type: "int", value: "1" }] },
        { methodName: "testDeposit", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#1", isReference: true, refId: "acc1" }] },
      ],
      heapObjects: [{ id: "acc1", type: "BankAccount", label: "Account#1", values: ['owner = "Alice"', "balance = 150.0"], highlightIndex: 1 }],
      consoleOutput: [],
      explanation: "`acc.deposit(50.0)` prueft zuerst, ob der Betrag > 0 ist, und addiert dann den Betrag auf den Kontostand (`100.0 -> 150.0`).",
    },
    {
      lineNumber: 43,
      stackFrames: [
        { methodName: "testDeposit", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#1", isReference: true, refId: "acc1" }] },
      ],
      heapObjects: [],
      consoleOutput: ["testDeposit PASS"],
      explanation: "`assertEquals(150.0, acc.getBalance())` verifiziert den erwarteten Endstand. Der erste Testfall ist gruen.",
    },
    {
      lineNumber: 49,
      stackFrames: [
        { methodName: "Klasse BankAccount", variables: [{ name: "accountCount", type: "int", value: "2", changed: true }] },
        { methodName: "testWithdraw", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#2", isReference: true, refId: "acc2", changed: true }] },
      ],
      heapObjects: [{ id: "acc2", type: "BankAccount", label: "Account#2", values: ['owner = "Bob"', "balance = 200.0"] }],
      consoleOutput: [
        "testDeposit PASS",
      ],
      explanation: "Im zweiten Test wird ein neues Konto fuer Bob erzeugt. Wieder laeuft der Konstruktor und `accountCount` steigt auf 2.",
    },
    {
      lineNumber: 50,
      stackFrames: [
        { methodName: "testWithdraw", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#2", isReference: true, refId: "acc2" }] },
      ],
      heapObjects: [{ id: "acc2", type: "BankAccount", label: "Account#2", values: ['owner = "Bob"', "balance = 125.0"], highlightIndex: 1 }],
      consoleOutput: [
        "testDeposit PASS",
      ],
      explanation: "`acc.withdraw(75.0)` prueft gueltigen Betrag und ausreichendes Guthaben. Danach wird der Kontostand reduziert (`200.0 -> 125.0`).",
    },
    {
      lineNumber: 51,
      stackFrames: [
        { methodName: "testWithdraw", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#2", isReference: true, refId: "acc2" }] },
      ],
      heapObjects: [],
      consoleOutput: ["testDeposit PASS", "testWithdraw PASS", "Tests: 2/2 bestanden"],
      explanation: "Die zweite Assertion bestaetigt den erwarteten Stand `125.0`. Damit sind beide Unit-Tests erfolgreich abgeschlossen.",
    },
    {
      lineNumber: 57,
      stackFrames: [
        { methodName: "Klasse BankAccount", variables: [{ name: "accountCount", type: "int", value: "3", changed: true }] },
        { methodName: "testOverdraft", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#3", isReference: true, refId: "acc3", changed: true }] },
      ],
      heapObjects: [{ id: "acc3", type: "BankAccount", label: "Account#3", values: ['owner = "Carol"', "balance = 50.0"] }],
      consoleOutput: ["testDeposit PASS", "testWithdraw PASS"],
      explanation: "Im Test `testOverdraft` wird ein Konto mit geringem Guthaben erzeugt. `accountCount` steigt auf 3.",
    },
    {
      lineNumber: 58,
      stackFrames: [
        { methodName: "testOverdraft", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#3", isReference: true, refId: "acc3" }] },
      ],
      heapObjects: [{ id: "acc3", type: "BankAccount", label: "Account#3", values: ['owner = "Carol"', "balance = 50.0"] }],
      consoleOutput: ["testDeposit PASS", "testWithdraw PASS", "testOverdraft PASS"],
      explanation: "`assertThrows(IllegalStateException.class, () -> acc.withdraw(100.0))` prueft den Fehlerfall auf zu hohe Abhebung. Die erwartete Exception tritt auf, daher ist der Test gruen.",
    },
    {
      lineNumber: 65,
      stackFrames: [
        { methodName: "Klasse BankAccount", variables: [{ name: "accountCount", type: "int", value: "4", changed: true }] },
        { methodName: "testNegativeDeposit", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#4", isReference: true, refId: "acc4", changed: true }] },
      ],
      heapObjects: [{ id: "acc4", type: "BankAccount", label: "Account#4", values: ['owner = "Dave"', "balance = 0.0"] }],
      consoleOutput: ["testDeposit PASS", "testWithdraw PASS", "testOverdraft PASS"],
      explanation: "Fuer `testNegativeDeposit` wird ein viertes Konto erzeugt. Der statische Zaehler steht jetzt auf 4.",
    },
    {
      lineNumber: 66,
      stackFrames: [
        { methodName: "testNegativeDeposit", variables: [{ name: "acc", type: "BankAccount", value: "→ Account#4", isReference: true, refId: "acc4" }] },
      ],
      heapObjects: [{ id: "acc4", type: "BankAccount", label: "Account#4", values: ['owner = "Dave"', "balance = 0.0"] }],
      consoleOutput: ["testDeposit PASS", "testWithdraw PASS", "testOverdraft PASS", "testNegativeDeposit PASS", "Tests: 4/4 bestanden"],
      explanation: "`assertThrows(IllegalArgumentException.class, () -> acc.deposit(-10.0))` validiert den Fehlerfall fuer negative Einzahlungen. Die erwartete Exception wird geworfen, daher besteht auch dieser Test.",
    },
  ],
};

const interfacePolymorphieGenericsExample: JavaExample = {
  id: "interfaces-polymorphie-generics",
  title: "Interfaces, Polymorphie und Generics",
  description: "ILocatable, IMovable, Vererbung, Dynamic Binding und List<ILocatable>",
  semester: "semester2",
  lecture: "04-Typen, Module, Schnittstellen 11.05.25",
  disableQuizQuestions: false,
  studyGuideTitle: "Fragenkatalog",
  studyGuideContent: `1. KONZEPTE VERSTEHEN

1.1 Beschreiben Sie die Beziehungen zwischen:
• Vehicle und IMovable
• IMovable und ILocatable
• Car und Vehicle

1.2 Warum ist folgende Zuweisung erlaubt?

ILocatable obj = c;

1.3 Erklären Sie den Unterschied zwischen:

Vehicle test = c;
Car c = new Car(…);

Gehen Sie dabei auf folgende Begriffe ein:
• Deklarierter Typ
• Laufzeittyp
• Polymorphie

1.4 Ordnen Sie die folgenden Elemente dem Stack oder dem Heap zu und begründen Sie Ihre Entscheidung:
• v
• c
• d
• list
• location
• brand

2. CODEAUSFÜHRUNG

2.1 Welche vollständige Ausgabe erzeugt das Programm?

2.2 Erklären Sie, warum sich der Methodenaufruf c.move() anders verhält als v.move().

2.3 Warum wird bei folgendem Code die überschreibende Methode ausgeführt?

Vehicle test = c;
test.move();

Gehen Sie dabei auf dynamische Bindung ein.

3. GENERICS UND LISTEN

3.1 Warum ist folgende Deklaration nicht erlaubt?

List list = new ArrayList();

3.2 Erklären Sie den Unterschied zwischen:

List
List

3.3 Warum gilt folgende Deklaration als Best Practice?

List list = new ArrayList<>();

Beziehen Sie sich auf Flexibilität und Kopplung.

4. MULTIPLE CHOICE

4.1 Markieren Sie alle richtigen Aussagen.

A) Interfaces können instanziiert werden.
B) Eine Klasse kann mehrere Interfaces implementieren.
C) Polymorphie funktioniert nur bei Interfaces.
D) Generics werden zur Compilezeit geprüft.
E) Referenztypen werden vollständig auf dem Heap gespeichert.
F) Primitive Typen werden bei Methodenübergabe kopiert.
G) IMovable ist ein ILocatable.
H) Car ist ein IMovable.

5. MODULARISIERUNG UND INFORMATION HIDING

5.1 Erklären Sie das Prinzip des Information Hiding nach Parnas.

5.2 Warum ist das Attribut brand in der Klasse Car private?

5.3 Welche Konsequenzen hätte es, wenn das Attribut location public wäre?`,
  customQuestions: [
    {
      prompt: "1.1 (Zeile 3-7, 11, 32) Beschreiben Sie die Beziehungen zwischen Vehicle und IMovable, IMovable und ILocatable sowie Car und Vehicle.",
      options: [
        "A) Vehicle implementiert IMovable, IMovable erweitert ILocatable, Car erbt von Vehicle.",
        "B) Vehicle erweitert IMovable, IMovable implementiert ILocatable, Car implementiert Vehicle.",
        "C) Vehicle ist ein Car und Car ist ein Interface.",
        "D) Zwischen den Typen bestehen keine Vererbungsbeziehungen.",
      ],
      correctOption: "A) Vehicle implementiert IMovable, IMovable erweitert ILocatable, Car erbt von Vehicle.",
      explanation: "Musterloesung: Vehicle implementiert IMovable. IMovable erweitert ILocatable. Car erbt von Vehicle.",
    },
    {
      prompt: "1.2 (Zeile 88) Warum ist die Zuweisung `ILocatable obj = c;` erlaubt?",
      options: [
        "A) Weil Car ueber Vehicle -> IMovable -> ILocatable indirekt ILocatable ist.",
        "B) Weil jede Klasse in jedes Interface konvertiert werden kann.",
        "C) Weil `obj` und `c` denselben deklarierten Typ haben muessen.",
        "D) Weil nur primitive Typen polymorph sind.",
      ],
      correctOption: "A) Weil Car ueber Vehicle -> IMovable -> ILocatable indirekt ILocatable ist.",
      explanation: "Musterloesung: Car erbt von Vehicle, Vehicle implementiert IMovable und IMovable erweitert ILocatable.",
    },
    {
      prompt: "1.3 (Zeile 76, 91-92) Was beschreibt korrekt den Unterschied zwischen deklariertem Typ, Laufzeittyp und Polymorphie bei `Vehicle test = c;`?",
      options: [
        "A) Deklarierter Typ: Vehicle, Laufzeittyp: Car, Polymorphie ruft Methode des Laufzeittyps auf.",
        "B) Deklarierter Typ und Laufzeittyp sind immer identisch.",
        "C) Polymorphie bedeutet, dass immer die Methode des deklarierten Typs ausgefuehrt wird.",
        "D) Laufzeittyp existiert nur bei Interfaces.",
      ],
      correctOption: "A) Deklarierter Typ: Vehicle, Laufzeittyp: Car, Polymorphie ruft Methode des Laufzeittyps auf.",
      explanation: "Musterloesung: Deklarierter Typ ist der Referenztyp, Laufzeittyp ist das reale Objekt im Heap.",
    },
    {
      prompt: "1.4 (Zeile 12, 33, 75-81) Welche Zuordnung zu Stack/Heap ist korrekt fuer v, c, d, list, location, brand?",
      options: [
        "A) v/c/d/list im Stack (Referenzen), Objekte und Felder location/brand im Heap.",
        "B) Alles liegt im Stack.",
        "C) Alles liegt im Heap.",
        "D) Nur primitive Felder liegen im Heap, Referenzen in Registern.",
      ],
      correctOption: "A) v/c/d/list im Stack (Referenzen), Objekte und Felder location/brand im Heap.",
      explanation: "Musterloesung: Referenzvariablen liegen im Stack, die echten Objekte und deren Attribute im Heap.",
    },
    {
      prompt: "2.1 (Zeile 78-94) Welche vollstaendige Ausgabe erzeugt das Programm?",
      options: [
        "A) 15, 30, 50, 30, 40",
        "B) 15, 20, 50, 30, 40",
        "C) 10, 30, 50, 30, 40",
        "D) 15, 30, 50, 40, 30",
      ],
      correctOption: "A) 15, 30, 50, 30, 40",
      explanation: "Musterloesung: v.move -> 15, c.move -> 30, dann 15/30/50, danach 30 und am Ende 40.",
    },
    {
      prompt: "2.2 (Zeile 27, 41, 78-79) Warum verhaelt sich `c.move()` anders als `v.move()`?",
      options: [
        "A) Car ueberschreibt move() und nutzt `speed * 2`.",
        "B) Weil `v` und `c` unterschiedliche CPU-Kerne nutzen.",
        "C) Weil `c` ein Interface ist.",
        "D) Weil `@Override` den Code ignoriert.",
      ],
      correctOption: "A) Car ueberschreibt move() und nutzt `speed * 2`.",
      explanation: "Musterloesung: Durch @Override ersetzt Car die Implementierung der Oberklasse.",
    },
    {
      prompt: "2.3 (Zeile 91-92, 41) Warum wird bei `Vehicle test = c; test.move();` die Methode aus Car ausgefuehrt?",
      options: [
        "A) Wegen dynamischer Bindung wird zur Laufzeit der reale Objekttyp verwendet.",
        "B) Weil der Compiler automatisch `test` zu `Car` umschreibt.",
        "C) Weil `Vehicle` keine Methoden haben darf.",
        "D) Weil Referenztypen keine Rolle spielen.",
      ],
      correctOption: "A) Wegen dynamischer Bindung wird zur Laufzeit der reale Objekttyp verwendet.",
      explanation: "Musterloesung: Java ruft zur Laufzeit die Methode des tatsaechlichen Objekttyps (Car) auf.",
    },
    {
      prompt: "3.1 (vgl. Zeile 81) Warum ist `List<ILocatable> list = new ArrayList<Vehicle>();` nicht erlaubt?",
      options: [
        "A) Generics sind invariant: `List<Vehicle>` ist nicht kompatibel mit `List<ILocatable>`.",
        "B) Weil ArrayList nur primitive Typen speichern darf.",
        "C) Weil Interfaces nicht in Generics erlaubt sind.",
        "D) Weil List immer roh (raw type) deklariert werden muss.",
      ],
      correctOption: "A) Generics sind invariant: `List<Vehicle>` ist nicht kompatibel mit `List<ILocatable>`.",
      explanation: "Musterloesung: Der Typ in den spitzen Klammern muss exakt passen.",
    },
    {
      prompt: "3.2 (vgl. Zeile 81) Was ist der Unterschied zwischen `List<Vehicle>` und `List<ILocatable>`?",
      options: [
        "A) `List<ILocatable>` kann Vehicle, Car und Desk enthalten; `List<Vehicle>` nicht Desk.",
        "B) Beide sind immer identisch und austauschbar.",
        "C) `List<Vehicle>` ist allgemeiner als `List<ILocatable>`.",
        "D) `List<ILocatable>` kann keine Subklassen enthalten.",
      ],
      correctOption: "A) `List<ILocatable>` kann Vehicle, Car und Desk enthalten; `List<Vehicle>` nicht Desk.",
      explanation: "Musterloesung: Die Variante mit Interface ist flexibler.",
    },
    {
      prompt: "3.3 (Zeile 81) Warum gilt `List<ILocatable> list = new ArrayList<>();` als Best Practice?",
      options: [
        "A) Deklaration gegen Interface reduziert Kopplung und erhoeht Austauschbarkeit.",
        "B) Weil dann kein Heap-Speicher genutzt wird.",
        "C) Weil Generics dadurch zur Laufzeit deaktiviert werden.",
        "D) Weil nur so Polymorphie moeglich ist.",
      ],
      correctOption: "A) Deklaration gegen Interface reduziert Kopplung und erhoeht Austauschbarkeit.",
      explanation: "Musterloesung: Implementierung kann spaeter leichter gewechselt werden (z. B. LinkedList).",
    },
    {
      prompt: "4.1 (Zeile 3-7, 11, 32) Welche Aussagen sind richtig?",
      options: [
        "A) B, D, F, G, H",
        "B) A, B, D, G, H",
        "C) B, C, D, E, H",
        "D) B, D, E, F, G",
      ],
      correctOption: "A) B, D, F, G, H",
      explanation: "Musterloesung: B, D, F, G, H sind richtig.",
    },
    {
      prompt: "5.1 (Konzeptfrage, passend zu Zeile 33) Was beschreibt Information Hiding nach Parnas korrekt?",
      options: [
        "A) Implementierungsdetails werden verborgen, Zugriff nur ueber definierte Schnittstellen.",
        "B) Alle Felder sollten public sein.",
        "C) Module sollen intern identisch aufgebaut sein.",
        "D) Information Hiding ersetzt Vererbung vollstaendig.",
      ],
      correctOption: "A) Implementierungsdetails werden verborgen, Zugriff nur ueber definierte Schnittstellen.",
      explanation: "Musterloesung: Das reduziert Kopplung und verbessert Wartbarkeit.",
    },
    {
      prompt: "5.2 (Zeile 33) Warum ist `brand` in `Car` private?",
      options: [
        "A) Zum Schutz vor unkontrolliertem Zugriff und fuer Kapselung.",
        "B) Damit der Garbage Collector schneller arbeitet.",
        "C) Weil private Felder nur im Heap gespeichert werden duerfen.",
        "D) Damit `move()` ueberschrieben werden kann.",
      ],
      correctOption: "A) Zum Schutz vor unkontrolliertem Zugriff und fuer Kapselung.",
      explanation: "Musterloesung: Private Sichtbarkeit schuetzt Daten und sichert Kapselung.",
    },
    {
      prompt: "5.3 (Zeile 12) Welche Konsequenz haette `public location`?",
      options: [
        "A) Direkte externe Manipulation, Verletzung der Kapselung, hoehere Fehleranfaelligkeit.",
        "B) Bessere Kapselung und weniger Fehler.",
        "C) Keine Auswirkung auf Wartbarkeit.",
        "D) Verhindert Polymorphie.",
      ],
      correctOption: "A) Direkte externe Manipulation, Verletzung der Kapselung, hoehere Fehleranfaelligkeit.",
      explanation: "Musterloesung: Public `location` wuerde Datenkapselung aufheben.",
    },
  ],
  code: `import java.util.*;

interface ILocatable {
    int getLocation();
}

interface IMovable extends ILocatable {
    int getSpeed();
}

class Vehicle implements IMovable {
    protected int location;
    protected int speed;

    public Vehicle(int location, int speed) {
        this.location = location;
        this.speed = speed;
    }

    public int getLocation() {
        return location;
    }

    public int getSpeed() {
        return speed;
    }

    public void move() {
        location += speed;
    }
}

class Car extends Vehicle {
    private String brand;

    public Car(String brand, int location, int speed) {
        super(location, speed);
        this.brand = brand;
    }

    @Override
    public void move() {
        location += speed * 2;
    }

    public String getBrand() {
        return brand;
    }
}

class Desk implements ILocatable {
    private int location;
    private int legs;

    public Desk(int location, int legs) {
        this.location = location;
        this.legs = legs;
    }

    public int getLocation() {
        return location;
    }

    public int getLegs() {
        return legs;
    }
}

public class Main {

    public static void printLocations(List<ILocatable> list) {
        for (ILocatable l : list) {
            System.out.println(l.getLocation());
        }
    }

    public static void main(String[] args) {
        Vehicle v = new Vehicle(10, 5);
        Car c = new Car("BMW", 20, 5);
        Desk d = new Desk(50, 4);

        v.move();
        c.move();

        List<ILocatable> list = new ArrayList<>();
        list.add(v);
        list.add(c);
        list.add(d);

        printLocations(list);

        ILocatable obj = c;
        System.out.println(obj.getLocation());

        Vehicle test = c;
        test.move();

        System.out.println(c.getLocation());
    }
}`,
  steps: [
    {
      lineNumber: 74,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "v", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1", changed: true }],
        },
      ],
      heapObjects: [{ id: "veh1", type: "Vehicle", label: "Vehicle#1", values: ["location = 10", "speed = 5"] }],
      consoleOutput: [],
      explanation: "Ein `Vehicle`-Objekt wird auf dem Heap angelegt. Die Referenz `v` liegt im Stack.",
    },
    {
      lineNumber: 75,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "v", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1" },
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "veh1", type: "Vehicle", label: "Vehicle#1", values: ["location = 10", "speed = 5"] },
        { id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 20", "speed = 5"] },
      ],
      consoleOutput: [],
      explanation: "`Car` erbt von `Vehicle`. Das private Feld `brand` zeigt Information Hiding: Zugriff nur ueber die Klasse selbst.",
    },
    {
      lineNumber: 76,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "v", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1" },
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" },
            { name: "d", type: "Desk", value: "→ Desk#1", isReference: true, refId: "desk1", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "veh1", type: "Vehicle", label: "Vehicle#1", values: ["location = 10", "speed = 5"] },
        { id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 20", "speed = 5"] },
        { id: "desk1", type: "Desk", label: "Desk#1", values: ["location = 50", "legs = 4"] },
      ],
      consoleOutput: [],
      explanation: "Auch `Desk` implementiert `ILocatable`, kann also spaeter in `List<ILocatable>` gespeichert werden.",
    },
    {
      lineNumber: 78,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "v", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1" },
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" },
            { name: "d", type: "Desk", value: "→ Desk#1", isReference: true, refId: "desk1" },
          ],
        },
        {
          methodName: "move",
          variables: [{ name: "this", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1", changed: true }],
        },
      ],
      heapObjects: [
        { id: "veh1", type: "Vehicle", label: "Vehicle#1", values: ["location = 10", "speed = 5"] },
        { id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 20", "speed = 5"] },
        { id: "desk1", type: "Desk", label: "Desk#1", values: ["location = 50", "legs = 4"] },
      ],
      consoleOutput: [],
      explanation: "Aufruf `v.move()` verwendet die Implementierung aus `Vehicle`.",
    },
    {
      lineNumber: 28,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "v", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1" },
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" },
            { name: "d", type: "Desk", value: "→ Desk#1", isReference: true, refId: "desk1" },
          ],
        },
        {
          methodName: "move",
          variables: [{ name: "this", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1" }],
        },
      ],
      heapObjects: [
        { id: "veh1", type: "Vehicle", label: "Vehicle#1", values: ["location = 15", "speed = 5"], highlightIndex: 0 },
        { id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 20", "speed = 5"] },
        { id: "desk1", type: "Desk", label: "Desk#1", values: ["location = 50", "legs = 4"] },
      ],
      consoleOutput: [],
      explanation: "`location += speed` fuehrt zu 10 + 5 = 15.",
    },
    {
      lineNumber: 79,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "v", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1" },
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" },
            { name: "d", type: "Desk", value: "→ Desk#1", isReference: true, refId: "desk1" },
          ],
        },
        {
          methodName: "move",
          variables: [{ name: "this", type: "Car", value: "→ Car#1", isReference: true, refId: "car1", changed: true }],
        },
      ],
      heapObjects: [
        { id: "veh1", type: "Vehicle", label: "Vehicle#1", values: ["location = 15", "speed = 5"] },
        { id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 20", "speed = 5"] },
        { id: "desk1", type: "Desk", label: "Desk#1", values: ["location = 50", "legs = 4"] },
      ],
      consoleOutput: [],
      explanation: "`c.move()` ruft wegen Override die Implementierung aus `Car` auf.",
    },
    {
      lineNumber: 42,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "v", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1" },
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" },
            { name: "d", type: "Desk", value: "→ Desk#1", isReference: true, refId: "desk1" },
          ],
        },
        {
          methodName: "move",
          variables: [{ name: "this", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" }],
        },
      ],
      heapObjects: [
        { id: "veh1", type: "Vehicle", label: "Vehicle#1", values: ["location = 15", "speed = 5"] },
        { id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 30", "speed = 5"], highlightIndex: 1 },
        { id: "desk1", type: "Desk", label: "Desk#1", values: ["location = 50", "legs = 4"] },
      ],
      consoleOutput: [],
      explanation: "`location += speed * 2` ergibt 20 + 10 = 30.",
    },
    {
      lineNumber: 81,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "v", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1" },
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" },
            { name: "d", type: "Desk", value: "→ Desk#1", isReference: true, refId: "desk1" },
            { name: "list", type: "List<ILocatable>", value: "→ List#1", isReference: true, refId: "list1", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "veh1", type: "Vehicle", label: "Vehicle#1", values: ["location = 15", "speed = 5"] },
        { id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 30", "speed = 5"] },
        { id: "desk1", type: "Desk", label: "Desk#1", values: ["location = 50", "legs = 4"] },
        { id: "list1", type: "ArrayList<ILocatable>", label: "List#1", values: [] },
      ],
      consoleOutput: [],
      explanation: "Deklaration gegen Interface + konkrete Implementierung: `List<ILocatable> list = new ArrayList<>();`.",
    },
    {
      lineNumber: 84,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "v", type: "Vehicle", value: "→ Vehicle#1", isReference: true, refId: "veh1" },
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" },
            { name: "d", type: "Desk", value: "→ Desk#1", isReference: true, refId: "desk1" },
            { name: "list", type: "List<ILocatable>", value: "→ List#1", isReference: true, refId: "list1" },
          ],
        },
      ],
      heapObjects: [
        { id: "veh1", type: "Vehicle", label: "Vehicle#1", values: ["location = 15", "speed = 5"] },
        { id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 30", "speed = 5"] },
        { id: "desk1", type: "Desk", label: "Desk#1", values: ["location = 50", "legs = 4"] },
        { id: "list1", type: "ArrayList<ILocatable>", label: "List#1", values: ["→ Vehicle#1", "→ Car#1", "→ Desk#1"] },
      ],
      consoleOutput: [],
      explanation: "Die Liste enthaelt nun drei `ILocatable`-Objekte mit unterschiedlichen konkreten Typen.",
    },
    {
      lineNumber: 86,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "list", type: "List<ILocatable>", value: "→ List#1", isReference: true, refId: "list1" }],
        },
        {
          methodName: "printLocations",
          variables: [
            { name: "list", type: "List<ILocatable>", value: "→ List#1", isReference: true, refId: "list1", changed: true },
            { name: "l", type: "ILocatable", value: "→ Vehicle#1", isReference: true, refId: "veh1", changed: true },
          ],
        },
      ],
      heapObjects: [{ id: "list1", type: "ArrayList<ILocatable>", label: "List#1", values: ["→ Vehicle#1", "→ Car#1", "→ Desk#1"] }],
      consoleOutput: ["15"],
      explanation: "Erster Schleifendurchlauf: `l` zeigt auf `Vehicle#1`, Ausgabe ist 15.",
    },
    {
      lineNumber: 86,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "list", type: "List<ILocatable>", value: "→ List#1", isReference: true, refId: "list1" }],
        },
        {
          methodName: "printLocations",
          variables: [
            { name: "list", type: "List<ILocatable>", value: "→ List#1", isReference: true, refId: "list1" },
            { name: "l", type: "ILocatable", value: "→ Car#1", isReference: true, refId: "car1", changed: true },
          ],
        },
      ],
      heapObjects: [{ id: "list1", type: "ArrayList<ILocatable>", label: "List#1", values: ["→ Vehicle#1", "→ Car#1", "→ Desk#1"] }],
      consoleOutput: ["15", "30"],
      explanation: "Zweiter Schleifendurchlauf: `l` zeigt auf `Car#1`, Ausgabe ist 30.",
    },
    {
      lineNumber: 86,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "list", type: "List<ILocatable>", value: "→ List#1", isReference: true, refId: "list1" }],
        },
        {
          methodName: "printLocations",
          variables: [
            { name: "list", type: "List<ILocatable>", value: "→ List#1", isReference: true, refId: "list1" },
            { name: "l", type: "ILocatable", value: "→ Desk#1", isReference: true, refId: "desk1", changed: true },
          ],
        },
      ],
      heapObjects: [{ id: "list1", type: "ArrayList<ILocatable>", label: "List#1", values: ["→ Vehicle#1", "→ Car#1", "→ Desk#1"] }],
      consoleOutput: ["15", "30", "50"],
      explanation: "Dritter Schleifendurchlauf: `l` zeigt auf `Desk#1`, Ausgabe ist 50.",
    },
    {
      lineNumber: 88,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" },
            { name: "obj", type: "ILocatable", value: "→ Car#1", isReference: true, refId: "car1", changed: true },
          ],
        },
      ],
      heapObjects: [{ id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 30", "speed = 5"] }],
      consoleOutput: ["15", "30", "50"],
      explanation: "`ILocatable obj = c;` funktioniert wegen der Vererbungskette `Car -> Vehicle -> IMovable -> ILocatable`.",
    },
    {
      lineNumber: 89,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "obj", type: "ILocatable", value: "→ Car#1", isReference: true, refId: "car1" },
          ],
        },
      ],
      heapObjects: [{ id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 30", "speed = 5"] }],
      consoleOutput: ["15", "30", "50", "30"],
      explanation: "`obj.getLocation()` liefert 30, weil `obj` auf dasselbe `Car`-Objekt zeigt.",
    },
    {
      lineNumber: 91,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" },
            { name: "test", type: "Vehicle", value: "→ Car#1", isReference: true, refId: "car1", changed: true },
          ],
        },
      ],
      heapObjects: [{ id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 30", "speed = 5"] }],
      consoleOutput: ["15", "30", "50", "30"],
      explanation: "Deklarierter Typ von `test` ist `Vehicle`, Laufzeittyp bleibt `Car` (Polymorphie).",
    },
    {
      lineNumber: 92,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "test", type: "Vehicle", value: "→ Car#1", isReference: true, refId: "car1" }],
        },
        {
          methodName: "move",
          variables: [{ name: "this", type: "Car", value: "→ Car#1", isReference: true, refId: "car1", changed: true }],
        },
      ],
      heapObjects: [{ id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 30", "speed = 5"] }],
      consoleOutput: ["15", "30", "50", "30"],
      explanation: "Dynamic Binding: trotz Referenztyp `Vehicle` wird `Car.move()` aufgerufen.",
    },
    {
      lineNumber: 42,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "test", type: "Vehicle", value: "→ Car#1", isReference: true, refId: "car1" }],
        },
        {
          methodName: "move",
          variables: [{ name: "this", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" }],
        },
      ],
      heapObjects: [{ id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 40", "speed = 5"], highlightIndex: 1 }],
      consoleOutput: ["15", "30", "50", "30"],
      explanation: "Neuer Standort von `c`: 30 + (5 * 2) = 40.",
    },
    {
      lineNumber: 94,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "c", type: "Car", value: "→ Car#1", isReference: true, refId: "car1" }],
        },
      ],
      heapObjects: [{ id: "car1", type: "Car", label: "Car#1", values: ['brand = "BMW"', "location = 40", "speed = 5"] }],
      consoleOutput: ["15", "30", "50", "30", "40"],
      explanation: "Finale Ausgabe ist 40. Gesamtausgabe: 15, 30, 50, 30, 40.",
    },
  ],
};

const collectionsStudentRegistryExample: JavaExample = {
  id: "collections-student-registry",
  title: "Collections: StudentRegistry",
  description: "Map, Set, Generics und unmodifiableMap",
  semester: "semester2",
  lecture: "VL 05 - Collections",
  customQuestions: [
    {
      prompt: "1a) Welche Klassen und Interfaces werden im Code-Beispiel definiert?",
      options: [
        "A) DataStore (Interface), StudentRegistry (Klasse), Klausur (Klasse)",
        "B) DataStore (Klasse), StudentRegistry (Interface), Klausur (Klasse)",
        "C) Nur StudentRegistry und Klausur",
        "D) DataStore, StudentRegistry, HashMap, TreeSet",
      ],
      correctOption: "A) DataStore (Interface), StudentRegistry (Klasse), Klausur (Klasse)",
      explanation: "Musterloesung: Genau diese drei Typen werden im Beispiel selbst definiert.",
    },
    {
      prompt: "1b) Benennen Sie die Ist-Ein-Beziehung mit Zeile.",
      options: [
        "A) StudentRegistry ist ein DataStore (Zeile 11)",
        "B) Klausur ist ein DataStore (Zeile 46)",
        "C) DataStore erbt von StudentRegistry (Zeile 5)",
        "D) Es gibt keine Ist-Ein-Beziehung",
      ],
      correctOption: "A) StudentRegistry ist ein DataStore (Zeile 11)",
      explanation: "Musterloesung: `class StudentRegistry implements DataStore<...>` in Zeile 11.",
    },
    {
      prompt: "1c) Welche Ausgabe erzeugt Zeile 58?",
      options: [
        "A) Anzahl Studenten: 2",
        "B) Anzahl Studenten: 3",
        "C) Anzahl Studenten: 1",
        "D) Anzahl Studenten: 0",
      ],
      correctOption: "A) Anzahl Studenten: 2",
      explanation: "Musterloesung: `activeStudents` ist ein TreeSet, doppelte Student-ID wird ignoriert.",
    },
    {
      prompt: "1d) Welche Ausgabe erzeugt Zeile 65?",
      options: [
        "A) Kurse s12345: 1",
        "B) Kurse s12345: 2",
        "C) Kurse s12345: 3",
        "D) Kurse s12345: 0",
      ],
      correctOption: "A) Kurse s12345: 1",
      explanation: "Musterloesung: Der zweite `store` ueberschreibt den HashMap-Eintrag fuer `s12345`.",
    },
    {
      prompt: "1e) Welche Ausgaben erzeugen die Zeilen 67-69?",
      options: [
        "A) Removed: false, Removed: true, Anzahl Studenten: 1",
        "B) Removed: true, Removed: false, Anzahl Studenten: 2",
        "C) Removed: false, Removed: false, Anzahl Studenten: 2",
        "D) Removed: true, Removed: true, Anzahl Studenten: 0",
      ],
      correctOption: "A) Removed: false, Removed: true, Anzahl Studenten: 1",
      explanation: "Musterloesung: `s99999` existiert nicht; `s67890` wird entfernt; danach bleibt nur `s12345`.",
    },
    {
      prompt: "1f) Wobei handelt es sich in Zeile 5 (`interface DataStore<K, V>`)?",
      options: [
        "A) Interface mit zwei generischen Typparametern K und V",
        "B) Klasse mit zwei Konstruktorparametern K und V",
        "C) Enum mit zwei Konstanten K und V",
        "D) Methode mit Rueckgabetyp K und Parameter V",
      ],
      correctOption: "A) Interface mit zwei generischen Typparametern K und V",
      explanation: "Musterloesung: `K` und `V` sind Typvariablen (Generics).",
      hintQuestion: "Hint 3 (stark): Antworte in 3 Teilen: (1) Was wird deklariert? (2) Wie heisst es? (3) Welche Typparameter hat es?",
    },
    {
      prompt: "1g) Unterschied zwischen HashMap (Zeile 16) und TreeMap?",
      options: [
        "A) HashMap ohne garantierte Reihenfolge, TreeMap sortiert nach Schluessel",
        "B) HashMap immer sortiert, TreeMap nie sortiert",
        "C) TreeMap kann keine Schluessel-Wert-Paare speichern",
        "D) HashMap erlaubt keine eindeutigen Schluessel",
      ],
      correctOption: "A) HashMap ohne garantierte Reihenfolge, TreeMap sortiert nach Schluessel",
      explanation: "Musterloesung: Hash-Tabelle vs baumbasierte sortierte Struktur.",
    },
    {
      prompt: "1h) Was bewirkt `Collections.unmodifiableMap()` in Zeile 42?",
      options: [
        "A) Schreibgeschuetzte View; Aenderungen darueber werfen UnsupportedOperationException",
        "B) Tiefe Kopie der gesamten Map",
        "C) Alle Map-Werte werden automatisch final",
        "D) Die Map wird in eine TreeMap umgewandelt",
      ],
      correctOption: "A) Schreibgeschuetzte View; Aenderungen darueber werfen UnsupportedOperationException",
      explanation: "Musterloesung: Schuetzt vor unkontrollierten externen Aenderungen (Datenkapselung).",
    },
    {
      prompt: "1i) Was bedeutet `final` bei den Attributen in Zeile 12 und 13?",
      options: [
        "A) Referenz nicht neu zuweisbar, Inhalte der Collections koennen sich trotzdem aendern",
        "B) Weder Referenz noch Inhalte sind jemals aenderbar",
        "C) `final` ist identisch mit `private`",
        "D) `final` macht das Feld statisch",
      ],
      correctOption: "A) Referenz nicht neu zuweisbar, Inhalte der Collections koennen sich trotzdem aendern",
      explanation: "Musterloesung: verhindert Neuzuweisung von `registry`/`activeStudents`.",
    },
    {
      prompt: "1j) Erklaeren Sie das Iterator-Konzept anhand der for-Schleife in Zeile 60.",
      options: [
        "A) `entrySet()` liefert Schluessel-Wert-Paare, for-each nutzt intern Iterator mit `hasNext()`/`next()`",
        "B) for-each arbeitet immer ueber numerischen Index",
        "C) Iteratoren funktionieren nur bei Listen",
        "D) `entrySet()` liefert nur Schluessel",
      ],
      correctOption: "A) `entrySet()` liefert Schluessel-Wert-Paare, for-each nutzt intern Iterator mit `hasNext()`/`next()`",
      explanation: "Musterloesung: Vorteil ist iteration ohne Index und ohne Kenntnis der internen Struktur.",
    },
    {
      prompt: "1k) Was bedeutet `static` in der main-Methode (Zeile 47)?",
      options: [
        "A) Klassenmethode, aufrufbar ohne Objektinstanz",
        "B) Nur einmal im ganzen Programm aufrufbar",
        "C) Automatisch final",
        "D) Nur innerhalb derselben Datei sichtbar",
      ],
      correctOption: "A) Klassenmethode, aufrufbar ohne Objektinstanz",
      explanation: "Musterloesung: Die JVM startet `main` direkt an der Klasse.",
    },
    {
      prompt: "2a) Was beschreibt Datenkapselung in OOP?",
      options: [
        "A) Zusammenfassung von Eigenschaften und Verhalten sowie Schutz des internen Zustands",
        "B) Alle Attribute muessen public sein",
        "C) Nur Vererbung ohne Methoden",
        "D) Vollstaendige Trennung von Daten und Verhalten",
      ],
      correctOption: "A) Zusammenfassung von Eigenschaften und Verhalten sowie Schutz des internen Zustands",
      explanation: "Musterloesung: Kapselung = kontrollierter Zugriff auf den Zustand.",
    },
    {
      prompt: "2b) Was beschreibt Vererbung in OOP?",
      options: [
        "A) Weitergabe von Eigenschaften und Verhalten vom Allgemeinen zum Speziellen",
        "B) Mehrfachvererbung von Klassen in Java",
        "C) Nur fuer Interfaces nutzbar",
        "D) Ersatz fuer Kapselung",
      ],
      correctOption: "A) Weitergabe von Eigenschaften und Verhalten vom Allgemeinen zum Speziellen",
      explanation: "Musterloesung: Spezialisierung von Basistypen.",
    },
    {
      prompt: "2e) Zwei Interfaces des Java-Collection-Frameworks und Einsatzgebiet:",
      options: [
        "A) `List`: sequentiell mit Index/duplikate erlaubt; `Map`: Schluessel-Wert-Paare mit eindeutigen Schluesseln",
        "B) `ArrayList` und `HashMap` sind Interfaces",
        "C) `TreeSet` und `LinkedList` sind Interfaces",
        "D) `Queue` speichert nur Zahlen",
      ],
      correctOption: "A) `List`: sequentiell mit Index/duplikate erlaubt; `Map`: Schluessel-Wert-Paare mit eindeutigen Schluesseln",
      explanation: "Musterloesung: `List` und `Map` als korrekte Interface-Beispiele.",
    },
    {
      prompt: "2h) Was bedeutet die Typdeklaration `Map<String, List<String>>` in Zeile 12?",
      options: [
        "A) Map mit String-Schluesseln und als Wert einer Liste von Strings",
        "B) Liste aus Maps mit einem String",
        "C) Set von String-Listen ohne Schluessel",
        "D) Queue von Maps",
      ],
      correctOption: "A) Map mit String-Schluesseln und als Wert einer Liste von Strings",
      explanation: "Musterloesung: Erlaubt mehrere Kurse (`List<String>`) pro Student-ID (`String`).",
    },
    {
      prompt: "3a) Unterschied HashSet vs TreeSet, und was muss bei TreeSet beachtet werden?",
      options: [
        "A) HashSet: keine Reihenfolge/O(1), TreeSet: sortiert/O(log n), Elemente vergleichbar (`Comparable`/`Comparator`)",
        "B) TreeSet ist immer schneller als HashSet",
        "C) HashSet ist immer sortiert",
        "D) Beide sind Listen mit Indexzugriff",
      ],
      correctOption: "A) HashSet: keine Reihenfolge/O(1), TreeSet: sortiert/O(log n), Elemente vergleichbar (`Comparable`/`Comparator`)",
      explanation: "Musterloesung: Genau diese drei Punkte sind entscheidend.",
    },
    {
      prompt: "3c) Zwei Klassen fuer sortierte Speicherung von Daten:",
      options: [
        "A) TreeSet und TreeMap",
        "B) HashSet und HashMap",
        "C) ArrayList und LinkedList",
        "D) Stack und Vector",
      ],
      correctOption: "A) TreeSet und TreeMap",
      explanation: "Musterloesung: Beide speichern geordnet.",
    },
    {
      prompt: "3g) FIFO-Prinzip anhand Queue inkl. Anwendung:",
      options: [
        "A) First In First Out; z. B. Druckerwarteschlange oder Event-Processing",
        "B) Last In First Out; z. B. Methodenstack",
        "C) Zufallsauswahl; z. B. HashMap",
        "D) Sortierung nach Groesse; z. B. TreeSet",
      ],
      correctOption: "A) First In First Out; z. B. Druckerwarteschlange oder Event-Processing",
      explanation: "Musterloesung: Zuerst eingefuegtes Element wird zuerst entnommen.",
    },
    {
      prompt: "3d) Worauf muss bei Typecast geachtet werden?",
      options: [
        "A) Kompatibilitaet der Datentypen und moeglicher Datenverlust",
        "B) Nur auf identische Variablennamen",
        "C) Typecasts sind immer verlustfrei",
        "D) Typecasts gehen nur mit Referenztypen",
      ],
      correctOption: "A) Kompatibilitaet der Datentypen und moeglicher Datenverlust",
      explanation: "Musterloesung: Vor allem beim Narrowing-Cast kann Informationsverlust auftreten.",
    },
    {
      prompt: "3c) Welche `countWords`-Implementierung ist korrekt?",
      options: [
        "A) `Map<String, Long> r = new HashMap<>(); for (String w : words) { Long c = r.getOrDefault(w, 0L); r.put(w, c + 1); } return r;`",
        "B) `Map<String, Long> r = new HashMap<>(); for (String w : words) { r.put(w, 1L); } return r;`",
        "C) `List<String> r = new ArrayList<>(); return r;`",
        "D) `Map<Long, String> r = new HashMap<>(); return r;`",
      ],
      correctOption: "A) `Map<String, Long> r = new HashMap<>(); for (String w : words) { Long c = r.getOrDefault(w, 0L); r.put(w, c + 1); } return r;`",
      explanation: "Musterloesung: Deklaration + getOrDefault + Inkrement + put/return.",
    },
    {
      prompt: "3e) Unterschied ArrayList vs LinkedList und wann welche?",
      options: [
        "A) ArrayList: schneller Indexzugriff O(1); LinkedList: schnelleres Einfuegen/Loeschen in der Mitte",
        "B) LinkedList ist in allen Faellen schneller",
        "C) ArrayList kann keine Duplikate speichern",
        "D) LinkedList hat O(1)-Indexzugriff",
      ],
      correctOption: "A) ArrayList: schneller Indexzugriff O(1); LinkedList: schnelleres Einfuegen/Loeschen in der Mitte",
      explanation: "Musterloesung: ArrayList bei haeufigem Lesen, LinkedList bei haeufigen strukturellen Aenderungen.",
    },
    {
      prompt: "3i) Was bedeutet die Kombination `private final` in Zeile 12?",
      options: [
        "A) `private`: nur innerhalb der Klasse sichtbar; `final`: Referenz nicht neu zuweisbar",
        "B) `private final` macht das Feld automatisch `static`",
        "C) `private final` verbietet jede inhaltliche Aenderung der Collection",
        "D) `private final` erlaubt Zugriff aus allen Klassen",
      ],
      correctOption: "A) `private`: nur innerhalb der Klasse sichtbar; `final`: Referenz nicht neu zuweisbar",
      explanation: "Musterloesung: Information Hiding + Schutz vor Neuzuweisung.",
    },
  ],
  code: `package de.htwberlin.wi.klausur;

import java.util.*;

interface DataStore<K, V> {
    void store(K key, V value);
    V retrieve(K key);
    boolean remove(K key);
}

class StudentRegistry implements DataStore<String, List<String>> {
    private final Map<String, List<String>> registry;
    private final Set<String> activeStudents;

    public StudentRegistry() {
        registry = new HashMap<>();
        activeStudents = new TreeSet<>();
    }

    @Override
    public void store(String studentId, List<String> courses) {
        registry.put(studentId, courses);
        activeStudents.add(studentId);
    }

    @Override
    public List<String> retrieve(String studentId) {
        return registry.getOrDefault(studentId, Collections.emptyList());
    }

    @Override
    public boolean remove(String studentId) {
        activeStudents.remove(studentId);
        return registry.remove(studentId) != null;
    }

    public int getTotalStudents() {
        return activeStudents.size();
    }

    public Map<String, List<String>> getAllData() {
        return Collections.unmodifiableMap(registry);
    }
}

public class Klausur {
    public static void main(String[] args) {
        StudentRegistry reg = new StudentRegistry();

        List<String> courses1 = new ArrayList<>();
        courses1.add("Mathematik");
        courses1.add("Programmierung");

        reg.store("s12345", courses1);
        reg.store("s67890", new ArrayList<>(Arrays.asList("BWL", "Statistik")));
        reg.store("s12345", new ArrayList<>(Arrays.asList("Datenbanken")));

        System.out.println("Anzahl Studenten: " + reg.getTotalStudents());

        for (var entry : reg.getAllData().entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        List<String> retrieved = reg.retrieve("s12345");
        System.out.println("Kurse s12345: " + retrieved.size());

        System.out.println("Removed: " + reg.remove("s99999"));
        System.out.println("Removed: " + reg.remove("s67890"));
        System.out.println("Anzahl Studenten: " + reg.getTotalStudents());
    }
}`,
  steps: [
    {
      lineNumber: 48,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1", changed: true }],
        },
      ],
      heapObjects: [
        { id: "reg1", type: "StudentRegistry", label: "Registry#1", values: ["registry = -> Map#1", "activeStudents = -> Set#1"] },
        { id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: [] },
        { id: "set1", type: "TreeSet<String>", label: "Set#1", values: [] },
      ],
      consoleOutput: [],
      explanation: "Es wird ein `StudentRegistry`-Objekt angelegt. Intern entstehen eine `HashMap` und ein `TreeSet`.",
    },
    {
      lineNumber: 50,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" },
            { name: "courses1", type: "List<String>", value: "-> List#1", isReference: true, refId: "list1", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "reg1", type: "StudentRegistry", label: "Registry#1", values: ["registry = -> Map#1", "activeStudents = -> Set#1"] },
        { id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: [] },
        { id: "set1", type: "TreeSet<String>", label: "Set#1", values: [] },
        { id: "list1", type: "ArrayList<String>", label: "List#1", values: [] },
      ],
      consoleOutput: [],
      explanation: "`courses1` zeigt auf eine neue `ArrayList<String>` auf dem Heap.",
    },
    {
      lineNumber: 51,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "courses1", type: "List<String>", value: "-> List#1", isReference: true, refId: "list1" }],
        },
      ],
      heapObjects: [{ id: "list1", type: "ArrayList<String>", label: "List#1", values: ["Mathematik"], highlightIndex: 0 }],
      consoleOutput: [],
      explanation: "Das erste Fach wird zur Liste hinzugefuegt.",
    },
    {
      lineNumber: 52,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "courses1", type: "List<String>", value: "-> List#1", isReference: true, refId: "list1" }],
        },
      ],
      heapObjects: [{ id: "list1", type: "ArrayList<String>", label: "List#1", values: ["Mathematik", "Programmierung"], highlightIndex: 1 }],
      consoleOutput: [],
      explanation: "Nun enthaelt `courses1` zwei Kurse.",
    },
    {
      lineNumber: 54,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" },
            { name: "courses1", type: "List<String>", value: "-> List#1", isReference: true, refId: "list1" },
          ],
        },
        {
          methodName: "store",
          variables: [
            { name: "this", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1", changed: true },
            { name: "studentId", type: "String", value: "\"s12345\"", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "reg1", type: "StudentRegistry", label: "Registry#1", values: ["registry = -> Map#1", "activeStudents = -> Set#1"] },
        { id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: ["s12345 -> [Mathematik, Programmierung]"] },
        { id: "set1", type: "TreeSet<String>", label: "Set#1", values: ["s12345"] },
        { id: "list1", type: "ArrayList<String>", label: "List#1", values: ["Mathematik", "Programmierung"] },
      ],
      consoleOutput: [],
      explanation: "Der erste Student wird gespeichert. Map und Set werden aktualisiert.",
    },
    {
      lineNumber: 55,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" }],
        },
        {
          methodName: "store",
          variables: [
            { name: "this", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1", changed: true },
            { name: "studentId", type: "String", value: "\"s67890\"", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: ["s12345 -> [Mathematik, Programmierung]", "s67890 -> [BWL, Statistik]"], highlightIndex: 1 },
        { id: "set1", type: "TreeSet<String>", label: "Set#1", values: ["s12345", "s67890"], highlightIndex: 1 },
      ],
      consoleOutput: [],
      explanation: "Zweiter Student wird eingefuegt.",
    },
    {
      lineNumber: 56,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" }],
        },
        {
          methodName: "store",
          variables: [
            { name: "this", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1", changed: true },
            { name: "studentId", type: "String", value: "\"s12345\"", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: ["s12345 -> [Datenbanken]", "s67890 -> [BWL, Statistik]"], highlightIndex: 0 },
        { id: "set1", type: "TreeSet<String>", label: "Set#1", values: ["s12345", "s67890"] },
      ],
      consoleOutput: [],
      explanation: "Der Key `s12345` wird ueberschrieben. Im Set bleibt die ID nur einmal enthalten.",
    },
    {
      lineNumber: 58,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" }],
        },
      ],
      heapObjects: [{ id: "set1", type: "TreeSet<String>", label: "Set#1", values: ["s12345", "s67890"] }],
      consoleOutput: ["Anzahl Studenten: 2"],
      explanation: "Ausgabe basiert auf `activeStudents.size()` und ist 2.",
    },
    {
      lineNumber: 60,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" },
            { name: "entry", type: "Map.Entry<String,List<String>>", value: "s12345", changed: true },
          ],
        },
      ],
      heapObjects: [{ id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: ["s12345 -> [Datenbanken]", "s67890 -> [BWL, Statistik]"] }],
      consoleOutput: ["Anzahl Studenten: 2"],
      explanation: "Die for-each-Schleife iteriert ueber die Eintraege der unmodifiable View.",
    },
    {
      lineNumber: 61,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "entry", type: "Map.Entry<String,List<String>>", value: "s12345", changed: true }],
        },
      ],
      heapObjects: [{ id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: ["s12345 -> [Datenbanken]", "s67890 -> [BWL, Statistik]"] }],
      consoleOutput: ["Anzahl Studenten: 2", "s12345: [Datenbanken]"],
      explanation: "Erster Listeneintrag wird ausgegeben.",
    },
    {
      lineNumber: 61,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "entry", type: "Map.Entry<String,List<String>>", value: "s67890", changed: true }],
        },
      ],
      heapObjects: [{ id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: ["s12345 -> [Datenbanken]", "s67890 -> [BWL, Statistik]"] }],
      consoleOutput: ["Anzahl Studenten: 2", "s12345: [Datenbanken]", "s67890: [BWL, Statistik]"],
      explanation: "Zweiter Listeneintrag wird ausgegeben.",
    },
    {
      lineNumber: 64,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" },
            { name: "retrieved", type: "List<String>", value: "-> List#R1", isReference: true, refId: "retr1", changed: true },
          ],
        },
        {
          methodName: "retrieve",
          variables: [{ name: "studentId", type: "String", value: "\"s12345\"", changed: true }],
        },
      ],
      heapObjects: [{ id: "retr1", type: "ArrayList<String>", label: "List#R1", values: ["Datenbanken"] }],
      consoleOutput: ["Anzahl Studenten: 2", "s12345: [Datenbanken]", "s67890: [BWL, Statistik]"],
      explanation: "`retrieve(\"s12345\")` liefert die aktuelle Kursliste mit genau einem Element.",
    },
    {
      lineNumber: 65,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "retrieved", type: "List<String>", value: "-> List#R1", isReference: true, refId: "retr1" }],
        },
      ],
      heapObjects: [{ id: "retr1", type: "ArrayList<String>", label: "List#R1", values: ["Datenbanken"] }],
      consoleOutput: ["Anzahl Studenten: 2", "s12345: [Datenbanken]", "s67890: [BWL, Statistik]", "Kurse s12345: 1"],
      explanation: "`retrieved.size()` ist 1, daher Ausgabe `Kurse s12345: 1`.",
    },
    {
      lineNumber: 67,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" }],
        },
        {
          methodName: "remove",
          variables: [{ name: "studentId", type: "String", value: "\"s99999\"", changed: true }],
        },
      ],
      heapObjects: [
        { id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: ["s12345 -> [Datenbanken]", "s67890 -> [BWL, Statistik]"] },
        { id: "set1", type: "TreeSet<String>", label: "Set#1", values: ["s12345", "s67890"] },
      ],
      consoleOutput: ["Anzahl Studenten: 2", "s12345: [Datenbanken]", "s67890: [BWL, Statistik]", "Kurse s12345: 1", "Removed: false"],
      explanation: "`s99999` existiert nicht. `remove` liefert `false`.",
    },
    {
      lineNumber: 68,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" }],
        },
        {
          methodName: "remove",
          variables: [{ name: "studentId", type: "String", value: "\"s67890\"", changed: true }],
        },
      ],
      heapObjects: [
        { id: "map1", type: "HashMap<String,List<String>>", label: "Map#1", values: ["s12345 -> [Datenbanken]"] },
        { id: "set1", type: "TreeSet<String>", label: "Set#1", values: ["s12345"] },
      ],
      consoleOutput: ["Anzahl Studenten: 2", "s12345: [Datenbanken]", "s67890: [BWL, Statistik]", "Kurse s12345: 1", "Removed: false", "Removed: true"],
      explanation: "`s67890` wird erfolgreich aus Map und Set entfernt.",
    },
    {
      lineNumber: 69,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "reg", type: "StudentRegistry", value: "-> Registry#1", isReference: true, refId: "reg1" }],
        },
      ],
      heapObjects: [{ id: "set1", type: "TreeSet<String>", label: "Set#1", values: ["s12345"] }],
      consoleOutput: ["Anzahl Studenten: 2", "s12345: [Datenbanken]", "s67890: [BWL, Statistik]", "Kurse s12345: 1", "Removed: false", "Removed: true", "Anzahl Studenten: 1"],
      explanation: "Finaler Zustand: nur `s12345` bleibt aktiv, daher Ausgabe 1.",
    },
  ],
};

const algorithmenCatalogExample: JavaExample = {
  id: "algorithmen-catalog",
  title: "Algorithmen auf Collections",
  description: "Extraktion, Aggregation, Transformation, Sortierung, Rekursion",
  semester: "semester2",
  lecture: "VL 06 - Algorithmen",
  customQuestions: [
    {
      prompt: "1b) Was ist der Inhalt von `catalog` nach Zeile 66?",
      options: [
        "A) {1L->Käse, 2L->Fleisch, 3L->Salat}",
        "B) {1L->Brot, 1L->Käse, 2L->Fleisch, 3L->Salat}",
        "C) {1L->Brot, 2L->Fleisch, 3L->Salat}",
        "D) {2L->Fleisch, 3L->Salat}",
      ],
      correctOption: "A) {1L->Käse, 2L->Fleisch, 3L->Salat}",
      explanation: "Maps haben eindeutige Schluessel. `put(1L, Käse)` ueberschreibt den alten Wert `Brot`.",
    },
    {
      prompt: "1c) Welche Aussage zu Zeile 69 ist korrekt?",
      options: [
        "A) Inhalt der Namen ist gleich, Reihenfolge kann variieren wegen HashMap.",
        "B) Reihenfolge ist immer [Käse, Fleisch, Salat].",
        "C) Es werden nur zwei Namen ausgegeben.",
        "D) Ausgabe ist immer alphabetisch sortiert.",
      ],
      correctOption: "A) Inhalt der Namen ist gleich, Reihenfolge kann variieren wegen HashMap.",
      explanation: "`HashMap` garantiert keine feste Iterationsreihenfolge.",
    },
    {
      prompt: "1d) Welche Ausgabe erzeugt Zeile 72 (`Gesamtpreis`)?",
      options: [
        "A) Gesamtpreis: 3.3",
        "B) Gesamtpreis: 3.8",
        "C) Gesamtpreis: 2.3",
        "D) Gesamtpreis: 4.3",
      ],
      correctOption: "A) Gesamtpreis: 3.3",
      explanation: "Käse 1.00 + Fleisch 1.50 + Salat 0.80 = 3.30.",
    },
    {
      prompt: "1e) Was gibt `invertCatalog()` inhaltlich zurueck?",
      options: [
        "A) Name -> ID, z. B. {Käse=1, Fleisch=2, Salat=3}",
        "B) ID -> Name, z. B. {1=Käse, 2=Fleisch, 3=Salat}",
        "C) Name -> Preis",
        "D) Preis -> Name",
      ],
      correctOption: "A) Name -> ID, z. B. {Käse=1, Fleisch=2, Salat=3}",
      explanation: "Die Methode vertauscht die Zuordnung von `id -> Product` zu `name -> id`.",
    },
    {
      prompt: "1f) Warum ist `Sortiert: Salat` korrekt (Zeile 78)?",
      options: [
        "A) `Comparator.comparing(Product::getCalories)` sortiert aufsteigend nach Kalorien.",
        "B) Es wird zufaellig sortiert und Salat war Glueck.",
        "C) Es wird nach Name sortiert.",
        "D) Es wird absteigend nach Kalorien sortiert.",
      ],
      correctOption: "A) `Comparator.comparing(Product::getCalories)` sortiert aufsteigend nach Kalorien.",
      explanation: "Salat hat mit 100 den kleinsten Kalorienwert.",
    },
    {
      prompt: "1g) Was ist Basisfall und rekursiver Fall von `sumCaloriesRec`?",
      options: [
        "A) Basisfall: leere Liste -> 0; rekursiv: erstes Element + Restliste",
        "B) Basisfall: erstes Element; rekursiv: letzte zwei Elemente",
        "C) Basisfall: Liste mit 2 Elementen; rekursiv: sonst nichts",
        "D) Kein Basisfall vorhanden",
      ],
      correctOption: "A) Basisfall: leere Liste -> 0; rekursiv: erstes Element + Restliste",
      explanation: "So wird die Liste schrittweise verkleinert bis zur leeren Liste.",
    },
    {
      prompt: "1h) Was machen `stream()`, `map()`, `reduce()` in Zeilen 34-36?",
      options: [
        "A) stream: Datenstrom, map: Product->Preis, reduce: Summenaggregation",
        "B) stream: sortiert, map: filtert, reduce: kopiert Liste",
        "C) stream: erzeugt Map, map: erzeugt Set, reduce: loescht Duplikate",
        "D) map und reduce sind hier wirkungslos",
      ],
      correctOption: "A) stream: Datenstrom, map: Product->Preis, reduce: Summenaggregation",
      explanation: "Das ist eine funktionale Aggregation ohne externen Akkumulator.",
    },
    {
      prompt: "1i) Wofuer ist `entrySet()` im Vergleich zu `keySet()` und `values()` noetig?",
      options: [
        "A) Wenn Schluessel und Wert gleichzeitig benoetigt werden",
        "B) Nur um Werte ohne Schluessel zu lesen",
        "C) Nur um Schluessel ohne Werte zu lesen",
        "D) Nur bei TreeMap erlaubt",
      ],
      correctOption: "A) Wenn Schluessel und Wert gleichzeitig benoetigt werden",
      explanation: "`entrySet()` liefert `Map.Entry<K,V>`-Paare.",
    },
    {
      prompt: "2a) Welche vier algorithmischen Aufgaben sind typisch?",
      options: [
        "A) Extraktion, Aggregation, Transformation, Sortierung",
        "B) Parsing, Threading, Caching, Deployment",
        "C) Vererbung, Kapselung, Polymorphie, Abstraktion",
        "D) Compilieren, Testen, Paketieren, Deployen",
      ],
      correctOption: "A) Extraktion, Aggregation, Transformation, Sortierung",
      explanation: "Das sind die zentralen Datenverarbeitungsaufgaben im Kurs.",
    },
    {
      prompt: "2b) Welche drei Iterationsstile wurden behandelt?",
      options: [
        "A) Imperativ mit Seiteneffekt, funktional (Stream), rekursiv",
        "B) Nur rekursiv und while",
        "C) Nur Stream und SQL",
        "D) For-Schleife, if, switch",
      ],
      correctOption: "A) Imperativ mit Seiteneffekt, funktional (Stream), rekursiv",
      explanation: "Diese drei Stile loesen dieselben Aufgaben mit unterschiedlichen Denkmodellen.",
    },
    {
      prompt: "2c) Ein Vorteil des funktionalen Stils (Stream API) ist...",
      options: [
        "A) weniger mutierbarer Zustand und deklarativerer Code",
        "B) immer bessere Laufzeit in jedem Fall",
        "C) keine Notwendigkeit von Tests",
        "D) automatische Sortierung aller Daten",
      ],
      correctOption: "A) weniger mutierbarer Zustand und deklarativerer Code",
      explanation: "Das verbessert Verstaendlichkeit und Testbarkeit.",
    },
    {
      prompt: "2d) Warum braucht Rekursion einen Basisfall?",
      options: [
        "A) Sonst keine Abbruchbedingung -> Gefahr von StackOverflowError",
        "B) Nur wegen Lesbarkeit",
        "C) Damit der Compiler keine Warnung zeigt",
        "D) Weil Java sonst keine Listen erlaubt",
      ],
      correctOption: "A) Sonst keine Abbruchbedingung -> Gefahr von StackOverflowError",
      explanation: "Jeder rekursive Aufruf legt Stack-Frames an; ohne Ende laeuft der Stack voll.",
    },
    {
      prompt: "2e) Welche Zuordnung Collection-Interface -> Aufgabe ist korrekt?",
      options: [
        "A) List fuer Reihenfolge+Duplikate, Set fuer eindeutige IDs, Queue fuer FIFO, Map fuer ID->Objekt",
        "B) Queue fuer alles",
        "C) Set fuer ID->Objekt Zuordnung",
        "D) Map fuer FIFO-Verarbeitung",
      ],
      correctOption: "A) List fuer Reihenfolge+Duplikate, Set fuer eindeutige IDs, Queue fuer FIFO, Map fuer ID->Objekt",
      explanation: "Jedes Interface adressiert ein anderes Datenzugriffsmuster.",
    },
    {
      prompt: "2f) Was macht `put()` bei bereits vorhandenem Schluessel?",
      options: [
        "A) Ueberschreibt den bestehenden Wert",
        "B) Fuegt einen zweiten Eintrag mit gleichem Key hinzu",
        "C) Wirft immer eine Exception",
        "D) Ignoriert den Aufruf",
      ],
      correctOption: "A) Ueberschreibt den bestehenden Wert",
      explanation: "Im Beispiel ersetzt `put(1L, Käse)` den alten Eintrag `1L -> Brot`.",
    },
    {
      prompt: "3e) Was liefert `groupByCalories()` semantisch?",
      options: [
        "A) Map von Kalorienwert zu Liste von Produktnamen, z. B. {100=[Salat],300=[Käse],400=[Fleisch]}",
        "B) Map von Produktnamen zu Kalorienwert",
        "C) Nur eine sortierte Liste von Namen",
        "D) Eine Queue von Kalorienwerten",
      ],
      correctOption: "A) Map von Kalorienwert zu Liste von Produktnamen, z. B. {100=[Salat],300=[Käse],400=[Fleisch]}",
      explanation: "`computeIfAbsent` erzeugt die Liste pro Kalorien-Key bei Bedarf.",
    },
    {
      prompt: "3f) Was ist ein Seiteneffekt (side effect)?",
      options: [
        "A) Aenderung von Zustand ausserhalb des lokalen Ausdrucks, z. B. `names.add(...)`",
        "B) Jede reine Berechnung ohne Zustandsaenderung",
        "C) Nur Konsolenausgabe gilt als Seiteneffekt",
        "D) Nur Exceptions sind Seiteneffekte",
      ],
      correctOption: "A) Aenderung von Zustand ausserhalb des lokalen Ausdrucks, z. B. `names.add(...)`",
      explanation: "Seiteneffekte erschweren oft Testbarkeit und Nachvollziehbarkeit.",
    },
    {
      prompt: "3g) Unterschied zwischen `collect()` und `reduce()`?",
      options: [
        "A) reduce -> Einzelwert; collect -> Container wie List/Set/Map",
        "B) collect -> Einzelwert; reduce -> Container",
        "C) Beide sind inhaltlich identisch",
        "D) reduce ist nur fuer Strings",
      ],
      correctOption: "A) reduce -> Einzelwert; collect -> Container wie List/Set/Map",
      explanation: "`reduce` fuer skalare Ergebnisse, `collect` fuer Datenstrukturen.",
    },
  ],
  codingExercises: [
    {
      title: "3a - Imperative Aggregation schreiben",
      prompt: "Schreibe `totalPrice()` im imperativen Stil mit Seiteneffekt (for-Schleife, Akkumulator).",
      starterCode: "public static double totalPriceImperative(Map<Long, Product> catalog) {\n    // TODO\n}",
      referenceSolution: "public static double totalPriceImperative(Map<Long, Product> catalog) {\n    double total = 0.0;\n    for (Product p : catalog.values()) {\n        total += p.getPrice();\n    }\n    return total;\n}",
    },
    {
      title: "3b - Rekursive Extraktion schreiben",
      prompt: "Schreibe `extractNames()` rekursiv mit Signatur `extractNamesRec(List<Product> items)`.",
      starterCode: "public static List<String> extractNamesRec(List<Product> items) {\n    // TODO\n}",
      referenceSolution: "public static List<String> extractNamesRec(List<Product> items) {\n    if (items.isEmpty()) return new ArrayList<>();\n    List<String> result = extractNamesRec(items.subList(1, items.size()));\n    result.add(items.get(0).getName());\n    return result;\n}",
    },
    {
      title: "3c - Filter mit Stream schreiben",
      prompt: "Implementiere `filterByMaxCalories(Map<Long, Product> catalog, int maxCal)` mit Stream API.",
      starterCode: "public static List<Product> filterByMaxCalories(Map<Long, Product> catalog, int maxCal) {\n    // TODO\n}",
      referenceSolution: "public static List<Product> filterByMaxCalories(Map<Long, Product> catalog, int maxCal) {\n    return catalog.values().stream()\n        .filter(p -> p.getCalories() <= maxCal)\n        .collect(Collectors.toList());\n}",
    },
    {
      title: "3d - Teuerstes Produkt schreiben",
      prompt: "Implementiere `mostExpensiveProduct()`. Wenn keine Produkte vorhanden sind, soll `null` zurueckgegeben werden.",
      starterCode: "public static Product mostExpensiveProduct(Map<Long, Product> catalog) {\n    // TODO\n}",
      referenceSolution: "public static Product mostExpensiveProduct(Map<Long, Product> catalog) {\n    if (catalog.isEmpty()) return null;\n    Product best = null;\n    for (Product p : catalog.values()) {\n        if (best == null || p.getPrice() > best.getPrice()) {\n            best = p;\n        }\n    }\n    return best;\n}",
    },
  ],
  code: `package de.htwberlin.wi.klausur;

import java.util.*;
import java.util.stream.Collectors;

class Product {
    private final long id;
    private final String name;
    private final double price;
    private final int calories;

    public Product(long id, String name, double price, int calories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.calories = calories;
    }

    public long getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getCalories() { return calories; }
}

public class Klausur {

    public static List<String> extractNames(Map<Long, Product> catalog) {
        List<String> names = new ArrayList<>();
        for (Product p : catalog.values()) {
            names.add(p.getName());
        }
        return names;
    }

    public static double totalPrice(Map<Long, Product> catalog) {
        return catalog.values().stream()
            .map(Product::getPrice)
            .reduce(0.0, (a, b) -> a + b);
    }

    public static Map<String, Long> invertCatalog(Map<Long, Product> catalog) {
        Map<String, Long> result = new HashMap<>();
        for (Map.Entry<Long, Product> e : catalog.entrySet()) {
            result.put(e.getValue().getName(), e.getKey());
        }
        return result;
    }

    public static List<Product> sortByCalories(Map<Long, Product> catalog) {
        return catalog.values().stream()
            .sorted(Comparator.comparing(Product::getCalories))
            .collect(Collectors.toList());
    }

    public static int sumCaloriesRec(List<Product> items) {
        if (items.isEmpty()) return 0;
        else return sumCaloriesRec(items.subList(1, items.size()))
            + items.get(0).getCalories();
    }

    public static void main(String[] args) {
        Map<Long, Product> catalog = new HashMap<>();
        catalog.put(1L, new Product(1L, "Brot", 0.50, 300));
        catalog.put(2L, new Product(2L, "Fleisch", 1.50, 400));
        catalog.put(3L, new Product(3L, "Salat", 0.80, 100));
        catalog.put(1L, new Product(1L, "Käse", 1.00, 300));

        List<String> names = extractNames(catalog);
        System.out.println("Namen: " + names);

        double total = totalPrice(catalog);
        System.out.println("Gesamtpreis: " + total);

        Map<String, Long> inverted = invertCatalog(catalog);
        System.out.println("Invertiert: " + inverted);

        List<Product> sorted = sortByCalories(catalog);
        System.out.println("Sortiert: " + sorted.get(0).getName());

        List<Product> allProducts = new ArrayList<>(catalog.values());
        System.out.println("Kalorien: " + sumCaloriesRec(allProducts));
    }
}`,
  steps: [
    {
      lineNumber: 62,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "catalog", type: "Map<Long,Product>", value: "-> Map#1", isReference: true, refId: "algMap1", changed: true }],
        },
      ],
      heapObjects: [{ id: "algMap1", type: "HashMap<Long,Product>", label: "Map#1", values: [] }],
      consoleOutput: [],
      explanation: "Es wird ein leerer Produktkatalog als `HashMap` angelegt.",
    },
    {
      lineNumber: 63,
      stackFrames: [{ methodName: "main", variables: [{ name: "catalog", type: "Map<Long,Product>", value: "-> Map#1", isReference: true, refId: "algMap1" }] }],
      heapObjects: [{ id: "algMap1", type: "HashMap<Long,Product>", label: "Map#1", values: ["1 -> Product(Brot, 0.50, 300)"], highlightIndex: 0 }],
      consoleOutput: [],
      explanation: "Produkt `Brot` wird unter Schluessel `1L` gespeichert.",
    },
    {
      lineNumber: 64,
      stackFrames: [{ methodName: "main", variables: [{ name: "catalog", type: "Map<Long,Product>", value: "-> Map#1", isReference: true, refId: "algMap1" }] }],
      heapObjects: [{ id: "algMap1", type: "HashMap<Long,Product>", label: "Map#1", values: ["1 -> Product(Brot, 0.50, 300)", "2 -> Product(Fleisch, 1.50, 400)"], highlightIndex: 1 }],
      consoleOutput: [],
      explanation: "`Fleisch` wird mit Key `2L` hinzugefuegt.",
    },
    {
      lineNumber: 65,
      stackFrames: [{ methodName: "main", variables: [{ name: "catalog", type: "Map<Long,Product>", value: "-> Map#1", isReference: true, refId: "algMap1" }] }],
      heapObjects: [{ id: "algMap1", type: "HashMap<Long,Product>", label: "Map#1", values: ["1 -> Product(Brot, 0.50, 300)", "2 -> Product(Fleisch, 1.50, 400)", "3 -> Product(Salat, 0.80, 100)"], highlightIndex: 2 }],
      consoleOutput: [],
      explanation: "`Salat` wird mit Key `3L` hinzugefuegt.",
    },
    {
      lineNumber: 66,
      stackFrames: [{ methodName: "main", variables: [{ name: "catalog", type: "Map<Long,Product>", value: "-> Map#1", isReference: true, refId: "algMap1", changed: true }] }],
      heapObjects: [{ id: "algMap1", type: "HashMap<Long,Product>", label: "Map#1", values: ["1 -> Product(Käse, 1.00, 300)", "2 -> Product(Fleisch, 1.50, 400)", "3 -> Product(Salat, 0.80, 100)"], highlightIndex: 0 }],
      consoleOutput: [],
      explanation: "Der Key `1L` wird ueberschrieben: `Brot` wird durch `Käse` ersetzt.",
    },
    {
      lineNumber: 68,
      stackFrames: [{ methodName: "main", variables: [
        { name: "catalog", type: "Map<Long,Product>", value: "-> Map#1", isReference: true, refId: "algMap1" },
        { name: "names", type: "List<String>", value: "-> List#Names", isReference: true, refId: "algNames", changed: true },
      ] }],
      heapObjects: [
        { id: "algMap1", type: "HashMap<Long,Product>", label: "Map#1", values: ["1 -> Product(Käse, 1.00, 300)", "2 -> Product(Fleisch, 1.50, 400)", "3 -> Product(Salat, 0.80, 100)"] },
        { id: "algNames", type: "ArrayList<String>", label: "List#Names", values: ["Käse", "Fleisch", "Salat"] },
      ],
      consoleOutput: [],
      explanation: "`extractNames` extrahiert die Produktnamen in eine Liste.",
    },
    {
      lineNumber: 69,
      stackFrames: [{ methodName: "main", variables: [{ name: "names", type: "List<String>", value: "-> List#Names", isReference: true, refId: "algNames" }] }],
      heapObjects: [{ id: "algNames", type: "ArrayList<String>", label: "List#Names", values: ["Käse", "Fleisch", "Salat"] }],
      consoleOutput: ["Namen: [Käse, Fleisch, Salat]"],
      explanation: "Die Namenliste wird ausgegeben (Reihenfolge kann bei HashMap variieren).",
    },
    {
      lineNumber: 71,
      stackFrames: [{ methodName: "main", variables: [{ name: "total", type: "double", value: "3.3", changed: true }] }],
      heapObjects: [],
      consoleOutput: ["Namen: [Käse, Fleisch, Salat]"],
      explanation: "`totalPrice` summiert alle Preise via Stream-Reduce zu `3.3`.",
    },
    {
      lineNumber: 72,
      stackFrames: [{ methodName: "main", variables: [{ name: "total", type: "double", value: "3.3" }] }],
      heapObjects: [],
      consoleOutput: ["Namen: [Käse, Fleisch, Salat]", "Gesamtpreis: 3.3"],
      explanation: "Ausgabe des aggregierten Gesamtpreises.",
    },
    {
      lineNumber: 74,
      stackFrames: [{ methodName: "main", variables: [{ name: "inverted", type: "Map<String,Long>", value: "-> Map#Inv", isReference: true, refId: "algInv", changed: true }] }],
      heapObjects: [{ id: "algInv", type: "HashMap<String,Long>", label: "Map#Inv", values: ["Käse -> 1", "Fleisch -> 2", "Salat -> 3"] }],
      consoleOutput: ["Namen: [Käse, Fleisch, Salat]", "Gesamtpreis: 3.3"],
      explanation: "`invertCatalog` dreht die Zuordnung auf `Name -> ID`.",
    },
    {
      lineNumber: 75,
      stackFrames: [{ methodName: "main", variables: [{ name: "inverted", type: "Map<String,Long>", value: "-> Map#Inv", isReference: true, refId: "algInv" }] }],
      heapObjects: [{ id: "algInv", type: "HashMap<String,Long>", label: "Map#Inv", values: ["Käse -> 1", "Fleisch -> 2", "Salat -> 3"] }],
      consoleOutput: ["Namen: [Käse, Fleisch, Salat]", "Gesamtpreis: 3.3", "Invertiert: {Käse=1, Fleisch=2, Salat=3}"],
      explanation: "Ausgabe der transformierten Map.",
    },
    {
      lineNumber: 77,
      stackFrames: [{ methodName: "main", variables: [{ name: "sorted", type: "List<Product>", value: "-> List#Sorted", isReference: true, refId: "algSorted", changed: true }] }],
      heapObjects: [{ id: "algSorted", type: "ArrayList<Product>", label: "List#Sorted", values: ["Product(Salat, 0.80, 100)", "Product(Käse, 1.00, 300)", "Product(Fleisch, 1.50, 400)"] }],
      consoleOutput: ["Namen: [Käse, Fleisch, Salat]", "Gesamtpreis: 3.3", "Invertiert: {Käse=1, Fleisch=2, Salat=3}"],
      explanation: "Sortierung nach Kalorien aufsteigend.",
    },
    {
      lineNumber: 78,
      stackFrames: [{ methodName: "main", variables: [{ name: "sorted", type: "List<Product>", value: "-> List#Sorted", isReference: true, refId: "algSorted" }] }],
      heapObjects: [{ id: "algSorted", type: "ArrayList<Product>", label: "List#Sorted", values: ["Product(Salat, 0.80, 100)", "Product(Käse, 1.00, 300)", "Product(Fleisch, 1.50, 400)"] }],
      consoleOutput: ["Namen: [Käse, Fleisch, Salat]", "Gesamtpreis: 3.3", "Invertiert: {Käse=1, Fleisch=2, Salat=3}", "Sortiert: Salat"],
      explanation: "Das erste Element nach Sortierung hat die wenigsten Kalorien: `Salat`.",
    },
    {
      lineNumber: 80,
      stackFrames: [{ methodName: "main", variables: [{ name: "allProducts", type: "List<Product>", value: "-> List#All", isReference: true, refId: "algAll", changed: true }] }],
      heapObjects: [{ id: "algAll", type: "ArrayList<Product>", label: "List#All", values: ["Product(Käse, 1.00, 300)", "Product(Fleisch, 1.50, 400)", "Product(Salat, 0.80, 100)"] }],
      consoleOutput: ["Namen: [Käse, Fleisch, Salat]", "Gesamtpreis: 3.3", "Invertiert: {Käse=1, Fleisch=2, Salat=3}", "Sortiert: Salat"],
      explanation: "Alle Produkte werden in eine Liste fuer die rekursive Summierung ueberfuehrt.",
    },
    {
      lineNumber: 81,
      stackFrames: [{ methodName: "main", variables: [{ name: "allProducts", type: "List<Product>", value: "-> List#All", isReference: true, refId: "algAll" }] }],
      heapObjects: [{ id: "algAll", type: "ArrayList<Product>", label: "List#All", values: ["Product(Käse, 1.00, 300)", "Product(Fleisch, 1.50, 400)", "Product(Salat, 0.80, 100)"] }],
      consoleOutput: ["Namen: [Käse, Fleisch, Salat]", "Gesamtpreis: 3.3", "Invertiert: {Käse=1, Fleisch=2, Salat=3}", "Sortiert: Salat", "Kalorien: 800"],
      explanation: "Die rekursive Methode summiert alle Kalorien zu `800`.",
    },
  ],
};

const nebenlaeufigkeitBankAccountExample: JavaExample = {
  id: "nebenlaeufigkeit-bankaccount",
  title: "BankAccount mit Threads",
  description: "Synchronisierung mit synchronized, volatile, start() und join()",
  semester: "semester2",
  lecture: "VL 07 - Nebenläufigkeit",
  customQuestions: [
    {
      prompt: "1a) Welche zwei Moeglichkeiten gibt es, einen Thread in Java zu erstellen? Welche Technik wird in Zeilen 39-49 verwendet?",
      options: [],
      correctOption: "Moeglichkeiten: (1) Klasse `Thread` erweitern (`extends Thread`), (2) `Runnable` implementieren. Im Code wird die Runnable-Variante per Lambda verwendet: `new Thread(() -> { ... })`.",
      explanation: "Die Lambda-Syntax zeigt ein funktionales Interface (`Runnable`) als Parameter des Thread-Konstruktors.",
      hintQuestion: "Schau auf `new Thread(() -> { ... })`: Was ist der Parametertyp des Konstruktors, und welche zwei Standardwege gibt es fuer Thread-Erzeugung?",
    },
    {
      prompt: "1b) Was bewirken Zeilen 51-55 (`start()` und `join()`), und warum ist `join()` hier wichtig?",
      options: [],
      correctOption: "`start()` (51-52) startet beide Worker-Threads nebenlaeufig. `join()` (54-55) blockiert den Main-Thread, bis beide beendet sind. Wichtig: Ohne `join()` koennte Zeile 57 zu frueh laufen und ein unvollstaendiges Ergebnis ausgeben.",
      explanation: "Main darf den Endstand erst ausgeben, wenn alle Ein-/Auszahlungen abgeschlossen sind.",
      hintQuestion: "Welche Zeile liest den Endstand? Koennte sie vor Ende von Thread A/B ausgefuehrt werden, wenn `join()` fehlt?",
    },
    {
      prompt: "1c) Was bedeutet `synchronized` in Zeile 14 konkret, und welches Problem droht ohne `synchronized`?",
      options: [],
      correctOption: "`synchronized` bedeutet exklusiver Zugriff: Nur ein Thread darf den Methodenkoerper gleichzeitig ausfuehren (Monitor-Lock auf `this`). Ohne diese Sperre droht eine Race Condition mit Lost Updates bei `balance += amount` bzw. `balance -= amount`.",
      explanation: "Lesen-und-Schreiben ist eine zusammengesetzte Operation und muss atomar geschuetzt werden.",
      hintQuestion: "Welche Operation in `deposit()` ist nicht atomar? Was passiert, wenn zwei Threads denselben alten `balance`-Wert lesen?",
    },
    {
      prompt: "1d) Erklaeren Sie den Unterschied zwischen `volatile` (Zeile 6) und `synchronized`. Warum wird hier beides verwendet?",
      options: [],
      correctOption: "`volatile` garantiert Sichtbarkeit aktueller Werte aus dem Hauptspeicher (keine veralteten Cache-Werte). `synchronized` garantiert zusaetzlich wechselseitigen Ausschluss fuer kritische Schreib-/Lese-Schreib-Bloecke. `volatile` allein verhindert keine Race Conditions bei `+=`/`-=`. Hier: `synchronized` fuer sichere Updates, `volatile` fuer aktuelle Sichtbarkeit beim Lesen (z. B. `getBalance()`).",
      explanation: "Sichtbarkeit und Atomizitaet sind zwei verschiedene Probleme.",
      hintQuestion: "Welche Eigenschaft loest `volatile`, welche loest `synchronized`? Deckt `volatile` allein `balance += amount` korrekt ab?",
    },
    {
      prompt: "1e) Welcher Endwert ist nach Zeile 57 garantiert, wenn beide Threads vollstaendig beendet sind? Zeigen Sie den Rechenweg.",
      options: [],
      correctOption: "Garantierter Endwert: `700.0`. Rechenweg: Start 1000.0, Einzahlungen +200 +300 +100 = +600, Auszahlungen -400 -500 = -900, also `1000 + 600 - 900 = 700.0`.",
      explanation: "Durch `synchronized` ist die Reihenfolge zwar variabel, das Endergebnis aber konsistent.",
      hintQuestion: "Summiere zuerst alle Einzahlungen und alle Auszahlungen getrennt. Ziehe dann vom Startwert ab/auf.",
    },
    {
      prompt: "1f) Ist die Reihenfolge der `println`-Ausgaben deterministisch vorhersagbar? Begruenden Sie.",
      options: [],
      correctOption: "Nein, die konkrete Reihenfolge ist nicht deterministisch, weil der OS-Scheduler Threads unterschiedlich einplant. Aber die Methoden sind `synchronized`, daher keine verschachtelten/interleavten Teilausgaben innerhalb desselben kritischen Bereichs.",
      explanation: "Nicht-deterministische Reihenfolge ist normal bei Nebenlaeufigkeit.",
      hintQuestion: "Wer entscheidet, wann Thread A oder B laeuft? Was garantiert trotzdem `synchronized` bei den Methodenaufrufen?",
    },
    {
      prompt: "1g) Erklaeren Sie mit dem Code den Unterschied zwischen Prozess und Thread bezueglich Speicherteilung.",
      options: [],
      correctOption: "Prozesse haben getrennte Speicherraeume. Threads innerhalb desselben Prozesses teilen den Heap (hier dasselbe `BankAccount`-Objekt), aber jeder Thread hat einen eigenen Stack fuer lokale Variablen.",
      explanation: "Genau diese Heap-Teilung macht Synchronisation notwendig.",
      hintQuestion: "Welche Daten sind fuer beide Threads gemeinsam sichtbar (`account`), und welche sind threadlokal?",
    },
    {
      prompt: "1h) Was ist ein kritischer Bereich? Identifizieren Sie ihn in `deposit()`.",
      options: [],
      correctOption: "Ein kritischer Bereich ist Code mit gemeinsamem mutablem Zustand, der nicht parallel ausgefuehrt werden darf. In `deposit()` ist insbesondere `balance += amount` kritisch (Lesen + Veraendern + Schreiben).",
      explanation: "Kritische Bereiche muessen atomar geschuetzt sein.",
      hintQuestion: "Welche einzelne Zeile aendert gemeinsamen Zustand, den auch der andere Thread aendern kann?",
    },
    {
      prompt: "2a) Was ist praeemptives Multitasking und welche Rolle hat dabei das Betriebssystem?",
      options: [],
      correctOption: "Praeemptives Multitasking bedeutet, dass das Betriebssystem Threads/Prozesse jederzeit unterbrechen und CPU-Zeit neu verteilen kann. Das OS plant Scheduling, verwaltet Ressourcen (CPU, Speicher, I/O) und koordiniert Ausfuehrung.",
      explanation: "Dadurch entsteht scheinbare Gleichzeitigkeit.",
      hintQuestion: "Kann ein Thread die CPU dauerhaft behalten? Wer darf ihn zwangsweise unterbrechen?",
    },
    {
      prompt: "2b) Erklaeren Sie Amdahlsches Gesetz und warum es eine obere Schranke fuer Speedup gibt.",
      options: [],
      correctOption: "Amdahl beschreibt den maximalen Speedup durch Parallelisierung. Mit `T = tS + tP` und idealer Parallelisierung gilt: nur `tP` schrumpft, `tS` bleibt. Darum begrenzt der sequentielle Anteil `tS` den maximalen Gewinn, selbst mit sehr vielen Kernen.",
      explanation: "Unparallelisierbarer Code dominiert irgendwann die Laufzeit.",
      hintQuestion: "Welcher Anteil kann nie parallel werden? Was passiert mit diesem Anteil, wenn du unendlich viele Kerne haettest?",
    },
    {
      prompt: "2c) Nennen Sie die fuenf Ebenen der Parallelisierung von klein nach gross.",
      options: [],
      correctOption: "1) Thread, 2) Prozess, 3) CPU-Kern, 4) CPU/GPU, 5) Cluster.",
      explanation: "Von leichtgewichtiger Software-Einheit bis zum Rechnerverbund.",
      hintQuestion: "Ordne zuerst Software-Einheiten (Thread/Prozess), dann Hardware-Einheiten (Kern/CPU), dann verteilte Systeme.",
    },
    {
      prompt: "2d) Unterschied zwischen synchroner und asynchroner Kommunikation mit je einem Beispiel.",
      options: [],
      correctOption: "Synchron: Aufrufer wartet/blockiert bis Antwort vorliegt (z. B. normaler Methodenaufruf oder blockierender Request). Asynchron: Aufrufer arbeitet weiter und verarbeitet Ergebnis spaeter (z. B. `sendAsync(...).thenAccept(...)` oder Event-Listener).",
      explanation: "Blockieren vs. entkoppelte Weiterverarbeitung.",
      hintQuestion: "Muss der aufrufende Thread sofort warten oder kann er nach dem Senden direkt weiterarbeiten?",
    },
    {
      prompt: "2e) Welche zwei Hauptanwendungsfaelle hat Nebenlaeufigkeit? Erklaeren Sie Effektivitaet vs. Effizienz.",
      options: [],
      correctOption: "Anwendungsfall 1: Parallelisierte Berechnung (mehr Arbeit gleichzeitig). Anwendungsfall 2: Entkopplung wartender Ressourcen (z. B. I/O wartet, UI bleibt reaktiv). Effektivitaet: mit mehr Ressourcen mehr schaffen. Effizienz: mit gleichen Ressourcen bessere Auslastung/mehr Durchsatz.",
      explanation: "Nebenlaeufigkeit ist nicht nur fuer Geschwindigkeit, sondern auch fuer Reaktionsfaehigkeit.",
      hintQuestion: "Denk an CPU-lastige Berechnung versus I/O-Wartezeit (Netzwerk/Datei). Was verbessert jeweils?",
    },
    {
      prompt: "2f) Was ist IPC und warum ist es notwendig?",
      options: [],
      correctOption: "IPC (Inter Process Communication) sind Mechanismen fuer Datenaustausch zwischen Prozessen mit getrenntem Speicher. Notwendig, weil Prozesse nicht direkt aufeinander zugreifen duerfen. Beispiele: Sockets, Pipes, Shared Memory, Message Queues.",
      explanation: "IPC ueberbrueckt die Speichertrennung zwischen Prozessen.",
      hintQuestion: "Warum reicht ein direkter Feldzugriff zwischen zwei Prozessen nicht aus?",
    },
    {
      prompt: "3b) Was ist ein Deadlock? Beschreiben Sie ein Szenario mit zwei Threads und Lock A/B.",
      options: [],
      correctOption: "Deadlock = gegenseitiges, dauerhaftes Warten. Beispiel: Thread 1 haelt Lock A und wartet auf Lock B; Thread 2 haelt Lock B und wartet auf Lock A. Beide kommen nie weiter.",
      explanation: "Zirkulaeres Warten ohne Fortschritt.",
      hintQuestion: "Welche Sperre haelt Thread 1 zuerst, und auf welche wartet er danach? Spiegel das fuer Thread 2.",
    },
    {
      prompt: "3c) Unterschied zwischen `synchronized` und `ReentrantLock`. Wann ist `ReentrantLock` sinnvoller?",
      options: [],
      correctOption: "`synchronized` ist Sprachkonstrukt mit implizitem Locking. `ReentrantLock` ist explizit (`lock()/unlock()`) und bietet zusaetzlich z. B. `tryLock()`, Timeout und mehr Steuerung. `ReentrantLock` ist sinnvoll bei feiner Lock-Kontrolle, Deadlock-Vermeidung mit `tryLock()` oder komplexeren Synchronisationsmustern.",
      explanation: "Flexibilitaet ist der Hauptvorteil von `ReentrantLock`.",
      hintQuestion: "Welche API bietet `tryLock()`? Warum kann das in Konkurrenzsituationen helfen?",
    },
    {
      prompt: "3d) Warum sollte `ReentrantLock` immer mit `try-finally` verwendet werden? Zeigen Sie das Muster.",
      options: [],
      correctOption: "Damit das Lock auch bei Exceptions sicher freigegeben wird. Muster:\n`lock.lock();\ntry {\n  // kritischer Bereich\n} finally {\n  lock.unlock();\n}`",
      explanation: "Ohne `finally` kann ein Lock dauerhaft gehalten werden (Deadlock-Risiko).",
      hintQuestion: "Was passiert mit dem Lock, wenn im kritischen Bereich eine Exception auftritt?",
    },
    {
      prompt: "3e) Nennen Sie zwei Faelle, in denen `parallelStream()` sinnvoll ist, und einen, in dem es keinen Vorteil hat.",
      options: [],
      correctOption: "Sinnvoll: (1) grosse datenparallele Aggregationen (z. B. Summen ueber grosse Collections), (2) unabhaengige Batch-/Bildverarbeitungen. Kein Vorteil: kleine Collections oder Aufgaben mit starken Seiteneffekten/Abhaengigkeiten.",
      explanation: "Parallelisierung hat Koordinations-Overhead und braucht unabhaengige Teilaufgaben.",
      hintQuestion: "Ist die Aufgabe gross genug und pro Element unabhaengig? Oder dominiert Overhead/Abhaengigkeit?",
    },
    {
      prompt: "4b) Erklaeren Sie kurz: `synchronized`, `volatile`, `join()`, `start()`.",
      options: [],
      correctOption: "`synchronized`: exklusiver kritischer Bereich. `volatile`: Sichtbarkeit aktueller Werte. `join()`: auf Thread-Ende warten. `start()`: neuen Thread starten (run in separatem Ausfuehrungskontext).",
      explanation: "Jedes Schlagwort adressiert ein anderes Nebenlaeufigkeitsproblem.",
      hintQuestion: "Ordne jedem Begriff genau eine Kernfunktion zu: Ausschluss, Sichtbarkeit, Start, Warten.",
    },
    {
      prompt: "4c) Was gibt folgender Code aus und ist die Ausgabe deterministisch?\nThread t1=...\"A\"; Thread t2=...\"B\"; Thread t3=...\"C\"; start(); join(); println(\"Done\");",
      options: [],
      correctOption: "A/B/C erscheinen in beliebiger Reihenfolge (6 Permutationen moeglich), danach immer `Done`. `Done` ist deterministisch, weil `join()` auf alle drei Threads wartet.",
      explanation: "Scheduler bestimmt A/B/C-Reihenfolge; `join()` fixiert den letzten Schritt.",
      hintQuestion: "Welche Zeile erzwingt, dass `Done` erst nach allen drei Threads kommt?",
    },
    {
      prompt: "4d) Unterschied zwischen `thread.run()` und `thread.start()`?",
      options: [],
      correctOption: "`start()` erzeugt einen neuen Thread und fuehrt `run()` nebenlaeufig aus. Direkter Aufruf `run()` laeuft nur synchron im aktuellen Thread (kein neuer Thread, keine echte Nebenlaeufigkeit).",
      explanation: "`run()` ist nur eine normale Methode, `start()` startet die Thread-Maschinerie der JVM.",
      hintQuestion: "Wird bei `run()` ein neuer OS/JVM-Thread erzeugt?",
    },
    {
      prompt: "4e) Nennen Sie zwei Nachteile von Nebenlaeufigkeit.",
      options: [],
      correctOption: "Typische Nachteile: Race Conditions, Deadlocks, schwierigeres Debugging, erhoehte Komplexitaet und Synchronisations-Overhead.",
      explanation: "Nebenlaeufigkeit erhoeht die Zahl moeglicher Zustandskombinationen stark.",
      hintQuestion: "Denk an typische Fehlertypen bei gemeinsamem Zustand und Locks.",
    },
    {
      prompt: "4f) Wofuer eignet sich `parallelStream()` gut und welche Amdahl-Einschraenkung gilt?",
      options: [],
      correctOption: "Geeignet fuer grosse, unabhaengige datenparallele Operationen mit wenig Koordination. Einschraenkung nach Amdahl: Der sequentielle Anteil begrenzt den maximalen Speedup.",
      explanation: "Auch mit vielen Kernen bleibt unvermeidbar sequentieller Code limitierend.",
      hintQuestion: "Wie gross ist der nicht-parallelisierbare Teil deiner Aufgabe?",
    },
  ],
  codingExercises: [
    {
      title: "3a - CounterTask mit synchronized",
      prompt: "Schreibe eine Klasse `CounterTask`, die `Runnable` implementiert. Sie soll einen gemeinsamen Zaehler 1000-mal inkrementieren und den kritischen Bereich mit `synchronized(counter)` schuetzen.",
      starterCode: "class SharedCounter {\n    int value = 0;\n}\n\nclass CounterTask implements Runnable {\n    private final SharedCounter counter;\n\n    CounterTask(SharedCounter counter) {\n        this.counter = counter;\n    }\n\n    @Override\n    public void run() {\n        // TODO\n    }\n}",
      referenceSolution: "class SharedCounter {\n    int value = 0;\n}\n\nclass CounterTask implements Runnable {\n    private final SharedCounter counter;\n\n    CounterTask(SharedCounter counter) {\n        this.counter = counter;\n    }\n\n    @Override\n    public void run() {\n        for (int i = 0; i < 1000; i++) {\n            synchronized (counter) {\n                counter.value++;\n            }\n        }\n    }\n}",
      hintQuestion: "Wo liegt der gemeinsam genutzte Zustand? Nur genau diese Zeile muss im `synchronized`-Block liegen.",
    },
    {
      title: "3d - ReentrantLock mit try-finally",
      prompt: "Zeige das korrekte Grundmuster fuer `ReentrantLock` mit sicherem Entsperren auch bei Exception.",
      starterCode: "ReentrantLock lock = new ReentrantLock();\n\nvoid safeIncrement() {\n    // TODO\n}",
      referenceSolution: "ReentrantLock lock = new ReentrantLock();\n\nvoid safeIncrement() {\n    lock.lock();\n    try {\n        // kritischer Bereich\n    } finally {\n        lock.unlock();\n    }\n}",
      hintQuestion: "Welche Anweisung muss garantiert immer laufen, selbst wenn im kritischen Bereich ein Fehler entsteht?",
    },
    {
      title: "4a - transfer() mit ReentrantLock",
      prompt: "Erweitere `BankAccount` um `ReentrantLock` und implementiere `transfer(BankAccount target, double amount)` mit korrektem `try-finally`-Muster.",
      starterCode: "class BankAccount {\n    private double balance;\n    private final java.util.concurrent.locks.ReentrantLock lock = new java.util.concurrent.locks.ReentrantLock();\n\n    public void transfer(BankAccount target, double amount) {\n        // TODO\n    }\n}",
      referenceSolution: "class BankAccount {\n    private double balance;\n    private final java.util.concurrent.locks.ReentrantLock lock = new java.util.concurrent.locks.ReentrantLock();\n\n    public void transfer(BankAccount target, double amount) {\n        this.lock.lock();\n        try {\n            target.lock.lock();\n            try {\n                if (balance >= amount) {\n                    balance -= amount;\n                    target.balance += amount;\n                }\n            } finally {\n                target.lock.unlock();\n            }\n        } finally {\n            this.lock.unlock();\n        }\n    }\n}",
      hintQuestion: "In welcher Reihenfolge sperrst/entsperrst du beide Konten, und wo platzierst du die zwei `finally`-Bloecke?",
    },
  ],
  code: `package de.htwberlin.wi.klausur;

import java.util.concurrent.locks.*;

class BankAccount {
    private volatile double balance;
    private final String owner;

    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
    }

    public synchronized void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println(owner + " deposit: " + amount);
        }
    }

    public synchronized void withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            System.out.println(owner + " withdraw: " + amount);
        }
    }

    public double getBalance() { return balance; }
    public String getOwner() { return owner; }
}

public class Klausur {

    public static void main(String[] args) throws InterruptedException {

        BankAccount account = new BankAccount("Alice", 1000.0);

        // Thread A: drei Einzahlungen
        Thread threadA = new Thread(() -> {
            account.deposit(200.0);
            account.deposit(300.0);
            account.deposit(100.0);
        });

        // Thread B: zwei Auszahlungen
        Thread threadB = new Thread(() -> {
            account.withdraw(400.0);
            account.withdraw(500.0);
        });

        threadA.start();
        threadB.start();

        threadA.join();
        threadB.join();

        System.out.println("Final balance: " + account.getBalance());
    }
}`,
  steps: [
    {
      lineNumber: 36,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "account", type: "BankAccount", value: "-> Konto#1", isReference: true, refId: "konto1", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 1000.0"] },
      ],
      consoleOutput: [],
      explanation: "Das Bankkonto fuer Alice wird erstellt. `balance` startet mit 1000.0 auf dem Heap.",
    },
    {
      lineNumber: 39,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "account", type: "BankAccount", value: "-> Konto#1", isReference: true, refId: "konto1" },
            { name: "threadA", type: "Thread", value: "-> Thread#A", isReference: true, refId: "thrA", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 1000.0"] },
        { id: "thrA", type: "Thread", label: "Thread#A", values: ["state = NEW", "task = deposit 200/300/100"] },
      ],
      consoleOutput: [],
      explanation: "Thread A wird konfiguriert, aber noch nicht gestartet (`state = NEW`).",
    },
    {
      lineNumber: 46,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "account", type: "BankAccount", value: "-> Konto#1", isReference: true, refId: "konto1" },
            { name: "threadA", type: "Thread", value: "-> Thread#A", isReference: true, refId: "thrA" },
            { name: "threadB", type: "Thread", value: "-> Thread#B", isReference: true, refId: "thrB", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 1000.0"] },
        { id: "thrA", type: "Thread", label: "Thread#A", values: ["state = NEW", "task = deposit 200/300/100"] },
        { id: "thrB", type: "Thread", label: "Thread#B", values: ["state = NEW", "task = withdraw 400/500"] },
      ],
      consoleOutput: [],
      explanation: "Thread B wird ebenfalls erzeugt und wartet noch im Zustand NEW.",
    },
    {
      lineNumber: 51,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "threadA", type: "Thread", value: "-> Thread#A", isReference: true, refId: "thrA", changed: true },
            { name: "threadB", type: "Thread", value: "-> Thread#B", isReference: true, refId: "thrB" },
          ],
        },
      ],
      heapObjects: [
        { id: "thrA", type: "Thread", label: "Thread#A", values: ["state = RUNNABLE", "task = deposit 200/300/100"] },
        { id: "thrB", type: "Thread", label: "Thread#B", values: ["state = NEW", "task = withdraw 400/500"] },
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 1000.0"] },
      ],
      consoleOutput: [],
      explanation: "`threadA.start()` startet Thread A. Er kann jetzt parallel ausgefuehrt werden.",
    },
    {
      lineNumber: 52,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "threadA", type: "Thread", value: "-> Thread#A", isReference: true, refId: "thrA" },
            { name: "threadB", type: "Thread", value: "-> Thread#B", isReference: true, refId: "thrB", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "thrA", type: "Thread", label: "Thread#A", values: ["state = RUNNABLE", "task = deposit 200/300/100"] },
        { id: "thrB", type: "Thread", label: "Thread#B", values: ["state = RUNNABLE", "task = withdraw 400/500"] },
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 1000.0"] },
      ],
      consoleOutput: [],
      explanation: "Auch Thread B wird gestartet. Ab jetzt entscheidet der Scheduler die Interleavings.",
    },
    {
      lineNumber: 40,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "account", type: "BankAccount", value: "-> Konto#1", isReference: true, refId: "konto1" }],
        },
        {
          methodName: "deposit (Thread-A)",
          variables: [
            { name: "amount", type: "double", value: "200.0" },
            { name: "balance", type: "double", value: "1200.0", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 1200.0"] },
      ],
      consoleOutput: ["Alice deposit: 200.0"],
      explanation: "Thread A fuehrt die erste Einzahlung aus. `synchronized` sperrt die Methode waehrend des Zugriffs.",
    },
    {
      lineNumber: 47,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "account", type: "BankAccount", value: "-> Konto#1", isReference: true, refId: "konto1" }],
        },
        {
          methodName: "withdraw (Thread-B)",
          variables: [
            { name: "amount", type: "double", value: "400.0" },
            { name: "balance", type: "double", value: "800.0", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 800.0"] },
      ],
      consoleOutput: ["Alice deposit: 200.0", "Alice withdraw: 400.0"],
      explanation: "Thread B zieht 400 ab. Der Check `balance >= amount` ist erfuellt.",
    },
    {
      lineNumber: 41,
      stackFrames: [
        {
          methodName: "deposit (Thread-A)",
          variables: [
            { name: "amount", type: "double", value: "300.0" },
            { name: "balance", type: "double", value: "1100.0", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 1100.0"] },
      ],
      consoleOutput: ["Alice deposit: 200.0", "Alice withdraw: 400.0", "Alice deposit: 300.0"],
      explanation: "Zweite Einzahlung von Thread A: neuer Kontostand 1100.0.",
    },
    {
      lineNumber: 48,
      stackFrames: [
        {
          methodName: "withdraw (Thread-B)",
          variables: [
            { name: "amount", type: "double", value: "500.0" },
            { name: "balance", type: "double", value: "600.0", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 600.0"] },
      ],
      consoleOutput: ["Alice deposit: 200.0", "Alice withdraw: 400.0", "Alice deposit: 300.0", "Alice withdraw: 500.0"],
      explanation: "Zweite Auszahlung von Thread B. Danach verbleiben 600.0 auf dem Konto.",
    },
    {
      lineNumber: 42,
      stackFrames: [
        {
          methodName: "deposit (Thread-A)",
          variables: [
            { name: "amount", type: "double", value: "100.0" },
            { name: "balance", type: "double", value: "700.0", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 700.0"] },
        { id: "thrA", type: "Thread", label: "Thread#A", values: ["state = TERMINATED"] },
        { id: "thrB", type: "Thread", label: "Thread#B", values: ["state = TERMINATED"] },
      ],
      consoleOutput: [
        "Alice deposit: 200.0",
        "Alice withdraw: 400.0",
        "Alice deposit: 300.0",
        "Alice withdraw: 500.0",
        "Alice deposit: 100.0",
      ],
      explanation: "Dritte Einzahlung. In dieser Trace-Variante sind danach beide Worker-Threads fertig.",
    },
    {
      lineNumber: 54,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "threadA", type: "Thread", value: "-> Thread#A", isReference: true, refId: "thrA" },
          ],
        },
      ],
      heapObjects: [
        { id: "thrA", type: "Thread", label: "Thread#A", values: ["state = TERMINATED"] },
        { id: "thrB", type: "Thread", label: "Thread#B", values: ["state = TERMINATED"] },
      ],
      consoleOutput: [
        "Alice deposit: 200.0",
        "Alice withdraw: 400.0",
        "Alice deposit: 300.0",
        "Alice withdraw: 500.0",
        "Alice deposit: 100.0",
      ],
      explanation: "`threadA.join()` blockiert main, bis Thread A beendet ist (hier bereits fertig).",
    },
    {
      lineNumber: 55,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "threadB", type: "Thread", value: "-> Thread#B", isReference: true, refId: "thrB" },
          ],
        },
      ],
      heapObjects: [
        { id: "thrA", type: "Thread", label: "Thread#A", values: ["state = TERMINATED"] },
        { id: "thrB", type: "Thread", label: "Thread#B", values: ["state = TERMINATED"] },
      ],
      consoleOutput: [
        "Alice deposit: 200.0",
        "Alice withdraw: 400.0",
        "Alice deposit: 300.0",
        "Alice withdraw: 500.0",
        "Alice deposit: 100.0",
      ],
      explanation: "`threadB.join()` stellt sicher, dass auch Thread B sicher beendet ist.",
    },
    {
      lineNumber: 57,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "account", type: "BankAccount", value: "-> Konto#1", isReference: true, refId: "konto1" },
          ],
        },
      ],
      heapObjects: [
        { id: "konto1", type: "BankAccount", label: "Konto#1", values: ['owner = "Alice"', "balance = 700.0"] },
      ],
      consoleOutput: [
        "Alice deposit: 200.0",
        "Alice withdraw: 400.0",
        "Alice deposit: 300.0",
        "Alice withdraw: 500.0",
        "Alice deposit: 100.0",
        "Final balance: 700.0",
      ],
      explanation: "Main gibt den finalen Kontostand aus. Diese Trace zeigt eine moegliche Interleaving-Reihenfolge.",
    },
  ],
};

const vl03PrintableItemInventoryExample: JavaExample = {
  id: "vl03-printable-item-inventory",
  title: "Interface, abstrakte Klasse, Instanzen",
  description: "Printable, Item, Book und static Zaehler im Ablauf",
  semester: "semester2",
  lecture: "VL 03 - Instanzen, Klassen, Pakete",
  customQuestions: [
    {
      prompt: "1a) Was ist ein Namensraum in Java und welchem Konzept entspricht er? Beschreiben Sie, wie Klassenbezeichner in Java eindeutig gemacht werden.",
      options: [],
      correctOption: "Namensraeume in Java sind Packages (Schluesselwort `package` am Dateianfang). Ein Namensraum definiert einen Bereich, in dem Klassenbezeichner eindeutig sein muessen. Klassen aus verschiedenen Packages koennen denselben Namen tragen, ohne sich zu ueberlagern; der Zugriff erfolgt ueber den vollqualifizierten Namen, z. B. `java.util.List`.",
      explanation: "Musterloesung: Package = Namensraum, Eindeutigkeit ueber vollqualifizierte Klassennamen.",
      hintQuestion: "Denken Sie daran, wie Java Quellcode-Dateien organisiert und welches Schlüsselwort ganz oben in einer Datei erscheint. Was würde passieren, wenn zwei Klassen denselben Namen hätten?",
    },
    {
      prompt: "1b) Der Code in Zeile 1 lautet `package de.htwberlin.wi.uebung;`. Welche Ordnerstruktur wird daraus abgeleitet?",
      options: [],
      correctOption: "Jeder Punkt im Package-Bezeichner entspricht einem Unterordner: `de/htwberlin/wi/uebung/`. Die `.java`-Datei muss sich in dieser Struktur befinden.",
      explanation: "Musterloesung: Punkte im Package werden in Verzeichnisse uebersetzt.",
      hintQuestion: "Erinnern Sie sich daran, wie Punkte im Package-Bezeichner in eine Verzeichnisstruktur übersetzt werden.",
    },
    {
      prompt: "1c) In Zeile 3–4 stehen import-Anweisungen. Erklären Sie, warum Imports benötigt werden und was passiert, wenn Sie sie weglassen.",
      options: [],
      correctOption: "Imports erlauben die Kurzschreibweise fuer Klassen aus anderen Packages. Ohne Import muessen Typen vollqualifiziert geschrieben werden (z. B. `java.util.ArrayList` statt `ArrayList`); sonst kennt der Compiler den einfachen Namen nicht (`cannot find symbol`).",
      explanation: "Musterloesung: Imports betreffen die Namensaufloesung im Code, nicht die Laufzeitlogik.",
      hintQuestion: "Stellen Sie sich vor, Sie möchten eine Klasse aus einem anderen Package verwenden, ohne den vollständigen Package-Pfad jedes Mal ausschreiben zu müssen.",
    },
    {
      prompt: "1d) Eine Klasse `List` soll im Package `de.htwberlin.wi.uebung` definiert werden. Gleichzeitig wird `java.util.List` importiert. Welches Problem entsteht und wie lässt es sich beheben?",
      options: [],
      correctOption: "Es entsteht ein Namenskonflikt: Der Compiler kann `List` nicht eindeutig aufloesen (eigene Klasse vs. `java.util.List`). Loesung 1: Import entfernen und `java.util.List` vollqualifiziert schreiben. Loesung 2: Eigene Klasse umbenennen.",
      explanation: "Musterloesung: Mehrdeutige Typnamen immer durch Umbenennung oder vollqualifizierte Schreibweise aufloesen.",
      hintQuestion: "Überlegen Sie, was passiert, wenn zwei Klassen mit demselben einfachen Namen im gleichen Kontext sichtbar sind. Wie lässt sich trotzdem auf beide zugreifen?",
    },
    {
      prompt: "1e) Erklären Sie den Unterschied zwischen dem Default-Package und einem benannten Package. Wann sollte das Default-Package nicht verwendet werden?",
      options: [],
      correctOption: "Ohne `package`-Statement landet eine Klasse im Default-Package. Benannte Packages strukturieren Code klar. Das Default-Package sollte in echten Projekten nicht verwendet werden, weil Klassen daraus von anderen Packages nicht importiert werden koennen.",
      explanation: "Musterloesung: Default-Package ist fuer groessere/strukturierte Projekte ungeeignet.",
      hintQuestion: "Was passiert, wenn Sie in einer Datei gar kein package-Statement angeben? Denken Sie auch an größere Projekte und den Zugriff auf Klassen aus anderen Packages.",
    },
    {
      prompt: "1f) Erklären Sie den Begriff Scope (Gültigkeitsbereich) anhand des Code-Beispiels. Identifizieren Sie mindestens drei verschiedene Scopes und geben Sie Zeilennummern an.",
      options: [],
      correctOption: "Drei Scopes im Beispiel: (1) Package-Scope in Zeile 1 (`de.htwberlin.wi.uebung`), (2) Klassen-Scope fuer Attribute wie `name` (Z. 14), `itemCount` (Z. 15), `price` (Z. 29), (3) Methoden-Scope fuer `args` (Z. 47), `inventory` (Z. 48), `p` (Z. 58).",
      explanation: "Musterloesung: Scope definiert Sichtbarkeit und Lebensdauer von Namen/Variablen.",
      hintQuestion: "Schauen Sie sich die Schachtelung von Paketen, Klassen und Methoden an. Welche Variablen leben wie lange und wo sind sie sichtbar?",
    },
    {
      prompt: "1g) Könnte eine dritte Klasse aus `de.htwberlin.wi.andere` direkt auf `Item.itemCount` (Zeile 15) zugreifen? Begründen Sie Ihre Antwort.",
      options: [],
      correctOption: "Nein. `itemCount` ist im gegebenen Code `private` deklariert und damit nur innerhalb von `Item` direkt zugreifbar. Eine Klasse aus `de.htwberlin.wi.andere` kann nur indirekt ueber die `public`-Methode `Item.getItemCount()` zugreifen.",
      explanation: "Musterloesung (codebasiert): `private` blockiert direkten Zugriff package-uebergreifend vollstaendig.",
      hintQuestion: "Sehen Sie sich die Sichtbarkeit von itemCount an. Welche Sichtbarkeit hat dieses Attribut? Überlegen Sie dann, welche Zugriffe von einem anderen Package erlaubt sind.",
    },
    {
      prompt: "2a) Nennen Sie alle vier Sichtbarkeits-Schlüsselwörter in Java und beschreiben Sie kurz, welcher Zugriff jeweils erlaubt ist.",
      options: [],
      correctOption: "`private`: Zugriff nur in der eigenen Klasse. `default` (kein Schluesselwort): Zugriff im selben Package. `protected`: Zugriff im selben Package und in Unterklassen (auch in anderem Package). `public`: Zugriff von ueberall.",
      explanation: "Musterloesung: Diese vier Sichtbarkeitsstufen decken den gesamten Java-Standardzugriff ab.",
      hintQuestion: "Denken Sie an die Tabelle mit Same Package / Different Package und Class / Subclass / Non-subclass. Ordnen Sie von \"strengsten\" bis \"weitesten\" Zugriff.",
    },
    {
      prompt: "2b) `getName()` (Zeile 22) ist public, das Attribut `name` (Zeile 14) ist private. Welches OOP-Prinzip wird damit umgesetzt?",
      options: [],
      correctOption: "Das ist Datenkapselung (Encapsulation): interne Felder sind verborgen (`private`), Zugriff erfolgt kontrolliert ueber Methoden (Getter/Setter). So bleibt der Objektzustand geschuetzt und intern aenderbar ohne API-Bruch.",
      explanation: "Musterloesung: `private` + `public` Getter ist der klassische Encapsulation-Fall.",
      hintQuestion: "Was passieren würde, wenn name direkt von außen beschreibbar wäre? Welches bekannte OOP-Konzept verhindert unkontrollierten Zugriff?",
    },
    {
      prompt: "2c) Zeile 25 verwendet `protected abstract` für `getValue()`. Was bewirkt `protected` im Vergleich zu `private`?",
      options: [],
      correctOption: "`private` wuerde Unterklassen den Zugriff verwehren, `Book` koennte `getValue()` nicht sinnvoll ueberschreiben. `protected` erlaubt Zugriff/Override in Unterklassen und im selben Package. Da `getValue()` abstrakt ist, muss `Book` sie implementieren.",
      explanation: "Musterloesung: `protected abstract` definiert bewusst einen Vererbungspunkt fuer Unterklassen.",
      hintQuestion: "Wer soll getValue() aufrufen oder überschreiben dürfen? Vergleichen Sie den Zugriff von private vs. protected aus der Unterklasse Book.",
    },
    {
      prompt: "2d) Zeile 58 weist ein `Book`-Objekt einer Variable vom Typ `Printable` zu. Kann über `p` die Methode `getName()` aufgerufen werden?",
      options: [],
      correctOption: "Nein. Der statische Typ von `p` ist `Printable`, und dieses Interface kennt `getName()` nicht. `p.getName()` fuehrt zu einem Compile-Fehler. Moeglich waere ein Cast, z. B. `((Book) p).getName()` (mit ClassCastException-Risiko, falls kein `Book`).",
      explanation: "Musterloesung: Der deklarierte Referenztyp bestimmt, welche Methoden direkt aufrufbar sind.",
      hintQuestion: "Welche Methoden stellt das Interface Printable bereit? Was weiß der Compiler über den Typ von p? Welche Operation würde helfen, wenn man trotzdem darauf zugreifen möchte?",
    },
    {
      prompt: "2e) Unterschied zwischen `public` und default (package-private) Sichtbarkeit für Klassen. Wann setzt man eine Klasse bewusst auf default?",
      options: [],
      correctOption: "`public`: Klasse ist von ueberall sichtbar. `default`/package-private: Klasse ist nur im eigenen Package sichtbar. Default ist sinnvoll fuer interne Hilfsklassen, die nicht Teil der oeffentlichen API sein sollen.",
      explanation: "Musterloesung: Bewusste API-Begrenzung reduziert Kopplung und haelt Interna intern.",
      hintQuestion: "Wer darf auf eine public-Klasse zugreifen? Wann möchte man eine Klasse verstecken — etwa Hilfsklassen im gleichen Package?",
    },
    {
      prompt: "2f) Zeile 8 zeigt eine Default-Methode im Interface. Was ist eine Default-Methode und was passiert, wenn `Book` sie nicht überschreibt?",
      options: [],
      correctOption: "Eine Default-Methode ist eine Interface-Methode mit Implementierung (`default`, seit Java 8). Wenn `Book` `getLabel()` nicht ueberschreibt, wird die Default-Implementierung aus `Printable` verwendet.",
      explanation: "Musterloesung: In diesem Code liefert die Default-Methode den Wert `Item`.",
      hintQuestion: "Interfaces haben normalerweise keine Implementierung — seit Java 8 gibt es eine Ausnahme. Welchen Wert gibt p.getLabel() in Zeile 60 zurück?",
    },
    {
      prompt: "2g) Was gibt `System.out.println(p.getLabel())` in Zeile 60 aus?",
      options: [],
      correctOption: "Ausgabe: `Item`.",
      explanation: "Musterloesung: `Book` ueberschreibt `getLabel()` nicht, daher greift die Default-Methode aus `Printable`.",
      hintQuestion: "Prüfen Sie, ob Book die Methode getLabel() überschreibt. Falls nicht: Was ist der Default-Rückgabewert aus dem Interface?",
    },
    {
      prompt: "3a) Was passiert im Speicher, wenn in Zeile 49 `new Book(\"Clean Code\", 39.99)` ausgeführt wird?",
      options: [],
      correctOption: "Im Heap wird ein neues `Book`-Objekt reserviert (mit geerbtem `name` und eigenem `price`). Der `Book`-Konstruktor ruft zuerst `super(title)`, dadurch setzt `Item` den Namen und erhoeht `itemCount`; danach wird `price` gesetzt. Die lokale Referenzverwaltung erfolgt im Stack der `main()`-Methode (`inventory` ist lokale Variable, das Listenobjekt selbst liegt im Heap).",
      explanation: "Musterloesung: Objektzustand im Heap, Referenzen/lokale Variablen im Stack, Konstruktorreihenfolge ueber `super()`.",
      hintQuestion: "Denken Sie an Heap vs. Stack. Was hält die Variable inventory? Welcher Konstruktor wird aufgerufen und in welcher Reihenfolge?",
    },
    {
      prompt: "3b) `itemCount` (Zeile 15) ist static. Erklären Sie den Unterschied zwischen statischem Attribut und Instanzattribut.",
      options: [],
      correctOption: "Instanzattribute (`name`, `price`) existieren pro Objekt mit eigener Kopie. Das statische Attribut `itemCount` existiert genau einmal auf Klassenebene (`Item`) und wird von allen Instanzen geteilt.",
      explanation: "Musterloesung: Drei Book-Objekte haben drei unterschiedliche Instanzwerte, aber nur einen gemeinsamen Klassenzaehler.",
      hintQuestion: "Wie viele Kopien von itemCount existieren zur Laufzeit, verglichen mit name oder price? Zeichnen Sie gedanklich Klasse und Objekte im Speicher.",
    },
    {
      prompt: "3c) Welchen Wert gibt `Item.getItemCount()` in Zeile 53 aus? Begründen Sie Schritt für Schritt.",
      options: [],
      correctOption: "Ausgabe in Zeile 53: `Items: 3`. Begruendung: In Zeile 49, 50 und 51 wird je ein `new Book(...)` ausgefuehrt. Jeder Aufruf geht ueber `super(title)` in den `Item`-Konstruktor und erhoeht `itemCount` um 1.",
      explanation: "Musterloesung: Drei Konstruktoraufrufe bis Zeile 53 => Zaehlerstand 3.",
      hintQuestion: "Verfolgen Sie, wie oft der Konstruktor von Item aufgerufen wird. Denken Sie daran, dass Book mit super() arbeitet.",
    },
    {
      prompt: "3d) `Item` ist abstract. Was bedeutet das und warum kann man `Item` nicht direkt mit `new` instanziieren?",
      options: [],
      correctOption: "Eine abstrakte Klasse kann abstrakte Methoden ohne Implementierung enthalten. `Item` deklariert `getValue()` nur abstrakt. Deshalb ist `new Item(...)` ein Compile-Fehler; erst konkrete Unterklassen wie `Book` duerfen instanziiert werden, nachdem sie alle abstrakten Methoden implementieren.",
      explanation: "Musterloesung: `abstract` verhindert direkte Instanziierung unvollstaendiger Basisklassen.",
      hintQuestion: "Was fehlt in einer abstrakten Klasse? Welche Methode ist nur deklariert? Was muss eine Unterklasse deshalb tun?",
    },
    {
      prompt: "3e) Der Konstruktor von `Book` ruft `super(title)` auf (Zeile 32). Was wird damit erreicht und was passiert, wenn dieser Aufruf fehlt?",
      options: [],
      correctOption: "`super(title)` ruft den Elternkonstruktor `Item(String)` auf, setzt dadurch `name` und erhoeht `itemCount`. Fehlt der explizite Aufruf, fuegt Java implizit `super()` ein. Da `Item` keinen parameterlosen Konstruktor hat, entstuende ein Compile-Fehler.",
      explanation: "Musterloesung: Unterklassenkonstruktor muss den Basisklassenzustand korrekt initialisieren.",
      hintQuestion: "Was macht super() im Konstruktor? In welchem Konstruktor landet der Aufruf? Was passiert mit dem Attribut name von Item, wenn der super()-Aufruf fehlt?",
    },
    {
      prompt: "3f) Welchen Wert gibt `Item.getItemCount()` in Zeile 61 aus? Was wurde zwischen Zeile 53 und 61 am Zähler verändert?",
      options: [],
      correctOption: "Ausgabe in Zeile 61: `4`. Zwischen Zeile 53 und 61 wird in Zeile 58 noch ein weiteres `Book` erzeugt (`new Book(\"Design Patterns\", 54.99)`), daher steigt `itemCount` von 3 auf 4. Zeile 57 erzeugt kein Objekt und aendert nichts.",
      explanation: "Musterloesung: Nur neue Instanzen (Konstruktoraufrufe) veraendern den statischen Zaehler.",
      hintQuestion: "Schauen Sie, ob zwischen Zeile 53 und 61 weitere new Book()-Aufrufe stattfinden. Zeile 57 ruft nur eine Methode auf, erzeugt aber kein neues Objekt.",
    },
    {
      prompt: "3g) Zeichnen Sie ein einfaches Objektdiagramm für den Zustand der drei `Book`-Objekte aus Zeilen 49–51. Stellen Sie auch `itemCount` dar.",
      options: [],
      correctOption: "Musterbeispiel (textuell): `Item.itemCount = 3` auf Klassenebene. Drei Objekte: `b1: Book{name=\"Clean Code\", price=39.99}`, `b2: Book{name=\"Effective Java\", price=49.99}`, `b3: Book{name=\"Refactoring\", price=44.99}`. `inventory` referenziert `[b1, b2, b3]`.",
      explanation: "Musterloesung: Klassenvariable einmal bei `Item`, Instanzattribute separat pro Book-Objekt.",
      hintQuestion: "Objekte erhalten Namen wie b1: Book. Zeigen Sie Attribute und Werte. Klassenvariablen gehören zur Klasse, nicht zum Objekt.",
    },
    {
      prompt: "4a) Erläutern Sie den Unterschied zwischen Assoziation, Aggregation und Komposition. Geben Sie je ein Alltagsbeispiel.",
      options: [],
      correctOption: "Assoziation: lose Beziehung (z. B. Kunde nutzt App). Aggregation: Teil-Ganzes mit unabhängigem Lebenszyklus (z. B. Team und Spieler). Komposition: starkes Teil-Ganzes mit gemeinsamem Lebenszyklus (z. B. Haus und Räume).",
      explanation: "Leitfrage: Kann das Teil ohne das Ganze sinnvoll weiterexistieren?",
      hintQuestion: "\"Kann das Teil ohne das Ganze existieren?\" — Eine Aggregation ist wie ein Warenkorb mit Produkten, eine Komposition wie ein Haus mit Räumen.",
    },
    {
      prompt: "4b) Zwischen welchen Klassen im Code besteht eine Kompositionsbeziehung? Begründen Sie anhand des Codes.",
      options: [],
      correctOption: "Zwischen `Book` und `Item` besteht Vererbung, nicht Komposition. Zwischen `Uebung` und `Book` besteht hier primär eine Aggregation über `List<Item>`: Objekte werden zwar in `main` erzeugt und gehalten, könnten aber prinzipiell unabhängig existieren.",
      explanation: "Im Code gibt es keine echte, dauerhaft eingebettete Komposition wie bei exklusivem Besitz mit gemeinsamem Lebenszyklus.",
      hintQuestion: "Wer erstellt wen und \"besitzt\" das Objekt? Kann das innere Objekt unabhängig existieren?",
    },
    {
      prompt: "4c) Zeichnen Sie ein UML-Klassendiagramm für alle Klassen und Interfaces aus dem Code (inkl. Vererbung, Interface-Implementierung, Assoziationen).",
      options: [],
      correctOption: "Textuell: `Printable <|.. Item` (Interface-Implementierung), `Item <|-- Book` (Vererbung), `Uebung --> List<Item>` (Nutzung/Assoziation in main), `Item` besitzt `name`, `itemCount`, `getName()`, `getItemCount()`, `getValue()`, `Book` besitzt `price`, `print()`, `getValue()`.",
      explanation: "Für Interface-Implementierung gestrichelter Pfeil, für Vererbung durchgezogener Generalisierungspfeil.",
      hintQuestion: "Interface-Implementierung: gestrichelter Pfeil. Vererbung: durchgezogener Pfeil. Denken Sie an Uebung und ihre Beziehung zu Item über die Liste.",
    },
    {
      prompt: "4d) Erklären Sie, was eine Kardinalität von `1..*` bedeutet. Welche Kardinalität beschreibt die Beziehung zwischen `Uebung` und `Book`?",
      options: [],
      correctOption: "`1..*` bedeutet: mindestens eins, beliebig viele. Für `inventory` in `main` ist die intendierte Beziehung `Uebung` zu `Book` in diesem Ablauf mindestens mehrere (`1..*`), da mehrere Bücher enthalten sein können.",
      explanation: "Kardinalität beschreibt mögliche Anzahlbeziehungen zwischen Objekten.",
      hintQuestion: "Was bedeutet 1..* in Worten? Wie viele Book-Objekte kann inventory enthalten?",
    },
    {
      prompt: "4e) Unterschied zwischen unidirektionaler und bidirektionaler Assoziation. In welche Richtung zeigt die Assoziation zwischen `Uebung` und `Item`?",
      options: [],
      correctOption: "Unidirektional: nur eine Seite kennt die andere. Bidirektional: beide Seiten halten Referenzen. Im Code ist die Beziehung unidirektional von `Uebung`/`main` zu `Item` über `inventory`; `Item` kennt `Uebung` nicht.",
      explanation: "Es gibt keine Rückreferenz von `Item` auf `Uebung`.",
      hintQuestion: "Besitzt Uebung eine Referenz auf Item? Besitzt Item eine Referenz zurück auf Uebung?",
    },
  ],
  codingExercises: [
    {
      title: "5a - Klasse Magazine implementieren",
      prompt: "Implementieren Sie eine Klasse `Magazine` im gleichen Package, die von `Item` erbt und zusätzlich `issueNumber` (`int`) besitzt. Implementieren Sie alle notwendigen Methoden.",
      starterCode: "class Magazine extends Item {\n    private int issueNumber;\n\n    public Magazine(String name, int issueNumber) {\n        // TODO\n    }\n\n    @Override\n    protected double getValue() {\n        // TODO\n    }\n\n    @Override\n    public void print() {\n        // TODO\n    }\n}",
      referenceSolution: "class Magazine extends Item {\n    private int issueNumber;\n\n    public Magazine(String name, int issueNumber) {\n        super(name);\n        this.issueNumber = issueNumber;\n    }\n\n    @Override\n    protected double getValue() {\n        return issueNumber;\n    }\n\n    @Override\n    public void print() {\n        System.out.println(getLabel() + \": \" + getName() + \" (Issue \" + issueNumber + \")\");\n    }\n}",
      hintQuestion: "Welche Methoden müssen Sie implementieren? (Stichwort: abstract). Denken Sie an super() im Konstruktor und @Override.",
    },
    {
      title: "5b - getTotalValue(List<Item> items)",
      prompt: "Schreiben Sie eine statische Methode `getTotalValue(List<Item> items)`, die die Summe aller Werte via `getValue()` berechnet und zurückgibt.",
      starterCode: "public static double getTotalValue(List<Item> items) {\n    // TODO\n}",
      referenceSolution: "public static double getTotalValue(List<Item> items) {\n    double sum = 0.0;\n    for (Item item : items) {\n        sum += item.getValue();\n    }\n    return sum;\n}",
      hintQuestion: "Welchen Rückgabetyp hat die Methode? Verwenden Sie eine Schleife. Welchen Typ gibt getValue() zurüch.",
    },
  ],
  code: `package de.htwberlin.wi.uebung;

import java.util.ArrayList;
import java.util.List;

interface Printable {
    void print();
    default String getLabel() {
        return "Item";
    }
}

abstract class Item implements Printable {
    private String name;
    private static int itemCount = 0;

    public Item(String name) {
        this.name = name;
        itemCount++;
    }

    public String getName() { return name; }
    public static int getItemCount() { return itemCount; }

    protected abstract double getValue();
}

class Book extends Item {
    private double price;

    public Book(String title, double price) {
        super(title);
        this.price = price;
    }

    @Override
    public double getValue() { return price; }

    @Override
    public void print() {
        System.out.println(getLabel() + ": " + getName()
            + " (" + price + " EUR)");
    }
}

public class Uebung {
    public static void main(String[] args) {
        List<Item> inventory = new ArrayList<>();
        inventory.add(new Book("Clean Code", 39.99));
        inventory.add(new Book("Effective Java", 49.99));
        inventory.add(new Book("Refactoring", 44.99));

        System.out.println("Items: " + Item.getItemCount());
        for (Item item : inventory) {
            item.print();
        }
        Item.getItemCount();
        Printable p = new Book("Design Patterns", 54.99);
        p.print();
        System.out.println(p.getLabel());
        System.out.println(Item.getItemCount());
    }
}`,
  steps: [
    {
      lineNumber: 48,
      stackFrames: [
        { methodName: "Klasse Item", variables: [{ name: "itemCount", type: "int", value: "0", changed: true }] },
        {
          methodName: "main",
          variables: [{ name: "inventory", type: "List<Item>", value: "-> Inventory#1", isReference: true, refId: "inv1", changed: true }],
        },
      ],
      heapObjects: [
        { id: "inv1", type: "ArrayList<Item>", label: "Inventory#1", values: [] },
      ],
      consoleOutput: [],
      explanation: "`inventory` wird als leere `ArrayList` erstellt. Klassenzaehler `itemCount` steht anfangs auf 0.",
    },
    {
      lineNumber: 49,
      stackFrames: [
        { methodName: "Klasse Item", variables: [{ name: "itemCount", type: "int", value: "1", changed: true }] },
        {
          methodName: "main",
          variables: [{ name: "inventory", type: "List<Item>", value: "-> Inventory#1", isReference: true, refId: "inv1" }],
        },
      ],
      heapObjects: [
        { id: "book1", type: "Book", label: "Book#1", values: ['name = "Clean Code"', "price = 39.99"] },
        { id: "inv1", type: "ArrayList<Item>", label: "Inventory#1", values: ["-> Book#1"], highlightIndex: 0 },
      ],
      consoleOutput: [],
      explanation: "Erstes `Book` wird erzeugt und eingefuegt. Durch `super(title)` steigt `Item.itemCount` auf 1.",
    },
    {
      lineNumber: 50,
      stackFrames: [
        { methodName: "Klasse Item", variables: [{ name: "itemCount", type: "int", value: "2", changed: true }] },
        {
          methodName: "main",
          variables: [{ name: "inventory", type: "List<Item>", value: "-> Inventory#1", isReference: true, refId: "inv1" }],
        },
      ],
      heapObjects: [
        { id: "book1", type: "Book", label: "Book#1", values: ['name = "Clean Code"', "price = 39.99"] },
        { id: "book2", type: "Book", label: "Book#2", values: ['name = "Effective Java"', "price = 49.99"] },
        { id: "inv1", type: "ArrayList<Item>", label: "Inventory#1", values: ["-> Book#1", "-> Book#2"], highlightIndex: 1 },
      ],
      consoleOutput: [],
      explanation: "Zweites `Book` wird hinzugefuegt. `itemCount` wird 2.",
    },
    {
      lineNumber: 51,
      stackFrames: [
        { methodName: "Klasse Item", variables: [{ name: "itemCount", type: "int", value: "3", changed: true }] },
        {
          methodName: "main",
          variables: [{ name: "inventory", type: "List<Item>", value: "-> Inventory#1", isReference: true, refId: "inv1" }],
        },
      ],
      heapObjects: [
        { id: "book1", type: "Book", label: "Book#1", values: ['name = "Clean Code"', "price = 39.99"] },
        { id: "book2", type: "Book", label: "Book#2", values: ['name = "Effective Java"', "price = 49.99"] },
        { id: "book3", type: "Book", label: "Book#3", values: ['name = "Refactoring"', "price = 44.99"] },
        { id: "inv1", type: "ArrayList<Item>", label: "Inventory#1", values: ["-> Book#1", "-> Book#2", "-> Book#3"], highlightIndex: 2 },
      ],
      consoleOutput: [],
      explanation: "Drittes `Book` wird hinzugefuegt. `itemCount` steht jetzt auf 3.",
    },
    {
      lineNumber: 53,
      stackFrames: [
        { methodName: "Klasse Item", variables: [{ name: "itemCount", type: "int", value: "3" }] },
        {
          methodName: "main",
          variables: [{ name: "inventory", type: "List<Item>", value: "-> Inventory#1", isReference: true, refId: "inv1" }],
        },
      ],
      heapObjects: [
        { id: "inv1", type: "ArrayList<Item>", label: "Inventory#1", values: ["-> Book#1", "-> Book#2", "-> Book#3"] },
      ],
      consoleOutput: ["Items: 3"],
      explanation: "Ausgabe des statischen Zaehlerwerts ueber `Item.getItemCount()`.",
    },
    {
      lineNumber: 55,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "inventory", type: "List<Item>", value: "-> Inventory#1", isReference: true, refId: "inv1" },
            { name: "item", type: "Item", value: "-> Book#1", isReference: true, refId: "book1", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "book1", type: "Book", label: "Book#1", values: ['name = "Clean Code"', "price = 39.99"] },
      ],
      consoleOutput: ["Items: 3", "Item: Clean Code (39.99 EUR)"],
      explanation: "Erster Schleifendurchlauf: dynamischer Dispatch ruft `Book.print()` auf.",
    },
    {
      lineNumber: 55,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "inventory", type: "List<Item>", value: "-> Inventory#1", isReference: true, refId: "inv1" },
            { name: "item", type: "Item", value: "-> Book#2", isReference: true, refId: "book2", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "book2", type: "Book", label: "Book#2", values: ['name = "Effective Java"', "price = 49.99"] },
      ],
      consoleOutput: ["Items: 3", "Item: Clean Code (39.99 EUR)", "Item: Effective Java (49.99 EUR)"],
      explanation: "Zweiter Schleifendurchlauf: Ausgabe fuer `Book#2`.",
    },
    {
      lineNumber: 55,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "inventory", type: "List<Item>", value: "-> Inventory#1", isReference: true, refId: "inv1" },
            { name: "item", type: "Item", value: "-> Book#3", isReference: true, refId: "book3", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "book3", type: "Book", label: "Book#3", values: ['name = "Refactoring"', "price = 44.99"] },
      ],
      consoleOutput: [
        "Items: 3",
        "Item: Clean Code (39.99 EUR)",
        "Item: Effective Java (49.99 EUR)",
        "Item: Refactoring (44.99 EUR)",
      ],
      explanation: "Dritter Schleifendurchlauf: Ausgabe fuer `Book#3`.",
    },
    {
      lineNumber: 58,
      stackFrames: [
        { methodName: "Klasse Item", variables: [{ name: "itemCount", type: "int", value: "4", changed: true }] },
        {
          methodName: "main",
          variables: [{ name: "p", type: "Printable", value: "-> Book#4", isReference: true, refId: "book4", changed: true }],
        },
      ],
      heapObjects: [
        { id: "book4", type: "Book", label: "Book#4", values: ['name = "Design Patterns"', "price = 54.99"] },
      ],
      consoleOutput: [
        "Items: 3",
        "Item: Clean Code (39.99 EUR)",
        "Item: Effective Java (49.99 EUR)",
        "Item: Refactoring (44.99 EUR)",
      ],
      explanation: "`p` ist als Interface-Typ `Printable` deklariert, zeigt aber auf ein `Book`-Objekt. `itemCount` steigt auf 4.",
    },
    {
      lineNumber: 59,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "p", type: "Printable", value: "-> Book#4", isReference: true, refId: "book4" }],
        },
      ],
      heapObjects: [
        { id: "book4", type: "Book", label: "Book#4", values: ['name = "Design Patterns"', "price = 54.99"] },
      ],
      consoleOutput: [
        "Items: 3",
        "Item: Clean Code (39.99 EUR)",
        "Item: Effective Java (49.99 EUR)",
        "Item: Refactoring (44.99 EUR)",
        "Item: Design Patterns (54.99 EUR)",
      ],
      explanation: "Auch ueber die Interface-Referenz wird `Book.print()` ausgefuehrt (Polymorphie).",
    },
    {
      lineNumber: 60,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "p", type: "Printable", value: "-> Book#4", isReference: true, refId: "book4" }],
        },
      ],
      heapObjects: [],
      consoleOutput: [
        "Items: 3",
        "Item: Clean Code (39.99 EUR)",
        "Item: Effective Java (49.99 EUR)",
        "Item: Refactoring (44.99 EUR)",
        "Item: Design Patterns (54.99 EUR)",
        "Item",
      ],
      explanation: "`p.getLabel()` nutzt die default-Methode des Interfaces `Printable` und liefert `Item`.",
    },
    {
      lineNumber: 61,
      stackFrames: [
        { methodName: "Klasse Item", variables: [{ name: "itemCount", type: "int", value: "4" }] },
        { methodName: "main", variables: [] },
      ],
      heapObjects: [],
      consoleOutput: [
        "Items: 3",
        "Item: Clean Code (39.99 EUR)",
        "Item: Effective Java (49.99 EUR)",
        "Item: Refactoring (44.99 EUR)",
        "Item: Design Patterns (54.99 EUR)",
        "Item",
        "4",
      ],
      explanation: "Finale Ausgabe des statischen Zaehlers: Insgesamt wurden 4 `Item`-Instanzen erstellt.",
    },
  ],
};

export const javaExamples: JavaExample[] = [
  arrayLoopExample,
  methodCallExample,
  vl03PrintableItemInventoryExample,
  instanzReferenzExample,
  instanzVsKlassenvariablenExample,
  staticKeywordExample,
  bauenTestenTeilenExample,
  typenModuleSchnittstellenExample,
  stackHeapDemoExample,
  interfacePolymorphieGenericsExample,
  collectionsStudentRegistryExample,
  algorithmenCatalogExample,
  nebenlaeufigkeitBankAccountExample,
];

export function getExample(id: string): JavaExample | undefined {
  return javaExamples.find((e) => e.id === id);
}
