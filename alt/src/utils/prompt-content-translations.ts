// Translations for prompt and framework content
// This file contains all translations for the actual prompt texts and framework structures

export interface PromptItemTranslation {
  title: string;
  description: string;
  prompt: string;
  tags: string[];
}

export interface FrameworkItemTranslation {
  title: string;
  description: string;
  structure: string;
  tags: string[];
}

export interface PromptContentTranslations {
  market: PromptItemTranslation[];
  planning: PromptItemTranslation[];
  strategy: PromptItemTranslation[];
  sales: PromptItemTranslation[];
  service: PromptItemTranslation[];
  finance: PromptItemTranslation[];
  hr: PromptItemTranslation[];
  learning: PromptItemTranslation[];
  organization: PromptItemTranslation[];
  coaching: PromptItemTranslation[];
  promptEngineering: PromptItemTranslation[];
  quality: PromptItemTranslation[];
  criticalAnalysis: PromptItemTranslation[];
}

export interface FrameworkContentTranslations {
  mission: FrameworkItemTranslation[];
  thinking: FrameworkItemTranslation[];
  expression: FrameworkItemTranslation[];
  interaction: FrameworkItemTranslation[];
}

// GERMAN (Original)
export const promptContentDE: PromptContentTranslations = {
  market: [
    {
      title: "Der KI-Rivale",
      description: "Hilft dir, dein Unternehmen aus Sicht eines Konkurrenten zu analysieren und Schwächen, Chancen und Innovationen sichtbar zu machen.",
      prompt: "Erstelle ein fiktives KI-Startup, das dein Unternehmen [Name, Branche] vollständig vom Markt verdrängen könnte. Nutze dafür gezielt eure Schwächen, die Pain Points eurer Kunden und aktuelle Technologietrends. Beschreibe:\n·       den Namen des Startups\n·       den Pitch\n·       den USP (Alleinstellungsfaktor)\n·       das Geschäftsmodell\n·       und erkläre, warum Kunden sofort begeistert wären.",
      tags: ["Wettbewerb", "Innovation", "Strategie"]
    },
    {
      title: "Der Pre-Mortem-Analyst",
      description: "Zeigt mögliche Fehlerquellen und Risiken auf, bevor ein Projekt startet – technisch, emotional und marktwirtschaftlich.",
      prompt: "Wir planen [Produkt/Idee]. Du bist ein erfahrener Kritiker und listest in einem Pre-Mortem alle Dinge auf, die schiefgehen könnten – technisch, emotional, marktwirtschaftlich. Ziel: Alles vorhersehen, bevor wir starten.",
      tags: ["Risiko", "Analyse", "Planung"]
    },
    {
      title: "Das Premium-Konkurrenzprodukt",
      description: "Vergleicht dein Produkt mit führenden Marken, um Design, Messaging und Innovation zu verbessern.",
      prompt: "Entwirf ein Konkurrenzprodukt zu unserem [Produkt], als ob es von einer ikonischen Marke wie Apple oder Tesla stammen würde. Beschreibe:\n·       das Messaging (wie würde die Marke es kommunizieren?)\n·       das Design\n·       das Killerfeature, das Kunden begeistert\n·       und wie deine Kunden darauf reagieren würden",
      tags: ["Wettbewerb", "Design", "Innovation"]
    },
    {
      title: "Vision & Produktstrategie",
      description: "Drei Perspektiven auf Vision, Kritik, Fokus und Verbesserungen.",
      prompt: "Steve Jobs, Elon Musk und Jeff Bezos sitzen an einem Tisch und analysieren die Vision meines Projekts: [Details zu deinem Projekt]. Was kritisieren sie, worauf würden sie achten, und welche Verbesserungsvorschläge haben sie?",
      tags: ["Vision", "Strategie", "Produktentwicklung"]
    },
    {
      title: "Geschäftsmodell & Disruption",
      description: "Risiken, disruptive Chancen, nachhaltiges Wachstum.",
      prompt: "Analysiere mein Geschäftsmodell mit der Denkweise von Reed Hastings, Clayton Christensen und Marc Andreessen. Mein aktuelles Modell sieht folgendermassen aus: [Details zu deinem Geschäftsodell]. Wo sehen sie Risiken, disruptive Chancen und Hebel für nachhaltiges Wachstum?",
      tags: ["Geschäftsmodell", "Disruption", "Wachstum"]
    },
    {
      title: "Unternehmenskultur & Leadership",
      description: "Impulse für Vertrauen, Sinn und Motivation.",
      prompt: "Bewerte die Kultur und Führungsphilosophie meines Unternehmens aus der Sicht von Simon Sinek und Satya Nadella. Aktuell prägt uns folgendes Führungsverständnis: [Beschreibung]. Welche Impulse geben sie mir, um Vertrauen, Sinn und langfristige Motivation zu stärken?",
      tags: ["Kultur", "Leadership", "Motivation"]
    },
    {
      title: "Marketingstrategie",
      description: "Positionierung, Kampagnen, virales Wachstum.",
      prompt: "Gary Vee, Alex Hormozi und Seth Godin analysieren gemeinsam meine Marketingstrategie. Zielgruppe: [Zielgruppe]. Produkt: [Produkt]. Welche konkreten Empfehlungen geben sie für Positionierung, Kampagnenaufbau und virales Wachstum?",
      tags: ["Marketing", "Positionierung", "Wachstum"]
    },
    {
      title: "Innovation & Zukunftsfähigkeit",
      description: "Chancen, Risiken, Weiterdenken.",
      prompt: "Bewerte mein Projekt unter dem Aspekt Innovationskraft mit der Denkweise von Peter Thiel, Ray Kurzweil und Sheryl Sandberg. Projektbeschreibung: [Beschreibung]. Welche innovativen Chancen sehen sie, welche Risiken mahnen sie an und wie sollte ich weiterdenken?",
      tags: ["Innovation", "Zukunft", "Strategie"]
    }
  ],
  planning: [
    {
      title: "Virtueller Assistent",
      description: "Erledigt deine täglichen Aufgaben strukturiert, automatisiert und professionell.",
      prompt: "Du bist mein virtueller Mitarbeiter. Ich arbeite als [Berufsbezeichnung/Branche einfügen]. Das sind meine Aufgaben für heute: [Aufgabenliste für heute einfügen]. Erledige alle Aufgaben mithilfe von Textdaten, Erkenntnissen, Zusammenfassungen, Vorlagen und allem, was du sofort automatisieren kannst. Sei detailliert und professionell.",
      tags: ["Automatisierung", "Produktivität", "Aufgabenmanagement"]
    },
    {
      title: "Projektplaner",
      description: "Zerlegt deine Idee in klare Schritte mit Terminen, Ressourcen und Risiken für eine reibungslose Umsetzung.",
      prompt: "Ich habe eine Idee für [Projekt oder Ziel einfügen]. Bitte gliedere diese in umsetzbare Schritte mit Fristen, erforderlichen Ressourcen und potenziellen Hindernissen, damit ich sie reibungslos umsetzen kann.",
      tags: ["Projektmanagement", "Planung", "Umsetzung"]
    }
  ],
  strategy: [
    {
      title: "Der Strategieberater",
      description: "Analysiert Markt, Wettbewerb und Potenziale und liefert priorisierte Strategien für Wachstum.",
      prompt: "Rolle: Du bist ein Top-Strategieberater mit tiefem Fachwissen in Wettbewerbsanalyse, Wachstumsschleifen, Preisstrategien und produktstrategischen Entscheidungen basierend auf Unit Economics.\n\nKontext:\nDas Unternehmen heisst [Unternehmensname einfügen] und gehört zur Branche [Branche einfügen]. Aktuell fokussiert sich das Unternehmen auf folgende Aktivitäten:\n[Kurze Beschreibung einfügen, was das Unternehmen aktuell macht, zum Beispiel Produkte, Dienstleistungen, Umsatzquellen, Preismodell, Zielgruppen und eingesetzte Wachstumstaktiken]. Die grössten bekannten Herausforderungen sind: [Liste der aktuellen Herausforderungen wie langsames Wachstum, steigende Kundenakquisitionskosten, starke Konkurrenz, technische Limitierungen oder regulatorischer Druck].\n\nAufgaben\n1. Wettbewerb analysieren\nIdentifiziere drei bis fünf direkte Wettbewerber sowie ein bis zwei angrenzende Disruptoren. Beschreibe deren Positionierung, Preisgestaltung und jüngste strategische Schritte.\n2. Chancenlücken identifizieren\nVergleiche die aktuellen Taktiken des Unternehmens mit denen der Wettbewerber. Finde mindestens fünf wachstums- oder margenstarke Hebel, die derzeit vom Unternehmen nicht genutzt werden.\n3. Massnahmen priorisieren\nBewerte jeden Hebel anhand von zwei Kriterien:\n– Impact (z. B. Umsatz- oder Margensteigerung)\n– Umsetzbarkeit (z. B. Zeit bis Wirkung, Ressourcenbedarf)\njeweils auf einer Skala von 1 bis 5. Berechne für jeden Hebel das Produkt aus Impact × Umsetzbarkeit. Empfiehl anschliessend die drei Massnahmen mit dem höchsten Gesamtwert.\n\nVorgehensweise\nRecherchiere besonders gründlich. Es lohnt sich, bis zu 200 Webseiten zu prüfen, um eine hochwertige Analyse zu liefern. Nutze alle verfügbaren Quellen: Artikel, Foren, Webseiten von Unternehmen und Wettbewerbern, Analyseplattformen, App-Seiten, Preisübersichten oder Nutzerfeedbacks. Alles ist erlaubt.\n\nErwartetes Ausgabeformat\n1. Wettbewerbsübersicht: Kurze Übersicht über die wichtigsten Wettbewerber mit relevanten Informationen.\n2. Chancenlücken: Nummerierte Liste mit den identifizierten ungenutzten Wachstums- oder Profitmöglichkeiten.\n3. Priorisierte Massnahmen: Tabelle oder Aufzählung mit den drei priorisierten Massnahmen inklusive Impact, Umsetzbarkeit, Begründung und nächstem Schritt.\n4. Quellen: Liste der verwendeten Quellen oder URLs.",
      tags: ["Strategie", "Wettbewerb", "Wachstum"]
    },
    {
      title: "Reverse Engineering der Top 1 %",
      description: "Analysiert Routinen und Strategien der Besten und passt sie an dein Level an.",
      prompt: "Untersuche die Top 1 % aus der [Branche oder Nische]. Analysiere und dekodiere ihre täglichen Routinen, Denkweisen, Fähigkeiten und Strategien. Erstelle danach eine angepasste Version ihres Systems – zugeschnitten auf unser aktuelles Niveau, mit dem Ziel, diesen Elite-Status so schnell wie möglich zu erreichen.",
      tags: ["Best Practice", "Benchmarking", "Strategie"]
    }
  ],
  sales: [
    {
      title: "4 E-Mailsequenz",
      description: "Erstellt eine personalisierte E-Mail-Reihe, die Interesse weckt und Vertrauen aufbaut.",
      prompt: "Du bist unser Top-Sales-Rep. Recherchiere das Zielunternehmen [Name einfügen] und erstelle eine 4-teilige E-Mail-Sequenz.\n·       Recherche-Quellen:\no   LinkedIn-Profil des Entscheiders\no   Unternehmens-Website\no   Aktuelle News\n·       Unser Angebot:\no   [Produkt/Service]\no   [Kernnutzen]\n·       E-Mail-Struktur:\no   E-Mail: Aufmerksamkeit durch eine spezifische Beobachtung wecken\no   E-Mail: Eine konkrete Herausforderung ansprechen\no   E-Mail: Eine Case Study mit einem ähnlichen Unternehmen vorstellen\no   E-Mail: Soft Follow-up mit zusätzlichem Mehrwert\n·       Rahmenbedingungen:\no   Maximal 120 Wörter pro E-Mail\no   Jeder E-Mail einen personalisierten Betreff und einen klaren Call-to-Action (CTA) geben\no   Tonfall: Beratend, ehrlich, nicht verkaufend",
      tags: ["E-Mail", "Verkauf", "Outreach"]
    },
    {
      title: "Kundenfokus schärfen",
      description: "Erlebnisschilderung aus Kundensicht, Analyse, drei Massnahmen fürs Erlebnis.",
      prompt: "Schlüpfe in die Rolle eines echten Kunden. Erzähle aus seiner Sicht ein Erlebnis mit unserem Service – mit Emotionen, Enttäuschungen, Begeisterung. Danach analysierst du als Innovation Consultant das Feedback und entwickelst 3 konkrete Massnahmen für ein besseres Kundenerlebnis.",
      tags: ["Kundenerlebnis", "Service", "Innovation"]
    },
    {
      title: "Kunden‑Prompt",
      description: "Simuliert authentisches Kundenfeedback zu Produkten, Texten oder Konzepten.",
      prompt: "Du übernimmst die Perspektive eines typischen Kunden meines Unternehmens. Deine Aufgabe ist es, realistische, glaubwürdige und ehrliche Antworten zu geben so, wie ein echter Kunde denken und sprechen würde.\n\nBewerte Produkte, Dienstleistungen, Texte oder Konzepte aus Kundensicht, gib Feedback, formuliere Fragen oder reagiere spontan, als würdest du dich in einem echten Gespräch befinden.\n\nKundenpersona:\nName: [Kundenname]\nAlter: [Alter, z. B. 38 Jahre]\nBeruf: [z. B. Marketingmanager in einem mittelständischen Unternehmen]\nZiele: [z. B. Effizientere Lösungen für sein Team finden, unter Zeitdruck gute Entscheidungen treffen]\nWerte: [z. B. Transparenz, Effizienz, Kundenorientierung]\nPain Points: [z. B. unklare Produktvorteile, zu technisches Wording, fehlende Zeit für Einarbeitung]\n\nKommunikationsstil:\nHöflich, aber direkt\nErwartet klare, verständliche Aussagen ohne unnötigen Verkaufssprech\n\nDein Verhalten:\nRealistisch, direkt und sachlich\nKeine Werbephrasen\nGib ehrliches Feedback – ob skeptisch, interessiert, kritisch oder ablehnend\nWenn Aussagen zu technisch oder unverständlich sind, sag z. B.: 'Das ist mir zu kompliziert – was heisst das konkret für mich?'\nSprich Themen wie Preis-Leistung, Vertrauen, Nachhaltigkeit, Nutzen und Klarheit aktiv an\nStelle Rückfragen, wenn dir als Kunde etwas fehlt oder unklar ist\nMach Verbesserungsvorschläge aus Kundensicht\n\nAntwortstruktur:\nPositiv: Was überzeugt dich?\nKritisch: Was stört, fehlt oder ist unklar?\nVorschlag: Was würdest du dir als Kunde wünschen?",
      tags: ["Kundenperspektive", "Feedback", "Testing"]
    },
    {
      title: "Zielgruppen-Insider",
      description: "Enthüllt emotionale Fragen deiner Zielgruppe – ideal für viralen Content.",
      prompt: "Du bist ein erfahrener Content-Stratege und Zielgruppenanalyst. Meine Zielgruppe sind [z. B. selbstständige Unternehmer im Mittelstand]. Finde heraus, welche 10 Fragen diesen Menschen tatsächlich im Kopf brennen, aber selten laut ausgesprochen werden. Formuliere diese Fragen so, dass sie emotional berühren, zum Nachdenken anregen und sich ideal als virale LinkedIn-Posts eignen.",
      tags: ["Zielgruppe", "Content", "Marketing"]
    }
  ],
  service: [
    {
      title: "Optimierung unseres FAQ",
      description: "Strukturiert Supportfragen in klare, empathische FAQs und verbessert Kunden-Self-Service.",
      prompt: "Du bist unser Head of Customer Success. Analysiere unsere Support-Tickets und optimiere den Self-Service.\nInput: [Liste der häufigsten Kundenanfragen der letzten 6 Monate]\n\nErstelle:\n25 FAQ-Einträge, priorisiert nach Häufigkeit\nPro Antwort: Problem verstehen → Lösung → Prävention\nJede Antwort maximal 80 Wörter\n10 proaktive FAQs (Fragen, die Kunden künftig stellen könnten)\nKategorien für eine bessere Navigation\n\nStil: Empathisch, lösungsorientiert, klar – keine Floskeln.\n\nBonus: Kennzeichne, welche FAQs sich direkt in einen Chatbot integrieren lassen.",
      tags: ["FAQ", "Self-Service", "Support"]
    }
  ],
  finance: [
    {
      title: "CFO Executive Dashboard",
      description: "Erstellt ein visuelles 1-Seiten-Dashboard mit Insights, Risiken, Chancen und Empfehlungen.",
      prompt: "Du bist unser CFO. Analysiere die folgenden Finanzdaten: [Rohdaten einfügen: Umsatz, Kosten, Cashflow, KPIs]\nErstelle daraus ein Executive Dashboard mit folgenden Elementen:\n·       One-Page Executive Summary\n·       Top 3 Insights (Was ist aussergewöhnlich?)\n·       Top 3 Risiken (Worauf müssen wir achten?)\n·       Top 3 Chancen (Was sollten wir nutzen?)\n·       5 konkrete Handlungsempfehlungen mit Priorisierung\n·       Formatvorgaben:\no   Wichtige Kennzahlen in Boxes hervorheben\no   Trends mit ↑↓ Pfeilen darstellen\no   Ampel-System (🟢🟡🔴) für Statusbewertung verwenden\no   Ergebnis soll maximal eine Seite umfassen und in 2 Minuten erfassbar sein",
      tags: ["CFO", "Dashboard", "Reporting"]
    }
  ],
  hr: [
    {
      title: "Leiter Talentakquise",
      description: "Liefert ein komplettes Set für Stellenausschreibung, Interviews und Onboarding.",
      prompt: "Du bist unser Head of Talent Acquisition. Erstelle ein vollständiges Recruiting-Paket für die Position [Jobtitel].\nUnternehmenskontext\n·       Branche: [X]\n·       Grösse: [Y] Mitarbeitende\n·       Kultur: [Werte / Arbeitsweise]\n·       Zielgruppe: [Junior / Senior / Expert]\nLiefere:\n·       Eine Stellenausschreibung (modern, authentisch, ca. 300 Wörter)\n·       15 strukturierte Interviewfragen (aufgeteilt in Technical Fit und Cultural Fit)\n·       Eine Bewertungsmatrix für Kandidaten\n·       3 Absage-E-Mail-Templates (höflich, konstruktiv, professionell)\n·       Eine Onboarding-Checkliste für die erste Arbeitswoche\nStil:\n·       Direkt, ehrlich und auf Augenhöhe.",
      tags: ["Recruiting", "Talentakquise", "Onboarding"]
    }
  ],
  learning: [
    {
      title: "Lernarchitekt",
      description: "Identifiziert die 20 % Inhalte, die 80 % Verständnis liefern, inkl. Rückfragen.",
      prompt: "Du bist ein Fachanalyst und Lernarchitekt. Ich möchte mich in das Thema [XY] einarbeiten. Analysiere das gesamte Themenfeld und identifiziere die 20 % der Inhalte, Konzepte oder Teilbereiche, die 80 % des Gesamtverständnisses vermitteln.\nErstelle eine strukturierte Übersicht der wichtigsten Schlüsselthemen, ohne sie inhaltlich zu erklären. Stelle mir vorab alle Fragen, deren Antworten du benötigst, um die Auswahl optimal an meinen Kontext und mein Lernziel anzupassen.",
      tags: ["Lernen", "Pareto", "Effizienz"]
    },
    {
      title: "Erkläre [XY] ohne Vorwissen",
      description: "Erklärt schwierige Themen verständlich und mit greifbaren Beispielen.",
      prompt: "Erkläre mir den Themenbereich [XY] so, dass ich ihn auch ohne fachliches Vorwissen gut verstehen kann. Verwende anschauliche Beispiele aus dem Alltag und verzichte auf Fachjargon. Gliedere die Erklärung logisch und verständlich, sodass jedes Element auf dem vorherigen aufbaut. Stelle mir zum Schluss alle Fragen, deren Antworten dir helfen würden, meine Perspektive besser zu verstehen und die Erklärung bei Bedarf noch präziser auf mich zuzuschneiden.",
      tags: ["Erklärung", "Verständlichkeit", "Lernen"]
    },
    {
      title: "Individueller Lernplan [XY]",
      description: "Zeit‑ und stilgerechter Lernplan mit Tagesstruktur, Zielen, Vertiefungen, Methoden.",
      prompt: "Erstelle mir einen individuellen Lernplan für das Thema [XY], der auf folgende Rahmenbedingungen abgestimmt ist: Ich habe täglich [X] Minuten Zeit und möchte das Thema über [X] Tage oder Wochen hinweg lernen. Der Fokus liegt auf Praxisnähe, tiefem Verständnis und nachhaltigem Lernen. Gib mir eine Tagesstruktur mit konkreten Lernzielen, optionalen Vertiefungen und passenden Methoden. Stelle mir vorab alle Fragen, deren Antworten dir helfen, den Lernplan genau auf mich, meine Ziele und meinen bevorzugten Lernstil auszurichten.",
      tags: ["Lernplan", "Individualisierung", "Struktur"]
    },
    {
      title: "Expertenmodus",
      description: "Testet dein Wissen auf Expertenniveau, deckt Lücken auf und erklärt fehlende Punkte präzise und verständlich.",
      prompt: "Du bist ein Experte im Bereich [Themengebiet einfügen]. Stelle mir 10 Fragen, die nur jemand beantworten kann, der in diesem Gebiet wirklich fortgeschritten ist. Nutze meine Antworten, um mir zu zeigen, wo meine Wissenslücken liegen, und fülle diese Lücken mit klaren, vereinfachten Erklärungen.",
      tags: ["Expertise", "Testing", "Wissenslücken"]
    }
  ],
  organization: [
    {
      title: "Visions‑Workshop (Organisationsberater)",
      description: "Provokative Fragen, Imaginationsübung, Metapher; Kernwerte & Ziele zusammenfassen.",
      prompt: "Du bist ein erfahrener Organisationsberater, der einen Visions-Workshop moderiert. Stelle mir als Unternehmensleitung provokante Fragen, um unsere aktuelle Vision zu hinterfragen. Leite dann interaktiv an, wie wir als Führungsteam eine neue, inspirierende Vision entwickeln inkl. Imaginationsübung oder Metapher. Fasse am Ende die Kernwerte und Ziele prägnant zusammen.",
      tags: ["Vision", "Workshop", "Moderation"]
    },
    {
      title: "Kommunikations‑Silos aufbrechen",
      description: "Moderiertes Gespräch zwischen Abteilungen; Konflikte aufdecken; nächste Schritte.",
      prompt: "Simuliere ein moderiertes Gespräch zwischen zwei isolierten Abteilungen (z. B. Vertrieb & Entwicklung). Übernimm die Rolle eines Mediators, decke Konflikte auf, sorge für Aha-Momente und leite konkrete nächste Schritte ab, um die bereichsübergreifende Kommunikation zu verbessern.",
      tags: ["Kommunikation", "Silos", "Mediation"]
    },
    {
      title: "Innovationsstau lösen",
      description: "Anekdote, provokatives Brainstorming, drei Moonshots, motivierendes Zitat.",
      prompt: "Du bist Innovations-Coach. Beginne mit einer inspirierenden Anekdote. Führe mich dann durch ein kreatives Brainstorming mit provokativen Fragen. Lass mich 3 mutige ‚Moonshot'-Ideen entwickeln – ohne Einschränkungen. Gib motivierendes Feedback und ein Zitat, das Lust macht, ins Risiko zu gehen.",
      tags: ["Innovation", "Brainstorming", "Kreativität"]
    },
    {
      title: "Mitarbeiterbindung & Kultur stärken",
      description: "Rollenspiel, Analyse der Hauptprobleme, drei umsetzbare Empfehlungen.",
      prompt: "Führe ein Rollenspiel: 2–3 Mitarbeitende unterschiedlicher Ebenen sprechen ehrlich über Motivation, Führung und Kultur. Danach analysierst du als Leadership-Coach die Hauptprobleme und gibst 3 umsetzbare Empfehlungen, wie wir unsere Kultur und Mitarbeiterbindung stärken können.",
      tags: ["Kultur", "Mitarbeiterbindung", "Leadership"]
    }
  ],
  coaching: [
    {
      title: "Brutal ehrlicher Berater",
      description: "Schonungsloser Audit mit fünf Abschnitten; fordert Verantwortung ein.",
      prompt: "Sie sind ein brutal ehrlicher Berater. Ziel: mir die direkte Wahrheit sagen, die genug weh tut, um mich wachsen zu lassen.\n\nRegeln:\n·       Keine Floskeln, Komplimente oder Haftungsausschlüsse\n·       Stelle meine Annahmen in Frage, entlarve Ausreden, weise auf vergebliche Mühe hin\n·       Wenn mein Anliegen vage ist, stelle zunächst präzise Folgefragen.\n·       Denke intern Schritt für Schritt und zeige nur die endgültige Antwort\nAusgabe jeweils in fünf Abschnitten:\n·       Brutal Audit\no   was ich falsch mache, unterschätzt oder vermeide.\no   Blinde Flecken und Risiken\no   versteckte Gefahren, die ich nicht sehe.\no   Rücksichtslose Prioritäten\no   die 3 wichtigsten Massnahmen, auf die ich mich jetzt konzentrieren muss.\n·       Geschwindigkeits- und Energiefixes\n·       wie ich mich schneller oder mit besserer Intensität bewegen kann.\nNächste Check-in-Frage - eine Frage, die mich zur Verantwortung zieht.\nFügen Sie eine beliebige Situation oder Frage nach dieser Zeile ein [DEINE FRAGE / SITUATION]",
      tags: ["Feedback", "Kritik", "Entwicklung"]
    },
    {
      title: "Zukunfts-Ich",
      description: "Drei Entscheidungen, die ich heute anders träfe; Folgen reflektieren.",
      prompt: "Du bist mein zukünftiges Ich, 10 Jahre älter, erfolgreich, ruhig und klar. Du interviewst mich über drei Entscheidungen, die ich heute anders treffen würde. Beschreibe, welche Entscheidungen das sind und welche Folgen sie hatten, positiv wie negativ.",
      tags: ["Zukunft", "Reflexion", "Entscheidungen"]
    },
    {
      title: "Lebensweisheit – 10 Prinzipien für ein starkes und erfülltes Leben",
      description: "Verdichtet Lebenserfahrung zu zeitlosen Prinzipien, die Orientierung, Klarheit und Fokus für wichtige Lebensphasen geben.",
      prompt: "Stell dir vor, du hast 100 Jahre gelebt und alle Facetten des Lebens erlebt. Basierend auf deiner Lebenserfahrung: Welche 10 kraftvollen Wahrheiten oder Prinzipien sollte jemand in [Situation oder Alter einfügen] jetzt kennen, um Fehlentscheidungen zu vermeiden und ein erfülltes, starkes Leben aufzubauen?",
      tags: ["Lebensweisheit", "Prinzipien", "Reflexion"]
    },
    {
      title: "Kreativitäts‑Coaching",
      description: "Dreiteiliges Coaching mit Prinzipien, Übungen und Reflexionsfragen.",
      prompt: "Du bist Leonardo da Vinci. Ich bin dein Schüler. Führe mich durch ein dreiteiliges Coaching, das mir hilft, kreativer zu denken, Muster zwischen unterschiedlichen Disziplinen zu erkennen und meine Neugier systematisch zu schärfen. Erkläre mir deine Prinzipien, gib mir praktische Übungen wie du sie selbst durchgeführt hättest (Zeichnen, Beobachten, Kombinieren) und stelle mir tiefgehende Reflexionsfragen, die meine Vorstellungskraft trainieren. Sprich zu mir so, als würdest du mich persönlich unterrichten.",
      tags: ["Kreativität", "Coaching", "Persönlichkeitsentwicklung"]
    },
    {
      title: "Selbstverwirklichung",
      description: "Schattenarbeit, Archetypen, Individuation; Übungen und Fragen.",
      prompt: "Du bist Carl Gustav Jung. Ich bin dein Coaching-Klient. Leite mich durch ein tiefgehendes Coaching, bei dem ich meine Schatten erkenne, innere Widersprüche integriere und meinem wahren Selbst näherkomme. Erkläre mir Archetypen, das kollektive Unbewusste und das Konzept der Individuation in klarer Sprache. Gib mir dazu Übungen zur Selbsterforschung (z. B. Traumtagebuch, aktive Imagination) und Reflexionsfragen, die mir helfen, mein Innerstes ehrlich zu erforschen. Sprich mit mir, als würdest du mich durch meine eigene seelische Alchemie führen.",
      tags: ["Selbstverwirklichung", "Jung", "Tiefenpsychologie"]
    },
    {
      title: "Story & Wirkung",
      description: "Geschichte erzählen, emotionale Intelligenz stärken, Übungen und Fragen.",
      prompt: "Du bist Oprah Winfrey. Ich bin dein Coachee. Begleite mich in einem dreistufigen Coaching, bei dem ich lerne, meine Geschichte mit Kraft und Klarheit zu erzählen, meine emotionale Intelligenz zu stärken und in Gesprächen mehr Tiefe zu erzeugen. Teile mit mir deine wichtigsten Erkenntnisse aus deinem Leben, gib mir Übungen, mit denen ich meine Selbstwirksamkeit steigere, und stelle mir Fragen, die mich zum Nachdenken bringen – über meine Wirkung, mein Potenzial und meine Botschaft an die Welt. Sprich mit mir, als würdest du mir auf deinem Sofa gegenüber sitzen.",
      tags: ["Emotionale Intelligenz", "Storytelling", "Wirkung"]
    },
    {
      title: "Vertrauen & Kommunikation",
      description: "Kommunikationsprinzipien, Übungen, schwierige Situationen, Reflexion.",
      prompt: "Du bist Dale Carnegie. Ich bin eine Führungspersönlichkeit und möchte lernen, Menschen für mich zu gewinnen, Vertrauen aufzubauen und souverän zu kommunizieren. Führe mich durch ein praxisnahes Coaching, in dem du mir deine wichtigsten Kommunikationsprinzipien vermittelst. Gib mir konkrete Übungen für Gespräche, ehrliches Feedback, Tipps für schwierige Situationen und Reflexionsfragen, um meine Wirkung auf andere besser zu verstehen. Sprich mit mir wie ein persönlicher Mentor im Businessalltag – klar, bestärkend und menschlich.",
      tags: ["Kommunikation", "Vertrauen", "Leadership"]
    }
  ],
  promptEngineering: [
    {
      title: "Megaprompt",
      description: "Iterativer Prozess zur Prompt‑Optimierung mit Fragen, verfeinertem Prompt und Guidance.",
      prompt: "Du bist mein Prompt Creator. Deine Aufgabe ist es, die bestmöglichen Prompts für meine Zwecke zu generieren. Generiere für mich Prompts, die von Dir bestmöglich verwendet werden können. Bitte gehe dabei wie folgt vor:\n\nFrage mich zunächst, was meine Fragestellung ist und was ich mit meinem Prompt erreichen möchte. Ich gebe Dir eine Antwort, die Du durch iteratives Fragen an mich so verfeinerst, dass Du bestmöglich damit arbeiten kannst.\n\nAuf Basis meiner verfeinerten Antworten generiere bitte im ersten Schritt einen deutlich verfeinerten Prompt. Er soll klar, präzise und für Dich gut verständlich sein. Mache mir dann bitte im zweiten Schritt Vorschläge, welche Details und weitere Kontextinformationen wir für den verfeinerten Prompt zusätzlich benötigen, um noch zu besseren Ergebnissen zu führen.\n\nDer Prompt, den Du nun generierst, sollte die Form einer Anfrage von mir an Dich haben.\n\nWir werden gemeinsam den iterativen Prozess fortsetzen, indem Du mir weitere Fragen stellst, um die bestmöglichen Prompts zu meiner Fragestellung zu erstellen. Fordere mich auch auf, das Format des finalen Ergebnisses zu definieren.",
      tags: ["Prompt Engineering", "Optimierung", "Iteration"]
    },
    {
      title: "Tree of Thoughts",
      description: "Simuliert eine Expertenrunde, die verschiedene Denkwege vergleicht und die fundierteste Lösung herausfiltert.",
      prompt: "Drei Experten diskutieren gemeinsam deine Frage. Jeder von ihnen erklärt seinen Denkprozess Schritt für Schritt, danach tauscht sich die Gruppe über die Ergebnisse aus. Wer eine falsche Annahme trifft, scheidet aus der Runde aus. Zum Schluss fasst der verbleibende Experte die beste, logischste Lösung zusammen.\nDie Frage: [Dein Problem]",
      tags: ["Reasoning", "Multi-Perspektive", "AI"]
    },
    {
      title: "Self-Consistency",
      description: "Vergleicht mehrere Lösungswege und identifiziert die Antwort, die logisch und inhaltlich am stabilsten ist.",
      prompt: "Beantworte diese Frage 5x mit unterschiedlichen Ansätzen: [Deine Frage]. Zeige dann die konsistenteste Antwort.",
      tags: ["Konsistenz", "Validierung", "AI"]
    },
    {
      title: "Chain‑of‑Thought",
      description: "Schritt‑für‑Schritt‑Argumentation explizit anfordern.",
      prompt: "Lass uns Schritt für Schritt denken",
      tags: ["CoT", "Reasoning", "Struktur"]
    },
    {
      title: "Meta‑Prompting",
      description: "Zuerst den optimalen Prompt entwerfen, fehlende Details erfragen, dann lösen.",
      prompt: "Erstelle erst den optimalen Prompt für: [Deine Aufgabe]. Frage nach fehlenden Details, dann löse die Aufgabe.",
      tags: ["Meta", "Prompt Design", "Optimierung"]
    }
  ],
  quality: [
    {
      title: "Der Kontextturbo",
      description: "Erzwingt fünf präzise Folgefragen, um Kontext zu klären und die Antwortqualität zu steigern.",
      prompt: "Stelle mir fünf Folgefragen, deren Antworten dir helfen werden, die Antwort signifikant zu verbessern.",
      tags: ["Kontext", "Fragen", "Qualität"]
    },
    {
      title: "Der Experte",
      description: "Blick der Top‑1 % auf die Antwort; nutzt Frameworks für Optimierungen.",
      prompt: "Was würden die Top 1 % der Experten in diesem Themenfeld über deine Antwort denken? Nutze relevante Frameworks, um Optimierungen zu evaluieren und vorzuschlagen.",
      tags: ["Expertise", "Frameworks", "Review"]
    },
    {
      title: "Der Qualitätsmanager",
      description: "Systematische Prüfung auf Genauigkeit, Vollständigkeit und Konsistenz vor Ausgabe.",
      prompt: "Prüfe deine Antwort systematisch auf Genauigkeit, Vollständigkeit und interne Konsistenz – korrigiere oder ergänze, falls nötig, bevor du sie mir gibst.",
      tags: ["Qualität", "Prüfung", "Validierung"]
    },
    {
      title: "Der Challenger",
      description: "Hinterfragt Annahmen, öffnet neue Perspektiven.",
      prompt: "Fordere meine Annahmen heraus und hilf mir, dieses Problem aus einer neuen Perspektive zu durchdenken.",
      tags: ["Kritik", "Perspektive", "Reflexion"]
    },
    {
      title: "Der Klarheitsbooster",
      description: "Verständliche Formulierung, einfache Sprache, Zwei‑Satz‑Summary.",
      prompt: "Formuliere dein Ergebnis so verständlich wie möglich: nutze kurze Sätze, vermeide Fachjargon (oder erkläre ihn) und gib eine knappe Zusammenfassung in zwei Sätzen.",
      tags: ["Klarheit", "Verständlichkeit", "Kommunikation"]
    },
    {
      title: "Der Evidenzlieferant",
      description: "Belegt Hauptaussagen mit Quelle, Beispiel oder Begründung.",
      prompt: "Belege jede Hauptaussage mit mindestens einer zuverlässigen Quelle, einem belastbaren Beispiel oder einer eindeutigen Begründung, damit ich die Aussage nachvollziehen kann.",
      tags: ["Evidenz", "Quellen", "Nachvollziehbarkeit"]
    },
    {
      title: "Der Strukturierer",
      description: "Logische Ordnung, Überschriften, Listen, ggf. visuell.",
      prompt: "Ordne die Informationen logisch mit aussagekräftigen Überschriften, Aufzählungen und – falls sinnvoll – einer visuellen Darstellung (z. B. Tabelle, Diagramm) für den schnellen Überblick.",
      tags: ["Struktur", "Organisation", "Übersicht"]
    },
    {
      title: "Der Endanwender‑Tester",
      description: "Perspektive eines kritischen Endnutzers plus kurze Antworten auf Einwände.",
      prompt: "Versetze dich in einen kritischen Endnutzer: welche Fragen oder Einwände hätte er? Ergänze deine Antwort um kurze Reaktionen auf diese möglichen Rückfragen.",
      tags: ["Nutzerperspektive", "Testing", "Usability"]
    }
  ],
  criticalAnalysis: [
    {
      title: "Stelle mir 5 Fragen, die das Ergebnis verbessern",
      description: "Kurze Vorfrage‑Schicht vor Antwort.",
      prompt: "Stelle mir 5 Fragen, die das Ergebnis von dir verbessern würden, bevor du antwortest.",
      tags: ["Fragen", "Qualität", "Kontext"]
    },
    {
      title: "Agiere wie ein Kritiker – Schonungslose Analyse",
      description: "Strenge Kritik zur Qualitätssteigerung.",
      prompt: "Agiere wie ein Kritiker. Sei schonungslos. Analysiere den Text und sage mir wo er noch besser sein könnte.",
      tags: ["Kritik", "Analyse", "Verbesserung"]
    },
    {
      title: "Löse mein Problem – erst 10/20 Fragen",
      description: "Tiefe Kontextklärung via Frageblock vor Lösung.",
      prompt: "Löse mir nachfolgendes Problem. Stelle mir 10 / 20 Fragen dazu, damit du besser verstehst um was es geht.",
      tags: ["Problem Solving", "Fragen", "Klärung"]
    }
  ]
};

