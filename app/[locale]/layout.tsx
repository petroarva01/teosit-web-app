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
import { consentScript } from "@/lib/consent-script"
import { cn } from "@/lib/utils"

// `subsets` only picks what gets preloaded; latin-ext (č, ć, š, ž, đ) is
// still served on demand through unicode-range
const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

// Variable font with the optical-size axis: large headings get the tighter
// display cut automatically, like the design (without it opsz is stuck at 14)
const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
})

// Preloaded too: the hero eyebrow is set in it, and a late swap re-wraps it
// and pushes the hero down (layout shift)
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// Only "en" and "sr" exist; anything else (e.g. /wp-login.php) is a 404
// instead of an attempt to render it as a locale
export const dynamicParams = false

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
      // The consent script below sets data-consent before React hydrates
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        fontHeading.variable,
        fontMono.variable
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: consentScript }} />
      </head>
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
