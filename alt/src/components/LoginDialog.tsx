import { useState } from "react";
import { Button } from "./ui/button";
import { AlertCircle, Eye, EyeOff, Shield, Monitor, Smartphone } from "lucide-react";
import { useLanguage } from "../utils/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import rmbLogo from "figma:asset/c671b64124f09b996725617e2eaf6a33d08bebb7.png";
import neucoLogo from "figma:asset/64c4840bb2c629b9d1466d208fd9354f2e124f32.png";
import zuraioLogo from "figma:asset/e2bbc50662620d1183da907644b459be0f7e4b76.png";
import zuraioNewLogo from "figma:asset/bd9f5c96096549aa85dac2d2558560dc72e818ad.png";
import zuraioIconLogo from "figma:asset/fcf30c39d930ae3400a3b4b43c9fa6d3c26abab5.png";

interface LoginDialogProps {
  onLogin: (user: { username: string; layoutType: 'desktop' | 'mobile'; company: 'rmb' | 'neuco' }) => void;
}

export function LoginDialog({ onLogin }: LoginDialogProps) {
  const { t } = useLanguage();
  
  // Login state
  const [selectedTenant, setSelectedTenant] = useState("neuco");
  const [password, setPassword] = useState("");
  const [layoutType, setLayoutType] = useState<'desktop' | 'mobile'>('desktop');
  
  // 2FA state
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("123456");
  const [twoFactorError, setTwoFactorError] = useState("");
  
  // UI state
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  // Store login data for 2FA completion
  const [pendingLogin, setPendingLogin] = useState<{ username: string; layoutType: 'desktop' | 'mobile'; company: 'rmb' | 'neuco' } | null>(null);

  // Get current logo based on selected tenant
  const getCurrentLogo = () => {
    if (selectedTenant === 'neuco') {
      return { src: neucoLogo, alt: 'neuco Logo', height: '24px' };
    } else if (selectedTenant === 'RMB Group') {
      return { src: rmbLogo, alt: 'RMB Group Logo', height: '57.6px' };
    }
    // Default zuraio logo for other tenants
    return { src: zuraioLogo, alt: 'zuraio Logo', height: '57.6px' };
  };

  const handleLogin = () => {
    setLoginError("");
    
    // Validation
    if (!selectedTenant) {
      setLoginError(t.login.errorSelectTenant);
      return;
    }
    
    if (!password) {
      setLoginError(t.login.errorPasswordEmpty);
      return;
    }
    
    if (password.length < 4) {
      setLoginError(t.login.errorPasswordTooShort);
      return;
    }
    
    // Check for valid passwords (mock validation)
    const validPasswords = ['password', '1234', 'test', 'demo'];
    if (!validPasswords.includes(password)) {
      setLoginError(t.login.errorInvalidPassword);
      return;
    }
    
    // Determine company based on selected tenant
    const company = selectedTenant === 'neuco' ? 'neuco' : 'rmb';
    
    // Store login data and show 2FA dialog
    setPendingLogin({ 
      username: selectedTenant,
      layoutType,
      company
    });
    setShow2FADialog(true);
  };

  const handle2FASubmit = () => {
    setTwoFactorError("");
    
    // Validate 2FA code
    if (twoFactorCode.length !== 6) {
      setTwoFactorError(t.login.errorCode6Digits);
      return;
    }
    
    // Mock 2FA validation - in real app this would verify with backend
    const validCodes = ['123456', '000000', '111111'];
    if (!validCodes.includes(twoFactorCode)) {
      setTwoFactorError(t.login.errorInvalidCode);
      return;
    }
    
    // Complete login
    if (pendingLogin) {
      onLogin(pendingLogin);
    }
  };

  const handle2FACancel = () => {
    setShow2FADialog(false);
    setTwoFactorCode("");
    setTwoFactorError("");
    setPendingLogin(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #DCE6B5 100%)',
      }}
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(220, 230, 181, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(220, 230, 181, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Login Card */}
      <div 
        className="relative w-full max-w-md"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          border: '1px solid #e1dfdd',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 120, 212, 0.05)',
          overflow: 'hidden'
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="mb-1" style={{ fontSize: '37px' }}>
              <span style={{ color: '#000000', fontWeight: 'bold' }}>zuraio</span>
              <span style={{ color: '#A3BB66' }}> | </span>
              <span style={{ color: '#A3BB66' }}>own your data</span>
            </h1>
            
            {/* Logo - Dynamically shows logo based on selected tenant */}
            <div className="h-16 w-auto flex items-center justify-center mt-4">
              <ImageWithFallback 
                src={getCurrentLogo().src}
                alt={getCurrentLogo().alt}
                className="w-auto object-contain"
                style={{ 
                  height: getCurrentLogo().height,
                  filter: 'drop-shadow(0 2px 8px rgba(0, 120, 212, 0.1))'
                }}
              />
            </div>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div 
              className="mb-4 p-3 rounded-lg border"
              style={{
                background: 'rgba(209, 52, 56, 0.05)',
                borderColor: 'rgba(209, 52, 56, 0.2)',
                color: '#d13438'
              }}
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-3 w-3" />
                <span className="text-xs">{loginError}</span>
              </div>
            </div>
          )}
          
          {/* Form */}
          <div className="space-y-4">
            {/* Tenant Selection */}
            <div className="space-y-1.5">
              <label htmlFor="tenant" className="text-xs font-medium text-foreground">
                {t.login.selectTenantLabel}
              </label>
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger 
                  className="w-full rounded-lg text-sm"
                  style={{ 
                    borderColor: '#e1dfdd',
                    padding: '10px 12px',
                    height: 'auto',
                    minHeight: '40px'
                  }}
                >
                  <SelectValue placeholder={t.login.selectTenantPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RMB Group">{t.tenantAdmin.loginExtended.tenants.rmbGroup}</SelectItem>
                  <SelectItem value="neuco">{t.tenantAdmin.loginExtended.tenants.neuco}</SelectItem>
                  <SelectItem value="Demo-Tenant">Demo-Tenant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Password Input */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-medium text-foreground">
                {t.login.password}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.login.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  autoComplete="new-password"
                  className="w-full px-3 py-2.5 pr-10 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none transition-all duration-200"
                  style={{
                    border: '1px solid #e1dfdd',
                    backgroundColor: passwordFocused ? '#DCE6B5' : 'transparent',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Version Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground">
                {t.login.versionLabel}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {/* Desktop Button */}
                <button
                  type="button"
                  onClick={() => setLayoutType('desktop')}
                  className="p-3 rounded-lg flex flex-col items-center gap-2 text-center transition-all duration-200"
                  style={{
                    border: '1px solid #e1dfdd',
                    backgroundColor: layoutType === 'desktop' ? '#DCE6B5' : 'transparent',
                    color: layoutType === 'desktop' ? '#000000' : 'inherit',
                  }}
                >
                  <Monitor className="h-5 w-5" />
                  <span className="text-xs font-medium">{t.login.desktopLabel}</span>
                  {layoutType === 'desktop' && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#000000' }} />
                  )}
                </button>

                {/* Mobile Button */}
                <button
                  type="button"
                  onClick={() => setLayoutType('mobile')}
                  className="p-3 rounded-lg flex flex-col items-center gap-2 text-center transition-all duration-200"
                  style={{
                    border: '1px solid #e1dfdd',
                    backgroundColor: layoutType === 'mobile' ? '#DCE6B5' : 'transparent',
                    color: layoutType === 'mobile' ? '#000000' : 'inherit',
                  }}
                >
                  <Smartphone className="h-5 w-5" />
                  <span className="text-xs font-medium">{t.login.mobileLabel}</span>
                  {layoutType === 'mobile' && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#000000' }} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full py-2.5 px-4 rounded-lg font-medium text-sm text-center transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: '#DCE6B5',
                color: '#000000',
                boxShadow: '0 2px 8px rgba(220, 230, 181, 0.3)'
              }}
            >
              {t.login.loginButton}
            </button>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(225, 223, 221, 0.3)' }}>
              <div className="flex items-center">
                <ImageWithFallback 
                  src={zuraioIconLogo}
                  alt={t.tenantAdmin.loginExtended.logoAlt}
                  className="h-12 w-auto object-contain opacity-70"
                />
              </div>
              <div className="text-right space-y-0.5">
                <div className="text-xs text-muted-foreground font-medium">zuraio v2.1.0</div>
                <div className="text-xs text-muted-foreground">{t.login.copyright}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Dialog */}
      <Dialog open={show2FADialog} onOpenChange={(open) => !open && handle2FACancel()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div 
                className="h-16 w-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: '#DCE6B5'
                }}
              >
                <Shield className="h-8 w-8" style={{ color: '#000000' }} />
              </div>
            </div>
            <DialogTitle className="text-center">{t.login.twoFactorTitle}</DialogTitle>
            <DialogDescription className="text-center">
              {t.login.twoFactorAuthDescription}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => { e.preventDefault(); handle2FASubmit(); }}>
            <div className="space-y-4 py-4">
              {twoFactorError && (
                <div 
                  className="p-3 rounded-lg border"
                  style={{
                    background: 'rgba(209, 52, 56, 0.05)',
                    borderColor: 'rgba(209, 52, 56, 0.2)',
                    color: '#d13438'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-xs">{twoFactorError}</span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col items-center gap-4">
                <InputOTP
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(value) => setTwoFactorCode(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                
                <div className="text-xs text-muted-foreground text-center">
                  {t.login.demoCodeHint}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handle2FACancel}
                className="flex-1"
              >
                {t.cancel}
              </Button>
              <button
                type="submit"
                disabled={twoFactorCode.length !== 6}
                className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  backgroundColor: '#DCE6B5',
                  color: '#000000',
                  boxShadow: '0 2px 8px rgba(220, 230, 181, 0.3)'
                }}
              >
                {t.login.confirmButton}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}