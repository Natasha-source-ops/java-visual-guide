# Semester 1 Roadmap (Java)

Autorin: Natasha Valentine-Schmelzer  
Ziel: Alle Pflichtthemen als strukturierte Lesson-Basis fuer den Java Tutor Guide und die Pruefungssimulation.

| Nr. | Thema | Kurzkommentar (fuer Lesson-Seite) | Pruefungsfokus |
| --- | --- | --- | --- |
| 1 | Grundlagen der Programmierung | Problem in Schritte zerlegen: Eingabe, Verarbeitung, Ausgabe. Erste Denkweise in Algorithmen und Kontrollfluss. | Ablauf eines Programms in eigenen Worten erklaeren |
| 2 | Programmiersprache Java & Java-Programme | Aufbau einer Java-Datei, Compiler/JVM, Startpunkt ueber `main`. Unterschied Quellcode vs. Ausfuehrung. | Java-Ausfuehrungsmodell (kompilieren + starten) |
| 3 | "Hallo Welt!" (erstes Java-Programm) | Minimalprogramm lesen und schreiben, `System.out.println` als erste Ausgabe. | Pflichtsyntax fuer lauffaehiges Mini-Programm |
| 4 | Variablen und Datentypen I | Primitive Datentypen, Wertebereiche, Initialisierung, Zuweisung und einfache Typwahl. | Typ passend zur Aufgabe waehlen |
| 5 | Arrays (Ueberblick) | Konzept "viele Werte gleichen Typs unter einem Namen" verstehen. | Array als Datenstruktur einordnen |
| 6 | Array Einfuehrung | Deklaration, Erzeugung und Index-Konzept (`0..length-1`). | Typische Indexfehler erkennen |
| 7 | Werte lesen und schreiben | Zugriff mit `array[i]`, gezieltes Aendern einzelner Positionen. | Lese-/Schreibzugriffe sauber formulieren |
| 8 | Laenge | `array.length` korrekt nutzen statt Hardcoding. | Schleifenbedingungen mit `length` |
| 9 | Arrays initialisieren mit der `for`-Schleife | Indexbasierte Schleifen fuer Befuellen/Verarbeiten. | Off-by-one vermeiden |
| 10 | Arrays und die erweiterte `for`-Schleife | `for-each` fuer lesenden Zugriff, Grenzen und Vorteile gegenueber klassischer `for`. | Geeignete Schleifenart begruenden |
| 11 | Objektorientierung (Ueberblick) | Klassen als Bauplan, Objekte als Instanzen, Zustand + Verhalten. | OOP-Grundidee erklaeren |
| 12 | Einstieg: Klassen und Objekte | Erste eigene Klasse modellieren und nutzen. | Klasse vs. Objekt sicher unterscheiden |
| 13 | Aufbau von Klassen | Attribute, Methoden, Konstruktoren, Sichtbarkeiten im Grundaufbau. | Klassenstruktur in Code lesen/schreiben |
| 14 | Objekterzeugung | `new`, Referenzen und Lebenszyklus von Objekten. | Referenzvariable vs. Objekt im Speicher |
| 15 | Privatsphaere/Sichtbarkeiten, Encapsulation, Getter & Setter | Daten kapseln, API fuer kontrollierten Zugriff definieren. | Warum `private` + Getter/Setter sinnvoll sind |
| 16 | Umgang mit Referenzdatentypen | Referenzen kopieren, `null`, Seiteneffekte bei Methodenaufrufen. | Typische Referenzfehler analysieren |
| 17 | Vererbung | Gemeinsamkeiten in Basisklasse auslagern, Spezialisierung in Unterklassen. | `extends`-Beziehungen richtig modellieren |
| 18 | Ueberladen und Ueberschreiben | Gleichnamige Methoden: Signatur vs. polymorphes Verhalten. | Overload vs. Override sicher trennen |
| 19 | Das Schluesselwort `static` | Klassenmitglieder ohne Objektinstanz, sinnvolle Einsatzfaelle und Risiken. | Instanz- vs. Klassenkontext |
| 20 | Packages | Code in Namensraeumen organisieren, Imports und Projektstruktur. | Package/Import-Fehler erkennen |
| 21 | Variablen und Datentypen II (Literale, Typbeziehungen, Casting) | Implizite/explizite Umwandlung, Informationsverlust und sichere Casts. | Casting-Ausdruecke korrekt bewerten |
| 22 | Operatoren und Ausdruecke | Arithmetik, Vergleich, Logik und Auswertungsreihenfolge. | Ausdrucksergebnis herleiten |
| 23 | Ternaerer Operator | Kompakte `if-else`-Form fuer einfache Entscheidungen. | Lesbarkeit vs. Kuerze richtig abwaegen |
| 24 | Strings (Teil I) | `String` als Objekt, unveraenderlich, wichtige Methoden fuer Grundlagen. | String-Operationen sauber einsetzen |
| 25 | Scanner und `System.in` | Benutzereingaben robust lesen und in passende Typen umwandeln. | Input-Parsing + typische Stolperstellen |

## Empfohlene Modulstruktur fuer die Website

1. Modul A: Einstieg & Java-Basics (1-4)
2. Modul B: Arrays & Schleifen (5-10)
3. Modul C: OOP Grundlagen (11-16)
4. Modul D: OOP Vertiefung (17-20)
5. Modul E: Datentypen, Operatoren, Strings, Input (21-25)

## Lesson-Template pro Thema (fuer eure Seiten)

1. Lernziele (2-3 Bulletpoints)
2. Kernbeispiel (kurzer Java-Code)
3. Visualisierung (Stack/Heap + Schrittfolge)
4. Pruefungsaufgabe (eine alte Klausuridee im selben Stil)
5. Musterloesung mit Begruendung
