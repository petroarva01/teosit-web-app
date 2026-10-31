import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { ContactForm } from "@/components/site/contact-form"
import { container, Eyebrow } from "@/components/site/section"
import { site } from "@/data/site"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const linkClass =
  "text-primary underline underline-offset-4 transition-colors hover:text-primary-hover"

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: "Contact" })
  return { title: t("metaTitle"), description: t("metaDescription") }
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations("Contact")

  const facts = [
    {
      key: "email",
      value: (
        <a href={`mailto:${site.email}`} className={linkClass}>
          {site.email}
        </a>
      ),
    },
    { key: "responseTime", value: t("facts.responseTimeValue") },
    {
      key: "linkedin",
      value: (
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          TEOS IT ↗
        </a>
      ),
    },
  ] as const

  return (
    <div
      className={cn(
        container,
        "flex flex-wrap gap-14 pt-16 pb-[120px] sm:pt-[88px]"
      )}
    >
      <div className="flex flex-[1_1_360px] flex-col gap-7">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="text-[clamp(44px,5.4vw,72px)] leading-[1.02] font-bold tracking-[-0.035em]">
          {t("title")}
        </h1>
        <p className="text-[19px] leading-[1.55] text-muted-foreground">
          {t("lead")}
        </p>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-2.5 rounded-3xl bg-secondary p-7 text-on-dark transition-transform hover:-translate-y-0.5"
        >
          <span className="font-mono text-[13px] text-on-dark-accent">
            {t("call.label")}
          </span>
          <span className="font-heading text-[26px] leading-[1.15] font-semibold tracking-[-0.02em]">
            {t("call.title")}{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </span>
          <span className="text-[15px] text-on-dark-muted">
            {t("call.body")}
          </span>
        </a>
        <dl className="flex flex-col gap-5">
          {facts.map((fact) => (
            <div key={fact.key} className="flex flex-col gap-1">
              <dt className="font-mono text-xs tracking-[0.05em] text-muted-foreground uppercase">
                {t(`facts.${fact.key}`)}
              </dt>
              <dd className="text-lg font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="min-w-0 flex-[999_1_520px]">
        <ContactForm />
      </div>
    </div>
  )
}
