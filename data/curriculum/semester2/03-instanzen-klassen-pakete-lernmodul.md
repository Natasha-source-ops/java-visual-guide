# Semester 2 Lernmodul 03: Instanzen, Klassen, Pakete

Autorin: Natasha Valentine-Schmelzer
Ziel: Das Thema so sicher verstehen, dass Code gelesen, erklaert und in Klausuraufgaben angewendet werden kann.

## Quellenbasis (Buchbezug)

Dieses Modul ist an den Themenaufbau aus dem Buch
"Java als erste Programmiersprache" (Goll/Heinisch, 2014) angelehnt, insbesondere:

- 2.1.2 Klassen und Objekte
- 2.1.3 Zustaende von Objekten
- 2.2 Kapselung, Abstraktion und Information Hiding
- 4.2 Erzeugen von Objekten
- 4.3 Initialisierung von Objekten mit Konstruktoren
- 4.4 Schreiben von Instanzmethoden
- 6.4.4 Klassenvariablen, Instanzvariablen und lokale Variablen
- 10.1 Information Hiding
- 10.2 Klassenvariablen und Klassenmethoden
- 10.3 Die this-Referenz
- 10.4 Initialisierung von Datenfeldern
- 10.5 Instanziierung von Klassen
- 12.2 Pakete zur Gruppierung
- 12.3 Erstellung von Paketen
- 12.4 Benutzung von Paketen
- 12.5 Paketnamen
- 12.6 Gueltigkeitsbereich von Klassennamen
- 12.7 Zugriffsmodifikatoren

## Lernziele

Nach diesem Modul kannst du:

1. Klasse (Bauplan) und Instanz (konkretes Objekt) exakt unterscheiden.
2. erklaeren, was beim `new`-Aufruf technisch passiert (Referenz, Heap, Konstruktor).
3. Instanzvariablen, Klassenvariablen (`static`) und lokale Variablen sauber trennen.
4. den Zweck von `this` korrekt anwenden.
5. Pakete, `package`, `import` und Namensraeume korrekt einsetzen.
6. typische Fehler in Klausurcode erkennen und begruenden.

## Kernmodell in 60 Sekunden

- Klasse: beschreibt Struktur und Verhalten (Attribute + Methoden).
- Instanz: konkretes Objekt einer Klasse, mit eigenem Zustand.
- Referenzvariable: speichert NICHT das Objekt, sondern den Verweis auf das Objekt.
- Konstruktor: initialisiert neues Objekt beim Erzeugen.
- `static`: gehoert zur Klasse (einmal), nicht zu jeder Instanz.
- Paket: Namensraum fuer Ordnung, Wiederverwendbarkeit und Zugriffskontrolle.

## Mentales Bild fuer den Speicher

- Stack:
- lokale Variablen
- Methodenaufrufe (Frames)

- Heap:
- Objekte (Instanzen)
- Objektzustand (Instanzvariablen)

Merksatz:
"Variablen auf dem Stack zeigen oft nur auf Objekte im Heap."

## Didaktische Sequenz (90 Minuten)

1. Phase A (15 min): Begriffsklaerung
- Klasse vs. Instanz vs. Referenz
- Warum OOP fuer Modellierung sinnvoll ist

2. Phase B (25 min): Instanziierung und Konstruktoren
- `new`-Ablauf Schritt fuer Schritt
- `this` in Konstruktoren und Instanzmethoden

3. Phase C (20 min): Instanz- vs. Klassenkontext
- Instanzvariable vs. `static`-Variable
- typische Denkfehler ("jede Instanz hat eigenes static")

4. Phase D (20 min): Pakete und Imports
- `package`-Deklaration, Verzeichnisstruktur, `import`
- Namenskonflikte und vollqualifizierte Namen

5. Phase E (10 min): Pruefungsdrill
- kurze Fehleranalyse-Aufgaben
- schnelle Begruendungssaetze trainieren

