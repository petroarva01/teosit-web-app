import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"

import { routing } from "@/i18n/routing"

// Without this the tab keeps the layout's title after hydration
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[...rest]">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: "NotFound" })
  return { title: t("metaTitle") }
}

// Unknown paths under a locale render the localized not-found page
export default function CatchAllPage() {
  notFound()
}
