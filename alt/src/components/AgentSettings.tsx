import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { useLanguage } from "../contexts/LanguageContext";
import { getLanguageFlag, type Language } from "../utils/i18n";
import { 
  Bot, 
  Settings, 
  Languages, 
  MessageSquare,
  Thermometer,
  FileText,
  Save,
  Mail,
  Shield,
  Globe,
  Building,
  Lock,
  Unlock,
  Moon,
  Sun
} from "lucide-react";

interface AgentSettingsProps {
  user: { username: string; role: 'admin' | 'user' };
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onAgentsChange?: (activeAgents: string[]) => void;
}

export function AgentSettings({ user, isDarkMode, onToggleDarkMode, onAgentsChange }: AgentSettingsProps) {
  const { language, setLanguage, t } = useLanguage();
  
  const [settings, setSettings] = useState({
    customPrompt: "",
    responseSettings: {
      length: "medium",
      tone: "professional",
      temperature: 0.7, // 0.0 - 1.0
    }
  });

  // Load agent activation states from localStorage
  const [activeAgents, setActiveAgents] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('activeAgents');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    // Default: all agents active except Jelmoli (which starts as available)
    return {
      "email-agent": true,
      "normen-agent": true,
      "internet-agent": true,
      "jelmoli-agent": false
    };
  });

  const agents = [
    {
      id: "email-agent",
      name: t.agents.emailAgent.name,
      description: t.agents.emailAgent.description,
      status: activeAgents["email-agent"] ? "active" : "available",
      privacy: "private",
      capabilities: t.agents.emailAgent.capabilities,
      icon: Mail
    },
    {
      id: "normen-agent",
      name: t.agents.normenAgent.name, 
      description: t.agents.normenAgent.description,
      status: activeAgents["normen-agent"] ? "active" : "available",
      privacy: "public",
      capabilities: t.agents.normenAgent.capabilities,
      icon: Shield
    },
    {
      id: "internet-agent",
      name: t.agents.internetAgent.name,
      description: t.agents.internetAgent.description,
      status: activeAgents["internet-agent"] ? "active" : "available", 
      privacy: "public",
      capabilities: t.agents.internetAgent.capabilities,
      icon: Globe
    },
    {
      id: "jelmoli-agent",
      name: t.agents.jelmoliAgent.name,
      description: t.agents.jelmoliAgent.description,
      status: activeAgents["jelmoli-agent"] ? "active" : "available",
      privacy: "public", 
      capabilities: t.agents.jelmoliAgent.capabilities,
      icon: Building
    }
  ];

  const updateSetting = (path: string, value: any) => {
    const keys = path.split('.');
    setSettings(prev => {
      const updated = { ...prev };
      let current = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return updated;
    });
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const toggleAgent = (agentId: string) => {
    setActiveAgents(prev => {
      const updated = { ...prev, [agentId]: !prev[agentId] };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeAgents', JSON.stringify(updated));
      }
      
      // Notify parent component about changes
      if (onAgentsChange) {
        const activeAgentIds = Object.keys(updated).filter(id => updated[id]);
        onAgentsChange(activeAgentIds);
      }
      
      return updated;
    });
  };

  const handleSave = () => {
    console.log("Agent settings saved:", settings);
  };

  return (
    <div className="p-5 space-y-5 max-h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <h2 className="flex items-center gap-2 text-lg">
            <Settings className="h-4 w-4" />
            {t.agentSettings.title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t.agentSettings.subtitle}
          </p>
        </div>
        <Button onClick={handleSave} size="sm" className="h-7 px-3 text-xs">
          <Save className="h-3 w-3 mr-1.5" />
          {t.save}
        </Button>
      </div>

      {/* Available Agents */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bot className="h-4 w-4" />
            {t.agentSettings.availableAgents}
          </CardTitle>
          <CardDescription className="text-xs">
            {t.agentSettings.agentDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {agents.map((agent) => {
            const IconComponent = agent.icon;
            return (
              <div key={agent.id} className="border border-border rounded-md p-3 space-y-2 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{agent.name}</h4>
                        <div className="flex items-center gap-1">
                          <Badge 
                            variant={agent.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs h-4 px-1.5"
                          >
                            {agent.status === 'active' ? t.agentSettings.active : t.agentSettings.available}
                          </Badge>
                          <Badge 
                            variant={agent.privacy === 'private' ? 'destructive' : 'outline'}
                            className="text-xs h-4 px-1.5 flex items-center gap-1"
                          >
                            {agent.privacy === 'private' ? (
                              <><Lock className="h-2.5 w-2.5" />{t.agentSettings.private}</>
                            ) : (
                              <><Unlock className="h-2.5 w-2.5" />{t.agentSettings.public}</>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Agent Activation Switch */}
                  <div className="flex flex-col items-end gap-1">
                    <Switch
                      checked={activeAgents[agent.id]}
                      onCheckedChange={() => toggleAgent(agent.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label className="text-xs text-muted-foreground cursor-pointer" onClick={() => toggleAgent(agent.id)}>
                      {activeAgents[agent.id] ? t.agentSettings.activated : t.agentSettings.deactivated}
                    </Label>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.map((capability) => (
                    <Badge key={capability} variant="outline" className="text-xs h-4 px-1.5 bg-card">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Custom Prompt */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" />
            {t.agentSettings.customPrompt}
          </CardTitle>
          <CardDescription className="text-xs">
            {t.agentSettings.customPromptDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="customPrompt" className="text-sm">{t.agentSettings.customPromptLabel}</Label>
            <Textarea
              id="customPrompt"
              placeholder={t.agentSettings.customPromptPlaceholder}
              value={settings.customPrompt}
              onChange={(e) => updateSetting('customPrompt', e.target.value)}
              rows={3}
              className="text-sm bg-card border-border focus:border-ring focus:ring-1 focus:ring-ring/20 resize-none"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {t.agentSettings.customPromptTip}
          </p>
        </CardContent>
      </Card>

      {/* Response Settings */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4" />
            {t.agentSettings.responseSettings}
          </CardTitle>
          <CardDescription className="text-xs">
            {t.agentSettings.responseDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="responseLength" className="text-sm">{t.agentSettings.responseLength}</Label>
              <Select 
                value={settings.responseSettings.length} 
                onValueChange={(value) => updateSetting('responseSettings.length', value)}
              >
                <SelectTrigger className="h-8 text-sm bg-card border-border focus:border-ring focus:ring-1 focus:ring-ring/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">{t.agentSettings.short}</SelectItem>
                  <SelectItem value="medium">{t.agentSettings.medium}</SelectItem>
                  <SelectItem value="long">{t.agentSettings.long}</SelectItem>
                  <SelectItem value="comprehensive">{t.agentSettings.comprehensive}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tone" className="text-sm">{t.agentSettings.responseTone}</Label>
              <Select 
                value={settings.responseSettings.tone} 
                onValueChange={(value) => updateSetting('responseSettings.tone', value)}
              >
                <SelectTrigger className="h-8 text-sm bg-card border-border focus:border-ring focus:ring-1 focus:ring-ring/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">{t.agentSettings.professional}</SelectItem>
                  <SelectItem value="casual">{t.agentSettings.casual}</SelectItem>
                  <SelectItem value="friendly">{t.agentSettings.friendly}</SelectItem>
                  <SelectItem value="formal">{t.agentSettings.formal}</SelectItem>
                  <SelectItem value="expert">{t.agentSettings.expert}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <div>
                <Label htmlFor="temperature" className="text-sm">{t.agentSettings.creativity}</Label>
                <p className="text-xs text-muted-foreground">
                  {t.agentSettings.creativityDescription}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t.agentSettings.conservative}</span>
                <span className="text-sm font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground">
                  {settings.responseSettings.temperature.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">{t.agentSettings.creative}</span>
              </div>
              <Slider
                value={[settings.responseSettings.temperature]}
                onValueChange={(value) => updateSetting('responseSettings.temperature', value[0])}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="hidden sm:grid grid-cols-3 text-xs text-muted-foreground">
                <span>0.0 - {t.agentSettings.preciseLabel}</span>
                <span className="text-center">0.5 - {t.agentSettings.balancedLabel}</span>
                <span className="text-right">1.0 - {t.agentSettings.creativeLabel}</span>
              </div>
              <div className="flex sm:hidden justify-between text-xs text-muted-foreground">
                <span>0.0</span>
                <span>1.0</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}