## Beispiel 1: Instanz + Referenzalias

```java
class Konto {
    String inhaber;
    double stand;

    Konto(String inhaber, double stand) {
        this.inhaber = inhaber;
        this.stand = stand;
    }
}

Konto k1 = new Konto("Aylin", 100.0);
Konto k2 = k1;
k2.stand = 150.0;
System.out.println(k1.stand); // ?
```

Erwartung: Ausgabe ist `150.0`.
Begruendung: `k1` und `k2` zeigen auf dieselbe Instanz.

## Beispiel 2: Instanzvariable vs. Klassenvariable

```java
class Student {
    String name;
    int semester;
    static int anzahl = 0;

    Student(String name, int semester) {
        this.name = name;
        this.semester = semester;
        anzahl++;
    }
}
```

- `name`, `semester`: pro Objekt individuell.
- `anzahl`: nur einmal pro Klasse vorhanden.

## Subheading: Schluesselwort `static` (eine Stufe schwieriger)

```java
public class Klasse {
    int a;
    int b;
    static int c = 0;
    static int totalCalls = 0;

    Klasse(int startA, int startB) {
        this.a = startA;
        this.b = startB;
    }

    void increaseAll(int delta) {
        a += delta;  // nur dieses Objekt
        b += delta;  // nur dieses Objekt
        c += delta;  // alle Objekte teilen c
        totalCalls++;
    }

    static void increaseC(int delta) {
        c += delta;
        totalCalls++;
    }

    public static void main(String[] args) {
        Klasse objekt1 = new Klasse(1, 2);
        Klasse objekt2 = new Klasse(10, 20);

        objekt1.increaseAll(2);
        objekt2.increaseAll(3);
        Klasse.increaseC(4);

        System.out.println("objekt1: " + objekt1.a + " " + objekt1.b + " c=" + Klasse.c);
        System.out.println("objekt2: " + objekt2.a + " " + objekt2.b + " c=" + Klasse.c);
        System.out.println("calls: " + Klasse.totalCalls);
    }
}
```

Warum schwieriger:

- Zwei Instanzen werden parallel verfolgt (`objekt1`, `objekt2`).
- Instanzzustand (`a`, `b`) und Klassenzustand (`c`) laufen gleichzeitig.
- Eine zweite Klassenvariable (`totalCalls`) zaehlt alle Aufrufe.
- `increaseAll` (Instanzmethode) und `increaseC` (Klassenmethode) werden kombiniert.

Erwartete Ausgabe:

```text
objekt1: 3 4 c=9
objekt2: 13 23 c=9
calls: 3
```

## Beispiel 3: Paketstruktur

```java
// Datei: src/uni/modell/Kurs.java
package uni.modell;

public class Kurs { }

// Datei: src/app/Main.java
package app;
import uni.modell.Kurs;

public class Main {
    public static void main(String[] args) {
        Kurs k = new Kurs();
    }
}
```

Wichtige Regeln:

- Paketname steht am Dateianfang.
- Verzeichnisstruktur muss zum Paket passen.
- `import` vereinfacht die Nutzung externer Klassen.

## Subheading: Assoziation, Aggregation, Komposition

```java
import java.util.ArrayList;
import java.util.List;

class Arzt {
    private String name;
    public Arzt(String name) { this.name = name; }
    public String getName() { return name; }
}

class Patient {
    private String name;
    public Patient(String name) { this.name = name; }
    public void untersuchung(Arzt a) {
        System.out.println("Patient " + name + " wird von Dr. " + a.getName() + " untersucht.");
    }
}

class Spieler {
    private String name;
    public Spieler(String name) { this.name = name; }
}

class Mannschaft {
    private List<Spieler> spielerListe;
    public Mannschaft(List<Spieler> externeSpieler) {
        this.spielerListe = externeSpieler;
    }
}

class Herz {
    public Herz() { System.out.println("Herz wird geschlagen."); }
}

class Mensch {
    private Herz herz;
    public Mensch() {
        this.herz = new Herz();
    }
}
```

