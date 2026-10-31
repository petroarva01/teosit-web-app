import type { Metadata } from "next"
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import "../globals.css"
import { Analytics, CookieBanner } from "@/components/site/consent"
import { Footer } from "@/components/site/footer"
import { JsonLd, siteGraph } from "@/components/site/json-ld"
import { site } from "@/data/site"
import { MotionProvider } from "@/components/site/motion"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const fontSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
})

// Variable font with the optical-size axis: large headings get the tighter
// display cut automatically, like the design (without it opsz is stuck at 14)
const fontHeading = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-bricolage",
})

const fontMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    // Resolves relative URLs in metadata (Open Graph images, canonicals)
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    applicationName: "TEOS IT",
    authors: [{ name: site.founder.name, url: site.founder.linkedin }],
    formatDetection: { telephone: false, address: false, email: false },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)
  const t = await getTranslations("Metadata")

  return (
    <html
      lang={locale}
      className={cn(
        "antialiased",
        fontSans.variable,
        fontHeading.variable,
        fontMono.variable
      )}
    >
      <body className="flex min-h-screen flex-col">
        <JsonLd data={siteGraph(locale, t("description"))} />
        <NextIntlClientProvider>
          <MotionProvider>
            {children}
            <Footer />
            <CookieBanner />
          </MotionProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
