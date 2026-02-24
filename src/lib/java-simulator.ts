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
}

export interface JavaExample {
  id: string;
  title: string;
  description: string;
  semester: "semester1" | "semester2";
  lecture?: string;
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
  title: "Datentypen, Record und Interface-Prinzip",
  description: "Primitive Typen, Casting, Record und List/ArrayList",
  semester: "semester2",
  lecture: "04-Typen, Module, Schnittstellen 11.05.25",
  customQuestion1: {
    prompt: "Welche Aussage beschreibt den wesentlichen Unterschied bei der Speicherung von primitiven Typen und Referenztypen in Java?",
    options: [
      "A) Primitive Typen koennen nicht an Methoden uebergeben werden.",
      "B) Primitive Typen werden typischerweise im Stack-Frame gehalten, waehrend Objekte auf dem Heap liegen.",
      "C) Referenztypen belegen immer weniger Speicher als primitive Typen.",
      "D) Beide Typen werden ausschliesslich im Heap gespeichert.",
    ],
    correctOption: "B) Primitive Typen werden typischerweise im Stack-Frame gehalten, waehrend Objekte auf dem Heap liegen.",
    explanation: "Das entspricht der Java-Speicherarchitektur: einfache Werte liegen im Stack-Frame, Objekte werden dynamisch auf dem Heap verwaltet.",
  },
  customQuestion2: {
    prompt: "Was passiert bei `int castInt = (int) fliesskomma;`, wenn `fliesskomma` den Wert `19.99` hat?",
    options: [
      "A) Der Wert wird zu 19 gekuerzt, da Nachkommastellen abgeschnitten werden.",
      "B) Der Wert wird auf 20 aufgerundet.",
      "C) Der Wert bleibt 19.99, nur der Typ aendert sich intern.",
      "D) Es tritt ein Compilerfehler auf.",
    ],
    correctOption: "A) Der Wert wird zu 19 gekuerzt, da Nachkommastellen abgeschnitten werden.",
    explanation: "Beim Narrowing Cast von `double` zu `int` werden Dezimalstellen in Java abgeschnitten (Trunkierung), nicht gerundet.",
  },
  customQuestion3: {
    prompt: "Warum ist `record Student(...)` fuer reine Datenklassen vorteilhaft?",
    options: [
      "A) Records verbrauchen weniger RAM als primitive Datentypen.",
      "B) Records koennen keine Methoden enthalten.",
      "C) Records erlauben jederzeit veraenderbare Attribute.",
      "D) Sie erzeugen automatisch Standardmethoden wie `equals()`, `hashCode()` und `toString()`.",
    ],
    correctOption: "D) Sie erzeugen automatisch Standardmethoden wie `equals()`, `hashCode()` und `toString()`.",
    explanation: "Das reduziert Boilerplate-Code deutlich, weil der Compiler diese Standardimplementierungen aus den Record-Komponenten generiert.",
  },
  customQuestion4: {
    prompt: "Welches Prinzip wird befolgt bei `List<String> namelist = new ArrayList<>();`?",
    options: [
      "A) Programmieren gegen eine Schnittstelle (Interface).",
      "B) Vermeidung von Speicherlecks auf dem Heap.",
      "C) Prinzip der Mehrfachvererbung.",
      "D) Erzwingen von statischen Methoden.",
    ],
    correctOption: "A) Programmieren gegen eine Schnittstelle (Interface).",
    explanation: "Der Variablentyp nutzt das Interface `List`, waehrend die konkrete Implementierung austauschbar bleibt (`ArrayList`).",
  },
  code: `import java.util.ArrayList;
import java.util.List;

public class DatentypDemo {

    public record Student(String name, int alter) {}

    public static void main(String[] args) {

        int ganzzahl = 42;
        double fliesskomma = 19.99;
        boolean istAktiv = true;
        char initial = 'A';

        double weitesDouble = ganzzahl;
        int castInt = (int) fliesskomma;

        String text = "Hallo HTW";
        Student studi = new Student("Max Mustermann", 22);
        int[] zahlenArray = {1, 2, 3, 4, 5};

        List<String> namelist = new ArrayList<>();
        namelist.add("Alice");
        namelist.add("Bob");

        System.out.println("Primitive Int: " + ganzzahl);
        System.out.println("Gecasteter Int: " + castInt);
        System.out.println("Referenzobjekt Record: " + studi);
        System.out.println("Liste: " + namelist);
    }
}`,
  steps: [
    {
      lineNumber: 10,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "ganzzahl", type: "int", value: "42", changed: true }],
        },
      ],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Primitive Variable `ganzzahl` wird direkt im Stack-Frame angelegt und mit 42 initialisiert.",
    },
    {
      lineNumber: 16,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "ganzzahl", type: "int", value: "42" },
            { name: "fliesskomma", type: "double", value: "19.99" },
            { name: "castInt", type: "int", value: "19", changed: true },
          ],
        },
      ],
      heapObjects: [],
      consoleOutput: [],
      explanation: "Casting von `double` nach `int`: Nachkommastellen werden abgeschnitten (`19.99 -> 19`).",
    },
    {
      lineNumber: 19,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "text", type: "String", value: "→ String#1", isReference: true, refId: "str1", changed: true },
            { name: "studi", type: "Student", value: "→ Student#1", isReference: true, refId: "stuRec1", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "str1", type: "String", label: "String#1", values: ['value = "Hallo HTW"'] },
        { id: "stuRec1", type: "Student(record)", label: "Student#1", values: ['name = "Max Mustermann"', "alter = 22"] },
      ],
      consoleOutput: [],
      explanation: "Referenztypen werden als Objekte auf dem Heap erzeugt; im Stack liegen nur Referenzen darauf.",
    },
    {
      lineNumber: 20,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "zahlenArray", type: "int[]", value: "→ Array#1", isReference: true, refId: "arr1", changed: true },
          ],
        },
      ],
      heapObjects: [
        { id: "arr1", type: "int[]", label: "Array#1", values: ["1", "2", "3", "4", "5"], indices: [0, 1, 2, 3, 4] },
      ],
      consoleOutput: [],
      explanation: "Das Array liegt auf dem Heap. `zahlenArray` im Stack zeigt auf dieses Objekt.",
    },
    {
      lineNumber: 22,
      stackFrames: [
        {
          methodName: "main",
          variables: [
            { name: "namelist", type: "List<String>", value: "→ List#1", isReference: true, refId: "list1", changed: true },
          ],
        },
      ],
      heapObjects: [{ id: "list1", type: "ArrayList<String>", label: "List#1", values: [] }],
      consoleOutput: [],
      explanation: "Deklaration gegen Interface (`List`), Instanziierung mit konkreter Implementierung (`ArrayList`).",
    },
    {
      lineNumber: 24,
      stackFrames: [
        {
          methodName: "main",
          variables: [{ name: "namelist", type: "List<String>", value: "→ List#1", isReference: true, refId: "list1" }],
        },
      ],
      heapObjects: [{ id: "list1", type: "ArrayList<String>", label: "List#1", values: ['"Alice"', '"Bob"'] }],
      consoleOutput: [],
      explanation: "Durch die beiden `add`-Aufrufe enthaelt die Liste jetzt zwei Elemente.",
    },
    {
      lineNumber: 26,
      stackFrames: [{ methodName: "main", variables: [] }],
      heapObjects: [],
      consoleOutput: ["Primitive Int: 42"],
      explanation: "Erste Konsolenausgabe des primitiven Wertes.",
    },
    {
      lineNumber: 29,
      stackFrames: [{ methodName: "main", variables: [] }],
      heapObjects: [],
      consoleOutput: [
        "Primitive Int: 42",
        "Gecasteter Int: 19",
        "Referenzobjekt Record: Student[name=Max Mustermann, alter=22]",
        "Liste: [Alice, Bob]",
      ],
      explanation: "Am Ende werden alle Ergebnisse ausgegeben: Cast-Ergebnis, Record-`toString()` und Listeninhalt.",
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

export const javaExamples: JavaExample[] = [
  arrayLoopExample,
  methodCallExample,
  instanzReferenzExample,
  instanzVsKlassenvariablenExample,
  packageImportExample,
  staticKeywordExample,
  typenModuleSchnittstellenExample,
  stackHeapDemoExample,
];

export function getExample(id: string): JavaExample | undefined {
  return javaExamples.find((e) => e.id === id);
}
