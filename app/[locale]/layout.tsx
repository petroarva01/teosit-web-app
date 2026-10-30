import type { Metadata } from "next"
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import "../globals.css"
import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { MotionProvider } from "@/components/site/motion"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const fontSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
})

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
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
    title: t("title"),
    description: t("description"),
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
        <NextIntlClientProvider>
          <MotionProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
