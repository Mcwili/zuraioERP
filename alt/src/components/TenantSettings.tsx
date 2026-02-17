import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Save, Upload, CheckCircle2, XCircle, RefreshCw, AlertCircle, Settings, Shield, Lock, Plus, FileCheck2, Download, ArrowRight, ChevronDown, ChevronRight, Check, ExternalLink, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { useLanguage, useExtendedTranslations } from "../utils/i18n";
import { ResponsibilitiesSettings } from "./ResponsibilitiesSettings";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface TenantSettingsProps {
  section: string;
  isDarkMode?: boolean;
  onNavigate?: (section: string) => void;
}

export function TenantSettings({ section, isDarkMode, onNavigate }: TenantSettingsProps) {
  // Handle nested paths (e.g., "compliance.euaiact")
  const sectionParts = section.split('.');
  const mainSection = sectionParts[0];
  const subSection = sectionParts[1];

  if (mainSection === "general") {
    return <GeneralSettings isDarkMode={isDarkMode} onNavigate={onNavigate} />;
  } else if (mainSection === "compliance") {
    if (subSection === "euaiact") {
      return <EUAIActSettings isDarkMode={isDarkMode} onNavigate={onNavigate} />;
    } else if (subSection === "dsgvo") {
      return <DsgvoSettings isDarkMode={isDarkMode} onNavigate={onNavigate} />;
    } else if (subSection === "responsibilities") {
      return <ResponsibilitiesSettings isDarkMode={isDarkMode} onNavigate={onNavigate} />;
    }
    // Default to first compliance item if no subsection
    return <EUAIActSettings isDarkMode={isDarkMode} onNavigate={onNavigate} />;
  } else if (mainSection === "security") {
    return <SecuritySettings isDarkMode={isDarkMode} onNavigate={onNavigate} />;
  }
  return <GeneralSettings isDarkMode={isDarkMode} onNavigate={onNavigate} />;
}

