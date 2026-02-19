import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

// #region agent log
const _log = (msg: string, data: Record<string, unknown>) => {
  const payload = { sessionId: "faa0f8", location: "middleware.ts", message: msg, data, timestamp: Date.now(), hypothesisId: "D2" };
  console.log("[DEBUG][faa0f8]", JSON.stringify(payload));
  fetch("http://127.0.0.1:7618/ingest/a69c7205-1643-4ebf-93f3-fc833731c99f", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "faa0f8" },
    body: JSON.stringify(payload),
  }).catch(() => {});
};
// #endregion

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const r = req as NextRequest;
      const c1 = r.cookies.get("next-auth.session-token");
      const c2 = r.cookies.get("__Secure-next-auth.session-token");
      _log("middleware: authorized", {
        hasToken: !!token,
        path: r.nextUrl.pathname,
        cookiePresent: !!(c1?.value || c2?.value),
      });
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/((?!login|api/auth|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
