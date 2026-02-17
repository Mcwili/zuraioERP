import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner@2.0.3";
import {
  User,
  Camera,
  Key,
  Globe,
  Palette,
  Upload,
  X,
  Save,
  Eye,
  EyeOff,
  LogOut
} from "lucide-react";

interface AccountSettingsProps {
  user: { username: string; role: 'admin' | 'user' };
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout?: () => void;
  profileImage?: string | null;
  onProfileImageChange?: (image: string | null) => void;
}

export function AccountSettings({ user, isDarkMode, onToggleDarkMode, onLogout, profileImage: externalProfileImage, onProfileImageChange }: AccountSettingsProps) {
  const { t, language, setLanguage } = useLanguage();
  const [localProfileImage, setLocalProfileImage] = useState<string | null>(
    externalProfileImage !== undefined ? externalProfileImage : (
      user.username === "Aila Kimura" 
        ? "https://media.licdn.com/dms/image/v2/C4D03AQEfiV5ul-CgkQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517043762470?e=1740009600&v=beta&t=fynMkNivEtJl8_oC-n8uNiL4jhQDj5hfF1qMJQe_JqE"
        : null
    )
  );
  
  // Use external profile image if provided, otherwise use local
  const profileImage = externalProfileImage !== undefined ? externalProfileImage : localProfileImage;
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [userDetails, setUserDetails] = useState({
    displayName: user.username,
    email: `${user.username}@company.com`,
    phone: '',
    jobTitle: user.role === 'admin' ? t.account.administrator : t.account.user,
    department: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user initials for avatar fallback
  const getUserInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(t.account.imageTooLarge);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        setLocalProfileImage(newImage);
        if (onProfileImageChange) {
          onProfileImageChange(newImage);
        }
        toast.success(t.success);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setLocalProfileImage(null);
    if (onProfileImageChange) {
      onProfileImageChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success(t.account.removeImage);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error(t.account.passwordMismatch);
      return;
    }
    
    if (passwords.new.length < 6) {
      toast.error(t.tenantAdmin.placeholders.passwordMinLength);
      return;
    }
    
    // Here you would typically make an API call to update the password
    // For now, just show success message
    toast.success(t.account.passwordUpdated);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleSaveChanges = () => {
    // Here you would typically save all settings to the backend
    toast.success(t.account.saveChanges + ' - ' + t.success);
  };

  return (
    <div className="w-full h-full overflow-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{t.account.title}</h1>
        <p className="text-muted-foreground">{t.account.subtitle}</p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t.account.personalInfo}
          </CardTitle>
          <CardDescription>{t.account.personalInfoDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="space-y-4">
            <Label>{t.account.profilePicture}</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profileImage || undefined} />
                <AvatarFallback
                  className="text-lg"
                  style={{
                    background: 'linear-gradient(135deg, #5ebc67 0%, #7ed87e 100%)',
                    color: 'white'
                  }}
                >
                  {getUserInitials(user.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {t.account.uploadImage}
                </Button>
                {profileImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                    {t.account.removeImage}
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {t.account.profilePictureDescription}
            </p>
          </div>

          <Separator />

          {/* User Info Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t.account.username}</Label>
              <Input
                id="username"
                value={user.username}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">{t.account.displayName}</Label>
              <Input
                id="displayName"
                value={userDetails.displayName}
                onChange={(e) => setUserDetails(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder={t.tenantAdmin.accountExtended.displayNamePlaceholder}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.account.email}</Label>
              <Input
                id="email"
                type="email"
                value={userDetails.email}
                onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                placeholder={t.tenantAdmin.placeholders.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t.account.phoneNumber}</Label>
              <Input
                id="phone"
                type="tel"
                value={userDetails.phone}
                onChange={(e) => setUserDetails(prev => ({ ...prev, phone: e.target.value }))}
                placeholder={t.tenantAdmin.placeholders.phone}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">{t.account.jobTitle}</Label>
              <Input
                id="jobTitle"
                value={userDetails.jobTitle}
                onChange={(e) => setUserDetails(prev => ({ ...prev, jobTitle: e.target.value }))}
                placeholder={t.tenantAdmin.placeholders.jobTitle}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">{t.account.department}</Label>
              <Input
                id="department"
                value={userDetails.department}
                onChange={(e) => setUserDetails(prev => ({ ...prev, department: e.target.value }))}
                placeholder={t.tenantAdmin.placeholders.department}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">{t.account.role}</Label>
              <Input
                id="role"
                value={user.role}
                disabled
                className="bg-muted capitalize"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            {t.account.changePassword}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">{t.account.currentPassword}</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password">{t.account.newPassword}</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password">{t.account.confirmPassword}</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <Button
            onClick={handlePasswordChange}
            disabled={!passwords.current || !passwords.new || !passwords.confirm}
            className="flex items-center gap-2"
          >
            <Key className="h-4 w-4" />
            {t.account.updatePassword}
          </Button>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t.account.languageSection}
          </CardTitle>
          <CardDescription>{t.account.languageDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="language">{t.agentSettings.language}</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="de">🇩🇪 {t.languages.de}</SelectItem>
                <SelectItem value="en">🇺🇸 {t.languages.en}</SelectItem>
                <SelectItem value="fr">🇫🇷 {t.languages.fr}</SelectItem>
                <SelectItem value="pt-br">🇧🇷 {t.languages['pt-br']}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {t.account.themeSection}
          </CardTitle>
          <CardDescription>{t.account.themeDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="dark-mode">{t.agentSettings.darkMode}</Label>
              <p className="text-sm text-muted-foreground">
                {t.agentSettings.darkModeDescription}
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={onToggleDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Logout Section */}
      {onLogout && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <LogOut className="h-5 w-5" />
              {t.account.endSession}
            </CardTitle>
            <CardDescription>
              {t.account.endSessionDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {t.accountPanel.logoutButton}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveChanges} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          {t.account.saveChanges}
        </Button>
      </div>
    </div>
  );
}