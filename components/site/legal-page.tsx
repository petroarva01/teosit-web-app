import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { container, Eyebrow } from "@/components/site/section"
import type { Locale } from "@/i18n/routing"
import { pageMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export type LegalDoc = "privacy" | "terms"

/** Bump when the text of a document changes. */
const updated: Record<LegalDoc, string> = {
  privacy: "2026-10-31",
  terms: "2026-10-31",
}

// Plain "sr" formats dates in Cyrillic; the site is written in Latin script
const dateLocales: Record<Locale, string> = { en: "en", sr: "sr-Latn" }

export async function legalMetadata(
  doc: LegalDoc,
  locale: Locale
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Legal" })
  return pageMetadata({
    locale,
    href: `/${doc}`,
    title: t(`${doc}.metaTitle`),
    description: t(`${doc}.lead`),
  })
}

/** Shared shell for the privacy policy and terms, written in content/legal. */
export async function LegalPage({
  doc,
  locale,
}: {
  doc: LegalDoc
  locale: Locale
}) {
  const t = await getTranslations("Legal")
  const { default: Content } = await import(
    `@/content/legal/${doc}/${locale}.mdx`
  )
  const date = new Intl.DateTimeFormat(dateLocales[locale], {
    dateStyle: "long",
  }).format(new Date(updated[doc]))

  return (
    <article className="pb-[120px]">
      <header
        className={cn(
          container,
          "flex max-w-[880px] flex-col gap-6 pt-16 pb-6 sm:pt-20"
        )}
      >
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="text-[clamp(38px,5vw,64px)] leading-[1.04] font-bold tracking-[-0.035em]">
          {t(`${doc}.title`)}
        </h1>
        <p className="text-[19px] leading-[1.55] text-muted-foreground">
          {t(`${doc}.lead`)}
        </p>
        <p className="font-mono text-[13px] text-muted-foreground">
          {t("updated")} <time dateTime={updated[doc]}>{date}</time>
        </p>
      </header>
      <div
        className={cn(
          container,
          "flex max-w-[880px] flex-col gap-5 border-t border-border pt-10 text-lg leading-[1.7]"
        )}
      >
        <Content />
      </div>
    </article>
  )
}
