import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  User, 
  Settings, 
  Bell, 
  Palette, 
  Shield, 
  Key,
  Save,
  UserCircle,
  Upload,
  Camera,
  Eye,
  EyeOff,
  Check,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner@2.0.3";

interface UserSettingsProps {
  user: { username: string; role: 'admin' | 'user' };
  onLogout: () => void;
}

export function UserSettings({ user, onLogout }: UserSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(
    user.username === "Aila Kimura" 
      ? "https://media.licdn.com/dms/image/v2/C4D03AQEfiV5ul-CgkQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517043762470?e=1740009600&v=beta&t=fynMkNivEtJl8_oC-n8uNiL4jhQDj5hfF1qMJQe_JqE"
      : null
  );
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    displayName: user.username,
    email: `${user.username}@example.com`,
    phone: "",
    jobTitle: user.role === 'admin' ? 'Administrator' : 'Benutzer',
    department: "",
    language: "de",
    theme: "system",
    notifications: {
      email: true,
      push: false,
      system: true,
    },
    privacy: {
      analyticsOptIn: false,
      dataSharing: false,
    },
    aiPreferences: {
      defaultResponseLength: "medium",
      preferredTone: "professional",
      saveConversations: true,
    }
  });

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

  const handleSave = () => {
    // In real app, save to backend
    console.log("Settings saved:", settings);
    toast.success("Einstellungen erfolgreich gespeichert");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Bitte wählen Sie eine Bilddatei aus");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Bild darf nicht größer als 5MB sein");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Profilbild erfolgreich aktualisiert");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("Profilbild entfernt");
  };

  const handlePasswordChange = () => {
    // Validate passwords
    if (!passwordData.currentPassword) {
      toast.error("Bitte geben Sie Ihr aktuelles Passwort ein");
      return;
    }
    
    if (!passwordData.newPassword) {
      toast.error("Bitte geben Sie ein neues Passwort ein");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error("Das neue Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Die Passwörter stimmen nicht überein");
      return;
    }
    
    // In real app, send to backend
    console.log("Password change requested");
    toast.success("Passwort erfolgreich geändert");
    setIsPasswordDialogOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Benutzereinstellungen
          </h2>
          <p className="text-muted-foreground">
            Verwalten Sie Ihr Profil und Ihre Einstellungen
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Speichern
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="w-24 h-24">
                  {profileImage && <AvatarImage src={profileImage} alt={user.username} />}
                  <AvatarFallback className="text-2xl">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {/* Image Upload Overlay */}
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-white hover:bg-white/20 hover:text-white rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  {profileImage && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-white hover:bg-white/20 hover:text-white rounded-full"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              
              <div className="text-center">
                <div className="font-medium">{settings.displayName}</div>
                <div className="text-sm text-muted-foreground">{settings.email}</div>
                <Badge 
                  variant={user.role === 'admin' ? 'default' : 'secondary'}
                  className="mt-2"
                >
                  {user.role === 'admin' ? 'Administrator' : 'Benutzer'}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <Label htmlFor="displayName">Anzeigename</Label>
                <Input
                  id="displayName"
                  value={settings.displayName}
                  onChange={(e) => updateSetting('displayName', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting('email', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+41 XX XXX XX XX"
                  value={settings.phone}
                  onChange={(e) => updateSetting('phone', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="jobTitle">Jobtitel</Label>
                <Input
                  id="jobTitle"
                  value={settings.jobTitle}
                  onChange={(e) => updateSetting('jobTitle', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="department">Abteilung</Label>
                <Input
                  id="department"
                  placeholder="z.B. IT, Marketing, Sales"
                  value={settings.department}
                  onChange={(e) => updateSetting('department', e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <Button variant="destructive" onClick={onLogout} className="w-full">
              Abmelden
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Benachrichtigungen
              </CardTitle>
              <CardDescription>
                Verwalten Sie, wie Sie benachrichtigt werden möchten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">E-Mail Benachrichtigungen</Label>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie E-Mails für wichtige Updates
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => updateSetting('notifications.email', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">Push Benachrichtigungen</Label>
                  <p className="text-sm text-muted-foreground">
                    Browser-Benachrichtigungen aktivieren
                  </p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => updateSetting('notifications.push', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="systemNotifications">System-Benachrichtigungen</Label>
                  <p className="text-sm text-muted-foreground">
                    Benachrichtigungen über System-Events
                  </p>
                </div>
                <Switch
                  id="systemNotifications"
                  checked={settings.notifications.system}
                  onCheckedChange={(checked) => updateSetting('notifications.system', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                AI-Präferenzen
              </CardTitle>
              <CardDescription>
                Anpassung der AI-Interaktion an Ihre Bedürfnisse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responseLength">Standard Antwortlänge</Label>
                  <Select 
                    value={settings.aiPreferences.defaultResponseLength} 
                    onValueChange={(value) => updateSetting('aiPreferences.defaultResponseLength', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Kurz</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Ausführlich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Bevorzugter Ton</Label>
                  <Select 
                    value={settings.aiPreferences.preferredTone} 
                    onValueChange={(value) => updateSetting('aiPreferences.preferredTone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professionell</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Freundlich</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="saveConversations">Gespräche speichern</Label>
                  <p className="text-sm text-muted-foreground">
                    Gespräche für spätere Referenz speichern
                  </p>
                </div>
                <Switch
                  id="saveConversations"
                  checked={settings.aiPreferences.saveConversations}
                  onCheckedChange={(checked) => updateSetting('aiPreferences.saveConversations', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Datenschutz & Sicherheit
              </CardTitle>
              <CardDescription>
                Kontrollieren Sie Ihre Daten und Privatsphäre
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Analytics aktivieren</Label>
                  <p className="text-sm text-muted-foreground">
                    Helfen Sie uns, das Produkt zu verbessern
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={settings.privacy.analyticsOptIn}
                  onCheckedChange={(checked) => updateSetting('privacy.analyticsOptIn', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataSharing">Daten-Freigabe</Label>
                  <p className="text-sm text-muted-foreground">
                    Anonyme Daten für Forschung freigeben
                  </p>
                </div>
                <Switch
                  id="dataSharing"
                  checked={settings.privacy.dataSharing}
                  onCheckedChange={(checked) => updateSetting('privacy.dataSharing', checked)}
                />
              </div>

              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  <Key className="h-4 w-4" />
                  Passwort ändern
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Passwort ändern
            </DialogTitle>
            <DialogDescription>
              Geben Sie Ihr aktuelles Passwort ein und wählen Sie ein neues Passwort.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Aktuelles Passwort</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Neues Passwort</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Mindestens 8 Zeichen
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Neues Passwort bestätigen</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {passwordData.newPassword && passwordData.confirmPassword && (
                <div className="flex items-center gap-1 text-xs">
                  {passwordData.newPassword === passwordData.confirmPassword ? (
                    <>
                      <Check className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">Passwörter stimmen überein</span>
                    </>
                  ) : (
                    <>
                      <X className="h-3 w-3 text-destructive" />
                      <span className="text-destructive">Passwörter stimmen nicht überein</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsPasswordDialogOpen(false);
                setPasswordData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: ""
                });
              }}
            >
              Abbrechen
            </Button>
            <Button
              type="button"
              onClick={handlePasswordChange}
            >
              Passwort ändern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}