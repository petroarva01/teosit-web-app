import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import { Header } from "@/components/site/header"
import { routing } from "@/i18n/routing"

/** Pages with the standard sticky light header. */
export default async function SiteLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params
  // The root [locale] layout already 404s on unknown locales
  if (hasLocale(routing.locales, locale)) setRequestLocale(locale)

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
