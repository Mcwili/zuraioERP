import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage } from "../contexts/LanguageContext";
import { useExtendedTranslations } from "../utils/i18n";
import { Send, Bot, User, Loader2, Mic, Plus, Paperclip, Camera, Image as ImageIcon, FileText, X, MoreVertical, Trash2, Copy } from "lucide-react";
import aiAvatar from "figma:asset/eb4289a66c834c1700ca84404d052c3f61bfc123.png";
import { toast } from "sonner@2.0.3";

interface AgentResponse {
  agentId: string;
  content: string;
}

interface AttachedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  activeModules?: string[];
  agentResponses?: AgentResponse[]; // Individual agent responses
  orchestratorSummary?: string; // Orchestrator's interpreted summary
  attachments?: AttachedFile[];
}

interface ChatInterfaceProps {
  activeModules: string[];
  profileImage?: string | null;
}

export function ChatInterface({ activeModules, profileImage }: ChatInterfaceProps) {
  const { t, language } = useLanguage();
  const tExt = useExtendedTranslations();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t.chat.welcomeMessage,
      sender: "ai",
      timestamp: new Date(),
      activeModules: ["chat-agent"]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgentView, setSelectedAgentView] = useState<{ [messageId: string]: string | null }>({});
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => prev.map((msg, index) => 
      index === 0 && msg.sender === 'ai' 
        ? { ...msg, content: t.chat.welcomeMessage }
        : msg
    ));
  }, [language, t.chat.welcomeMessage]);

  const handleSend = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input || tExt.chatExtended.filesAttached,
      sender: "user",
      timestamp: new Date(),
      attachments: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setAttachedFiles([]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      // Generate individual responses for each agent
      const agentResponses: AgentResponse[] = activeModules.map((agentId) => ({
        agentId,
        content: `${tExt.chatExtended.detailedResponseFrom.replace('{agentId}', agentId).replace('{message}', userMessage.content)}:\\n\\n${tExt.chatExtended.detailedResponseContent}`
      }));

      // Generate orchestrator summary (intelligent interpretation of all agent responses)
      const orchestratorSummary = agentResponses.length > 0
        ? `${tExt.chatExtended.basedOnAnalysis.replace('{count}', agentResponses.length.toString()).replace('{message}', userMessage.content)}:\\n\\n${tExt.chatExtended.orchestratorSummary.replace('{modules}', activeModules.join(", "))}\\n\\n${tExt.chatExtended.forDetailedInfo}`
        : `${t.chat.welcomeMessage} "${userMessage.content}". ${t.chat.activeAgents}: ${activeModules.join(", ")}.`;

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: orchestratorSummary, // Default content is orchestrator summary
        sender: "ai",
        timestamp: new Date(),
        activeModules: activeModules,
        agentResponses: agentResponses,
        orchestratorSummary: orchestratorSummary
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    const locale = language === 'de' ? 'de-DE' : 
                   language === 'en' ? 'en-US' :
                   language === 'fr' ? 'fr-FR' : 'pt-BR';
    
    return date.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: AttachedFile[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }));

    setAttachedFiles(prev => [...prev, ...newFiles]);
    toast.success(tExt.chatExtended.filesAdded.replace('{count}', newFiles.length.toString()));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeAttachment = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    handleFileSelect(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (type === 'application/pdf') return <FileText className="h-4 w-4" />;
    return <Paperclip className="h-4 w-4" />;
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    toast.success(t.chat.interface.messageDeleted);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success(t.chat.interface.messageCopied);
  };

  return (
    <div 
      className="flex flex-col h-full relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag & Drop Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/10 border-4 border-dashed border-primary z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <Paperclip className="h-12 w-12 mx-auto mb-2 text-primary" />
            <p className="text-lg font-medium">{t.chat.interface.dropFilesHere}</p>
            <p className="text-sm text-muted-foreground">{t.chat.interface.dropFilesDescription}</p>
          </div>
        </div>
      )}

      {/* Messages - No header anymore */}
      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2.5 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <Avatar className="w-7 h-7 flex-shrink-0">
                {message.sender === 'user' ? (
                  <>
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt="User" />
                    ) : null}
                    <AvatarFallback className="text-xs">
                      <User className="h-3.5 w-3.5" />
                    </AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src={aiAvatar} alt="AI" />
                    <AvatarFallback className="text-xs">
                      <Bot className="h-3.5 w-3.5" />
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              
              <div
                className={`flex flex-col gap-1 max-w-[75%] group relative ${
                  message.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Message Actions Menu */}
                <div className={`absolute -top-2 ${message.sender === 'user' ? '-left-10' : '-right-10'} opacity-0 group-hover:opacity-100 transition-opacity z-10`}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 bg-card/80 backdrop-blur-sm hover:bg-card border border-border"
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={message.sender === 'user' ? 'start' : 'end'} className="text-xs">
                      <DropdownMenuItem onClick={() => handleCopyMessage(message.content)}>
                        <Copy className="h-3 w-3 mr-2" />
                        {t.chat.interface.copy}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteMessage(message.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        {t.chat.interface.deleteAction}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Card
                  className={`p-2.5 border-0 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.sender === 'ai' && message.agentResponses && selectedAgentView[message.id]
                      ? message.agentResponses.find(r => r.agentId === selectedAgentView[message.id])?.content || message.orchestratorSummary || message.content
                      : message.orchestratorSummary || message.content}
                  </p>
                  
                  {/* Display Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {message.attachments.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-2 p-2 rounded bg-background/50 border border-border/50"
                        >
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
                
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
                  <span>{formatTime(message.timestamp)}</span>
                  {message.activeModules && message.activeModules.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {/* Orchestrator Badge - shows summary by default */}
                      {message.sender === 'ai' && message.orchestratorSummary && (
                        <Badge 
                          variant={!selectedAgentView[message.id] ? "default" : "outline"} 
                          className="text-xs h-5 px-1.5 py-0 cursor-pointer hover:bg-primary/10 transition-colors"
                          style={{ borderColor: 'var(--color-gray-medium)' }}
                          onClick={() => {
                            setSelectedAgentView(prev => ({
                              ...prev,
                              [message.id]: null
                            }));
                          }}
                        >
                          🤖 Orchestrator
                        </Badge>
                      )}
                      {/* Individual Agent Badges */}
                      {message.activeModules.map((module) => (
                        <Badge 
                          key={module} 
                          variant={selectedAgentView[message.id] === module ? "default" : "outline"} 
                          className="text-xs h-5 px-1.5 py-0 cursor-pointer hover:bg-primary/10 transition-colors"
                          style={{ borderColor: '#E1E3E6' }}
                          onClick={() => {
                            if (message.sender === 'ai' && message.agentResponses) {
                              setSelectedAgentView(prev => ({
                                ...prev,
                                [message.id]: prev[message.id] === module ? null : module
                              }));
                            }
                          }}
                        >
                          {module}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-2.5">
              <Avatar className="w-7 h-7">
                <AvatarImage src={aiAvatar} alt="AI" />
                <AvatarFallback className="text-xs">
                  <Bot className="h-3.5 w-3.5" />
                </AvatarFallback>
              </Avatar>
              <Card className="p-2.5 bg-muted/50 border-0 shadow-sm">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    {t.chat.thinking}
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input with Microphone */}
      <div className="border-t border-border p-3">
        {/* Attached Files Preview */}
        {attachedFiles.length > 0 && (
          <div className="mb-2 space-y-1.5">
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border"
              >
                {getFileIcon(file.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => removeAttachment(file.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInputChange}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />

          {/* Plus Button with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm"
                variant="outline"
                className="h-8 px-2 border-border"
                title={t.chat.interface.addFiles}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="h-4 w-4 mr-2" />
                {t.chat.interface.addPhotosAndFiles}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info(t.chat.interface.screenshotInDevelopment)}>
                <Camera className="h-4 w-4 mr-2" />
                {t.chat.interface.takeScreenshot}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.capture = 'environment';
                input.onchange = (e) => handleFileSelect((e.target as HTMLInputElement).files);
                input.click();
              }}>
                <Camera className="h-4 w-4 mr-2" />
                {t.chat.interface.takePhoto}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info(t.chat.interface.deepResearchInDevelopment)}>
                <FileText className="h-4 w-4 mr-2" />
                {t.chat.interface.deepResearch}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info(t.chat.interface.createImageInDevelopment)}>
                <ImageIcon className="h-4 w-4 mr-2" />
                {t.chat.interface.createImage}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.chat.placeholder}
            disabled={isLoading}
            className="flex-1 h-8 text-sm bg-card border-border focus:border-ring focus:ring-1 focus:ring-ring/20"
          />
          <Button 
            size="sm"
            variant="outline"
            className="h-8 px-2 hover:bg-red-50 hover:text-red-600 border-border dark:hover:bg-red-950/50"
            title={t.chat.interface.recordAudio}
          >
            <Mic className="h-3.5 w-3.5" />
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
            size="sm"
            className="h-8 px-3"
            title={t.chat.send}
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        {activeModules.length === 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {t.chat.noActiveAgents}
          </p>
        )}
      </div>
    </div>
  );
}