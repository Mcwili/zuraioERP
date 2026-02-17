# Prompts & Frameworks Übersetzungsleitfaden

## Aktueller Stand

Die PromptsFrameworks-Komponente (`/components/PromptsFrameworks.tsx`) ist teilweise internationalisiert:

### ✅ Bereits übersetzt (über i18n.ts)
- Alle UI-Elemente (Buttons, Labels, Platzhalter)
- Header-Texte ("Prompt-Bibliothek" / "Prompt Library" / "Bibliothèque de Prompts" / "Biblioteca de Prompts")
- Suchfelder und Beschreibungen
- Dialog-Texte

### ⚠️ Noch hardcodiert (in Komponente)
- **Kategorienamen** (z.B. "Markt & Wettbewerb", "Planung & Umsetzung")
- **Kategorie-Beschreibungen** (z.B. "Marktanalyse, Wettbewerbsbeobachtung und Positionierung")
- **Prompt-Titel** (z.B. "Der KI-Rivale", "Der Pre-Mortem-Analyst")
- **Prompt-Beschreibungen**
- **Prompt-Inhalte** (die eigentlichen Prompts - mehrere Absätze pro Prompt)
- **Tags** (z.B. "Wettbewerb", "Innovation", "Strategie")
- **Framework-Titel, -Beschreibungen und -Strukturen**

## Umfang der Übersetzungsaufgabe

### Kategorien (13 Prompt + 4 Framework = 17)
Jede Kategorie benötigt:
- Name (1 String)
- Beschreibung (1 String)

**Total: 34 Übersetzungsschlüssel** × 3 Sprachen = **102 Übersetzungen**

### Prompts (~50-60 Prompts)
Jeder Prompt benötigt:
- Titel (1 String)
- Beschreibung (1 String)  
- Prompt-Text (1-10 Absätze)
- 3-5 Tags

**Total: ~200-250 Übersetzungsschlüssel** × 3 Sprachen = **600-750 Übersetzungen**

### Frameworks (~15 Frameworks)
Jedes Framework benötigt:
- Titel (1 String)
- Beschreibung (1 String)
- Struktur (mehrzeilig)
- 3-5 Tags

**Total: ~60 Übersetzungsschlüssel** × 3 Sprachen = **180 Übersetzungen**

## Gesamtaufwand
**~900-1.000 Übersetzungen** für vollständige Internationalisierung

## Empfohlenes Vorgehen

### Option 1: Vollständige Übersetzung (hoher Aufwand)
1. Separate Übersetzungsdatei erstellen (`utils/prompts-i18n.ts`)
2. Alle Prompts und Frameworks in strukturierter Form definieren
3. Professionelle Übersetzungen für EN, FR, PT-BR erstellen lassen
4. Komponente anpassen, um die Übersetzungen zu verwenden

### Option 2: Schrittweise Übersetzung (empfohlen)
1. **Phase 1**: Kategorienamen und -beschreibungen (102 Übersetzungen)
2. **Phase 2**: Prompt-Titel und -Beschreibungen (400-500 Übersetzungen)
3. **Phase 3**: Prompt-Inhalte und Tags (Rest)

### Option 3: Hybrid-Ansatz (pragmatisch)
1. UI-Elemente bleiben übersetzt (bereits erledigt ✅)
2. Kategorienamen werden übersetzt
3. Prompt-/Framework-Inhalte bleiben vorerst auf Deutsch
4. Benutzer können Inhalte über das Edit-Panel in ihrer Sprache anlegen

## Nächste Schritte

Für eine pragmatische Lösung empfehle ich:

1. Kategorienamen-Übersetzungen zu `i18n.ts` hinzufügen
2. Komponente anpassen, um Kategorienamen dynamisch zu laden
3. Dokumentation für Benutzer erstellen, wie sie eigene Prompts in ihrer Sprache anlegen

**Geschätzter Zeitaufwand:**
- Option 1 (Vollständig): 20-30 Stunden
- Option 2 (Schrittweise): 5-10 Stunden pro Phase
- Option 3 (Hybrid): 2-3 Stunden

## Siehe auch
- `/utils/i18n.ts` - Hauptübersetzungsdatei
- `/utils/i18n-extensions.ts` - Erweiterte Übersetzungen
- `/components/PromptsFrameworks.tsx` - Zu übersetzende Komponente
