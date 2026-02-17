"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("auth");
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  // Dev-Vorausfüllung – wird bei Production-Build entfernt (NODE_ENV=production)
  const [email, setEmail] = useState(
    process.env.NODE_ENV === "development" ? "admin@zuraio.local" : ""
  );
  const [password, setPassword] = useState(
    process.env.NODE_ENV === "development" ? "Admin123!@#" : ""
  );
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t("loginError"));
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #DCE6B5 100%)",
      }}
    >
      {/* Radiale Overlays */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(220, 230, 181, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(220, 230, 181, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Login-Karte */}
      <div
        className="relative w-full max-w-md rounded-xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid #e1dfdd",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="p-8">
          {/* Header: zuraio | own your data */}
          <div className="text-center mb-4">
            <h1 className="mb-4" style={{ fontSize: "37px" }}>
              <span className="font-bold text-black">zuraio</span>
              <span className="text-zuraio-loginAccent"> | </span>
              <span className="text-zuraio-loginAccent">own your data</span>
            </h1>
            <div className="h-16 flex items-center justify-center">
              <Image
                src="/assets/2602029_Zuraio_Logo.svg"
                alt="Zuraio ERP"
                width={80}
                height={64}
                className="object-contain"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zuraio-text mb-1.5"
              >
                {t("email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder={t("email")}
                required
                className="w-full px-4 py-2.5 rounded-lg text-zuraio-text placeholder:text-zuraio-textMuted focus:outline-none transition-colors"
                style={{
                  border: "1px solid #e1dfdd",
                  backgroundColor: emailFocused ? "#DCE6B5" : "transparent",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zuraio-text mb-1.5"
              >
                {t("password")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder={t("password")}
                  required
                  className="w-full px-4 py-2.5 pr-12 rounded-lg text-zuraio-text placeholder:text-zuraio-textMuted focus:outline-none transition-colors"
                  style={{
                    border: "1px solid #e1dfdd",
                    backgroundColor: passwordFocused ? "#DCE6B5" : "transparent",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zuraio-textMuted hover:text-zuraio-text"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="p-3 rounded-lg border flex items-center gap-2"
                style={{
                  background: "rgba(209, 52, 56, 0.05)",
                  borderColor: "rgba(209, 52, 56, 0.2)",
                  color: "#d13438",
                }}
              >
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 font-semibold rounded-lg text-black hover:opacity-90 disabled:opacity-50 transition-opacity"
              style={{
                backgroundColor: "#DCE6B5",
                boxShadow: "0 2px 8px rgba(220, 230, 181, 0.3)",
              }}
            >
              {loading ? t("loggingIn") : t("login")}
            </button>
          </form>

          {/* Footer: Zuraio-Logo links, Version/Copyright rechts */}
          <div
            className="mt-8 pt-6 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(225, 223, 221, 0.3)" }}
          >
            <Image
              src="/assets/2602029_Zuraio_Logo.svg"
              alt="Zuraio"
              width={48}
              height={48}
              className="object-contain opacity-70"
            />
            <div className="text-xs text-zuraio-textMuted text-right">
              <p>zuraio v2.1.0</p>
              <p>© 2025. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #DCE6B5 100%)" }}
        >
          Laden...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
