import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Settings, Play, Pause, RotateCcw } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface OrchestratorSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  systemPrompt: string;
  streaming: boolean;
}

export function OrchestratorPanel() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<OrchestratorSettings>({
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    systemPrompt: "Du bist ein hilfreicher AI-Assistent.",
    streaming: true,
  });

  const [isRunning, setIsRunning] = useState(false);

  const models = [
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "claude-3", name: "Claude 3" },
    { id: "llama-2", name: "Llama 2" },
  ];

  const updateSetting = (key: keyof OrchestratorSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings({
      model: "gpt-4",
      temperature: 0.7,
      maxTokens: 2048,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0,
      systemPrompt: "Du bist ein hilfreicher AI-Assistent.",
      streaming: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI Hub
          </h2>
          <p className="text-muted-foreground">
            {t.orchestratorPanel.configureSettings}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isRunning ? "default" : "secondary"}>
            {isRunning ? t.orchestratorPanel.active : t.orchestratorPanel.inactive}
          </Badge>
          <Button
            variant={isRunning ? "destructive" : "default"}
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRunning ? t.orchestratorPanel.stop : t.orchestratorPanel.start}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Selection */}
        <Card>
          <CardHeader>
            <CardTitle>{t.orchestratorPanel.modelConfig}</CardTitle>
            <CardDescription>
              {t.orchestratorPanel.modelConfigDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model">{t.orchestratorPanel.aiModel}</Label>
              <Select
                value={settings.model}
                onValueChange={(value) => updateSetting("model", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.tenantAdmin.orchestratorExtended.selectModel} />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTokens">{t.orchestratorPanel.maxTokens}</Label>
              <Input
                id="maxTokens"
                type="number"
                value={settings.maxTokens}
                onChange={(e) => updateSetting("maxTokens", parseInt(e.target.value))}
                min="1"
                max="8192"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="streaming">{t.orchestratorPanel.streamingEnabled}</Label>
              <Switch
                id="streaming"
                checked={settings.streaming}
                onCheckedChange={(checked) => updateSetting("streaming", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Advanced Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>{t.orchestratorPanel.advancedParams}</CardTitle>
            <CardDescription>
              {t.orchestratorPanel.advancedParamsDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="temperature">{t.orchestratorPanel.temperature}</Label>
                <span className="text-sm text-muted-foreground">{settings.temperature}</span>
              </div>
              <Slider
                id="temperature"
                min={0}
                max={2}
                step={0.1}
                value={[settings.temperature]}
                onValueChange={([value]) => updateSetting("temperature", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="topP">{t.orchestratorPanel.topP}</Label>
                <span className="text-sm text-muted-foreground">{settings.topP}</span>
              </div>
              <Slider
                id="topP"
                min={0}
                max={1}
                step={0.05}
                value={[settings.topP]}
                onValueChange={([value]) => updateSetting("topP", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="frequencyPenalty">{t.orchestratorPanel.frequencyPenalty}</Label>
                <span className="text-sm text-muted-foreground">{settings.frequencyPenalty}</span>
              </div>
              <Slider
                id="frequencyPenalty"
                min={-2}
                max={2}
                step={0.1}
                value={[settings.frequencyPenalty]}
                onValueChange={([value]) => updateSetting("frequencyPenalty", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="presencePenalty">{t.orchestratorPanel.presencePenalty}</Label>
                <span className="text-sm text-muted-foreground">{settings.presencePenalty}</span>
              </div>
              <Slider
                id="presencePenalty"
                min={-2}
                max={2}
                step={0.1}
                value={[settings.presencePenalty]}
                onValueChange={([value]) => updateSetting("presencePenalty", value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Prompt */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.orchestratorPanel.systemPrompt}</CardTitle>
            <CardDescription>
              {t.orchestratorPanel.systemPromptDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={settings.systemPrompt}
              onChange={(e) => updateSetting("systemPrompt", e.target.value)}
              placeholder={t.orchestratorPanel.systemPromptPlaceholder}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={resetToDefaults}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                {t.orchestratorPanel.reset}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}