### 3 moegliche Pruefungsfragen

1. Frage 1: Der Lebenszyklus-Test (Komposition)
Betrachte die Klassen `Mensch` und `Herz`. Wenn in `main` geschrieben wird `Mensch m1 = null;`, wird das `Herz`-Objekt durch den Garbage Collector ebenfalls freigegeben.  
Warum ist das so, und was unterscheidet dies von `Mannschaft` (Aggregation)?

2. Frage 2: Identifikation im Code
In der Klasse `Mannschaft` werden die `Spieler` ueber den Konstruktor hineingereicht:
`public Mannschaft(List<Spieler> externeSpieler) { ... }`  
Wenn die `Mannschaft` geloescht wird, existieren die `Spieler`-Objekte weiter?  
Begruende anhand des Ortes, an dem die `Spieler` erstellt wurden.

3. Frage 3: Die "Kennt-Beziehung" (Assoziation)
In der Klasse `Patient` gibt es die Methode `untersuchung(Arzt a)`.  
Speichert der `Patient` den `Arzt` dauerhaft als Attribut?  
Erklaere, warum dies eine lose Assoziation ist und kein dauerhafter Teil des `Patient`-Objekts.

## Typische Fehlerbilder (Klausur)

1. "`k2 = k1` kopiert das Objekt."
- Falsch: Es wird nur die Referenz kopiert.

2. "`static` gehoert jeder Instanz."
- Falsch: `static` gehoert der Klasse.

3. "`this` ist optional bei Namenskonflikten im Konstruktor."
- Falsch: Bei gleichen Namen von Parameter/Feld ist `this` zur Aufloesung noetig.

4. "`import` laedt Klassen zur Laufzeit."
- Irrefuehrend: `import` ist eine Compile-Time-Schreibabkuerzung fuer Namen.

5. "Paketname und Ordner duerfen beliebig sein."
- Falsch: Struktur und Paketdeklaration muessen zusammenpassen.

## Pruefungsaufgaben (mit Loesungen)

### Aufgabe 1

```java
class A {
    int x = 1;
}

A a1 = new A();
A a2 = a1;
a2.x = 7;
System.out.println(a1.x);
```

Antwort: `7`

Kurzbegruendung: Beide Referenzen zeigen auf dieselbe Instanz.

### Aufgabe 2

```java
class Counter {
    static int gesamt = 0;
    Counter() { gesamt++; }
}

new Counter();
new Counter();
System.out.println(Counter.gesamt);
```

Antwort: `2`

Kurzbegruendung: `gesamt` ist Klassenvariable und zaehlt alle erzeugten Objekte.

### Aufgabe 3

Gegeben ist `package uni.service;` in der Datei `src/util/Service.java`.

Frage: Was ist falsch?

Antwort: Der Dateipfad passt nicht zur Paketdeklaration.
Korrekt waere z. B. `src/uni/service/Service.java`.

## Kurz-Checkliste vor der Klausur

- Kann ich Klasse, Instanz und Referenz in einem Satz unterscheiden?
- Kann ich den `new`-Ablauf inkl. Konstruktor beschreiben?
- Kann ich begruenden, warum Referenzkopien Seiteneffekte haben?
- Kann ich `static` sicher von Instanzdaten trennen?
- Kann ich `package` + Ordnerstruktur + `import` korrekt aufschreiben?

## Verbindung zur App (Java Tutor)

Passende interaktive Beispiele im Visualizer:

- `Instanzen & Referenzen`
- `Instanz vs. Klassenvariable`
- `Pakete & Import`

Nutze bei jedem Beispiel die Reihenfolge:

1. Code lesen
2. naechsten Schritt vorhersagen
3. Stack/Heap vergleichen
4. Erklaertext in eigenen Worten wiederholen
