import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import petroPhoto from "@/assets/petro.jpg"
import { Reveal, RevealItem } from "@/components/site/motion"
import {
  container,
  CtaBand,
  PageIntro,
  SectionTitle,
  TriangleIcon,
} from "@/components/site/section"
import { Card } from "@/components/ui/card"
import { site } from "@/data/site"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const valueKeys = ["access", "lockIn", "weekly", "estimates"] as const

const factKeys = ["location", "timeZone", "clients", "languages"] as const

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: "About" })
  return { title: t("metaTitle") }
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations("About")

  return (
    <>
      <PageIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        titleClassName="max-w-[13em]"
        className="pb-16"
      />

      {/* Founder */}
      <section
        className={cn(
          container,
          "grid items-start gap-14 pb-10 lg:grid-cols-2"
        )}
      >
        <figure className="flex flex-col gap-3.5">
          <Image
            src={petroPhoto}
            alt={t("founder.photoAlt")}
            sizes="(min-width: 1024px) 560px, 100vw"
            placeholder="blur"
            preload
            className="aspect-4/5 w-full rounded-[28px] object-cover object-[center_25%]"
          />
          <figcaption className="flex justify-between gap-3 text-[15px]">
            <span className="font-semibold">{site.founder.name}</span>
            <span className="text-muted-foreground">{t("founder.role")}</span>
          </figcaption>
        </figure>
        <div className="flex flex-col gap-[22px] pt-2">
          <h2 className="text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-bold tracking-[-0.03em]">
            {t("founder.title")}
          </h2>
          <div className="flex flex-col gap-4 text-lg leading-[1.65] text-foreground-soft">
            {(t.raw("founder.bio") as string[]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-base font-semibold">
            <a
              href={site.founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-accent-foreground"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-primary transition-colors hover:text-accent-foreground"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>

      {/* What you can count on */}
      <Reveal
        className={cn(container, "flex flex-col gap-10 pt-[100px] pb-10")}
      >
        <SectionTitle>{t("values.title")}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueKeys.map((key) => (
            <RevealItem key={key}>
              <Card className="h-full gap-3 rounded-3xl border bg-card p-7 ring-0">
                <TriangleIcon className="h-6 w-7 [&_path]:stroke-[1.2]" />
                <h3 className="text-[22px] font-semibold">
                  {t(`values.items.${key}.title`)}
                </h3>
                <p className="text-base leading-[1.55] text-muted-foreground">
                  {t(`values.items.${key}.body`)}
                </p>
              </Card>
            </RevealItem>
          ))}
        </div>
      </Reveal>

      {/* Based in Serbia */}
      <section
        className={cn(
          container,
          "grid gap-x-16 gap-y-8 pt-[100px] pb-10 lg:grid-cols-2"
        )}
      >
        <div className="flex flex-col gap-4">
          <SectionTitle>{t("location.title")}</SectionTitle>
          <p className="text-lg leading-[1.6] text-muted-foreground">
            {t("location.body")}
          </p>
        </div>
        <dl className="grid gap-7 sm:grid-cols-2">
          {factKeys.map((key) => (
            <div
              key={key}
              className="flex flex-col gap-1.5 border-t-2 border-foreground pt-4"
            >
              <dt className="font-mono text-xs tracking-[0.05em] text-muted-foreground uppercase">
                {t(`location.facts.${key}.label`)}
              </dt>
              <dd className="text-lg font-semibold">
                {t(`location.facts.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <CtaBand title={t("cta.title")} button={t("cta.button")} />
    </>
  )
}
