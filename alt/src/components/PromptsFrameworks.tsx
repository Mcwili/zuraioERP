import { useState, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  FileText,
  Search,
  ChevronDown,
  Copy,
  TrendingUp,
  Calendar,
  Target,
  Users,
  Briefcase,
  DollarSign,
  UserPlus,
  GraduationCap,
  Network,
  Lightbulb,
  Code,
  CheckCircle,
  HelpCircle,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Copy as CopyIcon,
  X,
  Layers
} from "lucide-react";
import { useLanguage, useExtendedTranslations } from "../utils/i18n";
import { useTranslatedPrompts } from "../utils/useTranslatedPrompts";
import { useTranslatedFrameworks } from "../utils/useTranslatedFrameworks";

interface PromptItem {
  title: string;
  description: string;
  prompt: string;
  tags: string[];
}

interface FrameworkItem {
  title: string;
  description: string;
  structure: string;
  tags: string[];
}

interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  prompts?: PromptItem[];
  frameworks?: FrameworkItem[];
}

interface PromptsFrameworksProps {
  section?: string;
  isDarkMode?: boolean;
}

interface EditPromptData {
  categoryId: string;
  promptIndex: number;
  title: string;
  description: string;
  prompt: string;
}

interface EditFrameworkData {
  categoryId: string;
  frameworkIndex: number;
  title: string;
  description: string;
  structure: string;
}