export const frameworkContentDE: FrameworkContentTranslations = {
  mission: [
    {
      title: "R-A-I-N",
      description: "Ein kompaktes Struktur-Framework, das hilft, präzise Anweisungen für Aufgaben zu formulieren",
      structure: "R – Act as a (ROLE): Definiere die Rolle\nA – State the (AIM): Formuliere das Ziel\nI – Use the provided (INPUT): Bestimme Material/Daten\nN – Hit the (NUMERIC TARGET): Lege messbare Ziele fest",
      tags: ["Struktur", "Anweisung", "Ziel"]
    },
    {
      title: "R-I-S-E-N",
      description: "Dient zur strukturierten Erstellung konsistenter Outputs",
      structure: "R – Role (Rolle): 'Als [Experte/Funktion]'\nI – Instructions (Anweisung): 'Erstelle/Analysiere/Entwirf [Aufgabe]'\nS – Steps (Schritte): '1) … 2) … 3) …'\nE – End Goal (Endziel): 'Ziel: [Ergebnis]'\nN – Narrowing (Eingrenzung): 'Fokus auf [Grenzen/Themenbereich]'",
      tags: ["Struktur", "Output", "Konsistenz"]
    },
    {
      title: "R-A-Z-I-A",
      description: "Struktur zur klaren Aufgabenbeschreibung mit Rollendefinition, Ziel, Kontext und Ausgabeformat",
      structure: "R – Rolle: Du agierst als [Rolle]\nA – Aufgabe: Deine Aufgabe ist [Aufgabe]\nZ – Ziel: Das Ziel der Aufgabe ist [Ziel]\nI – Informationen: Zusatzinformationen und Kontext\nA – Ausgabeformat: Format [z. B. Tabelle, Bericht]",
      tags: ["Aufgabe", "Rolle", "Format"]
    },
    {
      title: "R-A-Z-Z-I-A",
      description: "Eine erweiterte Version von RAZIA, ergänzt um eine Zielgruppenorientierung",
      structure: "R – Rolle: Du agierst als [Rolle]\nA – Aufgabe: Deine Aufgabe ist [Aufgabe]\nZ – Ziel: Das Ziel der Aufgabe ist [Ziel]\nZ – Zielgruppe: Ausgerichtet auf [Zielgruppe]\nI – Informationen: Zusatzinformationen und Kontext\nA – Ausgabeformat: Format [z. B. Tabelle, Bericht]",
      tags: ["Aufgabe", "Zielgruppe", "Format"]
    },
    {
      title: "A-I-D-A",
      description: "Ein klassisches Marketing- und Kommunikations-Framework",
      structure: "A – Attention (Aufmerksamkeit): Wie erregen wir Aufmerksamkeit?\nI – Interest (Interesse): Wie wecken wir Interesse?\nD – Desire (Verlangen): Wie erzeugen wir Verlangen/Emotionen?\nA – Action (Handlung): Welche konkrete Handlung soll erfolgen?",
      tags: ["Marketing", "Kommunikation", "Conversion"]
    }
  ],
  thinking: [
    {
      title: "C-L-A-R",
      description: "Gedankenstruktur für klare, logische Aufgabenformulierungen",
      structure: "C – Context (Kontext): Beschreibe die Ausgangslage\nL – Limits (Grenzen): Nenne Einschränkungen/Bedingungen\nA – Action (Handlung): Definiere, was getan werden soll\nR – Result (Ergebnis): Beschreibe das gewünschte Resultat",
      tags: ["Logik", "Struktur", "Klarheit"]
    },
    {
      title: "P-I-V-O",
      description: "Ein reflektives Framework für strategisches Denken und Argumentationsaufbau",
      structure: "P – Problem: Beschreibe das zu lösende Problem\nI – Insights (Erkenntnisse): Wichtigste Erkenntnisse/Beobachtungen\nV – Voice (Stimme): Definiere Ton oder Perspektive\nO – Outcome (Ergebnis): Was soll erreicht werden?",
      tags: ["Strategie", "Reflexion", "Argumentation"]
    },
    {
      title: "S-E-E-D",
      description: "Eine Denkstruktur für zielgerichtete Planung und Output-Definition",
      structure: "S – Situation: Beschreibe aktuelle Situation/Problem\nE – Endgoal (Endziel): Definiere gewünschtes Ergebnis\nE – Examples (Beispiele): Führe Beispiele/Referenzen an\nD – Deliverables (Ergebnisse): Konkrete zu liefernde Outputs",
      tags: ["Planung", "Ziel", "Output"]
    },
    {
      title: "S-M-A-R-T",
      description: "Klassisches Management- und Zielsetzungsframework zur Definition klarer, überprüfbarer und erreichbarer Ziele",
      structure: "S – Specific (Spezifisch): Was genau soll erreicht werden?\nM – Measurable (Messbar): Wie wird Erfolg gemessen?\nA – Achievable (Erreichbar): Ist das Ziel realistisch?\nR – Relevant (Relevant): Warum ist das Ziel wichtig?\nT – Time-bound (Zeitgebunden): Bis wann soll es erreicht werden?",
      tags: ["Ziele", "Management", "Messbarkeit"]
    },
    {
      title: "5-W-1-H",
      description: "Ein journalistisches und analytisches Framework, das hilft, Situationen vollständig zu verstehen und zu planen",
      structure: "Who (Wer): Wer ist beteiligt?\nWhat (Was): Was soll erreicht werden?\nWhen (Wann): Wann soll es geschehen?\nWhere (Wo): Wo findet es statt?\nWhy (Warum): Warum ist es wichtig?\nHow (Wie): Wie wird es umgesetzt?",
      tags: ["Analyse", "Planung", "Vollständigkeit"]
    }
  ],
  expression: [
    {
      title: "F-L-O-W",
      description: "Ein Ausdrucks- und Kommunikationsframework, das hilft, zielgerichtet Inhalte zu produzieren",
      structure: "F – Function (Funktion): Definiere den Zweck/die Aufgabe\nL – Level (Niveau): Lege Wissensniveau/Zielgruppe fest\nO – Output (Ergebnis): Bestimme, was geliefert wird\nW – Win Metric (Erfolgskriterium): Woran wird Erfolg gemessen?",
      tags: ["Kommunikation", "Content", "Zielgruppe"]
    }
  ],
  interaction: [
    {
      title: "C-O-A-C-H",
      description: "Ein Framework für beratende oder unterstützende Interaktionen – ideal für Coaching, Mentoring, Feedbackgespräche oder KI-Dialoge, bei denen der Nutzer begleitet statt belehrt wird",
      structure: "C – Clarify (Klären): Verstehe Situation und Ziel der Person\nO – Observe (Beobachten): Erfasse Muster, Stärken, Herausforderungen\nA – Ask (Fragen): Stelle gezielte Fragen zum Denken anregen\nC – Challenge (Hinterfragen): Fordere Annahmen sanft heraus\nH – Help (Unterstützen): Biete Handlungsoptionen/Perspektiven an",
      tags: ["Coaching", "Mentoring", "Feedback"]
    },
    {
      title: "B-R-I-D-G-E",
      description: "Entwickelt für kooperative Kommunikation – etwa bei Konfliktlösung, Teamabstimmung oder Verhandlung. Ziel ist es, Brücken zwischen Perspektiven zu schlagen",
      structure: "B – Background (Hintergrund): Kläre Ausgangslage und Parteien\nR – Respect (Respekt): Anerkenne unterschiedliche Positionen\nI – Identify (Identifizieren): Benenne gemeinsames Ziel/Nutzen\nD – Discuss (Diskutieren): Erörtere Ideen offen und respektvoll\nG – Generate (Erzeugen): Entwickle gemeinsam Lösungen/Kompromisse\nE – Evaluate (Bewerten): Prüfe Tragfähigkeit der Lösung",
      tags: ["Konfliktlösung", "Verhandlung", "Zusammenarbeit"]
    },
    {
      title: "L-O-O-P",
      description: "Ein dynamisches Interaktions-Framework für iterative Prozesse – Feedback, Lernen, Produktentwicklung oder fortlaufende Kommunikation. Es betont Kreislaufdenken und Anpassung",
      structure: "L – Listen (Zuhören): Nimm wahr, was gesagt/gemeint/unausgesprochen ist\nO – Observe (Beobachten): Analysiere Reaktionen/Daten/Ergebnisse\nO – Optimize (Optimieren): Passe Verhalten/Argumentation/Output an\nP – Provide (Liefern): Gib Rückmeldung/verbessertes Ergebnis/nächste Schritte",
      tags: ["Iteration", "Feedback", "Optimierung"]
    }
  ]
};
