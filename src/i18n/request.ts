import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const locales = ["de", "en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const locale =
    localeCookie && locales.includes(localeCookie as Locale)
      ? (localeCookie as Locale)
      : "de";

  const common = (await import(`../../locales/${locale}/common.json`)).default;
  const messages = {
    common,
    app: common.app,
    auth: common.auth,
    nav: common.nav,
    actions: common.actions,
    contacts: (await import(`../../locales/${locale}/contacts.json`)).default,
    orders: (await import(`../../locales/${locale}/orders.json`)).default,
    billing: (await import(`../../locales/${locale}/billing.json`)).default,
    products: (await import(`../../locales/${locale}/products.json`)).default,
    errors: (await import(`../../locales/${locale}/errors.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
