import { useState, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  BookOpen,
  HelpCircle,
  MessageSquare,
  FileText,
  Video,
  Download,
  ExternalLink,
  Search,
  Mail,
  Phone,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Save
} from "lucide-react";
import { useExtendedTranslations, useLanguage } from "../utils/i18n";

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created: string;
  lastUpdate: string;
}

interface DocumentationItem {
  title: string;
  description: string;
  category: string;
  link: string;
}

interface SupportDocumentationProps {
  section?: string;
  isDarkMode?: boolean;
}

export function SupportDocumentation({ section = "documentation", isDarkMode = false }: SupportDocumentationProps) {
  const { t } = useLanguage();
  const tExt = useExtendedTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketPriority, setTicketPriority] = useState("medium");
  
  // Success Dialog States
  const [ticketSuccessDialogOpen, setTicketSuccessDialogOpen] = useState(false);
  const [createdTicketSubject, setCreatedTicketSubject] = useState("");
  const [createdTicketPriority, setCreatedTicketPriority] = useState("");
  
  // FAQ Panel States
  const [faqPanelOpen, setFaqPanelOpen] = useState(false);
  const [faqPanelMode, setFaqPanelMode] = useState<'create' | 'edit'>('create');
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqCategory, setFaqCategory] = useState("general");
  const faqPanelRef = useRef<HTMLDivElement>(null);

  // Close FAQ panel when clicking outside
  useClickOutside(faqPanelRef, () => {
    if (faqPanelOpen) {
      setFaqPanelOpen(false);
      setFaqPanelMode('create');
      setEditingFaqIndex(null);
      setFaqQuestion("");
      setFaqAnswer("");
      setFaqCategory("general");
    }
  }, faqPanelOpen);

  const tickets: SupportTicket[] = [
    {
      id: "TKT-001",
      subject: "Probleme mit Email-Agent Authentifizierung",
      status: "in-progress",
      priority: "high",
      created: "2025-10-28 09:15",
      lastUpdate: "2025-10-29 11:30"
    },
    {
      id: "TKT-002",
      subject: "Frage zur Backup-Konfiguration",
      status: "resolved",
      priority: "medium",
      created: "2025-10-27 14:20",
      lastUpdate: "2025-10-28 16:45"
    },
    {
      id: "TKT-003",
      subject: "Feature Request: Dark Mode für Dashboard",
      status: "open",
      priority: "low",
      created: "2025-10-26 10:00",
      lastUpdate: "2025-10-26 10:00"
    }
  ];

  const documentation: DocumentationItem[] = [
    {
      title: tExt.supportDocumentation.documentation.items.gettingStarted.title,
      description: tExt.supportDocumentation.documentation.items.gettingStarted.description,
      category: tExt.supportDocumentation.documentation.items.gettingStarted.category,
      link: "#getting-started"
    },
    {
      title: tExt.supportDocumentation.documentation.items.userRoleManagement.title,
      description: tExt.supportDocumentation.documentation.items.userRoleManagement.description,
      category: tExt.supportDocumentation.documentation.items.userRoleManagement.category,
      link: "#user-management"
    },
    {
      title: tExt.supportDocumentation.documentation.items.agentConfiguration.title,
      description: tExt.supportDocumentation.documentation.items.agentConfiguration.description,
      category: tExt.supportDocumentation.documentation.items.agentConfiguration.category,
      link: "#agent-config"
    },
    {
      title: tExt.supportDocumentation.documentation.items.backupRecovery.title,
      description: tExt.supportDocumentation.documentation.items.backupRecovery.description,
      category: tExt.supportDocumentation.documentation.items.backupRecovery.category,
      link: "#backup-recovery"
    },
    {
      title: tExt.supportDocumentation.documentation.items.securityCompliance.title,
      description: tExt.supportDocumentation.documentation.items.securityCompliance.description,
      category: tExt.supportDocumentation.documentation.items.securityCompliance.category,
      link: "#security"
    },
    {
      title: tExt.supportDocumentation.documentation.items.apiDocumentation.title,
      description: tExt.supportDocumentation.documentation.items.apiDocumentation.description,
      category: tExt.supportDocumentation.documentation.items.apiDocumentation.category,
      link: "#api-docs"
    },
    {
      title: tExt.supportDocumentation.documentation.items.monitoringLogging.title,
      description: tExt.supportDocumentation.documentation.items.monitoringLogging.description,
      category: tExt.supportDocumentation.documentation.items.monitoringLogging.category,
      link: "#monitoring"
    },
    {
      title: tExt.supportDocumentation.documentation.items.troubleshooting.title,
      description: tExt.supportDocumentation.documentation.items.troubleshooting.description,
      category: tExt.supportDocumentation.documentation.items.troubleshooting.category,
      link: "#troubleshooting"
    }
  ];

  const faqs = [
    {
      question: tExt.supportDocumentation.faq.items.twoFactorAuth.question,
      answer: tExt.supportDocumentation.faq.items.twoFactorAuth.answer
    },
    {
      question: tExt.supportDocumentation.faq.items.automaticBackups.question,
      answer: tExt.supportDocumentation.faq.items.automaticBackups.answer
    },
    {
      question: tExt.supportDocumentation.faq.items.aiModels.question,
      answer: tExt.supportDocumentation.faq.items.aiModels.answer
    },
    {
      question: tExt.supportDocumentation.faq.items.customAgents.question,
      answer: tExt.supportDocumentation.faq.items.customAgents.answer
    },
    {
      question: tExt.supportDocumentation.faq.items.concurrentUsers.question,
      answer: tExt.supportDocumentation.faq.items.concurrentUsers.answer
    },
    {
      question: tExt.supportDocumentation.faq.items.dataEncryption.question,
      answer: tExt.supportDocumentation.faq.items.dataEncryption.answer
    },
    {
      question: tExt.supportDocumentation.faq.items.restoreMessages.question,
      answer: tExt.supportDocumentation.faq.items.restoreMessages.answer
    },
    {
      question: tExt.supportDocumentation.faq.items.supportedLanguages.question,
      answer: tExt.supportDocumentation.faq.items.supportedLanguages.answer
    }
  ];

  const getStatusBadge = (status: SupportTicket['status']) => {
    const variants = {
      'open': { color: 'var(--color-gray-dark)', bg: 'var(--color-gray-light)', icon: AlertCircle },
      'in-progress': { color: '#000000', bg: '#5ebc6720', icon: Clock },
      'resolved': { color: '#000000', bg: '#5ebc6720', icon: CheckCircle },
      'closed': { color: 'var(--color-gray-medium)', bg: 'var(--color-gray-light)', icon: Info }
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <div className="flex items-center gap-1" style={{ color: config.color }}>
        <Icon className="w-3 h-3" />
        <span className="text-sm">
          {status === 'open' ? tExt.supportDocumentation.ticketStatus.open : 
           status === 'in-progress' ? tExt.supportDocumentation.ticketStatus.inProgress : 
           status === 'resolved' ? tExt.supportDocumentation.ticketStatus.resolved : 
           tExt.supportDocumentation.ticketStatus.closed}
        </span>
      </div>
    );
  };

  const getPriorityBadge = (priority: SupportTicket['priority']) => {
    const colors = {
      'low': 'var(--color-gray-medium)',
      'medium': '#5ebc67',
      'high': '#f59e0b',
      'urgent': '#ef4444'
    };

    return (
      <Badge 
        variant="outline" 
        style={{ 
          borderColor: '#e1dfdd', 
          color: '#000000',
          backgroundColor: priority === 'high' ? '#E9C796' : 'transparent'
        }}
      >
        {priority === 'low' ? tExt.supportDocumentation.ticketPriority.low : 
         priority === 'medium' ? tExt.supportDocumentation.ticketPriority.medium : 
         priority === 'high' ? tExt.supportDocumentation.ticketPriority.high : 
         tExt.supportDocumentation.ticketPriority.urgent}
      </Badge>
    );
  };

  const filteredDocs = documentation.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTicket = () => {
    if (ticketSubject && ticketMessage) {
      setTicketSuccessDialogOpen(true);
      setCreatedTicketSubject(ticketSubject);
      setCreatedTicketPriority(ticketPriority);
      setTicketSubject("");
      setTicketMessage("");
      setTicketPriority("medium");
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Support Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <HelpCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {tExt.supportDocumentation.title}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-6 pt-6 pb-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Documentation Section */}
            {section === "documentation" && (
              <div className="space-y-4">
                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{tExt.supportDocumentation.documentation.searchTitle}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{tExt.supportDocumentation.documentation.searchDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--foreground-muted)' }} />
                      <Input
                        placeholder={tExt.supportDocumentation.documentation.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="space-y-3">
                      {filteredDocs.map((doc, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border border-[#e1dfdd] hover:bg-[#E9C796] transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-medium" style={{ color: 'var(--color-gray-dark)' }}>{doc.title}</h3>
                            <Badge variant="outline" style={{ borderColor: '#E9C796', backgroundColor: '#E9C796', color: '#000000' }}>
                              {doc.category}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2" style={{ color: 'var(--foreground-muted)' }}>
                            {doc.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm" style={{ color: '#000000' }}>
                            <span>{tExt.supportDocumentation.documentation.learnMore}</span>
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredDocs.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-gray-medium)' }} />
                        <p style={{ color: 'var(--foreground-muted)' }}>{tExt.supportDocumentation.documentation.noDocsFound}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.documentation.downloads}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.documentation.downloadsDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-[#e1dfdd]">
                      <div className="flex items-center gap-3">
                        <div>
                          <p style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.documentation.userManual}</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>PDF, 12.5 MB</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-[#E9C796] transition-colors"
                      >
                        {t.tenantAdmin.supportDocumentation.documentation.download}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-[#e1dfdd]">
                      <div className="flex items-center gap-3">
                        <div>
                          <p style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.documentation.adminGuide}</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>PDF, 8.3 MB</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-[#E9C796] transition-colors"
                      >
                        {t.tenantAdmin.supportDocumentation.documentation.download}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-[#e1dfdd]">
                      <div className="flex items-center gap-3">
                        <div>
                          <p style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.documentation.apiDocs}</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>PDF, 5.7 MB</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-[#E9C796] transition-colors"
                      >
                        {t.tenantAdmin.supportDocumentation.documentation.download}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* FAQ Section */}
            {section === "faq" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl" style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.faq.management}</h2>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.faq.managementDesc}</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setFaqPanelMode('create');
                      setFaqQuestion("");
                      setFaqAnswer("");
                      setFaqCategory("general");
                      setFaqPanelOpen(true);
                    }}
                    variant="outline"
                    className="hover:bg-[#E9C796] transition-colors"
                    style={{ 
                      backgroundColor: 'transparent', 
                      color: '#000000',
                      border: '1px solid #e1dfdd'
                    }}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    {t.tenantAdmin.supportDocumentation.faq.createNew}
                  </Button>
                </div>

                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.faq.title}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.faq.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger style={{ color: 'var(--color-gray-dark)' }}>
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent style={{ color: 'var(--foreground-muted)' }}>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.faq.needMoreHelp}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.faq.needMoreHelpDesc}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            )}

            {/* Tickets Section */}
            {section === "tickets" && (
              <div className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card style={{ border: '1px solid #e1dfdd' }}>
                    <CardHeader className="pb-3">
                      <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.tickets.createTitle}</CardTitle>
                      <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.tickets.createDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t.tenantAdmin.supportDocumentation.tickets.subjectLabel}</Label>
                        <Input
                          id="subject"
                          placeholder={t.tenantAdmin.placeholders.ticketSubject}
                          value={ticketSubject}
                          onChange={(e) => setTicketSubject(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">{t.tenantAdmin.supportDocumentation.tickets.priorityLabel}</Label>
                        <Select value={ticketPriority} onValueChange={setTicketPriority}>
                          <SelectTrigger id="priority">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">{t.tenantAdmin.supportDocumentation.ticketPriority.low}</SelectItem>
                            <SelectItem value="medium">{t.tenantAdmin.supportDocumentation.ticketPriority.medium}</SelectItem>
                            <SelectItem value="high">{t.tenantAdmin.supportDocumentation.ticketPriority.high}</SelectItem>
                            <SelectItem value="urgent">{t.tenantAdmin.supportDocumentation.ticketPriority.urgent}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t.tenantAdmin.supportDocumentation.tickets.messageLabel}</Label>
                        <Textarea
                          id="message"
                          placeholder={t.tenantAdmin.placeholders.ticketMessage}
                          rows={5}
                          value={ticketMessage}
                          onChange={(e) => setTicketMessage(e.target.value)}
                        />
                      </div>

                      <Button 
                        variant="outline"
                        className="w-full transition-colors" 
                        style={{ backgroundColor: 'transparent', color: '#000000', border: '1px solid #e1dfdd' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={handleCreateTicket}
                        disabled={!ticketSubject || !ticketMessage}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {t.tenantAdmin.supportDocumentation.tickets.submitButton}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card style={{ border: '1px solid #e1dfdd' }}>
                    <CardHeader className="pb-3">
                      <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.tickets.yourTicketsTitle}</CardTitle>
                      <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.tickets.yourTicketsDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {tickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="p-3 rounded-lg border border-[#e1dfdd] hover:bg-[#E9C796] transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{ticket.id}</span>
                                {getStatusBadge(ticket.status)}
                              </div>
                              <h4 className="mb-1" style={{ color: 'var(--color-gray-dark)' }}>{ticket.subject}</h4>
                            </div>
                            {getPriorityBadge(ticket.priority)}
                          </div>
                          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                            <span>{t.tenantAdmin.supportDocumentation.tickets.created}: {ticket.created}</span>
                            <span>•</span>
                            <span>{t.tenantAdmin.supportDocumentation.tickets.updated}: {ticket.lastUpdate}</span>
                          </div>
                        </div>
                      ))}

                      {tickets.length === 0 && (
                        <div className="text-center py-6">
                          <MessageSquare className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-gray-medium)' }} />
                          <p style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.tickets.noTickets}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Video Tutorials Section */}
            {section === "tutorials" && (
              <div className="space-y-4">
                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.tutorials.title}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.tutorials.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="p-3 rounded-lg border border-[#e1dfdd] hover:bg-[#E9C796] transition-colors cursor-pointer">
                        <div className="aspect-video bg-[var(--color-gray-light)] rounded-lg mb-2 flex items-center justify-center">
                          <Video className="w-12 h-12" style={{ color: 'var(--color-gray-medium)' }} />
                        </div>
                        <h3 className="mb-1" style={{ color: 'var(--color-gray-dark)' }}>{tExt.supportDocumentation.tutorials.items.gettingStarted.title}</h3>
                        <p className="text-sm mb-1" style={{ color: 'var(--foreground-muted)' }}>{tExt.supportDocumentation.tutorials.items.gettingStarted.description}</p>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                          <Clock className="w-3 h-3" />
                          <span>{tExt.supportDocumentation.tutorials.items.gettingStarted.duration}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-[#e1dfdd] hover:bg-[#E9C796] transition-colors cursor-pointer">
                        <div className="aspect-video bg-[var(--color-gray-light)] rounded-lg mb-2 flex items-center justify-center">
                          <Video className="w-12 h-12" style={{ color: 'var(--color-gray-medium)' }} />
                        </div>
                        <h3 className="mb-1" style={{ color: 'var(--color-gray-dark)' }}>{tExt.supportDocumentation.tutorials.items.userRoleManagement.title}</h3>
                        <p className="text-sm mb-1" style={{ color: 'var(--foreground-muted)' }}>{tExt.supportDocumentation.tutorials.items.userRoleManagement.description}</p>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                          <Clock className="w-3 h-3" />
                          <span>{tExt.supportDocumentation.tutorials.items.userRoleManagement.duration}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-[#e1dfdd] hover:bg-[#E9C796] transition-colors cursor-pointer">
                        <div className="aspect-video bg-[var(--color-gray-light)] rounded-lg mb-2 flex items-center justify-center">
                          <Video className="w-12 h-12" style={{ color: 'var(--color-gray-medium)' }} />
                        </div>
                        <h3 className="mb-1" style={{ color: 'var(--color-gray-dark)' }}>{tExt.supportDocumentation.tutorials.items.modelConfiguration.title}</h3>
                        <p className="text-sm mb-1" style={{ color: 'var(--foreground-muted)' }}>{tExt.supportDocumentation.tutorials.items.modelConfiguration.description}</p>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                          <Clock className="w-3 h-3" />
                          <span>{tExt.supportDocumentation.tutorials.items.modelConfiguration.duration}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-[#e1dfdd] hover:bg-[#E9C796] transition-colors cursor-pointer">
                        <div className="aspect-video bg-[var(--color-gray-light)] rounded-lg mb-2 flex items-center justify-center">
                          <Video className="w-12 h-12" style={{ color: 'var(--color-gray-medium)' }} />
                        </div>
                        <h3 className="mb-1" style={{ color: 'var(--color-gray-dark)' }}>{tExt.supportDocumentation.tutorials.items.agentSetup.title}</h3>
                        <p className="text-sm mb-1" style={{ color: 'var(--foreground-muted)' }}>{tExt.supportDocumentation.tutorials.items.agentSetup.description}</p>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                          <Clock className="w-3 h-3" />
                          <span>{tExt.supportDocumentation.tutorials.items.agentSetup.duration}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-[#e1dfdd] hover:bg-[#E9C796] transition-colors cursor-pointer">
                        <div className="aspect-video bg-[var(--color-gray-light)] rounded-lg mb-2 flex items-center justify-center">
                          <Video className="w-12 h-12" style={{ color: 'var(--color-gray-medium)' }} />
                        </div>
                        <h3 className="mb-1" style={{ color: 'var(--color-gray-dark)' }}>{tExt.supportDocumentation.tutorials.items.backupRecovery.title}</h3>
                        <p className="text-sm mb-1" style={{ color: 'var(--foreground-muted)' }}>{tExt.supportDocumentation.tutorials.items.backupRecovery.description}</p>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                          <Clock className="w-3 h-3" />
                          <span>{tExt.supportDocumentation.tutorials.items.backupRecovery.duration}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-[#e1dfdd] hover:bg-[#E9C796] transition-colors cursor-pointer">
                        <div className="aspect-video bg-[var(--color-gray-light)] rounded-lg mb-2 flex items-center justify-center">
                          <Video className="w-12 h-12" style={{ color: 'var(--color-gray-medium)' }} />
                        </div>
                        <h3 className="mb-1" style={{ color: 'var(--color-gray-dark)' }}>{tExt.supportDocumentation.tutorials.items.monitoringAlerts.title}</h3>
                        <p className="text-sm mb-1" style={{ color: 'var(--foreground-muted)' }}>{tExt.supportDocumentation.tutorials.items.monitoringAlerts.description}</p>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                          <Clock className="w-3 h-3" />
                          <span>{tExt.supportDocumentation.tutorials.items.monitoringAlerts.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* API Documentation Section */}
            {section === "api" && (
              <div className="space-y-4">
                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.api.title}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.api.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="mb-2" style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.api.authentication}</h3>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                          <code className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                            Authorization: Bearer YOUR_API_TOKEN
                          </code>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2" style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.api.baseUrl}</h3>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                          <code className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                            https://api.aihub.ch/v1
                          </code>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="mb-2" style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.api.endpoints}</h3>
                        
                        <div className="p-3 rounded-lg border border-[#e1dfdd]">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge variant="outline" style={{ borderColor: '#e1dfdd', backgroundColor: 'transparent', color: '#000000' }}>GET</Badge>
                            <code style={{ color: 'var(--color-gray-dark)' }}>/agents</code>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.api.endpointGetAgents}</p>
                        </div>

                        <div className="p-3 rounded-lg border border-[#e1dfdd]">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge variant="outline" style={{ borderColor: '#e1dfdd', backgroundColor: 'transparent', color: '#000000' }}>POST</Badge>
                            <code style={{ color: 'var(--color-gray-dark)' }}>/agents/:id/execute</code>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.api.endpointPostAgentExecute}</p>
                        </div>

                        <div className="p-3 rounded-lg border border-[#e1dfdd]">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge variant="outline" style={{ borderColor: '#e1dfdd', backgroundColor: 'transparent', color: '#000000' }}>GET</Badge>
                            <code style={{ color: 'var(--color-gray-dark)' }}>/models</code>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.api.endpointGetModels}</p>
                        </div>

                        <div className="p-3 rounded-lg border border-[#e1dfdd]">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge variant="outline" style={{ borderColor: '#e1dfdd', backgroundColor: 'transparent', color: '#000000' }}>GET</Badge>
                            <code style={{ color: 'var(--color-gray-dark)' }}>/users</code>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.api.endpointGetUsers}</p>
                        </div>

                        <div className="p-3 rounded-lg border border-[#e1dfdd]">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge variant="outline" style={{ borderColor: '#e1dfdd', backgroundColor: 'transparent', color: '#000000' }}>POST</Badge>
                            <code style={{ color: 'var(--color-gray-dark)' }}>/backups</code>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.api.endpointPostBackup}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#e1dfdd]">
                      <Button 
                        variant="outline" 
                        className="w-full hover:bg-[#E9C796] transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t.tenantAdmin.supportDocumentation.api.downloadFullDocs}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.api.codeExamples}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.api.codeExamplesDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="mb-2" style={{ color: 'var(--color-gray-dark)' }}>Python</h4>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                        <pre className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
{`import requests

headers = {
  'Authorization': 'Bearer YOUR_API_TOKEN'
}

response = requests.get(
  'https://api.aihub.ch/v1/agents',
  headers=headers
)

print(response.json())`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2" style={{ color: 'var(--color-gray-dark)' }}>JavaScript / Node.js</h4>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                        <pre className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
{`const response = await fetch(
  'https://api.aihub.ch/v1/agents',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN'
    }
  }
);

const data = await response.json();
console.log(data);`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Contact Section */}
            {section === "contact" && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card style={{ border: '1px solid #e1dfdd' }}>
                    <CardHeader className="pb-3">
                      <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.contact.supportTitle}</CardTitle>
                      <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.contact.supportDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div>
                          <p style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.contact.emailSupport}</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>support@aihub.ch</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.contact.responseTime}: 2-4 Stunden</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div>
                          <p style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.contact.phoneSupport}</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>+41 44 123 45 67</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.contact.mondayFriday}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div>
                          <p style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.contact.emergencyHotline}</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>+41 44 123 45 99</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.supportDocumentation.contact.emergencyOnly}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card style={{ border: '1px solid #e1dfdd' }}>
                    <CardHeader className="pb-3">
                      <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.contact.salesTitle}</CardTitle>
                      <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.contact.salesDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div>
                          <p style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.contact.sales}</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>sales@aihub.ch</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div>
                          <p style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.supportDocumentation.contact.partnerships}</p>
                          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>partners@aihub.ch</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card style={{ border: '1px solid #e1dfdd' }}>
                  <CardHeader className="pb-3">
                    <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.contact.companyTitle}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.supportDocumentation.contact.companyDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p style={{ color: 'var(--color-gray-dark)' }}>
                      {t.tenantAdmin.supportDocumentation.contact.companyInfo}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      {t.tenantAdmin.supportDocumentation.contact.headquarters}<br />
                      Handelsregister: CHE-123.456.789
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Management Right Side Panel */}
      {faqPanelOpen && (
        <>
          {/* Transparent Overlay */}
          <div 
            className="fixed inset-0 bg-transparent z-40"
            onClick={() => setFaqPanelOpen(false)}
          />

          {/* Panel */}
          <div 
            ref={faqPanelRef}
            className="fixed right-0 top-0 h-full bg-white z-50 shadow-xl flex flex-col"
            style={{ 
              width: '600px',
              borderLeft: '1px solid #e1dfdd'
            }}
          >
            {/* Panel Header */}
            <div 
              className="h-14 flex items-center justify-between px-6"
              style={{ 
                borderBottom: '1px solid #e1dfdd',
                backgroundColor: '#DE851D'
              }}
            >
              <h2 className="font-medium" style={{ color: '#000000' }}>
                {faqPanelMode === 'create' ? t.tenantAdmin.supportDocumentation.faq.panelCreateTitle : t.tenantAdmin.supportDocumentation.faq.panelEditTitle}
              </h2>
              <button
                onClick={() => setFaqPanelOpen(false)}
                className="p-1.5 rounded transition-colors"
                style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X className="h-4 w-4" style={{ color: '#000000' }} />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="faqQuestion">{t.tenantAdmin.supportDocumentation.faq.questionLabel} *</Label>
                  <Input
                    id="faqQuestion"
                    placeholder={t.tenantAdmin.placeholders.faqQuestion}
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faqCategory">{t.tenantAdmin.supportDocumentation.faq.categoryLabel}</Label>
                  <Select value={faqCategory} onValueChange={setFaqCategory}>
                    <SelectTrigger id="faqCategory">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">{t.tenantAdmin.supportDocumentation.faq.categories.general}</SelectItem>
                      <SelectItem value="technical">{t.tenantAdmin.supportDocumentation.faq.categories.technical}</SelectItem>
                      <SelectItem value="billing">{t.tenantAdmin.supportDocumentation.faq.categories.billing}</SelectItem>
                      <SelectItem value="security">{t.tenantAdmin.supportDocumentation.faq.categories.security}</SelectItem>
                      <SelectItem value="setup">{t.tenantAdmin.supportDocumentation.faq.categories.setup}</SelectItem>
                      <SelectItem value="troubleshooting">{t.tenantAdmin.supportDocumentation.faq.categories.troubleshooting}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faqAnswer">{t.tenantAdmin.supportDocumentation.faq.answerLabel} *</Label>
                  <Textarea
                    id="faqAnswer"
                    placeholder={t.tenantAdmin.placeholders.faqAnswer}
                    rows={12}
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                  />
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                    {t.tenantAdmin.supportDocumentation.faq.minCharsRecommended}
                  </p>
                </div>

                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#E9C796', border: '1px solid #e1dfdd' }}
                >
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <div className="space-y-1">
                      <p className="text-sm" style={{ color: '#000000' }}>
                        <strong>{t.tenantAdmin.supportDocumentation.faq.tips}</strong>
                      </p>
                      <ul className="text-sm space-y-1" style={{ color: '#000000', marginLeft: '1rem' }}>
                        <li>• {t.tenantAdmin.supportDocumentation.faq.tip1}</li>
                        <li>• {t.tenantAdmin.supportDocumentation.faq.tip2}</li>
                        <li>• {t.tenantAdmin.supportDocumentation.faq.tip3}</li>
                        <li>• {t.tenantAdmin.supportDocumentation.faq.tip4}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div 
              className="p-6 flex items-center justify-end gap-3"
              style={{ 
                borderTop: '1px solid #e1dfdd',
                backgroundColor: 'white'
              }}
            >
              <Button
                variant="outline"
                onClick={() => setFaqPanelOpen(false)}
              >
                {t.cancel}
              </Button>
              <Button
                onClick={() => {
                  if (faqQuestion && faqAnswer) {
                    const statusMsg = faqPanelMode === 'create' ? t.tenantAdmin.supportDocumentation.faq.successCreated : t.tenantAdmin.supportDocumentation.faq.successUpdated;
                    alert(`${statusMsg}!\n\n${t.tenantAdmin.supportDocumentation.faq.questionLabel}: ${faqQuestion}\n${t.tenantAdmin.supportDocumentation.faq.categoryLabel}: ${faqCategory}\n\n${t.tenantAdmin.supportDocumentation.faq.changesSaved}`);
                    setFaqPanelOpen(false);
                  }
                }}
                disabled={!faqQuestion || !faqAnswer}
                style={{ 
                  backgroundColor: '#5ebc67', 
                  color: 'white',
                  border: '1px solid #e1dfdd'
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                {faqPanelMode === 'create' ? t.tenantAdmin.supportDocumentation.faq.createButton : t.tenantAdmin.supportDocumentation.faq.saveChanges}
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Ticket Success Dialog */}
      {ticketSuccessDialogOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setTicketSuccessDialogOpen(false)}
          />

          {/* Dialog */}
          <div 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 shadow-xl flex flex-col"
            style={{ 
              width: '500px',
              border: '1px solid #e1dfdd',
              borderRadius: '8px'
            }}
          >
            {/* Dialog Header */}
            <div 
              className="h-14 flex items-center justify-between px-6"
              style={{ 
                borderBottom: '1px solid #e1dfdd',
                backgroundColor: '#DE851D',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px'
              }}
            >
              <h2 className="font-medium" style={{ color: '#000000' }}>
                {t.tenantAdmin.supportDocumentation.tickets.successTitle}
              </h2>
              <button
                onClick={() => setTicketSuccessDialogOpen(false)}
                className="p-1.5 rounded transition-colors"
                style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X className="h-4 w-4" style={{ color: '#000000' }} />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="text-center space-y-3">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                    style={{ backgroundColor: '#E9C796' }}
                  >
                    <CheckCircle className="w-8 h-8" style={{ color: '#000000' }} />
                  </div>
                  
                  <div className="space-y-2">
                    <p style={{ color: '#000000' }}>
                      <strong>{t.tenantAdmin.supportDocumentation.tickets.subjectLabel}:</strong> {createdTicketSubject}
                    </p>
                    <p style={{ color: '#000000' }}>
                      <strong>{t.tenantAdmin.supportDocumentation.tickets.priorityLabel}:</strong> {
                        createdTicketPriority === 'low' ? t.tenantAdmin.supportDocumentation.ticketPriority.low : 
                        createdTicketPriority === 'medium' ? t.tenantAdmin.supportDocumentation.ticketPriority.medium : 
                        createdTicketPriority === 'high' ? t.tenantAdmin.supportDocumentation.ticketPriority.high : 
                        t.tenantAdmin.supportDocumentation.ticketPriority.urgent
                      }
                    </p>
                  </div>

                  <p style={{ color: '#000000' }}>
                    {t.tenantAdmin.supportDocumentation.tickets.confirmationEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <div 
              className="p-6 pt-0 flex items-center justify-center"
            >
              <Button
                variant="outline"
                className="w-full transition-colors"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#000000', 
                  border: '1px solid #e1dfdd' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => setTicketSuccessDialogOpen(false)}
              >
                OK
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}