export function PromptsFrameworks({ section = "library", isDarkMode = false }: PromptsFrameworksProps) {
  const { t, language } = useLanguage();
  const tExt = useExtendedTranslations();
  const translatedPrompts = useTranslatedPrompts();
  const translatedFrameworks = useTranslatedFrameworks();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [editMode, setEditMode] = useState<'edit' | 'duplicate' | 'new'>('edit');
  const [editPromptData, setEditPromptData] = useState<EditPromptData | null>(null);
  const [editFrameworkData, setEditFrameworkData] = useState<EditFrameworkData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ categoryId: string; itemIndex: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useClickOutside(panelRef, () => {
    if (editPanelOpen) {
      setEditPanelOpen(false);
      setEditPromptData(null);
      setEditFrameworkData(null);
    }
  }, editPanelOpen);

  const [promptCategories, setPromptCategories] = useState<CategoryData[]>([
    {
      id: "market",
      name: t.promptsFrameworks.categoryNames.market,
      description: t.promptsFrameworks.categoryDescriptions.market,
      icon: Target,
      color: "#0078D4",
      prompts: translatedPrompts.prompts.market.length > 0
        ? translatedPrompts.prompts.market
        : [
        // Fallback to German if translations not available (should not happen anymore)
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
      ]
    },
    {
      id: "planning",
      name: t.promptsFrameworks.categoryNames.planning,
      description: t.promptsFrameworks.categoryDescriptions.planning,
      icon: Calendar,
      color: "#5ebc67",
      prompts: translatedPrompts.prompts.planning.length > 0
        ? translatedPrompts.prompts.planning
        : [
        // Fallback to German if translations not available
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
      ]
    },
    {
      id: "strategy",
      name: t.promptsFrameworks.categoryNames.strategy,
      description: t.promptsFrameworks.categoryDescriptions.strategy,
      icon: Briefcase,
      color: "#8B5CF6",
      prompts: translatedPrompts.prompts.strategy.length > 0
        ? translatedPrompts.prompts.strategy
        : [
        // Fallback to German if translations not available
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
      ]
    },
    {
      id: "sales",
      name: t.promptsFrameworks.categoryNames.sales,
      description: t.promptsFrameworks.categoryDescriptions.sales,
      icon: TrendingUp,
      color: "#DE851D",
      prompts: translatedPrompts.prompts.sales.length > 0
        ? translatedPrompts.prompts.sales
        : [
        // Fallback to German
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
      ]
    },
    {
      id: "service",
      name: t.promptsFrameworks.categoryNames.service,
      description: t.promptsFrameworks.categoryDescriptions.service,
      icon: Users,
      color: "#E9C796",
      prompts: translatedPrompts.prompts.service.length > 0
        ? translatedPrompts.prompts.service
        : [
        {
          title: "Optimierung unseres FAQ",
          description: "Strukturiert Supportfragen in klare, empathische FAQs und verbessert Kunden-Self-Service.",
          prompt: "Du bist unser Head of Customer Success. Analysiere unsere Support-Tickets und optimiere den Self-Service.\nInput: [Liste der häufigsten Kundenanfragen der letzten 6 Monate]\n\nErstelle:\n25 FAQ-Einträge, priorisiert nach Häufigkeit\nPro Antwort: Problem verstehen → Lösung → Prävention\nJede Antwort maximal 80 Wörter\n10 proaktive FAQs (Fragen, die Kunden künftig stellen könnten)\nKategorien für eine bessere Navigation\n\nStil: Empathisch, lösungsorientiert, klar – keine Floskeln.\n\nBonus: Kennzeichne, welche FAQs sich direkt in einen Chatbot integrieren lassen.",
          tags: ["FAQ", "Self-Service", "Support"]
        }
      ]
    },
    {
      id: "finance",
      name: t.promptsFrameworks.categoryNames.finance,
      description: t.promptsFrameworks.categoryDescriptions.finance,
      icon: DollarSign,
      color: "#10B981",
      prompts: translatedPrompts.prompts.finance.length > 0
        ? translatedPrompts.prompts.finance
        : [
        {
          title: "CFO Executive Dashboard",
          description: "Erstellt ein visuelles 1-Seiten-Dashboard mit Insights, Risiken, Chancen und Empfehlungen.",
          prompt: "Du bist unser CFO. Analysiere die folgenden Finanzdaten: [Rohdaten einfügen: Umsatz, Kosten, Cashflow, KPIs]\nErstelle daraus ein Executive Dashboard mit folgenden Elementen:\n·       One-Page Executive Summary\n·       Top 3 Insights (Was ist aussergewöhnlich?)\n·       Top 3 Risiken (Worauf müssen wir achten?)\n·       Top 3 Chancen (Was sollten wir nutzen?)\n·       5 konkrete Handlungsempfehlungen mit Priorisierung\n·       Formatvorgaben:\no   Wichtige Kennzahlen in Boxes hervorheben\no   Trends mit ↑↓ Pfeilen darstellen\no   Ampel-System (🟢🟡🔴) für Statusbewertung verwenden\no   Ergebnis soll maximal eine Seite umfassen und in 2 Minuten erfassbar sein",
          tags: ["CFO", "Dashboard", "Reporting"]
        }
      ]
    },
    {
      id: "hr",
      name: t.promptsFrameworks.categoryNames.hr,
      description: t.promptsFrameworks.categoryDescriptions.hr,
      icon: UserPlus,
      color: "#F59E0B",
      prompts: translatedPrompts.prompts.hr.length > 0
        ? translatedPrompts.prompts.hr
        : [
        {
          title: "Leiter Talentakquise",
          description: "Liefert ein komplettes Set für Stellenausschreibung, Interviews und Onboarding.",
          prompt: "Du bist unser Head of Talent Acquisition. Erstelle ein vollständiges Recruiting-Paket für die Position [Jobtitel].\nUnternehmenskontext\n·       Branche: [X]\n·       Grösse: [Y] Mitarbeitende\n·       Kultur: [Werte / Arbeitsweise]\n·       Zielgruppe: [Junior / Senior / Expert]\nLiefere:\n·       Eine Stellenausschreibung (modern, authentisch, ca. 300 Wörter)\n·       15 strukturierte Interviewfragen (aufgeteilt in Technical Fit und Cultural Fit)\n·       Eine Bewertungsmatrix für Kandidaten\n·       3 Absage-E-Mail-Templates (höflich, konstruktiv, professionell)\n·       Eine Onboarding-Checkliste für die erste Arbeitswoche\nStil:\n·       Direkt, ehrlich und auf Augenhöhe.",
          tags: ["Recruiting", "Talentakquise", "Onboarding"]
        }
      ]
    },
    {
      id: "learning",
      name: t.promptsFrameworks.categoryNames.learning,
      description: t.promptsFrameworks.categoryDescriptions.learning,
      icon: GraduationCap,
      color: "#EC4899",
      prompts: translatedPrompts.prompts.learning.length > 0
        ? translatedPrompts.prompts.learning
        : [
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
      ]
    },
    {
      id: "organization",
      name: t.promptsFrameworks.categoryNames.organization,
      description: t.promptsFrameworks.categoryDescriptions.organization,
      icon: Network,
      color: "#6366F1",
      prompts: translatedPrompts.prompts.organization.length > 0
        ? translatedPrompts.prompts.organization
        : [
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
      ]
    },
    {
      id: "coaching",
      name: t.promptsFrameworks.categoryNames.coaching,
      description: t.promptsFrameworks.categoryDescriptions.coaching,
      icon: Lightbulb,
      color: "#14B8A6",
      prompts: translatedPrompts.prompts.coaching.length > 0
        ? translatedPrompts.prompts.coaching
        : [
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
      ]
    },
    {
      id: "prompt-engineering",
      name: t.promptsFrameworks.categoryNames.promptEngineering,
      description: t.promptsFrameworks.categoryDescriptions.promptEngineering,
      icon: Code,
      color: "#A855F7",
      prompts: translatedPrompts.prompts.promptEngineering.length > 0
        ? translatedPrompts.prompts.promptEngineering
        : [
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
      ]
    },
    {
      id: "quality",
      name: t.promptsFrameworks.categoryNames.quality,
      description: t.promptsFrameworks.categoryDescriptions.quality,
      icon: CheckCircle,
      color: "#EF4444",
      prompts: translatedPrompts.prompts.quality.length > 0
        ? translatedPrompts.prompts.quality
        : [
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
      ]
    },
    {
      id: "critical-analysis",
      name: t.promptsFrameworks.categoryNames.criticalAnalysis,
      description: t.promptsFrameworks.categoryDescriptions.criticalAnalysis,
      icon: HelpCircle,
      color: "#64748B",
      prompts: translatedPrompts.prompts.criticalAnalysis.length > 0
        ? translatedPrompts.prompts.criticalAnalysis
        : [
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
    }
  ]);

  const [frameworkCategories, setFrameworkCategories] = useState<CategoryData[]>([
    {
      id: "mission",
      name: t.promptsFrameworks.categoryNames.mission,
      description: t.promptsFrameworks.categoryDescriptions.mission,
      icon: Target,
      color: "#DE851D",
      frameworks: translatedFrameworks.frameworks.mission.length > 0
        ? translatedFrameworks.frameworks.mission
        : [
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
      ] // Fallback frameworks if translation not available
    },
    {
      id: "thinking",
      name: t.promptsFrameworks.categoryNames.thinking,
      description: t.promptsFrameworks.categoryDescriptions.thinking,
      icon: Lightbulb,
      color: "#8B5CF6",
      frameworks: translatedFrameworks.frameworks.thinking.length > 0
        ? translatedFrameworks.frameworks.thinking
        : [
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
      ] // Fallback frameworks if translation not available
    },
    {
      id: "expression",
      name: t.promptsFrameworks.categoryNames.expression,
      description: t.promptsFrameworks.categoryDescriptions.expression,
      icon: FileText,
      color: "#10B981",
      frameworks: translatedFrameworks.frameworks.expression.length > 0
        ? translatedFrameworks.frameworks.expression
        : [
        {
          title: "F-L-O-W",
          description: "Ein Ausdrucks- und Kommunikationsframework, das hilft, zielgerichtet Inhalte zu produzieren",
          structure: "F – Function (Funktion): Definiere den Zweck/die Aufgabe\nL – Level (Niveau): Lege Wissensniveau/Zielgruppe fest\nO – Output (Ergebnis): Bestimme, was geliefert wird\nW – Win Metric (Erfolgskriterium): Woran wird Erfolg gemessen?",
          tags: ["Kommunikation", "Content", "Zielgruppe"]
        }
      ] // Fallback frameworks if translation not available
    },
    {
      id: "interaction",
      name: t.promptsFrameworks.categoryNames.interaction,
      description: t.promptsFrameworks.categoryDescriptions.interaction,
      icon: Users,
      color: "#0078D4",
      frameworks: translatedFrameworks.frameworks.interaction.length > 0
        ? translatedFrameworks.frameworks.interaction
        : [
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
      ] // Fallback frameworks if translation not available
    }
  ]);

  const filteredPromptCategories = promptCategories.filter(cat =>
    searchQuery === "" ||
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFrameworkCategories = frameworkCategories.filter(cat =>
    searchQuery === "" ||
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleCopyPrompt = (prompt: string, promptId: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(promptId);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const handleEditPrompt = (categoryId: string, promptIndex: number) => {
    const category = promptCategories.find(cat => cat.id === categoryId);
    if (category && category.prompts && category.prompts[promptIndex]) {
      const prompt = category.prompts[promptIndex];
      setEditPromptData({
        categoryId,
        promptIndex,
        title: prompt.title,
        description: prompt.description,
        prompt: prompt.prompt
      });
      setEditFrameworkData(null);
      setEditMode('edit');
      setEditPanelOpen(true);
    }
  };

  const handleEditFramework = (categoryId: string, frameworkIndex: number) => {
    const category = frameworkCategories.find(cat => cat.id === categoryId);
    if (category && category.frameworks && category.frameworks[frameworkIndex]) {
      const framework = category.frameworks[frameworkIndex];
      setEditFrameworkData({
        categoryId,
        frameworkIndex,
        title: framework.title,
        description: framework.description,
        structure: framework.structure
      });
      setEditPromptData(null);
      setEditMode('edit');
      setEditPanelOpen(true);
    }
  };

  const handleDuplicatePrompt = (categoryId: string, promptIndex: number) => {
    const category = promptCategories.find(cat => cat.id === categoryId);
    if (category && category.prompts && category.prompts[promptIndex]) {
      const prompt = category.prompts[promptIndex];
      setEditPromptData({
        categoryId,
        promptIndex: -1,
        title: `${prompt.title} ${t.promptsFrameworks.copySuffix}`,
        description: prompt.description,
        prompt: prompt.prompt
      });
      setEditFrameworkData(null);
      setEditMode('duplicate');
      setEditPanelOpen(true);
    }
  };

  const handleDuplicateFramework = (categoryId: string, frameworkIndex: number) => {
    const category = frameworkCategories.find(cat => cat.id === categoryId);
    if (category && category.frameworks && category.frameworks[frameworkIndex]) {
      const framework = category.frameworks[frameworkIndex];
      setEditFrameworkData({
        categoryId,
        frameworkIndex: -1,
        title: `${framework.title} ${t.promptsFrameworks.copySuffix}`,
        description: framework.description,
        structure: framework.structure
      });
      setEditPromptData(null);
      setEditMode('duplicate');
      setEditPanelOpen(true);
    }
  };

  const handleNewPrompt = () => {
    setEditPromptData({
      categoryId: promptCategories[0].id,
      promptIndex: -1,
      title: '',
      description: '',
      prompt: ''
    });
    setEditFrameworkData(null);
    setEditMode('new');
    setEditPanelOpen(true);
  };

  const handleNewFramework = () => {
    setEditFrameworkData({
      categoryId: frameworkCategories[0].id,
      frameworkIndex: -1,
      title: '',
      description: '',
      structure: ''
    });
    setEditPromptData(null);
    setEditMode('new');
    setEditPanelOpen(true);
  };

  const handleDeletePrompt = (categoryId: string, promptIndex: number) => {
    setDeleteTarget({ categoryId, itemIndex: promptIndex });
    setDeleteDialogOpen(true);
  };

  const handleDeleteFramework = (categoryId: string, frameworkIndex: number) => {
    setDeleteTarget({ categoryId, itemIndex: frameworkIndex });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      if (section === "library") {
        setPromptCategories(prevCategories => {
          return prevCategories.map(category => {
            if (category.id === deleteTarget.categoryId) {
              return {
                ...category,
                prompts: category.prompts?.filter((_, index) => index !== deleteTarget.itemIndex)
              };
            }
            return category;
          });
        });
      } else if (section === "frameworks") {
        setFrameworkCategories(prevCategories => {
          return prevCategories.map(category => {
            if (category.id === deleteTarget.categoryId) {
              return {
                ...category,
                frameworks: category.frameworks?.filter((_, index) => index !== deleteTarget.itemIndex)
              };
            }
            return category;
          });
        });
      }
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleSavePrompt = () => {
    if (editPromptData) {
      const newPromptItem: PromptItem = {
        title: editPromptData.title,
        description: editPromptData.description,
        prompt: editPromptData.prompt,
        tags: []
      };

      if (editMode === 'edit') {
        setPromptCategories(prevCategories => {
          return prevCategories.map(category => {
            if (category.id === editPromptData.categoryId) {
              return {
                ...category,
                prompts: category.prompts?.map((prompt, index) => 
                  index === editPromptData.promptIndex ? newPromptItem : prompt
                )
              };
            }
            return category;
          });
        });
      } else {
        setPromptCategories(prevCategories => {
          return prevCategories.map(category => {
            if (category.id === editPromptData.categoryId) {
              return {
                ...category,
                prompts: [...(category.prompts || []), newPromptItem]
              };
            }
            return category;
          });
        });
        setExpandedCategory(editPromptData.categoryId);
      }
      
      setEditPanelOpen(false);
      setEditPromptData(null);
    }
  };

  const handleSaveFramework = () => {
    if (editFrameworkData) {
      const newFrameworkItem: FrameworkItem = {
        title: editFrameworkData.title,
        description: editFrameworkData.description,
        structure: editFrameworkData.structure,
        tags: []
      };

      if (editMode === 'edit') {
        setFrameworkCategories(prevCategories => {
          return prevCategories.map(category => {
            if (category.id === editFrameworkData.categoryId) {
              return {
                ...category,
                frameworks: category.frameworks?.map((framework, index) => 
                  index === editFrameworkData.frameworkIndex ? newFrameworkItem : framework
                )
              };
            }
            return category;
          });
        });
      } else {
        setFrameworkCategories(prevCategories => {
          return prevCategories.map(category => {
            if (category.id === editFrameworkData.categoryId) {
              return {
                ...category,
                frameworks: [...(category.frameworks || []), newFrameworkItem]
              };
            }
            return category;
          });
        });
        setExpandedCategory(editFrameworkData.categoryId);
      }
      
      setEditPanelOpen(false);
      setEditFrameworkData(null);
    }
  };

  const renderCategoryList = (categories: CategoryData[], isFramework: boolean = false) => {
    return (
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isExpanded = expandedCategory === category.id;
          const items = isFramework ? category.frameworks : category.prompts;
          
          return (
            <div key={category.id}>
              {/* Category Header */}
              <div
                onClick={() => handleCategoryClick(category.id)}
                className="p-4 rounded-lg border border-[#e1dfdd] hover:bg-[#E9C796] transition-colors cursor-pointer"
                style={{
                  backgroundColor: isExpanded ? '#E9C796' : 'transparent'
                }}
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gray-dark)' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-medium text-sm" style={{ color: 'var(--color-gray-dark)' }}>
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" style={{ borderColor: '#e1dfdd', backgroundColor: 'transparent', color: 'var(--color-gray-dark)', fontSize: '10px' }}>
                          {items?.length || 0} {isFramework ? t.promptsFrameworks.frameworksCount : t.promptsFrameworks.promptsCount}
                        </Badge>
                        <ChevronDown 
                          className="h-4 w-4 flex-shrink-0 transition-transform" 
                          style={{ 
                            color: '#000000',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                          }} 
                        />
                      </div>
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'var(--foreground-muted)' }}>
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expanded Items */}
              {isExpanded && items && (
                <div className="mt-2 ml-8 space-y-2 pb-2">
                  {items.map((item, index) => {
                    const itemId = `${category.id}-${index}`;
                    const content = isFramework ? (item as FrameworkItem).structure : (item as PromptItem).prompt;
                    return (
                      <div 
                        key={index}
                        className="p-2 flex items-start gap-2 group hover:bg-[#E9C796] rounded transition-colors"
                      >
                        <div className="flex-1 space-y-1 min-w-0">
                          {/* Titel */}
                          <div className="text-sm leading-tight" style={{ color: '#000000' }}>
                            {item.title}
                          </div>
                          
                          {/* Beschreibung */}
                          <div className="text-xs leading-tight" style={{ color: 'var(--foreground-muted)' }}>
                            {item.description}
                          </div>
                          
                          {/* Content Label */}
                          <div className="text-sm leading-tight mt-2" style={{ color: '#000000' }}>
                            {isFramework ? t.promptsFrameworks.structureLabel : t.promptsFrameworks.promptLabel}
                          </div>
                          
                          {/* Content */}
                          <div 
                            className="text-xs font-mono whitespace-pre-wrap leading-tight"
                            style={{ 
                              color: '#000000'
                            }}
                          >
                            {content}
                          </div>
                        </div>

                        {/* Dropdown Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 w-6 p-0 flex-shrink-0 hover:bg-[#E9C796] hover:border hover:border-black"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              className="focus:!bg-[#E9C796]"
                              onClick={() => isFramework ? handleEditFramework(category.id, index) : handleEditPrompt(category.id, index)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              {t.promptsFrameworks.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="focus:!bg-[#E9C796]"
                              onClick={() => isFramework ? handleDuplicateFramework(category.id, index) : handleDuplicatePrompt(category.id, index)}
                            >
                              <CopyIcon className="h-4 w-4 mr-2" />
                              {t.promptsFrameworks.duplicate}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="focus:!bg-[#E9C796]"
                              onClick={isFramework ? handleNewFramework : handleNewPrompt}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {t.promptsFrameworks.createNew}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="focus:!bg-[#E9C796]"
                              onClick={() => isFramework ? handleDeleteFramework(category.id, index) : handleDeletePrompt(category.id, index)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t.promptsFrameworks.delete}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="h-14 flex items-center gap-3 px-4"
        style={{
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <FileText className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {section === "library" ? t.promptsFrameworks.promptLibrary : t.promptsFrameworks.frameworks}
        </h2>
      </div>

      {/* Main Content with Side Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="px-6 pt-6 pb-6">
            <div className="max-w-7xl mx-auto space-y-4">
              {section === "library" && (
                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{t.promptsFrameworks.promptCategories}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.promptsFrameworks.promptCategoriesDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--foreground-muted)' }} />
                      <Input
                        placeholder={t.promptsFrameworks.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {renderCategoryList(filteredPromptCategories, false)}

                    {filteredPromptCategories.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-gray-medium)' }} />
                        <p style={{ color: 'var(--foreground-muted)' }}>{t.promptsFrameworks.noCategoriesFound}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {section === "frameworks" && (
                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{t.promptsFrameworks.frameworkCategories}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.promptsFrameworks.frameworkCategoriesDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--foreground-muted)' }} />
                      <Input
                        placeholder={t.promptsFrameworks.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {renderCategoryList(filteredFrameworkCategories, true)}

                    {filteredFrameworkCategories.length === 0 && (
                      <div className="text-center py-8">
                        <Layers className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-gray-medium)' }} />
                        <p style={{ color: 'var(--foreground-muted)' }}>{t.promptsFrameworks.noCategoriesFound}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Transparent Overlay for Right Side Panel */}
        {editPanelOpen && (editPromptData || editFrameworkData) && (
          <div 
            className="fixed inset-0 bg-transparent"
            style={{ zIndex: 39 }}
            onClick={() => setEditPanelOpen(false)}
          />
        )}

        {/* Right Side Panel */}
        {editPanelOpen && (editPromptData || editFrameworkData) && (
          <div 
            ref={panelRef}
            className="w-96 border-l border-[#e1dfdd] bg-white flex flex-col overflow-hidden"
            style={{ position: 'fixed', right: 0, top: '64px', bottom: 0, zIndex: 40 }}
          >
            {/* Panel Header */}
            <div 
              className="h-14 px-4 border-b border-[#e1dfdd] flex items-center justify-between"
              style={{ backgroundColor: '#DE851D' }}
            >
              <h3 className="font-medium" style={{ color: '#000000' }}>
                {editMode === 'edit' 
                  ? (editPromptData ? t.promptsFrameworks.editPrompt : t.promptsFrameworks.editFramework) 
                  : editMode === 'duplicate' 
                    ? (editPromptData ? t.promptsFrameworks.duplicatePrompt : t.promptsFrameworks.duplicateFramework)
                    : (editPromptData ? t.promptsFrameworks.createNewPrompt : t.promptsFrameworks.createNewFramework)}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditPanelOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item-title">{t.promptsFrameworks.titleLabel}</Label>
                <Input
                  id="item-title"
                  value={editPromptData?.title || editFrameworkData?.title || ''}
                  onChange={(e) => {
                    if (editPromptData) {
                      setEditPromptData({ ...editPromptData, title: e.target.value });
                    } else if (editFrameworkData) {
                      setEditFrameworkData({ ...editFrameworkData, title: e.target.value });
                    }
                  }}
                  placeholder={editPromptData ? t.promptsFrameworks.titlePlaceholder : t.promptsFrameworks.frameworkTitlePlaceholder}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-description">{t.promptsFrameworks.descriptionLabel}</Label>
                <Textarea
                  id="item-description"
                  value={editPromptData?.description || editFrameworkData?.description || ''}
                  onChange={(e) => {
                    if (editPromptData) {
                      setEditPromptData({ ...editPromptData, description: e.target.value });
                    } else if (editFrameworkData) {
                      setEditFrameworkData({ ...editFrameworkData, description: e.target.value });
                    }
                  }}
                  placeholder={editPromptData ? t.promptsFrameworks.descriptionPlaceholder : t.promptsFrameworks.frameworkDescriptionPlaceholder}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-content">{editPromptData ? t.promptsFrameworks.promptContentLabel : t.promptsFrameworks.frameworkContentLabel}</Label>
                <Textarea
                  id="item-content"
                  value={editPromptData?.prompt || editFrameworkData?.structure || ''}
                  onChange={(e) => {
                    if (editPromptData) {
                      setEditPromptData({ ...editPromptData, prompt: e.target.value });
                    } else if (editFrameworkData) {
                      setEditFrameworkData({ ...editFrameworkData, structure: e.target.value });
                    }
                  }}
                  placeholder={editPromptData ? t.promptsFrameworks.promptPlaceholder : t.promptsFrameworks.frameworkPlaceholder}
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-[#e1dfdd] flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-[#e1dfdd] text-black hover:bg-[#E9C796]"
                onClick={() => setEditPanelOpen(false)}
              >
                {tExt.promptsFrameworks.cancel}
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#e1dfdd] text-black hover:bg-[#E9C796]"
                onClick={editPromptData ? handleSavePrompt : handleSaveFramework}
              >
                {editPromptData ? tExt.promptsFrameworks.savePrompt : tExt.promptsFrameworks.saveFramework}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tExt.promptsFrameworks.deleteConfirm}</AlertDialogTitle>
            <AlertDialogDescription>
              {tExt.promptsFrameworks.deleteMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              style={{ borderColor: '#e1dfdd', color: '#000000' }}
              className="bg-transparent hover:bg-[#E9C796] border"
            >
              {tExt.promptsFrameworks.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              style={{ borderColor: '#e1dfdd', color: '#000000' }}
              className="bg-transparent hover:bg-[#E9C796] border"
            >
              {tExt.promptsFrameworks.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