function GeneralSettings({ isDarkMode = false, onNavigate }: { isDarkMode?: boolean; onNavigate?: (section: string) => void }) {
  const { t } = useLanguage();
  const tExt = useExtendedTranslations();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useState<HTMLInputElement | null>(null)[0];
  const [previewBg, setPreviewBg] = useState<'white' | 'gray' | 'black'>('white');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    const input = document.getElementById('tenant-logo') as HTMLInputElement;
    input?.click();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Settings Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <Settings className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {t.tenantAdmin.settings.general.title}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Tenant Basis-Informationen */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.general.tenantInformation}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.general.tenantInformationDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="tenant-name" className="font-semibold">{tExt.tenantSettingsExtended.general.tenantName}</Label>
                  <Input id="tenant-name" defaultValue="RMB Group" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="tenant-logo" className="font-semibold">{tExt.tenantSettingsExtended.general.tenantLogo}</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="tenant-logo" 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={triggerFileInput}
                      type="button"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-sm flex items-center" style={{ color: 'var(--foreground-muted)' }}>
                      {logoPreview ? tExt.tenantSettingsExtended.general.logoUploaded : tExt.tenantSettingsExtended.general.noLogoSelected}
                    </div>
                  </div>
                  {logoPreview && (
                    <div className="mt-3 p-4 border rounded-lg" style={{ borderColor: 'var(--color-gray-medium)' }}>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="font-semibold">{tExt.tenantSettingsExtended.general.preview}</Label>
                        <div className="flex gap-1">
                          <Button
                            variant={previewBg === 'white' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPreviewBg('white')}
                            className="px-3"
                            type="button"
                          >
                            {tExt.tenantSettingsExtended.general.white}
                          </Button>
                          <Button
                            variant={previewBg === 'gray' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPreviewBg('gray')}
                            className="px-3"
                            type="button"
                          >
                            {tExt.tenantSettingsExtended.general.gray}
                          </Button>
                          <Button
                            variant={previewBg === 'black' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPreviewBg('black')}
                            className="px-3"
                            type="button"
                          >
                            {tExt.tenantSettingsExtended.general.black}
                          </Button>
                        </div>
                      </div>
                      <div 
                        className="p-6 rounded-lg flex items-center justify-center min-h-[120px]"
                        style={{ 
                          backgroundColor: previewBg === 'white' ? '#ffffff' : previewBg === 'gray' ? '#888888' : '#000000',
                          border: previewBg === 'white' ? '1px solid var(--color-gray-medium)' : 'none'
                        }}
                      >
                        <img 
                          src={logoPreview} 
                          alt={tExt.tenantSettingsExtended.general.logoPreview}
                          className="max-h-24 object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="primary-color" className="font-semibold">{tExt.tenantSettingsExtended.general.primaryColor}</Label>
                    <div className="flex gap-2">
                      <Input id="primary-color" type="color" defaultValue="#B9DE1D" className="w-20 rounded-lg shadow-sm" />
                      <Input defaultValue="#B9DE1D" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="accent-color" className="font-semibold">{tExt.tenantSettingsExtended.general.accentColor}</Label>
                    <div className="flex gap-2">
                      <Input id="accent-color" type="color" defaultValue="#D9E996" className="w-20 rounded-lg shadow-sm" />
                      <Input defaultValue="#D9E996" className="flex-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Firmeninformationen */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.company.companyInformation}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.company.companyInformationDesc}</CardDescription>
                <Alert className="mt-3" style={{ borderColor: '#e1dfdd', backgroundColor: '#f9f9f9' }}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    {tExt.tenantSettingsExtended.company.masterEntryNote}
                  </AlertDescription>
                </Alert>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="company-name" className="font-semibold">{tExt.tenantSettingsExtended.company.companyName}</Label>
                    <Input id="company-name" defaultValue="RMB Group AG" readOnly className="bg-gray-50 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="uid" className="font-semibold">{tExt.tenantSettingsExtended.company.uidTaxNumber}</Label>
                    <Input id="uid" defaultValue="CHE-123.456.789" readOnly className="bg-gray-50 cursor-not-allowed" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="font-semibold">{tExt.tenantSettingsExtended.company.phoneNumber}</Label>
                    <Input id="phone" defaultValue="+41 44 123 45 67" readOnly className="bg-gray-50 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="font-semibold">{tExt.tenantSettingsExtended.company.email}</Label>
                    <Input id="email" defaultValue="mail@rmbgroup.ch" readOnly className="bg-gray-50 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="domain" className="font-semibold">{tExt.tenantSettingsExtended.company.domain}</Label>
                    <Input id="domain" defaultValue="rmbgroup.ch" readOnly className="bg-gray-50 cursor-not-allowed" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="address" className="font-semibold">{tExt.tenantSettingsExtended.company.address}</Label>
                    <Input id="address" defaultValue="Musterstrasse 123" readOnly className="bg-gray-50 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="zip" className="font-semibold">{tExt.tenantSettingsExtended.company.zipCode}</Label>
                    <Input id="zip" defaultValue="8000" readOnly className="bg-gray-50 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="city" className="font-semibold">{tExt.tenantSettingsExtended.company.city}</Label>
                    <Input id="city" defaultValue="Zürich" readOnly className="bg-gray-50 cursor-not-allowed" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regionale Einstellungen */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.regional.regionalSettings}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.regional.regionalSettingsDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="language" className="font-semibold">{tExt.tenantSettingsExtended.regional.language}</Label>
                    <Select defaultValue="de">
                      <SelectTrigger id="language" className="pl-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="de">{tExt.tenantSettingsExtended.regional.languageGerman}</SelectItem>
                        <SelectItem value="en">{tExt.tenantSettingsExtended.regional.languageEnglish}</SelectItem>
                        <SelectItem value="fr">{tExt.tenantSettingsExtended.regional.languageFrench}</SelectItem>
                        <SelectItem value="it">{tExt.tenantSettingsExtended.regional.languageItalian}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="timezone" className="font-semibold">{tExt.tenantSettingsExtended.regional.timezone}</Label>
                    <Select defaultValue="europe/zurich">
                      <SelectTrigger id="timezone" className="pl-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe/zurich">{tExt.tenantSettingsExtended.regional.timezoneZurich}</SelectItem>
                        <SelectItem value="europe/berlin">{tExt.tenantSettingsExtended.regional.timezoneBerlin}</SelectItem>
                        <SelectItem value="utc">{tExt.tenantSettingsExtended.regional.timezoneUTC}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="currency" className="font-semibold">{tExt.tenantSettingsExtended.regional.currency}</Label>
                    <Select defaultValue="chf">
                      <SelectTrigger id="currency" className="pl-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chf">{tExt.tenantSettingsExtended.regional.currencyCHF}</SelectItem>
                        <SelectItem value="eur">{tExt.tenantSettingsExtended.regional.currencyEUR}</SelectItem>
                        <SelectItem value="usd">{tExt.tenantSettingsExtended.regional.currencyUSD}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="date-format" className="font-semibold">{tExt.tenantSettingsExtended.regional.dateFormat}</Label>
                    <Select defaultValue="dd.mm.yyyy">
                      <SelectTrigger id="date-format" className="pl-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd.mm.yyyy">{tExt.tenantSettingsExtended.regional.dateFormatDDMMYYYY}</SelectItem>
                        <SelectItem value="mm/dd/yyyy">{tExt.tenantSettingsExtended.regional.dateFormatMMDDYYYY}</SelectItem>
                        <SelectItem value="yyyy-mm-dd">{tExt.tenantSettingsExtended.regional.dateFormatYYYYMMDD}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.cancel}
              </Button>
              <Button 
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.save}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings({ isDarkMode = false, onNavigate }: { isDarkMode?: boolean; onNavigate?: (section: string) => void }) {
  const { t } = useLanguage();
  const tExt = useExtendedTranslations();
  
  // Access & Network states
  const [identityProvider, setIdentityProvider] = useState<string>("none");
  const [ipWhitelistEnabled, setIpWhitelistEnabled] = useState(false);
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connected" | "error" | "testing">("idle");
  const [ipError, setIpError] = useState<string>("");
  const [enforce2FA, setEnforce2FA] = useState(false);
  const [verifiedEmailOnly, setVerifiedEmailOnly] = useState(true);
  const [autoTokenRefresh, setAutoTokenRefresh] = useState(true);
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Security Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <Shield className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {t.tenantAdmin.settings.security.title}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Passwortrichtlinien */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.passwordPolicies}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.passwordPoliciesDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.minPasswordLength}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.minPasswordLengthDesc}
                    </p>
                  </div>
                  <Input type="number" defaultValue="8" className="w-20 text-right pr-3" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.uppercaseRequired}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.uppercaseRequiredDesc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.digitsRequired}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.digitsRequiredDesc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.specialCharsRequired}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.specialCharsRequiredDesc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.passwordExpiry}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.passwordExpiryDesc}
                    </p>
                  </div>
                  <Input type="number" defaultValue="90" className="w-20 text-right pr-3" />
                </div>
              </CardContent>
            </Card>

            {/* 2FA / MFA */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.twoFactorAuth}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.twoFactorAuthDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.enforce2FAAll}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.enforce2FAAllDesc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.enforce2FAAdmins}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.enforce2FAAdminsDesc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Session-Einstellungen */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.sessionSettings}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.sessionSettingsDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.sessionTimeout}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.sessionTimeoutDesc}
                    </p>
                  </div>
                  <Input type="number" defaultValue="30" className="w-20 text-right pr-3" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.absoluteSessionDuration}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.absoluteSessionDurationDesc}
                    </p>
                  </div>
                  <Input type="number" defaultValue="8" className="w-20 text-right pr-3" />
                </div>
              </CardContent>
            </Card>

            {/* Datenschutz & Compliance */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.privacyCompliance}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.privacyComplianceDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.gdprMode}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.gdprModeDesc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.swissDSG}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.swissDSGDesc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.dataRetention}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.dataRetentionDesc}
                    </p>
                  </div>
                  <Input type="number" defaultValue="365" className="w-24 text-right pr-3" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.archiveBeforeDeletion}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.archiveBeforeDeletionDesc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* SSO Integration */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.singleSignOn}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.singleSignOnDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.enableSSO}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.access.enableSSODesc}
                    </p>
                  </div>
                  <Switch checked={ssoEnabled} onCheckedChange={(checked) => {
                    setSsoEnabled(checked);
                    if (!checked) setIdentityProvider("none");
                  }} />
                </div>

                {ssoEnabled && (
                  <>
                    <Separator />
                    <div className="space-y-1">
                      <Label htmlFor="identity-provider" className="font-semibold">{tExt.tenantSettingsExtended.access.identityProvider}</Label>
                      <Select value={identityProvider} onValueChange={setIdentityProvider}>
                        <SelectTrigger id="identity-provider" className="pl-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">{tExt.tenantSettingsExtended.access.noProvider}</SelectItem>
                          <SelectItem value="microsoft">{tExt.tenantSettingsExtended.access.azureAD}</SelectItem>
                          <SelectItem value="google">{tExt.tenantSettingsExtended.access.googleIdentity}</SelectItem>
                          <SelectItem value="okta">{tExt.tenantSettingsExtended.access.okta}</SelectItem>
                          <SelectItem value="saml">{tExt.tenantSettingsExtended.access.customSAML}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Azure AD Configuration */}
            {identityProvider === "microsoft" && ssoEnabled && (
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader>
                  <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.azureConfiguration}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="ms-tenant-id" className="font-semibold">{tExt.tenantSettingsExtended.access.tenantID}</Label>
                    <Input 
                      id="ms-tenant-id" 
                      placeholder={tExt.tenantSettingsExtended.access.tenantIDPlaceholder}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="ms-client-id" className="font-semibold">{tExt.tenantSettingsExtended.access.clientID}</Label>
                    <Input 
                      id="ms-client-id" 
                      placeholder={tExt.tenantSettingsExtended.access.clientIDPlaceholder}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="ms-client-secret" className="font-semibold">{tExt.tenantSettingsExtended.access.clientSecret}</Label>
                    <Input 
                      id="ms-client-secret" 
                      type="password" 
                      placeholder={tExt.tenantSettingsExtended.access.clientSecretPlaceholder}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => {
                        setConnectionStatus("testing");
                        setTimeout(() => setConnectionStatus("connected"), 1500);
                      }}
                    >
                      {connectionStatus === "testing" ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      {tExt.tenantSettingsExtended.access.testConnection}
                    </Button>

                    {connectionStatus === "connected" && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle2 className="h-4 w-4" style={{ color: '#5ebc67' }} />
                        <AlertDescription>
                          <strong>{tExt.tenantSettingsExtended.access.connectionSuccessful}</strong>
                        </AlertDescription>
                      </Alert>
                    )}

                    {connectionStatus === "error" && (
                      <Alert className="border-red-200 bg-red-50">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-900">
                          <strong>{tExt.tenantSettingsExtended.access.connectionError}</strong>
                        </AlertDescription>
                      </Alert>
                    )}

                    {connectionStatus === "idle" && (
                      <Alert className="border-amber-200 bg-amber-50">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-900">
                          <strong>{tExt.tenantSettingsExtended.access.notConnected}</strong>
                        </AlertDescription>
                      </Alert>
                    )}

                    {connectionStatus === "testing" && (
                      <Alert className="border-blue-200 bg-blue-50">
                        <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
                        <AlertDescription className="text-blue-900">
                          <strong>{tExt.tenantSettingsExtended.access.testing}</strong>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* SSO Requirements */}
            {identityProvider !== "none" && ssoEnabled && (
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader>
                  <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.ssoRequirements}</CardTitle>
                  <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.ssoRequirementsDesc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.enforce2FAForSSO}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.access.enforce2FAForSSODesc}
                      </p>
                    </div>
                    <Switch checked={enforce2FA} onCheckedChange={setEnforce2FA} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.verifiedEmailOnly}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.access.verifiedEmailOnlyDesc}
                      </p>
                    </div>
                    <Switch checked={verifiedEmailOnly} onCheckedChange={setVerifiedEmailOnly} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.autoTokenRefresh}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.access.autoTokenRefreshDesc}
                      </p>
                    </div>
                    <Switch checked={autoTokenRefresh} onCheckedChange={setAutoTokenRefresh} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* IP Whitelist */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.ipWhitelist}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.ipWhitelistDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.enableIPWhitelist}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.access.enableIPWhitelistDesc}
                    </p>
                  </div>
                  <Switch checked={ipWhitelistEnabled} onCheckedChange={setIpWhitelistEnabled} />
                </div>

                {ipWhitelistEnabled && (
                  <>
                    <Separator />
                    <div className="space-y-1">
                      <Label htmlFor="ip-addresses" className="font-semibold">{tExt.tenantSettingsExtended.access.allowedIPs}</Label>
                      <div className="space-y-2">
                        <Input 
                          id="ip-address" 
                          placeholder={tExt.tenantSettingsExtended.access.ipAddressPlaceholder}
                        />
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          {tExt.tenantSettingsExtended.access.addIP}
                        </Button>
                      </div>
                      {ipError && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-600 text-sm">
                            {tExt.tenantSettingsExtended.access.ipFormatError}
                          </AlertDescription>
                        </Alert>
                      )}
                      <Alert style={{ borderColor: '#e1dfdd', backgroundColor: '#f9f9f9' }}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          {tExt.tenantSettingsExtended.access.ipWarning}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.cancel}
              </Button>
              <Button 
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.save}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccessSettings({ isDarkMode = false, onNavigate }: { isDarkMode?: boolean; onNavigate?: (section: string) => void }) {
  const { t } = useLanguage();
  const tExt = useExtendedTranslations();
  const [identityProvider, setIdentityProvider] = useState<string>("none");
  const [ipWhitelistEnabled, setIpWhitelistEnabled] = useState(false);
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connected" | "error" | "testing">("idle");
  const [ipError, setIpError] = useState<string>("");
  const [enforce2FA, setEnforce2FA] = useState(false);
  const [verifiedEmailOnly, setVerifiedEmailOnly] = useState(true);
  const [autoTokenRefresh, setAutoTokenRefresh] = useState(true);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Access Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <Lock className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {t.tenantAdmin.settings.access.title}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* SSO Integration - Moved to top */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.singleSignOn}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.singleSignOnDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.enableSSO}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.access.enableSSODesc}
                    </p>
                  </div>
                  <Switch checked={ssoEnabled} onCheckedChange={(checked) => {
                    setSsoEnabled(checked);
                    if (!checked) setIdentityProvider("none");
                  }} />
                </div>

                {ssoEnabled && (
                  <>
                    <Separator />
                    <div className="space-y-1">
                      <Label htmlFor="identity-provider" className="font-semibold">{tExt.tenantSettingsExtended.access.identityProvider}</Label>
                      <Select value={identityProvider} onValueChange={setIdentityProvider}>
                        <SelectTrigger id="identity-provider" className="pl-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">{tExt.tenantSettingsExtended.access.noProvider}</SelectItem>
                          <SelectItem value="microsoft">{tExt.tenantSettingsExtended.access.azureAD}</SelectItem>
                          <SelectItem value="google">{tExt.tenantSettingsExtended.access.googleIdentity}</SelectItem>
                          <SelectItem value="okta">{tExt.tenantSettingsExtended.access.okta}</SelectItem>
                          <SelectItem value="saml">{tExt.tenantSettingsExtended.access.customSAML}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Azure AD Configuration */}
            {identityProvider === "microsoft" && ssoEnabled && (
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader>
                  <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.azureConfiguration}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="ms-tenant-id" className="font-semibold">{tExt.tenantSettingsExtended.access.tenantID}</Label>
                    <Input 
                      id="ms-tenant-id" 
                      placeholder={tExt.tenantSettingsExtended.access.tenantIDPlaceholder}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="ms-client-id" className="font-semibold">{tExt.tenantSettingsExtended.access.clientID}</Label>
                    <Input 
                      id="ms-client-id" 
                      placeholder={tExt.tenantSettingsExtended.access.clientIDPlaceholder}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="ms-client-secret" className="font-semibold">{tExt.tenantSettingsExtended.access.clientSecret}</Label>
                    <Input 
                      id="ms-client-secret" 
                      type="password" 
                      placeholder={tExt.tenantSettingsExtended.access.clientSecretPlaceholder}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => {
                        setConnectionStatus("testing");
                        setTimeout(() => setConnectionStatus("connected"), 1500);
                      }}
                    >
                      {connectionStatus === "testing" ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      {tExt.tenantSettingsExtended.access.testConnection}
                    </Button>

                    {connectionStatus === "connected" && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle2 className="h-4 w-4" style={{ color: '#5ebc67' }} />
                        <AlertDescription>
                          <strong>{tExt.tenantSettingsExtended.access.connectionSuccessful}</strong>
                        </AlertDescription>
                      </Alert>
                    )}

                    {connectionStatus === "error" && (
                      <Alert className="border-red-200 bg-red-50">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-900">
                          <strong>{tExt.tenantSettingsExtended.access.connectionError}</strong>
                        </AlertDescription>
                      </Alert>
                    )}

                    {connectionStatus === "idle" && (
                      <Alert className="border-amber-200 bg-amber-50">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-900">
                          <strong>{tExt.tenantSettingsExtended.access.notConnected}</strong>
                        </AlertDescription>
                      </Alert>
                    )}

                    {connectionStatus === "testing" && (
                      <Alert className="border-blue-200 bg-blue-50">
                        <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
                        <AlertDescription className="text-blue-900">
                          <strong>{tExt.tenantSettingsExtended.access.testing}</strong>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* SSO Requirements */}
            {identityProvider !== "none" && ssoEnabled && (
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader>
                  <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.ssoRequirements}</CardTitle>
                  <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.ssoRequirementsDesc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.enforce2FAForSSO}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.access.enforce2FAForSSODesc}
                      </p>
                    </div>
                    <Switch checked={enforce2FA} onCheckedChange={setEnforce2FA} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.verifiedEmailOnly}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.access.verifiedEmailOnlyDesc}
                      </p>
                    </div>
                    <Switch checked={verifiedEmailOnly} onCheckedChange={setVerifiedEmailOnly} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.autoTokenRefresh}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.access.autoTokenRefreshDesc}
                      </p>
                    </div>
                    <Switch checked={autoTokenRefresh} onCheckedChange={setAutoTokenRefresh} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* IP Whitelist */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.ipWhitelist}</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.access.ipWhitelistDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">{tExt.tenantSettingsExtended.access.enableIPWhitelist}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.access.enableIPWhitelistDesc}
                    </p>
                  </div>
                  <Switch checked={ipWhitelistEnabled} onCheckedChange={setIpWhitelistEnabled} />
                </div>

                {ipWhitelistEnabled && (
                  <>
                    <Separator />
                    <div className="space-y-1">
                      <Label htmlFor="ip-addresses" className="font-semibold">{tExt.tenantSettingsExtended.access.allowedIPs}</Label>
                      <div className="space-y-2">
                        <Input 
                          id="ip-address" 
                          placeholder={tExt.tenantSettingsExtended.access.ipAddressPlaceholder}
                        />
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          {tExt.tenantSettingsExtended.access.addIP}
                        </Button>
                      </div>
                      {ipError && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-600 text-sm">
                            {tExt.tenantSettingsExtended.access.ipFormatError}
                          </AlertDescription>
                        </Alert>
                      )}
                      <Alert style={{ borderColor: '#e1dfdd', backgroundColor: '#f9f9f9' }}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          {tExt.tenantSettingsExtended.access.ipWarning}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.cancel}
              </Button>
              <Button 
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.save}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EUAIActSettings({ isDarkMode = false, onNavigate }: { isDarkMode?: boolean; onNavigate?: (section: string) => void }) {
  const { t } = useLanguage();
  const tExt = useExtendedTranslations();
  
  // Category states for risk assessment
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [criticalInfraEnabled, setCriticalInfraEnabled] = useState(false);
  const [educationEnabled, setEducationEnabled] = useState(false);
  const [employmentEnabled, setEmploymentEnabled] = useState(false);
  const [essentialServicesEnabled, setEssentialServicesEnabled] = useState(false);
  const [lawEnforcementEnabled, setLawEnforcementEnabled] = useState(false);
  const [migrationEnabled, setMigrationEnabled] = useState(false);
  const [justiceEnabled, setJusticeEnabled] = useState(false);
  
  // Risk Calculator states
  const [behaviorInfluence, setBehaviorInfluence] = useState(false);
  const [intentionalDeception, setIntentionalDeception] = useState(false);
  const [intentionalManipulation, setIntentionalManipulation] = useState(false);
  const [decisionFreedomImpaired, setDecisionFreedomImpaired] = useState(false);
  const [significantHarm, setSignificantHarm] = useState(false);
  const [annex1Fulfilled, setAnnex1Fulfilled] = useState(false);
  const [isProfiling, setIsProfiling] = useState(false);
  
  // Human Oversight toggles
  const [humanInLoopEnabled, setHumanInLoopEnabled] = useState(true);
  const [staffTrainingEnabled, setStaffTrainingEnabled] = useState(false);
  const [feedbackReportingEnabled, setFeedbackReportingEnabled] = useState(true);
  const [auditTrailEnabled, setAuditTrailEnabled] = useState(true);
  
  // Calculate if high-risk categories are active
  const hasHighRiskCategory = biometricEnabled || criticalInfraEnabled || educationEnabled || 
                              employmentEnabled || essentialServicesEnabled || lawEnforcementEnabled || 
                              migrationEnabled || justiceEnabled;

  // Calculate risk from calculator
  const calculateRiskFromCalculator = (): boolean => {
    const A = behaviorInfluence || intentionalDeception || intentionalManipulation || decisionFreedomImpaired;
    const B = significantHarm;
    const C1 = annex1Fulfilled;
    const P = isProfiling;
    const F = hasHighRiskCategory;
    const H = humanInLoopEnabled;
    
    // PROFILING - Always high risk, regardless of Human in the loop
    if (P) {
      return true;
    }
    
    // HOCHRISIKO-KATEGORIEN - High risk, but can be mitigated with Human in the loop
    if (F) {
      return !H; // High risk if no human in loop
    }
    
    // POTENZIELLER SCHADEN (B alone is high-risk)
    if (B) {
      return !H; // High risk if no human in loop
    }
    
    // PRODUKTSICHERHEIT (only C1 - Anhang 1)
    if (C1) {
      return !H; // High risk if no human in loop
    }
    
    // VERHALTEN + SCHADEN
    if (A && B) {
      return !H; // High risk if no human in loop
    }
    
    return false;
  };
  
  // Agent Risk Assessment
  interface Agent {
    id: string;
    name: string;
    isProfiling?: boolean;
    significantHarm?: boolean;
    humanInLoop?: boolean;
    behaviorInfluence?: boolean;
    intentionalDeception?: boolean;
    intentionalManipulation?: boolean;
    decisionFreedomImpaired?: boolean;
    annex1Fulfilled?: boolean;
  }

  // Define agents with their risk assessment data (matching ModuleOverview.tsx)
  const agents: Agent[] = [
    {
      id: "jelmoli-agent",
      name: "Jelmoli Agent",
      // Risk Assessment: B: X (nein), C: X (nein), D: X (nein), E: ja
      behaviorInfluence: false,
      intentionalDeception: false,
      intentionalManipulation: false,
      decisionFreedomImpaired: false,
      significantHarm: false,
      annex1Fulfilled: false,
      annex2Fulfilled: false,
      annex3Fulfilled: false,
      isProfiling: false,
      humanInLoop: true
    },
    {
      id: "email-agent",
      name: "Email Agent",
      // Risk Assessment: A: X (nein), B: X (nein), C: X (nein), D: ja, E: ja
      behaviorInfluence: false,
      intentionalDeception: false,
      intentionalManipulation: false,
      decisionFreedomImpaired: false,
      significantHarm: false,
      annex1Fulfilled: false,
      annex2Fulfilled: false,
      annex3Fulfilled: false,
      isProfiling: true, // Profiling always leads to HIGH risk
      humanInLoop: true
    },
    {
      id: "internet-agent",
      name: "Internet Agent",
      // Risk Assessment: B: X (nein), C: X (nein), D: X (nein), E: ja
      behaviorInfluence: false,
      intentionalDeception: false,
      intentionalManipulation: false,
      decisionFreedomImpaired: false,
      significantHarm: false,
      annex1Fulfilled: false,
      annex2Fulfilled: false,
      annex3Fulfilled: false,
      isProfiling: false,
      humanInLoop: true
    },
    {
      id: "normen-agent",
      name: "Normen Agent",
      // Risk Assessment: B: X (nein), C: X (nein), D: X (nein), E: ja
      behaviorInfluence: false,
      intentionalDeception: false,
      intentionalManipulation: false,
      decisionFreedomImpaired: false,
      significantHarm: false,
      annex1Fulfilled: false,
      annex2Fulfilled: false,
      annex3Fulfilled: false,
      isProfiling: false,
      humanInLoop: true
    }
  ];

  // Calculate agent risk category (same logic as in ModuleOverview.tsx and calculateRiskFromCalculator)
  const calculateAgentRisk = (agent: Agent): 'niedrig' | 'hoch' => {
    const A = agent.behaviorInfluence || agent.intentionalDeception || 
              agent.intentionalManipulation || agent.decisionFreedomImpaired;
    const B = agent.significantHarm;
    const C1 = agent.annex1Fulfilled;
    const P = agent.isProfiling;
    const H = agent.humanInLoop;

    // PROFILING - Always high risk, regardless of Human in the loop
    if (P) {
      return 'hoch';
    }

    // POTENZIELLER SCHADEN (B alone is high-risk)
    if (B) {
      return H ? 'niedrig' : 'hoch';
    }

    // PRODUKTSICHERHEIT
    if (C1) {
      return H ? 'niedrig' : 'hoch';
    }

    // VERHALTEN + SCHADEN
    if (A && B) {
      return H ? 'niedrig' : 'hoch';
    }

    // DEFAULT
    return 'niedrig';
  };

  // Filter agents with high risk
  const highRiskAgents = agents
    .map(agent => ({
      ...agent,
      risk: calculateAgentRisk(agent)
    }))
    .filter(agent => agent.risk === 'hoch');
  
  // Calculate if system is high-risk: based on calculator OR if any agent has high risk
  const isHighRisk = calculateRiskFromCalculator() || highRiskAgents.length > 0;
  
  // Get high-risk justifications
  const getHighRiskJustifications = (): string[] => {
    const justifications: string[] = [];
    const H = humanInLoopEnabled;
    
    // From Risk Calculator
    const P = isProfiling;
    const F = hasHighRiskCategory;
    const B = significantHarm;
    const C1 = annex1Fulfilled;
    const A = behaviorInfluence || intentionalDeception || intentionalManipulation || decisionFreedomImpaired;
    
    // Collect calculator reasons in a single summarized entry
    const calculatorReasons: string[] = [];
    
    // Profiling (always high risk)
    if (P) {
      calculatorReasons.push("Profiling");
    }
    
    // High-Risk Categories (without human in loop)
    if (F && !H) {
      const categories: string[] = [];
      if (biometricEnabled) categories.push("Biometrische Identifizierung");
      if (criticalInfraEnabled) categories.push("Kritische Infrastrukturen");
      if (educationEnabled) categories.push("Bildung und Berufsbildung");
      if (employmentEnabled) categories.push("Beschäftigung und Arbeitnehmerverwaltung");
      if (essentialServicesEnabled) categories.push("Zugang zu wesentlichen privaten und öffentlichen Diensten");
      if (lawEnforcementEnabled) categories.push("Strafverfolgung");
      if (migrationEnabled) categories.push("Migration, Asyl und Grenzkontrolle");
      if (justiceEnabled) categories.push("Rechtspflege und demokratische Prozesse");
      
      if (categories.length > 0) {
        calculatorReasons.push(`Hochrisiko-Kategorie (${categories.join(", ")})`);
      }
    }
    
    // Product Safety / Annex 1 (without human in loop)
    if (C1 && !H) {
      calculatorReasons.push("Produktsicherheit (Anhang 1)");
    }
    
    // Behavior + Harm (without human in loop)
    if (A && B && !H) {
      calculatorReasons.push("Verhaltensmanipulation + Potenzieller Schaden");
    } else if (B && !H) {
      // Significant Harm alone (without human in loop)
      calculatorReasons.push("Potenzieller Schaden");
    }
    
    // Add single line for calculator if there are any reasons
    if (calculatorReasons.length > 0) {
      justifications.push(`Hochrisiko-Rechner - ${calculatorReasons.join(", ")}`);
    }
    
    // From Agents
    highRiskAgents.forEach(agent => {
      let reason = "";
      if (agent.isProfiling) {
        reason = "Profiling";
      } else if (agent.significantHarm && !agent.humanInLoop) {
        reason = "Potenzieller Schaden";
      } else if (agent.annex1Fulfilled && !agent.humanInLoop) {
        reason = "Produktsicherheit";
      } else if ((agent.behaviorInfluence || agent.intentionalDeception || 
                  agent.intentionalManipulation || agent.decisionFreedomImpaired) && 
                 agent.significantHarm && !agent.humanInLoop) {
        reason = "Verhaltensmanipulation + Schaden";
      }
      
      if (reason) {
        justifications.push(`${agent.name} - ${reason}`);
      }
    });
    
    return justifications;
  };
  
  const highRiskJustifications = getHighRiskJustifications();
  
  // Kill-Switch state
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <FileCheck2 className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          EU AI Act
        </h2>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* System Status Overview */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>1. System-Status</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {tExt.tenantSettingsExtended.security.systemStatusOverviewDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* High-Risk Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {tExt.tenantSettingsExtended.security.isHighRiskSystem}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className="h-8 text-sm" 
                    style={{ 
                      backgroundColor: isHighRisk ? '#E9C796' : 'transparent', 
                      color: '#000000', 
                      border: '1px solid #e1dfdd' 
                    }}
                  >
                    {isHighRisk ? tExt.tenantSettingsExtended.security.highRiskSystemYes : tExt.tenantSettingsExtended.security.highRiskSystemNo}
                  </Badge>
                </div>

                {/* High-Risk Justifications */}
                {isHighRisk && highRiskJustifications.length > 0 && (
                  <div className="space-y-0">
                    <span className="text-xs block leading-none mb-0.5" style={{ color: '#000000' }}>
                      Begründung:
                    </span>
                    {highRiskJustifications.map((justification, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#000000' }} />
                        <span className="text-xs" style={{ color: '#666666' }}>
                          {justification}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Registration Status & Downloads */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">{tExt.tenantSettingsExtended.security.registration}</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {tExt.tenantSettingsExtended.security.download}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">{tExt.tenantSettingsExtended.security.conformityMarking}</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {tExt.tenantSettingsExtended.security.download}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">{tExt.tenantSettingsExtended.security.technicalDocumentation}</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {tExt.tenantSettingsExtended.security.download}
                  </Button>
                </div>

                {/* Assessment Information */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {tExt.tenantSettingsExtended.security.assessmentDate}
                  </span>
                  <Badge variant="secondary" className="h-8 text-sm" style={{ backgroundColor: 'transparent', color: '#000000', border: '1px solid #e1dfdd' }}>
                    {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {tExt.tenantSettingsExtended.security.assessedBy}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    onClick={() => window.open('https://eur-lex.europa.eu/eli/reg/2024/1689/oj', '_blank')}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    {tExt.tenantSettingsExtended.security.euAiActLink}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Risk Calculator */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }} id="risk-assessment-orchestrator">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="font-semibold" style={{ color: '#000000' }}>2.1 Risikobewertung Orchestrator</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>
                      Berechnung der Risikokategorie basierend auf EU AI Act Kriterien
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="h-8 text-sm" 
                    style={{ 
                      backgroundColor: calculateRiskFromCalculator() ? '#E9C796' : 'transparent', 
                      color: '#000000', 
                      border: '1px solid #e1dfdd' 
                    }}
                  >
                    {calculateRiskFromCalculator() ? 'Hoch' : 'Niedrig'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* A. Verhaltensbeeinflussung */}
                <div className="space-y-2">
                  <Label className="font-semibold">A. Verhaltensbeeinflussung</Label>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="behavior-influence"
                          checked={behaviorInfluence}
                          onChange={(e) => setBehaviorInfluence(e.target.checked)}
                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                          style={{ 
                            border: '1px solid #e1dfdd',
                            backgroundColor: behaviorInfluence ? '#E9C796' : 'transparent'
                          }}
                        />
                        {behaviorInfluence && (
                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <Label htmlFor="behavior-influence" className="cursor-pointer text-xs" style={{ color: 'var(--foreground-muted)' }}>Verhalten wird beeinflusst</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="intentional-deception"
                          checked={intentionalDeception}
                          onChange={(e) => setIntentionalDeception(e.target.checked)}
                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                          style={{ 
                            border: '1px solid #e1dfdd',
                            backgroundColor: intentionalDeception ? '#E9C796' : 'transparent'
                          }}
                        />
                        {intentionalDeception && (
                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <Label htmlFor="intentional-deception" className="cursor-pointer text-xs" style={{ color: 'var(--foreground-muted)' }}>Person wird absichtlich getäuscht</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="intentional-manipulation"
                          checked={intentionalManipulation}
                          onChange={(e) => setIntentionalManipulation(e.target.checked)}
                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                          style={{ 
                            border: '1px solid #e1dfdd',
                            backgroundColor: intentionalManipulation ? '#E9C796' : 'transparent'
                          }}
                        />
                        {intentionalManipulation && (
                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <Label htmlFor="intentional-manipulation" className="cursor-pointer text-xs" style={{ color: 'var(--foreground-muted)' }}>Person wird absichtlich manipuliert</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="decision-freedom"
                          checked={decisionFreedomImpaired}
                          onChange={(e) => setDecisionFreedomImpaired(e.target.checked)}
                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                          style={{ 
                            border: '1px solid #e1dfdd',
                            backgroundColor: decisionFreedomImpaired ? '#E9C796' : 'transparent'
                          }}
                        />
                        {decisionFreedomImpaired && (
                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <Label htmlFor="decision-freedom" className="cursor-pointer text-xs" style={{ color: 'var(--foreground-muted)' }}>Entscheidungsfreiheit wird stark beeinträchtigt</Label>
                    </div>
                  </div>
                </div>

                {/* B. Potenzieller Schaden */}
                <div className="space-y-2">
                  <Label className="font-semibold">B. Potenzieller Schaden</Label>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="significant-harm"
                          checked={significantHarm}
                          onChange={(e) => setSignificantHarm(e.target.checked)}
                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                          style={{ 
                            border: '1px solid #e1dfdd',
                            backgroundColor: significantHarm ? '#E9C796' : 'transparent'
                          }}
                        />
                        {significantHarm && (
                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <Label htmlFor="significant-harm" className="cursor-pointer text-xs" style={{ color: 'var(--foreground-muted)' }}>Der Person wird ein erheblicher Schaden zugefügt</Label>
                    </div>
                  </div>
                </div>

                {/* C. Produktsicherheitsvorschriften */}
                <div className="space-y-2">
                  <Label className="font-semibold">C. Produktsicherheitsvorschriften</Label>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="annex1-fulfilled"
                          checked={annex1Fulfilled}
                          onChange={(e) => setAnnex1Fulfilled(e.target.checked)}
                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                          style={{ 
                            border: '1px solid #e1dfdd',
                            backgroundColor: annex1Fulfilled ? '#E9C796' : 'transparent'
                          }}
                        />
                        {annex1Fulfilled && (
                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <Label htmlFor="annex1-fulfilled" className="cursor-pointer text-xs" style={{ color: 'var(--foreground-muted)' }}>Anhang 1 erfüllt</Label>
                    </div>
                  </div>
                </div>

                {/* F. Hochrisiko-Kategorien */}
                <div className="space-y-2">
                  <Label className="font-semibold">F. Hochrisiko-Kategorien</Label>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="high-risk-categories"
                          checked={hasHighRiskCategory}
                          disabled
                          className="peer h-4 w-4 rounded appearance-none cursor-not-allowed"
                          style={{ 
                            border: '1px solid #e1dfdd',
                            backgroundColor: hasHighRiskCategory ? '#E9C796' : 'transparent',
                            opacity: 0.7
                          }}
                        />
                        {hasHighRiskCategory && (
                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <Label htmlFor="high-risk-categories" className="cursor-not-allowed text-xs" style={{ opacity: 0.7, color: 'var(--foreground-muted)' }}>Mindestens eine Hochrisiko-Kategorie ist aktiviert</Label>
                    </div>
                  </div>
                </div>

                {/* D. Profiling */}
                <div className="space-y-2">
                  <Label className="font-semibold">D. Profiling</Label>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="is-profiling"
                          checked={isProfiling}
                          onChange={(e) => setIsProfiling(e.target.checked)}
                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                          style={{ 
                            border: '1px solid #e1dfdd',
                            backgroundColor: isProfiling ? '#E9C796' : 'transparent'
                          }}
                        />
                        {isProfiling && (
                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <Label htmlFor="is-profiling" className="cursor-pointer text-xs" style={{ color: 'var(--foreground-muted)' }}>Es handelt sich um Profiling</Label>
                    </div>
                  </div>
                </div>

                {/* E. Human in the loop */}
                <div className="space-y-2">
                  <Label className="font-semibold">E. Human in the loop</Label>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="human-in-loop-active"
                          checked={humanInLoopEnabled}
                          onChange={(e) => setHumanInLoopEnabled(e.target.checked)}
                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                          style={{ 
                            border: '1px solid #e1dfdd',
                            backgroundColor: humanInLoopEnabled ? '#E9C796' : 'transparent'
                          }}
                        />
                        {humanInLoopEnabled && (
                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <Label htmlFor="human-in-loop-active" className="cursor-pointer text-xs" style={{ color: 'var(--foreground-muted)' }}>Human in the loop ist aktiv</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risikobewertung Agenten */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="font-semibold" style={{ color: '#000000' }}>2.2 Risikobewertung Agenten</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>
                      Zusammenfassung der Risikobewertung aller Agenten. Es werden nur die Agenten angezeigt mit der Bewertung "hoch"
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {highRiskAgents.length === 0 ? (
                  <div className="text-sm text-center py-4" style={{ color: '#666666' }}>
                    Keine Agenten mit hoher Risikobewertung
                  </div>
                ) : (
                  highRiskAgents.map((agent) => (
                    <div 
                      key={agent.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm" style={{ color: '#000000' }}>
                        {agent.name}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className="h-8 text-sm" 
                        style={{ 
                          backgroundColor: agent.risk === 'hoch' ? '#E9C796' : 'transparent', 
                          color: '#000000', 
                          border: '1px solid #e1dfdd' 
                        }}
                      >
                        {agent.risk === 'hoch' ? 'Hoch' : 'Niedrig'}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* High-Risk Categories */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="font-semibold" style={{ color: '#000000' }}>2.3 Hochrisiko-Kategorien</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>
                      {tExt.tenantSettingsExtended.security.annexIIICategoriesDesc1}
                      <br />
                      {tExt.tenantSettingsExtended.security.annexIIICategoriesDesc2}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="h-8 text-sm" 
                    style={{ 
                      backgroundColor: hasHighRiskCategory ? '#E9C796' : 'transparent', 
                      color: '#000000', 
                      border: '1px solid #e1dfdd' 
                    }}
                  >
                    {hasHighRiskCategory ? 'Hoch' : 'Niedrig'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.biometricIdentification}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.biometricIdentificationDesc}
                    </p>
                  </div>
                  <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.criticalInfrastructure}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.criticalInfrastructureDesc}
                    </p>
                  </div>
                  <Switch checked={criticalInfraEnabled} onCheckedChange={setCriticalInfraEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.educationTraining}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.educationTrainingDesc}
                    </p>
                  </div>
                  <Switch checked={educationEnabled} onCheckedChange={setEducationEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.employmentManagement}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.employmentManagementDesc}
                    </p>
                  </div>
                  <Switch checked={employmentEnabled} onCheckedChange={setEmploymentEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.essentialServices}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.essentialServicesDesc}
                    </p>
                  </div>
                  <Switch checked={essentialServicesEnabled} onCheckedChange={setEssentialServicesEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.lawEnforcement}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.lawEnforcementDesc}
                    </p>
                  </div>
                  <Switch checked={lawEnforcementEnabled} onCheckedChange={setLawEnforcementEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.migrationBorderControl}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.migrationBorderControlDesc}
                    </p>
                  </div>
                  <Switch checked={migrationEnabled} onCheckedChange={setMigrationEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.justiceDemo}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.justiceDemoDesc}
                    </p>
                  </div>
                  <Switch checked={justiceEnabled} onCheckedChange={setJusticeEnabled} />
                </div>
              </CardContent>
            </Card>

            {/* Risk Management System */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>3.1 Risiko-Management-System</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  Verwaltung und Überwachung des Risiko-Management-Systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Agentenbewertung */}
                <div className="space-y-3">
                  <Label className="font-semibold">Agentenbewertung</Label>
                  <p className="text-xs" style={{ color: '#666666' }}>
                    Jeder Agent hat seine eigene Risikobewertung. Von uns zur Verfügung gestellte Agenten sind per Default definiert. Bei eigenen Agenten muss die Risikobewertung durch den Tenant ausgefüllt werden.
                  </p>
                  <div className="text-xs">
                    <span className="font-semibold">Hinweistext im Chat-Fenster:</span> Sie verwenden ein Fremd-Agent, welcher nicht durch den System-Anbieter verifiziert wurde. Verwendung auf eigenes Risiko!
                  </div>
                </div>

                {/* Verantwortlichkeiten */}
                <div className="space-y-3">
                  <Label className="font-semibold">Verantwortlichkeiten</Label>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    Die Verantwortlichkeiten werden im Master Entry vom Anbieter gepflegt.
                  </p>
                  <div className="border rounded-lg overflow-hidden" style={{ border: '1px solid #e1dfdd' }}>
                    <Table>
                      <TableHeader>
                        <TableRow style={{ backgroundColor: 'transparent' }}>
                          <TableHead className="pl-6 font-semibold">Verantwortlichkeiten</TableHead>
                          <TableHead className="font-semibold">Beschreibung</TableHead>
                          <TableHead className="font-semibold">Verantwortung</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="pl-6">
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Systemkonformität</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Technische und rechtliche Konformität des KI-Systems</span>
                          </TableCell>
                          <TableCell>
                            <span 
                              className="px-2 py-1 rounded text-xs border"
                              style={{ 
                                border: '1px solid #e1dfdd',
                                backgroundColor: 'transparent',
                                color: 'var(--foreground-muted)'
                              }}
                            >
                              Anbieter
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Nutzungskonformität</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Richtiger Einsatz in HR, Normen etc.</span>
                          </TableCell>
                          <TableCell>
                            <span 
                              className="px-2 py-1 rounded text-xs border"
                              style={{ 
                                border: '1px solid #e1dfdd',
                                backgroundColor: 'transparent',
                                color: 'var(--foreground-muted)'
                              }}
                            >
                              Tenant
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Schulung</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Aufklärung über KI-Einsatz und Grenzen</span>
                          </TableCell>
                          <TableCell>
                            <span 
                              className="px-2 py-1 rounded text-xs border"
                              style={{ 
                                border: '1px solid #e1dfdd',
                                backgroundColor: 'transparent',
                                color: 'var(--foreground-muted)'
                              }}
                            >
                              Beide
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Datenschutzrolle</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Klare Regelung via AVV</span>
                          </TableCell>
                          <TableCell>
                            <span 
                              className="px-2 py-1 rounded text-xs border"
                              style={{ 
                                border: '1px solid #e1dfdd',
                                backgroundColor: 'transparent',
                                color: 'var(--foreground-muted)'
                              }}
                            >
                              Beide
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Supportzugriff</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Nur mit vertraglicher Absicherung</span>
                          </TableCell>
                          <TableCell>
                            <span 
                              className="px-2 py-1 rounded text-xs border"
                              style={{ 
                                border: '1px solid #e1dfdd',
                                backgroundColor: 'transparent',
                                color: 'var(--foreground-muted)'
                              }}
                            >
                              Tenant
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Betroffeneninfo</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Datenschutzerklärung und Transparenzpflicht</span>
                          </TableCell>
                          <TableCell>
                            <span 
                              className="px-2 py-1 rounded text-xs border"
                              style={{ 
                                border: '1px solid #e1dfdd',
                                backgroundColor: 'transparent',
                                color: 'var(--foreground-muted)'
                              }}
                            >
                              Tenant
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Technische Dokumentation</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>System- vs. Nutzungsebene differenzieren</span>
                          </TableCell>
                          <TableCell>
                            <span 
                              className="px-2 py-1 rounded text-xs border"
                              style={{ 
                                border: '1px solid #e1dfdd',
                                backgroundColor: 'transparent',
                                color: 'var(--foreground-muted)'
                              }}
                            >
                              Beide
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Datenschutz-Folgeabschätzung (DSFA) */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">Datenschutz-Folgeabschätzung (DSFA)</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      Dokumentation und Management der Datenschutz-Folgeabschätzung
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('compliance.dsfa')}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Gehe zu
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Quality & Technical Robustness */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>3.2 Datenqualität & technische Robustheit</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  Dieses Kapitel beschreibt, wie die Plattform sicherstellt, dass alle Modelle und Prozesse zuverlässig funktionieren.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* LLM-Auswahl und Modellqualität */}
                <div className="space-y-3">
                  <Label className="font-semibold">LLM-Auswahl und Modellqualität</Label>
                  <div className="space-y-2 text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    <p>Die Plattform empfiehlt für den Orchestrator und die Agenten gewisse Sprachmodelle.</p>
                    <p>Die Auswahl der Modelle wird vom Tenant selbst vorgenommen (lokal oder Cloud).</p>
                    <p>Die Verantwortung für Trainingsdaten und Modellqualität liegt beim jeweiligen Modellanbieter.</p>
                    <p>Die Plattform gibt eine Empfehlung ab, welche Modelle nicht verwendet werden sollten.</p>
                  </div>
                </div>

                {/* Bias-Kontrolle & Risikobewertung */}
                <div className="space-y-3">
                  <Label className="font-semibold">Bias-Kontrolle & Risikobewertung</Label>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    Da die Modelle von Drittanbietern stammen, kann die Plattform deren Trainingsdaten nicht selbst beeinflussen. Stattdessen konzentriert sich die Plattform auf die folgenden Massnahmen:
                  </p>
                  <ul className="space-y-2 text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Jeder Agent verfügt über einen eigenen Risikokategorie-Rechner und wird aufgrund der Nutzungsart bewertet.</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Bei sensiblen oder potenziell risikobehafteten Szenarien wird ein Hinweis auf mögliche Risiken angezeigt.</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Der Tenant kann Modelle jederzeit wechseln oder deaktivieren, falls Risiken festgestellt werden.</span>
                    </li>
                  </ul>
                </div>

                {/* Robustheit & Ausfallsicherheit des Orchestrators */}
                <div className="space-y-3">
                  <Label className="font-semibold">Robustheit & Ausfallsicherheit des Orchestrators</Label>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    Die Plattform stellt sicher, dass der Orchestrator zuverlässig und nachvollziehbar arbeitet:
                  </p>
                  <ul className="space-y-2 text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Der Orchestrator entscheidet transparent, welcher Agent für eine Anfrage eingesetzt wird.</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Jede Entscheidung kann vom Admin eingesehen werden</span>
                    </li>
                  </ul>
                </div>

                {/* Systemüberwachung (Logging & Monitoring) */}
                <div className="space-y-3">
                  <Label className="font-semibold">Systemüberwachung (Logging & Monitoring)</Label>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    Für technische Stabilität und Gesetzeskonformität werden sicherheitsrelevante Ereignisse protokolliert:
                  </p>
                  <ul className="space-y-2 text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Protokolliert werden nur Systemereignisse (z. B. Zugriffe, Fehler, Agentenwechsel).</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Inhalte der Nutzer werden nicht geloggt.</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Die Plattform bietet Echtzeit-Überwachung zentraler Systemkomponenten.</span>
                    </li>
                  </ul>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Weitere Details im Bereich</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate?.('compliance.logging')}
                      style={{
                        border: '1px solid #e1dfdd',
                        color: '#000000',
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E9C796';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Logging & Monitoring
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Technische Schutzmassnahmen */}
                <div className="space-y-3">
                  <Label className="font-semibold">Technische Schutzmassnahmen</Label>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    Die Robustheit des Systems wird durch mehrere Massnahmen abgesichert:
                  </p>
                  <ul className="space-y-2 text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>TLS-verschlüsselte Kommunikation zwischen allen Modulen</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Session-Schutz, um Missbrauch zu verhindern</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Rollenmodell zur Zugriffsbeschränkung</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Optionale Datenbank-Verschlüsselung</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Alarmierung bei systemkritischen Fehlern</span>
                    </li>
                  </ul>
                  <p className="text-xs pt-2" style={{ color: 'var(--foreground-muted)' }}>
                    Diese Massnahmen werden systemseitig überwacht und laufend aktualisiert.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Transparency Requirements */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>3.3 Transparenzanforderungen</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.transparencyRequirementsDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.aiNoticeDisplay}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.aiNoticeDisplayDesc}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">Entscheidungsgrundlage vom Orchestrator</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      Bei Aktivierung kann im Chat die Entscheidungsgrundlage vom Orchestrator eingesehen werden.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.humanInLoop}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.humanInLoopDesc}
                    </p>
                  </div>
                  <Switch 
                    checked={humanInLoopEnabled}
                    onCheckedChange={setHumanInLoopEnabled}
                  />
                </div>

                <div className="space-y-0.5">
                  <Label className="font-semibold">{tExt.tenantSettingsExtended.security.responsibilities}</Label>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    Die Verantwortlichkeiten sind im Punkt 3.1 Risiko-Management-System ersichtlich
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Human Oversight – menschliche Kontrolle */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>3.4 Human Oversight</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.humanOversightDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Schulung Personal */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.staffTraining}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.staffTrainingDesc}
                    </p>
                  </div>
                  <Switch 
                    checked={staffTrainingEnabled}
                    onCheckedChange={setStaffTrainingEnabled}
                  />
                </div>

                {/* Human in the Loop */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.humanInLoop}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.humanInLoopOversight}
                    </p>
                  </div>
                  <Switch 
                    checked={humanInLoopEnabled}
                    onCheckedChange={setHumanInLoopEnabled}
                  />
                </div>

                {/* Meldung & Rückfragen */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.feedbackReporting}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.feedbackReportingDesc}
                    </p>
                  </div>
                  <Switch 
                    checked={feedbackReportingEnabled}
                    onCheckedChange={setFeedbackReportingEnabled}
                  />
                </div>

                {/* Audit Trail */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.auditTrail}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.auditTrailDesc}
                    </p>
                  </div>
                  <Switch 
                    checked={auditTrailEnabled}
                    onCheckedChange={setAuditTrailEnabled}
                  />
                </div>

                {/* Prüfen, zurücksetzen und begrenzen */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.reviewResetLimit}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.reviewResetLimitDesc}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('monitoring.activity')}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {tExt.tenantSettingsExtended.security.goTo}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Dokumentation */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.oversightDocumentation}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.oversightDocumentationDesc}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {tExt.tenantSettingsExtended.security.download}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Technical Security Measures */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>4 Technische Sicherheitsmassnahmen</CardTitle>
                <CardDescription style={{ color: '#000000' }}>{tExt.tenantSettingsExtended.security.technicalSecurityMeasuresDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {killSwitchActive && (
                  <Badge 
                    className="w-full justify-center py-2" 
                    style={{ 
                      backgroundColor: '#E9C796',
                      color: '#000000',
                      border: '1px solid #e1dfdd'
                    }}
                  >
                    {tExt.tenantSettingsExtended.security.killswitchActiveWarning}
                  </Badge>
                )}
                
                {/* Kill-Switch */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.killswitch}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.killswitchDesc}
                    </p>
                  </div>
                  <Switch checked={killSwitchActive} onCheckedChange={setKillSwitchActive} />
                </div>

                {/* 2FA */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.twoFactorAuthReference}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.twoFactorAuthReferenceDesc}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('tenant-settings.security')}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {tExt.tenantSettingsExtended.security.goTo}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Rollen */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.tenantRolesReference}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.tenantRolesReferenceDesc}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('user-management.roles')}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {tExt.tenantSettingsExtended.security.goTo}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Whitelist */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.whitelistReference}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.whitelistReferenceDesc}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('tenant-settings.access')}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {tExt.tenantSettingsExtended.security.goTo}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Logging */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.loggingDataReference}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.loggingDataReferenceDesc}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('logging.activity')}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {tExt.tenantSettingsExtended.security.goTo}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Alarm */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.systemCriticalAlerts}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.systemCriticalAlertsDesc}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('logging.alerts')}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {tExt.tenantSettingsExtended.security.goTo}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Backup */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.security.backupRecoveryReference}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.security.backupRecoveryReferenceDesc}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('data-management.backup')}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {tExt.tenantSettingsExtended.security.goTo}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Versionshistorie */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>5 Versionshistorie</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  Historische Aufzeichnung aller Änderungen und Aktivierungen im System
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Aktivierung Risikobewertung Orchestrator */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">Aktivierung oder Änderung bei Risikobewertung Orchestrator</Label>
                  </div>
                  <Badge 
                    variant="outline"
                    className="h-8 text-sm"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#000000',
                      border: '1px solid #e1dfdd'
                    }}
                  >
                    Aktiviert am 01.02.2025
                  </Badge>
                </div>

                {/* Aktivierung Risikobewertung Agenten */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">Aktivierung oder Änderung bei Risikobewertung Agenten</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      Email Agent
                    </p>
                  </div>
                  <Badge 
                    variant="outline"
                    className="h-8 text-sm"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#000000',
                      border: '1px solid #e1dfdd'
                    }}
                  >
                    Aktiviert am 15.06.2025
                  </Badge>
                </div>

                {/* Aktivierung Risikokategorie */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">Aktivierung oder Änderung der Risikokategorie</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      Beschäftigung und Personalmanagement
                    </p>
                  </div>
                  <Badge 
                    variant="outline"
                    className="h-8 text-sm"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#000000',
                      border: '1px solid #e1dfdd'
                    }}
                  >
                    Aktiviert am 01.02.2025
                  </Badge>
                </div>

                {/* Registrierung Hochrisiko-KI-System */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">Registrierung Hochrisiko-KI-System</Label>
                  </div>
                  <Badge 
                    variant="outline"
                    className="h-8 text-sm"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#000000',
                      border: '1px solid #e1dfdd'
                    }}
                  >
                    17.12.2024
                  </Badge>
                </div>

                {/* Aktualisierung technische Dokumentation */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <Label className="font-semibold">Aktualisierung der technischen Dokumentation</Label>
                  </div>
                  <Badge 
                    variant="outline"
                    className="h-8 text-sm"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#000000',
                      border: '1px solid #e1dfdd'
                    }}
                  >
                    25.09.2025
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.cancel}
              </Button>
              <Button 
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.save}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DsgvoSettings({ isDarkMode = false, onNavigate }: { isDarkMode?: boolean; onNavigate?: (section: string) => void }) {
  const { t } = useLanguage();
  const tExt = useExtendedTranslations();
  
  // DSGVO toggles and states
  const [datenschutzmodusEnabled, setDatenschutzmodusEnabled] = useState(true);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [deleteAfterSession, setDeleteAfterSession] = useState(false);
  const [memoryDuration, setMemoryDuration] = useState("7-days");
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [backupDuration, setBackupDuration] = useState("7-days");
  const [agentLoggingEnabled, setAgentLoggingEnabled] = useState(true);
  const [loggingDuration, setLoggingDuration] = useState("7-days");
  const [systemDiagnoseOnly, setSystemDiagnoseOnly] = useState(true);
  const [userSelfManagementEnabled, setUserSelfManagementEnabled] = useState(false);
  const [diagnoseDuration, setDiagnoseDuration] = useState("7-days");
  
  // Collapse/Expand states for submenus
  const [memoryExpanded, setMemoryExpanded] = useState(false);
  const [backupExpanded, setBackupExpanded] = useState(false);
  const [agentLoggingExpanded, setAgentLoggingExpanded] = useState(false);

  // Helper function to format duration values
  const formatDuration = (value: string): string => {
    const [num, unit] = value.split('-');
    if (unit === 'days') return num === '1' ? '1 Tag' : `${num} Tage`;
    if (unit === 'weeks') return num === '1' ? '1 Woche' : `${num} Wochen`;
    if (unit === 'months') return num === '1' ? '1 Monat' : `${num} Monate`;
    return value;
  };

  // Transparenz & Informationen states
  const [verantwortlicher, setVerantwortlicher] = useState("Anbieter");
  const [andereVerantwortlicher, setAndereVerantwortlicher] = useState("");
  const [zwecke, setZwecke] = useState<string[]>(["Kontextverarbeitung", "Agentenwahl"]);
  const [rechtsgrundlage, setRechtsgrundlage] = useState<string[]>(["Berechtigtes Interesse"]);
  const [datenkategorien, setDatenkategorien] = useState<string[]>(["Texteingaben", "Agentenantworten"]);
  const [empfaenger, setEmpfaenger] = useState<string[]>(["LLM-Anbieter"]);
  const [rechte, setRechte] = useState<string[]>(["Auskunft", "Löschung"]);
  const [drittland, setDrittland] = useState<string[]>(["Keine Drittlandübermittlung"]);
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <FileCheck2 className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          DSGVO
        </h2>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* DSGVO Grundfunktionen Card */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>1 - DSGVO Grundfunktionen</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {tExt.tenantSettingsExtended.dsgvo.basicFunctionsDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Datenschutzmodus */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.datenschutzmodus}</Label>
                    <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      {tExt.tenantSettingsExtended.dsgvo.datenschutzmodusDesc}
                    </p>
                  </div>
                  <Switch 
                    checked={datenschutzmodusEnabled}
                    onCheckedChange={setDatenschutzmodusEnabled}
                  />
                </div>

                {/* Memory */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <Label className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.memory}</Label>
                        <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                          ({deleteAfterSession ? 'Nach Session' : formatDuration(memoryDuration)})
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.memoryDesc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setMemoryExpanded(!memoryExpanded)}
                        className="p-1 hover:bg-gray-100 rounded"
                        style={{ color: '#000000' }}
                      >
                        {memoryExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <Switch 
                        checked={memoryEnabled}
                        onCheckedChange={setMemoryEnabled}
                      />
                    </div>
                  </div>

                  {/* Memory Submenu */}
                  {memoryExpanded && (
                    <div className="ml-6 space-y-4 p-4 rounded-lg" style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9', border: '1px solid #e1dfdd' }}>
                      <div className="space-y-3">
                        <Label className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.memorySettings}</Label>
                        
                        <div className="space-y-1">
                          <Label htmlFor="memory-duration" className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.duration}</Label>
                          <Select 
                            value={memoryDuration} 
                            onValueChange={setMemoryDuration}
                            disabled={deleteAfterSession}
                          >
                            <SelectTrigger 
                              id="memory-duration"
                              disabled={deleteAfterSession}
                              style={{ opacity: deleteAfterSession ? 0.5 : 1 }}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-days">1 Tag</SelectItem>
                              <SelectItem value="2-days">2 Tage</SelectItem>
                              <SelectItem value="3-days">3 Tage</SelectItem>
                              <SelectItem value="4-days">4 Tage</SelectItem>
                              <SelectItem value="5-days">5 Tage</SelectItem>
                              <SelectItem value="6-days">6 Tage</SelectItem>
                              <SelectItem value="7-days">7 Tage</SelectItem>
                              <SelectItem value="1-weeks">1 Woche</SelectItem>
                              <SelectItem value="2-weeks">2 Wochen</SelectItem>
                              <SelectItem value="3-weeks">3 Wochen</SelectItem>
                              <SelectItem value="4-weeks">4 Wochen</SelectItem>
                              <SelectItem value="1-months">1 Monat</SelectItem>
                              <SelectItem value="2-months">2 Monate</SelectItem>
                              <SelectItem value="3-months">3 Monate</SelectItem>
                              <SelectItem value="4-months">4 Monate</SelectItem>
                              <SelectItem value="5-months">5 Monate</SelectItem>
                              <SelectItem value="6-months">6 Monate</SelectItem>
                              <SelectItem value="7-months">7 Monate</SelectItem>
                              <SelectItem value="8-months">8 Monate</SelectItem>
                              <SelectItem value="9-months">9 Monate</SelectItem>
                              <SelectItem value="10-months">10 Monate</SelectItem>
                              <SelectItem value="11-months">11 Monate</SelectItem>
                              <SelectItem value="12-months">12 Monate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.deleteAfterSession}</Label>
                          </div>
                          <Switch 
                            checked={deleteAfterSession}
                            onCheckedChange={setDeleteAfterSession}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Backup */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <Label className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.backup}</Label>
                        <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                          ({formatDuration(backupDuration)})
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.backupDesc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBackupExpanded(!backupExpanded)}
                        className="p-1 hover:bg-gray-100 rounded"
                        style={{ color: '#000000' }}
                      >
                        {backupExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <Switch 
                        checked={backupEnabled}
                        onCheckedChange={setBackupEnabled}
                      />
                    </div>
                  </div>

                  {/* Backup Submenu */}
                  {backupExpanded && (
                    <div className="ml-6 space-y-3 p-4 rounded-lg" style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9', border: '1px solid #e1dfdd' }}>
                      <div className="space-y-1">
                        <Label htmlFor="backup-duration" className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.duration}</Label>
                        <Select value={backupDuration} onValueChange={setBackupDuration}>
                          <SelectTrigger id="backup-duration">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-days">1 Tag</SelectItem>
                            <SelectItem value="2-days">2 Tage</SelectItem>
                            <SelectItem value="3-days">3 Tage</SelectItem>
                            <SelectItem value="4-days">4 Tage</SelectItem>
                            <SelectItem value="5-days">5 Tage</SelectItem>
                            <SelectItem value="6-days">6 Tage</SelectItem>
                            <SelectItem value="7-days">7 Tage</SelectItem>
                            <SelectItem value="1-weeks">1 Woche</SelectItem>
                            <SelectItem value="2-weeks">2 Wochen</SelectItem>
                            <SelectItem value="3-weeks">3 Wochen</SelectItem>
                            <SelectItem value="4-weeks">4 Wochen</SelectItem>
                            <SelectItem value="1-months">1 Monat</SelectItem>
                            <SelectItem value="2-months">2 Monate</SelectItem>
                            <SelectItem value="3-months">3 Monate</SelectItem>
                            <SelectItem value="4-months">4 Monate</SelectItem>
                            <SelectItem value="5-months">5 Monate</SelectItem>
                            <SelectItem value="6-months">6 Monate</SelectItem>
                            <SelectItem value="7-months">7 Monate</SelectItem>
                            <SelectItem value="8-months">8 Monate</SelectItem>
                            <SelectItem value="9-months">9 Monate</SelectItem>
                            <SelectItem value="10-months">10 Monate</SelectItem>
                            <SelectItem value="11-months">11 Monate</SelectItem>
                            <SelectItem value="12-months">12 Monate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Agenten Logging */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <Label className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.agentLogging}</Label>
                        <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                          ({systemDiagnoseOnly ? `Diagnose: ${formatDuration(diagnoseDuration)}` : formatDuration(loggingDuration)})
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.agentLoggingDesc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAgentLoggingExpanded(!agentLoggingExpanded)}
                        className="p-1 hover:bg-gray-100 rounded"
                        style={{ color: '#000000' }}
                      >
                        {agentLoggingExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <Switch 
                        checked={agentLoggingEnabled}
                        onCheckedChange={setAgentLoggingEnabled}
                      />
                    </div>
                  </div>

                  {/* Agenten Logging Submenu */}
                  {agentLoggingExpanded && (
                    <div className="ml-6 space-y-4 p-4 rounded-lg" style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9', border: '1px solid #e1dfdd' }}>
                      <div className="space-y-3">
                        <Label className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.agentLoggingSettings}</Label>
                        
                        <div className="space-y-1">
                          <Label htmlFor="logging-duration" className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.duration}</Label>
                          <Select 
                            value={loggingDuration} 
                            onValueChange={setLoggingDuration}
                            disabled={systemDiagnoseOnly}
                          >
                            <SelectTrigger 
                              id="logging-duration"
                              disabled={systemDiagnoseOnly}
                              style={{ opacity: systemDiagnoseOnly ? 0.5 : 1 }}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-days">1 Tag</SelectItem>
                              <SelectItem value="2-days">2 Tage</SelectItem>
                              <SelectItem value="3-days">3 Tage</SelectItem>
                              <SelectItem value="4-days">4 Tage</SelectItem>
                              <SelectItem value="5-days">5 Tage</SelectItem>
                              <SelectItem value="6-days">6 Tage</SelectItem>
                              <SelectItem value="7-days">7 Tage</SelectItem>
                              <SelectItem value="1-weeks">1 Woche</SelectItem>
                              <SelectItem value="2-weeks">2 Wochen</SelectItem>
                              <SelectItem value="3-weeks">3 Wochen</SelectItem>
                              <SelectItem value="4-weeks">4 Wochen</SelectItem>
                              <SelectItem value="1-months">1 Monat</SelectItem>
                              <SelectItem value="2-months">2 Monate</SelectItem>
                              <SelectItem value="3-months">3 Monate</SelectItem>
                              <SelectItem value="4-months">4 Monate</SelectItem>
                              <SelectItem value="5-months">5 Monate</SelectItem>
                              <SelectItem value="6-months">6 Monate</SelectItem>
                              <SelectItem value="7-months">7 Monate</SelectItem>
                              <SelectItem value="8-months">8 Monate</SelectItem>
                              <SelectItem value="9-months">9 Monate</SelectItem>
                              <SelectItem value="10-months">10 Monate</SelectItem>
                              <SelectItem value="11-months">11 Monate</SelectItem>
                              <SelectItem value="12-months">12 Monate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.onlySystemDiagnose}</Label>
                          </div>
                          <Switch 
                            checked={systemDiagnoseOnly}
                            onCheckedChange={setSystemDiagnoseOnly}
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="diagnose-duration" className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.duration}</Label>
                          <Select 
                            value={diagnoseDuration} 
                            onValueChange={setDiagnoseDuration}
                            disabled={!systemDiagnoseOnly}
                          >
                            <SelectTrigger 
                              id="diagnose-duration"
                              disabled={!systemDiagnoseOnly}
                              style={{ opacity: !systemDiagnoseOnly ? 0.5 : 1 }}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-days">1 Tag</SelectItem>
                              <SelectItem value="2-days">2 Tage</SelectItem>
                              <SelectItem value="3-days">3 Tage</SelectItem>
                              <SelectItem value="4-days">4 Tage</SelectItem>
                              <SelectItem value="5-days">5 Tage</SelectItem>
                              <SelectItem value="6-days">6 Tage</SelectItem>
                              <SelectItem value="7-days">7 Tage</SelectItem>
                              <SelectItem value="1-weeks">1 Woche</SelectItem>
                              <SelectItem value="2-weeks">2 Wochen</SelectItem>
                              <SelectItem value="3-weeks">3 Wochen</SelectItem>
                              <SelectItem value="4-weeks">4 Wochen</SelectItem>
                              <SelectItem value="1-months">1 Monat</SelectItem>
                              <SelectItem value="2-months">2 Monate</SelectItem>
                              <SelectItem value="3-months">3 Monate</SelectItem>
                              <SelectItem value="4-months">4 Monate</SelectItem>
                              <SelectItem value="5-months">5 Monate</SelectItem>
                              <SelectItem value="6-months">6 Monate</SelectItem>
                              <SelectItem value="7-months">7 Monate</SelectItem>
                              <SelectItem value="8-months">8 Monate</SelectItem>
                              <SelectItem value="9-months">9 Monate</SelectItem>
                              <SelectItem value="10-months">10 Monate</SelectItem>
                              <SelectItem value="11-months">11 Monate</SelectItem>
                              <SelectItem value="12-months">12 Monate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Transparenz & Informationen */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>2 - Transparenz & Betroffeneninformationen</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {tExt.tenantSettingsExtended.dsgvo.transparencyInformationDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Verantwortlicher */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-0.5">
                      <Label className="font-semibold">a. {tExt.tenantSettingsExtended.dsgvo.verantwortlicher}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.verantwortlicherDesc}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[250px] justify-between"
                          style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        >
                          <span className="truncate">
                            {verantwortlicher || tExt.tenantSettingsExtended.dsgvo.selectOption}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4" style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}>
                        <div className="space-y-2">
                          {[
                            tExt.tenantSettingsExtended.dsgvo.verantwortlicherAnbieter,
                            tExt.tenantSettingsExtended.dsgvo.verantwortlicherTenant,
                            tExt.tenantSettingsExtended.dsgvo.verantwortlicherOther
                          ].map((item) => (
                            <div
                              key={item}
                              onClick={() => setVerantwortlicher(item)}
                              className="px-2 py-1 text-sm text-black cursor-pointer rounded transition-colors hover:bg-[#E9C796]"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {verantwortlicher === "Andere (siehe Angaben)" && (
                    <Textarea
                      value={andereVerantwortlicher}
                      onChange={(e) => setAndereVerantwortlicher(e.target.value)}
                      placeholder={tExt.tenantSettingsExtended.dsgvo.verantwortlicherPlaceholder}
                      className="mb-2"
                    />
                  )}
                  <ul className="list-disc list-inside text-sm">
                    <li>{verantwortlicher === "Andere (siehe Angaben)" && andereVerantwortlicher ? andereVerantwortlicher : verantwortlicher}</li>
                  </ul>
                </div>

                {/* Zwecke */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-0.5">
                      <Label className="font-semibold">b. {tExt.tenantSettingsExtended.dsgvo.zwecke}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.zweckeDesc}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[250px] justify-between"
                          style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        >
                          <span className="truncate">
                            {zwecke.length > 0 ? `${zwecke.length} ${tExt.tenantSettingsExtended.dsgvo.selected}` : tExt.tenantSettingsExtended.dsgvo.selectOption}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4" style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}>
                        <div className="space-y-2">
                          {[
                            tExt.tenantSettingsExtended.dsgvo.zweckKontextverarbeitung,
                            tExt.tenantSettingsExtended.dsgvo.zweckAgentenwahl,
                            tExt.tenantSettingsExtended.dsgvo.zweckNormenVorschlaege,
                            tExt.tenantSettingsExtended.dsgvo.zweckMemory,
                            tExt.tenantSettingsExtended.dsgvo.zweckRAGSuche,
                            tExt.tenantSettingsExtended.dsgvo.zweckFehleranalyse,
                            tExt.tenantSettingsExtended.dsgvo.zweckProtokollierung
                          ].map((item) => (
                            <div key={item} className="flex items-center space-x-2 px-2 py-1 rounded transition-colors hover:bg-[#E9C796]">
                              <Checkbox
                                id={`zweck-${item}`}
                                checked={zwecke.includes(item)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setZwecke([...zwecke, item]);
                                  } else {
                                    setZwecke(zwecke.filter((z) => z !== item));
                                  }
                                }}
                                className="data-[state=checked]:bg-[#E9C796] data-[state=checked]:border-[#E9C796] data-[state=checked]:text-black border-[#e1dfdd] hover:bg-[#E9C796] hover:border-[#E9C796]"
                              />
                              <label
                                htmlFor={`zweck-${item}`}
                                className="text-sm text-black cursor-pointer flex-1"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {zwecke.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {zwecke.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Rechtsgrundlage */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-0.5">
                      <Label className="font-semibold">c. {tExt.tenantSettingsExtended.dsgvo.rechtsgrundlage}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.rechtsgrundlageDesc}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[250px] justify-between"
                          style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        >
                          <span className="truncate">
                            {rechtsgrundlage.length > 0 ? `${rechtsgrundlage.length} ${tExt.tenantSettingsExtended.dsgvo.selected}` : tExt.tenantSettingsExtended.dsgvo.selectOption}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4" style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}>
                        <div className="space-y-2">
                          {[
                            tExt.tenantSettingsExtended.dsgvo.rechtsgrundlageBerechtigtesInteresse,
                            tExt.tenantSettingsExtended.dsgvo.rechtsgrundlageEinwilligung,
                            tExt.tenantSettingsExtended.dsgvo.rechtsgrundlageVertragserfuellung,
                            tExt.tenantSettingsExtended.dsgvo.rechtsgrundlageRechtlicheVerpflichtung,
                            tExt.tenantSettingsExtended.dsgvo.rechtsgrundlageOeffentlichesInteresse
                          ].map((item) => (
                            <div key={item} className="flex items-center space-x-2 px-2 py-1 rounded transition-colors hover:bg-[#E9C796]">
                              <Checkbox
                                id={`recht-${item}`}
                                checked={rechtsgrundlage.includes(item)}
                                onCheckedChange={(checked) => {
                                if (checked) {
                                  setRechtsgrundlage([...rechtsgrundlage, item]);
                                } else {
                                  setRechtsgrundlage(rechtsgrundlage.filter((r) => r !== item));
                                }
                              }}
                                className="data-[state=checked]:bg-[#E9C796] data-[state=checked]:border-[#E9C796] data-[state=checked]:text-black border-[#e1dfdd] hover:bg-[#E9C796] hover:border-[#E9C796]"
                              />
                              <label
                                htmlFor={`recht-${item}`}
                                className="text-sm text-black cursor-pointer flex-1"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {rechtsgrundlage.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {rechtsgrundlage.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Datenkategorien */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-0.5">
                      <Label className="font-semibold">d. {tExt.tenantSettingsExtended.dsgvo.datenkategorien}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.datenkategorienDesc}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[250px] justify-between"
                          style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        >
                          <span className="truncate">
                            {datenkategorien.length > 0 ? `${datenkategorien.length} ${tExt.tenantSettingsExtended.dsgvo.selected}` : tExt.tenantSettingsExtended.dsgvo.selectOption}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4" style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}>
                        <div className="space-y-2">
                          {[
                            tExt.tenantSettingsExtended.dsgvo.datenkategorieTexteingaben,
                            tExt.tenantSettingsExtended.dsgvo.datenkategorieAgentenantworten,
                            tExt.tenantSettingsExtended.dsgvo.datenkategorieGespraechsverlauf,
                            tExt.tenantSettingsExtended.dsgvo.datenkategorieDateiuploads,
                            tExt.tenantSettingsExtended.dsgvo.datenkategorieMetadaten,
                            tExt.tenantSettingsExtended.dsgvo.datenkategorieNutzerprofil,
                            tExt.tenantSettingsExtended.dsgvo.datenkategorieRAGErgebnisse,
                            tExt.tenantSettingsExtended.dsgvo.datenkategorieSystemprotokolle
                          ].map((item) => (
                            <div key={item} className="flex items-center space-x-2 px-2 py-1 rounded transition-colors hover:bg-[#E9C796]">
                              <Checkbox
                                id={`daten-${item}`}
                                checked={datenkategorien.includes(item)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setDatenkategorien([...datenkategorien, item]);
                                  } else {
                                    setDatenkategorien(datenkategorien.filter((d) => d !== item));
                                  }
                                }}
                                className="data-[state=checked]:bg-[#E9C796] data-[state=checked]:border-[#E9C796] data-[state=checked]:text-black border-[#e1dfdd] hover:bg-[#E9C796] hover:border-[#E9C796]"
                              />
                              <label
                                htmlFor={`daten-${item}`}
                                className="text-sm text-black cursor-pointer flex-1"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {datenkategorien.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {datenkategorien.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Empfänger */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-0.5">
                      <Label className="font-semibold">e. {tExt.tenantSettingsExtended.dsgvo.empfaenger}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.empfaengerDesc}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[250px] justify-between"
                          style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        >
                          <span className="truncate">
                            {empfaenger.length > 0 ? `${empfaenger.length} ${tExt.tenantSettingsExtended.dsgvo.selected}` : tExt.tenantSettingsExtended.dsgvo.selectOption}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4" style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}>
                        <div className="space-y-2">
                          {[
                            tExt.tenantSettingsExtended.dsgvo.empfaengerLLMAnbieter,
                            tExt.tenantSettingsExtended.dsgvo.empfaengerLokaleModelle,
                            tExt.tenantSettingsExtended.dsgvo.empfaengerInterneAgenten,
                            tExt.tenantSettingsExtended.dsgvo.empfaengerExterneAgenten,
                            tExt.tenantSettingsExtended.dsgvo.empfaengerRAGDienste,
                            tExt.tenantSettingsExtended.dsgvo.empfaengerMonitoringLogging,
                            tExt.tenantSettingsExtended.dsgvo.empfaengerBackupSysteme
                          ].map((item) => (
                            <div key={item} className="flex items-center space-x-2 px-2 py-1 rounded transition-colors hover:bg-[#E9C796]">
                              <Checkbox
                                id={`empf-${item}`}
                                checked={empfaenger.includes(item)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setEmpfaenger([...empfaenger, item]);
                                  } else {
                                    setEmpfaenger(empfaenger.filter((e) => e !== item));
                                  }
                                }}
                                className="data-[state=checked]:bg-[#E9C796] data-[state=checked]:border-[#E9C796] data-[state=checked]:text-black border-[#e1dfdd] hover:bg-[#E9C796] hover:border-[#E9C796]"
                              />
                              <label
                                htmlFor={`empf-${item}`}
                                className="text-sm text-black cursor-pointer flex-1"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {empfaenger.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {empfaenger.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Speicherdauer */}
                <div className="space-y-2">
                  <Label className="font-semibold">f. {tExt.tenantSettingsExtended.dsgvo.speicherdauer}</Label>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    {tExt.tenantSettingsExtended.dsgvo.speicherdauerDesc}
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Memory: {memoryEnabled ? (deleteAfterSession ? "Nach jeder Session" : memoryDuration.replace("-", " ").replace("days", "Tage").replace("weeks", "Wochen").replace("months", "Monate")) : "Deaktiviert"}</li>
                    <li>Backup: {backupEnabled ? backupDuration.replace("-", " ").replace("days", "Tage").replace("weeks", "Wochen").replace("months", "Monate") : "Deaktiviert"}</li>
                    <li>Agenten-Logging: {agentLoggingEnabled ? (systemDiagnoseOnly ? diagnoseDuration.replace("-", " ").replace("days", "Tage").replace("weeks", "Wochen").replace("months", "Monate") + " (Systemdiagnose)" : loggingDuration.replace("-", " ").replace("days", "Tage").replace("weeks", "Wochen").replace("months", "Monate")) : "Deaktiviert"}</li>
                  </ul>
                </div>

                {/* Rechte */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-0.5">
                      <Label className="font-semibold">g. {tExt.tenantSettingsExtended.dsgvo.rechte}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.rechteDesc}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[250px] justify-between"
                          style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        >
                          <span className="truncate">
                            {rechte.length > 0 ? `${rechte.length} ${tExt.tenantSettingsExtended.dsgvo.selected}` : tExt.tenantSettingsExtended.dsgvo.selectOption}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4" style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}>
                        <div className="space-y-2">
                          {[
                            tExt.tenantSettingsExtended.dsgvo.rechtAuskunft,
                            tExt.tenantSettingsExtended.dsgvo.rechtBerichtigung,
                            tExt.tenantSettingsExtended.dsgvo.rechtLoeschung,
                            tExt.tenantSettingsExtended.dsgvo.rechtEinschraenkung,
                            tExt.tenantSettingsExtended.dsgvo.rechtWiderspruch,
                            tExt.tenantSettingsExtended.dsgvo.rechtDatenuebertragbarkeit,
                            tExt.tenantSettingsExtended.dsgvo.rechtWiderruf
                          ].map((item) => (
                            <div key={item} className="flex items-center space-x-2 px-2 py-1 rounded transition-colors hover:bg-[#E9C796]">
                              <Checkbox
                                id={`rechte-${item}`}
                                checked={rechte.includes(item)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setRechte([...rechte, item]);
                                  } else {
                                    setRechte(rechte.filter((r) => r !== item));
                                  }
                                }}
                                className="data-[state=checked]:bg-[#E9C796] data-[state=checked]:border-[#E9C796] data-[state=checked]:text-black border-[#e1dfdd] hover:bg-[#E9C796] hover:border-[#E9C796]"
                              />
                              <label
                                htmlFor={`rechte-${item}`}
                                className="text-sm text-black cursor-pointer flex-1"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {rechte.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {rechte.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Drittland-Übermittlung */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-0.5">
                      <Label className="font-semibold">h. {tExt.tenantSettingsExtended.dsgvo.drittland}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.tenantSettingsExtended.dsgvo.drittlandDesc}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[250px] justify-between"
                          style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        >
                          <span className="truncate">
                            {drittland.length > 0 ? `${drittland.length} ${tExt.tenantSettingsExtended.dsgvo.selected}` : tExt.tenantSettingsExtended.dsgvo.selectOption}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4" style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}>
                        <div className="space-y-2">
                          {[
                            tExt.tenantSettingsExtended.dsgvo.drittlandKeine,
                            tExt.tenantSettingsExtended.dsgvo.drittlandUSASCCs,
                            tExt.tenantSettingsExtended.dsgvo.drittlandUSATIA,
                            tExt.tenantSettingsExtended.dsgvo.drittlandEUEWR,
                            tExt.tenantSettingsExtended.dsgvo.drittlandAndereSCCs,
                            tExt.tenantSettingsExtended.dsgvo.drittlandLokal
                          ].map((item) => (
                            <div key={item} className="flex items-center space-x-2 px-2 py-1 rounded transition-colors hover:bg-[#E9C796]">
                              <Checkbox
                                id={`drittland-${item}`}
                                checked={drittland.includes(item)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setDrittland([...drittland, item]);
                                  } else {
                                    setDrittland(drittland.filter((d) => d !== item));
                                  }
                                }}
                                className="data-[state=checked]:bg-[#E9C796] data-[state=checked]:border-[#E9C796] data-[state=checked]:text-black border-[#e1dfdd] hover:bg-[#E9C796] hover:border-[#E9C796]"
                              />
                              <label
                                htmlFor={`drittland-${item}`}
                                className="text-sm text-black cursor-pointer flex-1"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {drittland.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {drittland.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Hinweis auf Automatisierung */}
                <div className="space-y-2">
                  <Label className="font-semibold">i. {tExt.tenantSettingsExtended.dsgvo.automationNotice}</Label>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    {tExt.tenantSettingsExtended.dsgvo.automationNoticeDesc}
                  </p>
                  <ul className="list-disc list-inside text-sm">
                    <li><span className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.aiNotice}</span> {tExt.tenantSettingsExtended.dsgvo.aiNoticeText}</li>
                  </ul>
                </div>

                {/* Gesetzestext Link */}
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#000000' }}>Link auf Gesetzestext DSGVO Art. 13</span>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://eur-lex.europa.eu/eli/reg/2016/679/oj', '_blank')}
                    className="gap-2 transition-colors hover:!bg-[#E9C796]"
                    style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                  >
                    Gesetzestext anzeigen
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rechte der Betroffenen */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>3 - Rechte der Betroffenen</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {tExt.tenantSettingsExtended.dsgvo.rightsOfDataSubjectsDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selbstverwaltung durch Benutzer */}
                <div className="p-4 rounded-md" style={{ border: '1px solid #e1dfdd' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Label className="font-semibold mb-2 block">Selbstverwaltung der Betroffenenrechte durch Benutzer aktivieren</Label>
                      <p className="text-sm mb-2" style={{ color: '#666' }}>
                        Wenn aktiviert, können Ihre Benutzer ihre DSGVO-Einstellungen selbstständig im User-Bereich verwalten. Dies umfasst:
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2" style={{ color: '#666' }}>
                        <li>Gesprächskontext-Memory (Ein/Aus)</li>
                        <li>Personalisierung und Nutzerattribute (Opt-in/Opt-out)</li>
                        <li>Profilbildung für individuelle Nutzerprofile (Ein/Aus)</li>
                        <li>Automatisierte Agentenwahl (Ein/Aus)</li>
                        <li>Datenexport, Widerspruch und Löschung ihrer Daten</li>
                      </ul>
                      <p className="text-sm mt-2" style={{ color: '#666' }}>
                        Alle Einstellungen werden DSGVO-konform protokolliert. Die Standardeinstellungen können unten konfiguriert werden.
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                      <Switch 
                        checked={userSelfManagementEnabled}
                        onCheckedChange={setUserSelfManagementEnabled}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm flex-1" style={{ color: '#666' }}>
                        {userSelfManagementEnabled 
                          ? 'Die Verwaltung durch den Nutzer ist aktiviert. Benutzer können ihre DSGVO-Einstellungen selbstständig verwalten.'
                          : 'Die Verwaltung durch den Nutzer ist deaktiviert. Der Tenant hat dafür zu sorgen, dass die Nutzer Kenntnis über die "Rechte der Betroffenen" haben und dies schriftlich festgehalten ist.'
                        }
                      </span>
                      <Badge 
                        variant="secondary"
                        className="flex-shrink-0"
                        style={{ 
                          backgroundColor: userSelfManagementEnabled ? 'transparent' : '#E9C796',
                          color: '#000',
                          border: userSelfManagementEnabled ? '1px solid #e1dfdd' : 'none',
                          padding: '4px 8px'
                        }}
                      >
                        {userSelfManagementEnabled ? 'Aktiviert' : 'Deaktiviert'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Auskunft */}
                <div>
                  <Label className="font-semibold mb-2 block">a. {tExt.tenantSettingsExtended.dsgvo.rightAuskunftTitle}</Label>
                  <div className="flex items-start gap-4">
                    <ul className="list-disc list-outside text-sm space-y-1 flex-1" style={{ paddingLeft: '20px' }}>
                      <li>{tExt.tenantSettingsExtended.dsgvo.rightAuskunftDesc1}</li>
                      <li>{tExt.tenantSettingsExtended.dsgvo.rightAuskunftDesc2}</li>
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate?.('user-management.users')}
                      className="flex-shrink-0"
                      style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E9C796';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      {tExt.tenantSettingsExtended.dsgvo.goTo}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Berichtigung */}
                <div>
                  <Label className="font-semibold mb-2 block">b. {tExt.tenantSettingsExtended.dsgvo.rightBerichtigungTitle}</Label>
                  <div className="flex items-start gap-4">
                    <ul className="list-disc list-outside text-sm space-y-1 flex-1" style={{ paddingLeft: '20px' }}>
                      <li>{tExt.tenantSettingsExtended.dsgvo.rightBerichtigungDesc1}</li>
                      <li>{tExt.tenantSettingsExtended.dsgvo.rightBerichtigungDesc2}</li>
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate?.('user-management.users')}
                      className="flex-shrink-0"
                      style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E9C796';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      {tExt.tenantSettingsExtended.dsgvo.goTo}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Löschung */}
                <div>
                  <Label className="font-semibold mb-2 block">c. {tExt.tenantSettingsExtended.dsgvo.rightLoeschungTitle}</Label>
                  <div className="flex items-start gap-4">
                    <ul className="list-disc list-outside text-sm space-y-1 flex-1" style={{ paddingLeft: '20px' }}>
                      <li>{tExt.tenantSettingsExtended.dsgvo.rightLoeschungDesc1}</li>
                      <li>{tExt.tenantSettingsExtended.dsgvo.rightLoeschungDesc2}</li>
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate?.('user-management.users')}
                      className="flex-shrink-0"
                      style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E9C796';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      {tExt.tenantSettingsExtended.dsgvo.goTo}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Einschränkung */}
                <div>
                  <Label className="font-semibold mb-2 block">d. {tExt.tenantSettingsExtended.dsgvo.rightEinschraenkungTitle}</Label>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <ul className="list-disc list-outside text-sm space-y-1 mb-3" style={{ paddingLeft: '20px' }}>
                        <li>{tExt.tenantSettingsExtended.dsgvo.rightEinschraenkungDesc1}</li>
                        <li>{tExt.tenantSettingsExtended.dsgvo.rightEinschraenkungDesc2}</li>
                      </ul>
                      <ul className="list-[circle] list-outside text-sm space-y-1" style={{ paddingLeft: '44px' }}>
                        <li><span className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.memory}</span> - {tExt.tenantSettingsExtended.dsgvo.rightEinschraenkungMemory}</li>
                        <li><span className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.personalization}</span> - {tExt.tenantSettingsExtended.dsgvo.rightEinschraenkungPersonalisierung}</li>
                        <li><span className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.profiling}</span> - {tExt.tenantSettingsExtended.dsgvo.rightEinschraenkungProfilbildung}</li>
                        <li><span className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.automatedAgentSelection}</span> - {tExt.tenantSettingsExtended.dsgvo.rightEinschraenkungAgentenwahl}</li>
                      </ul>
                    </div>
                    <div className="flex-shrink-0" style={{ width: '120px' }}></div>
                  </div>
                </div>

                {/* Datenübertragbarkeit */}
                <div>
                  <Label className="font-semibold mb-2 block">e. {tExt.tenantSettingsExtended.dsgvo.rightDatenuebertragbarkeitTitle}</Label>
                  <div className="flex items-start gap-4">
                    <ul className="list-disc list-outside text-sm space-y-1 flex-1" style={{ paddingLeft: '20px' }}>
                      <li>{tExt.tenantSettingsExtended.dsgvo.rightDatenuebertragbarkeitDesc1}</li>
                      <li>{tExt.tenantSettingsExtended.dsgvo.rightDatenuebertragbarkeitDesc2}</li>
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate?.('user-management.users')}
                      className="flex-shrink-0"
                      style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E9C796';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      {tExt.tenantSettingsExtended.dsgvo.goTo}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Widerspruch */}
                <div>
                  <Label className="font-semibold mb-2 block">f. {tExt.tenantSettingsExtended.dsgvo.rightWiderspruchTitle}</Label>
                  <ul className="list-disc list-outside text-sm space-y-1 mb-3" style={{ paddingLeft: '20px' }}>
                    <li>{tExt.tenantSettingsExtended.dsgvo.rightWiderspruchDesc1}</li>
                  </ul>
                  <ul className="list-[circle] list-outside text-sm space-y-1" style={{ paddingLeft: '44px' }}>
                    <li>„Sie können der Speicherung ihrer Daten widersprechen"</li>
                  </ul>
                </div>

                {/* Keine vollautomatisierte Entscheidung */}
                <div>
                  <Label className="font-semibold mb-2 block">g. {tExt.tenantSettingsExtended.dsgvo.rightNoAutomatedDecision}</Label>
                  <div className="flex items-start gap-4">
                    <ul className="list-disc list-outside text-sm space-y-1 flex-1" style={{ paddingLeft: '20px' }}>
                      <li>Automatisierte Entscheidungen durch das KI-System werden klar als solche gekennzeichnet („KI-basierter Vorschlag") und können jederzeit durch eine menschliche Überprüfung ergänzt oder überschrieben werden („Human-in-the-loop")</li>
                    </ul>
                    <div className="flex-shrink-0" style={{ width: '120px' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auftragsverarbeitung & Datenzugriff */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>4 - Auftragsverarbeitung & Datenzugriff</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {tExt.tenantSettingsExtended.dsgvo.dataProcessingAccessDesc}
                </CardDescription>
                <div 
                  className="mt-4 p-3 rounded text-sm"
                  style={{ 
                    border: '1px solid #e1dfdd',
                    backgroundColor: '#E9C796',
                    color: '#000000'
                  }}
                >
                  <span className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.contractualModel}</span> {tExt.tenantSettingsExtended.dsgvo.contractualModelText}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Standard: Kein Zugriff */}
                <div>
                  <Label className="font-semibold mb-1 block">{tExt.tenantSettingsExtended.dsgvo.standardNoAccess}</Label>
                  <p className="text-sm mb-2"><span className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.standardNoAccessDesc}</span> {tExt.tenantSettingsExtended.dsgvo.standardNoAccessModel}</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>{tExt.tenantSettingsExtended.dsgvo.standardNoAccessItem1}</li>
                    <li>{tExt.tenantSettingsExtended.dsgvo.standardNoAccessItem2}</li>
                    <li>{tExt.tenantSettingsExtended.dsgvo.standardNoAccessItem3}</li>
                    <li>{tExt.tenantSettingsExtended.dsgvo.standardNoAccessItem4}</li>
                  </ul>
                  <ul className="list-[circle] list-inside text-sm space-y-1 ml-6 mt-1">
                    <li>{tExt.tenantSettingsExtended.dsgvo.standardNoAccessNote}</li>
                  </ul>
                </div>

                {/* Optional: Support- oder Hosting-Zugriff */}
                <div>
                  <Label className="font-semibold mb-1 block">{tExt.tenantSettingsExtended.dsgvo.optionalSupportAccess}</Label>
                  <p className="text-sm mb-2"><span className="font-semibold">{tExt.tenantSettingsExtended.dsgvo.optionalSupportAccessDesc}</span> {tExt.tenantSettingsExtended.dsgvo.optionalSupportAccessModel}</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>{tExt.tenantSettingsExtended.dsgvo.optionalSupportAccessItem1}</li>
                    <li>{tExt.tenantSettingsExtended.dsgvo.optionalSupportAccessItem2}</li>
                    <li>{tExt.tenantSettingsExtended.dsgvo.optionalSupportAccessItem3}</li>
                  </ul>
                  <ul className="list-[circle] list-inside text-sm space-y-1 ml-6 mt-1">
                    <li>{tExt.tenantSettingsExtended.dsgvo.optionalSupportAccessNote}</li>
                    <li>{tExt.tenantSettingsExtended.dsgvo.accessLogged}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Dokumentierte Verarbeitungstätigkeiten */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>5 - Dokumentierte Verarbeitungstätigkeiten (Verzeichnis)</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {tExt.tenantSettingsExtended.dsgvo.documentedProcessingActivitiesDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Anbieter (Systemebene) */}
                <div>
                  <Label className="font-semibold mb-1 block">{tExt.tenantSettingsExtended.dsgvo.providerSystemLevel}</Label>
                  <p className="text-sm mb-2">{tExt.tenantSettingsExtended.dsgvo.providerSystemLevelDesc}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">• {tExt.tenantSettingsExtended.dsgvo.contextStorageOrchestrator}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E9C796';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        <Download className="mr-1 h-4 w-4" />
                        {tExt.tenantSettingsExtended.dsgvo.download}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">• {tExt.tenantSettingsExtended.dsgvo.loggingAccessErrors}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E9C796';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        <Download className="mr-1 h-4 w-4" />
                        {tExt.tenantSettingsExtended.dsgvo.download}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">• {tExt.tenantSettingsExtended.dsgvo.communicationAgentsAPI}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E9C796';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        <Download className="mr-1 h-4 w-4" />
                        {tExt.tenantSettingsExtended.dsgvo.download}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tenant (Mandantenebene) */}
                <div>
                  <Label className="font-semibold mb-1 block">{tExt.tenantSettingsExtended.dsgvo.tenantLevel}</Label>
                  <p className="text-sm mb-2">{tExt.tenantSettingsExtended.dsgvo.tenantLevelDesc}</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>{tExt.tenantSettingsExtended.dsgvo.tenantLevelItem1}</li>
                    <li>{tExt.tenantSettingsExtended.dsgvo.tenantLevelItem2}</li>
                    <li>{tExt.tenantSettingsExtended.dsgvo.tenantLevelItem3}</li>
                  </ul>
                </div>

                {/* Gesetzestext Link */}
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#000000' }}>Link auf Gesetzestext DSGVO Art. 30</span>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://eur-lex.europa.eu/eli/reg/2016/679/oj', '_blank')}
                    className="gap-2 transition-colors hover:!bg-[#E9C796]"
                    style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                  >
                    Gesetzestext anzeigen
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Datenschutz-Folgenabschätzung (DSFA) */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>6 - Datenschutz-Folgenabschätzung (DSFA)</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {tExt.tenantSettingsExtended.dsgvo.dsfaDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Verantwortlichkeit */}
                <div>
                  <Label className="font-semibold mb-1 block">a. {tExt.tenantSettingsExtended.dsgvo.dsfaResponsibility}</Label>
                  <div className="max-w-[600px]">
                    <ul className="list-disc list-outside text-sm space-y-1 pl-5">
                      <li className="break-words">{tExt.tenantSettingsExtended.dsgvo.dsfaResponsibilityItem1}</li>
                      <li className="break-words">{tExt.tenantSettingsExtended.dsgvo.dsfaResponsibilityItem2}</li>
                    </ul>
                  </div>
                </div>

                {/* Risikobewertung */}
                <div>
                  <Label className="font-semibold mb-2 block">b. {tExt.tenantSettingsExtended.dsgvo.dsfaRiskAssessment}</Label>
                  
                  {/* Orchestrator */}
                  <div className="ml-4 mb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 max-w-[600px]">
                        <Label className="font-semibold mb-1 block text-sm">Orchestrator</Label>
                        <p className="text-sm break-words">Die Risikobewertung vom Orchestrator wurde aufgrund der Tenant-Rolle vorgenommen</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onNavigate?.('tenant-settings.compliance.euaiact');
                          setTimeout(() => {
                            const element = document.getElementById('risk-assessment-orchestrator');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 500);
                        }}
                        className="flex-shrink-0"
                        style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E9C796';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        {tExt.tenantSettingsExtended.dsgvo.dsfaGoTo}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Agenten */}
                  <div className="ml-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 max-w-[600px]">
                        <Label className="font-semibold mb-1 block text-sm">Agenten</Label>
                        <p className="text-sm break-words mb-2">Jeder Agent hat seine eigene Risikobewertung. Von uns zur Verfügung gestellte Agenten sind per Default definiert. Bei eigenen Agenten muss die Risikobewertung durch den Tenant ausgefüllt werden.</p>
                        <p className="text-sm break-words italic" style={{ color: '#666666' }}>Hinweistext im Chat-Fenster: Sie verwenden ein Fremd-Agent, welcher nicht durch den System-Anbieter verifiziert wurde. Verwendung auf eigenes Risiko!</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onNavigate?.('modules.overview');
                        }}
                        className="flex-shrink-0"
                        style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E9C796';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        {tExt.tenantSettingsExtended.dsgvo.dsfaGoTo}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Vorlagen & Hinweise */}
                <div>
                  <Label className="font-semibold mb-1 block">c. Vorlagen & Hinweise</Label>
                  <div className="max-w-[600px]">
                    <ul className="list-disc list-outside text-sm space-y-1 pl-5">
                      <li className="break-words">{tExt.tenantSettingsExtended.dsgvo.dsfaAdditionalItem1}</li>
                      <li className="break-words">{tExt.tenantSettingsExtended.dsgvo.dsfaAdditionalItem2}</li>
                      <li className="break-words">{tExt.tenantSettingsExtended.dsgvo.dsfaAdditionalItem3}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technische und organisatorische Massnahmen (TOMs) */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="font-semibold" style={{ color: '#000000' }}>7 - TOMs – Technische und organisatorische Massnahmen</CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  Dieser Abschnitt dokumentiert, welche Sicherheitsfunktionen in dieser Plattform aktiv sind und wie Daten vor unbefugtem Zugriff oder Verlust geschützt werden.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* a. Systemseitig (Anbieter) */}
                <div>
                  <Label className="font-semibold mb-3 block">a. Systemseitig (Anbieter)</Label>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">TLS-Verschlüsselung</td>
                          <td className="py-3">Sämtliche Kommunikation zwischen Frontend, Orchestrator und Agenten erfolgt verschlüsselt über TLS</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">Session-Schutz & Token-Handling</td>
                          <td className="py-3">Session-Timeouts und sichere API-Tokens zur Minimierung von Zugriffsmissbrauch</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">Rollenmodell</td>
                          <td className="py-3">Zugriffsrechte sind über ein mandantenfähiges Rollensystem steuerbar (z. B. Admin, Editor, Viewer)</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">Zugriffslogging (Admin-Logging)</td>
                          <td className="py-3">Alle administrativen Zugriffe und sicherheitsrelevanten Aktionen werden systemseitig protokolliert (kein Inhaltlogging)</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">Backup & Wiederherstellung</td>
                          <td className="py-3">DSGVO-konforme Backup-Funktionalität mit Versionierung, optional automatisiert aktivierbar</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* b. Tenantseitig (optional aktivierbar) */}
                <div>
                  <Label className="font-semibold mb-3 block">b. Tenantseitig (optional aktivierbar)</Label>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">Erweiterte Backups</td>
                          <td className="py-3">Zusätzliche Backup-Optionen mit verschlüsselter Speicherung und erweiterten Aufbewahrungsfristen</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">Erweiterte Logging-Optionen</td>
                          <td className="py-3">Detaillierte Protokollierung von Benutzeraktivitäten und Systemereignissen (DSGVO-konform, ohne Inhaltsdaten)</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">Passwort-Richtlinien</td>
                          <td className="py-3">Konfigurierbare Anforderungen für Passwortstärke, Ablauffristen und Wiederverwendungsregeln</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">Whitelist</td>
                          <td className="py-3">IP-basierte Zugriffsbeschränkung zur Erhöhung der Systemsicherheit</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-semibold">2FA (Zwei-Faktor-Authentifizierung)</td>
                          <td className="py-3">Zusätzliche Sicherheitsstufe durch Zwei-Faktor-Authentifizierung beim Login</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Hinweise für den Tenant */}
                <div>
                  <Label className="font-semibold mb-1 block">Hinweise für den Tenant</Label>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Diese Schutzmassnahmen werden systemseitig bereitgestellt und laufend aktualisiert</li>
                    <li>Der Tenant kann im Adminbereich zusätzliche Optionen wie verschlüsselte Backups oder erweitertes Logging aktivieren</li>
                    <li>Änderungen an Sicherheitsfunktionen werden im Konfigurationslog dokumentiert</li>
                  </ul>
                </div>

                {/* Status für diesen Tenant */}
                <div>
                  <Label className="font-semibold mb-3 block">Status für diesen Tenant</Label>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left py-2 pr-4" style={{ width: '40%' }}>Bereich</th>
                          <th className="text-left py-2">Einstellung</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-3 pr-4">TLS aktiviert</td>
                          <td className="py-3">Ja</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4">Datenbankverschlüsselung</td>
                          <td className="py-3">Optional auswählbar</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4">Rollen aktiv</td>
                          <td className="py-3">Ja</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4">Logging aktiv</td>
                          <td className="py-3">Ja (ohne Inhaltsdaten)</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4">Backup aktiviert</td>
                          <td className="py-3">Konfigurierbar</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4">Sessionmanagement</td>
                          <td className="py-3">Aktiv</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.cancel}
              </Button>
              <Button 
                style={{
                  border: '1px solid #e1dfdd',
                  color: '#000000',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t.save}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}