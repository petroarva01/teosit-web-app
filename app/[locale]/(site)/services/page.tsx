import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Reveal, RevealItem } from "@/components/site/motion"
import {
  container,
  CtaBand,
  PageIntro,
  SectionHeading,
  SectionTitle,
} from "@/components/site/section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

// Keys double as the #anchors the footer links to
const serviceKeys = [
  "mobile",
  "web",
  "backend",
  "ai",
  "design",
  "outsourcing",
] as const

const modelKeys = ["fixed", "team", "consulting"] as const

const faqKeys = ["reactNative", "mvp", "ownership", "takeover"] as const

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: "Services" })
  return { title: t("metaTitle") }
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations("Services")

  return (
    <>
      <PageIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        titleClassName="max-w-[14em]"
      >
        <nav
          aria-label={t("jumpLabel")}
          className="flex flex-wrap gap-2.5 pt-3"
        >
          {serviceKeys.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="inline-flex min-h-11 items-center rounded-full border border-input px-4 text-[15px] font-medium transition-colors hover:border-foreground"
            >
              {t(`items.${key}.nav`)}
            </a>
          ))}
        </nav>
      </PageIntro>

      {/* Service rows */}
      <section className={cn(container, "pt-6 pb-10")}>
        {serviceKeys.map((key) => (
          <article
            key={key}
            id={key}
            className="grid scroll-mt-24 gap-x-16 gap-y-6 border-t border-input py-12 last:border-b lg:grid-cols-2"
          >
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[13px] text-primary">
                {t(`items.${key}.label`)}
              </span>
              <h2 className="text-[40px] leading-[1.05] font-bold tracking-[-0.03em]">
                {t(`items.${key}.title`)}
              </h2>
            </div>
            <div className="flex flex-col gap-[18px]">
              <p className="text-lg leading-[1.6] text-muted-foreground">
                {t(`items.${key}.body`)}
              </p>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-normal">
                {(t.raw(`items.${key}.points`) as string[]).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <span className="font-mono text-[13px] text-muted-foreground">
                {t(`items.${key}.stack`)}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Ways to work together */}
      <Reveal
        className={cn(container, "flex flex-col gap-10 pt-[100px] pb-10")}
      >
        <SectionHeading
          eyebrow={t("models.eyebrow")}
          title={t("models.title")}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {modelKeys.map((key) => {
            const featured = key === "team"
            return (
              <RevealItem key={key}>
                <Card
                  className={cn(
                    "h-full gap-3.5 rounded-3xl p-8 ring-0",
                    featured
                      ? "bg-foreground text-on-dark"
                      : "border bg-card text-foreground"
                  )}
                >
                  <h3 className="text-[26px] font-semibold">
                    {t(`models.items.${key}.title`)}
                  </h3>
                  <p
                    className={cn(
                      "text-base leading-[1.55]",
                      featured ? "text-on-dark-muted" : "text-muted-foreground"
                    )}
                  >
                    {t(`models.items.${key}.body`)}
                  </p>
                  <span className="mt-auto font-mono text-sm">
                    {t(`models.items.${key}.price`)}
                  </span>
                </Card>
              </RevealItem>
            )
          })}
        </div>
      </Reveal>

      {/* FAQ */}
      <section
        className={cn(
          container,
          "grid gap-x-16 gap-y-8 pt-[100px] pb-10 lg:grid-cols-2"
        )}
      >
        <SectionTitle>{t("faq.title")}</SectionTitle>
        <Accordion>
          {faqKeys.map((key) => (
            <AccordionItem
              key={key}
              value={key}
              className="border-t border-input last:border-b"
            >
              <AccordionTrigger className="rounded-none py-[22px] text-[19px] font-semibold hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-foreground">
                {t(`faq.items.${key}.q`)}
              </AccordionTrigger>
              <AccordionContent className="pb-[22px] text-base leading-[1.6] text-muted-foreground">
                {t(`faq.items.${key}.a`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <CtaBand title={t("cta.title")} button={t("cta.button")} />
    </>
  )
}
