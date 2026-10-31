import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { CaseStudyScreens } from "@/components/site/case-study-screens"
import { Header } from "@/components/site/header"
import { breadcrumbs, JsonLd } from "@/components/site/json-ld"
import { projectColors, projectHref } from "@/components/site/project-card"
import { container } from "@/components/site/section"
import { Badge } from "@/components/ui/badge"
import { caseStudies, getCaseStudy } from "@/data/case-studies"
import { getProject, projects } from "@/data/projects"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { ogImage, pageMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

const factKeys = ["client", "domain", "platform", "role", "timeline"] as const

// Only slugs with a written case study exist; everything else 404s
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params
  const study = getCaseStudy(slug)
  if (!hasLocale(routing.locales, locale) || !study) return {}
  const t = await getTranslations({ locale, namespace: "CaseStudy" })
  return pageMetadata({
    locale,
    href: { pathname: "/work/[slug]", params: { slug: study.slug } },
    title: t("metaTitle", { name: getProject(study.slug).name }),
    description: study.lead[locale],
    image: ogImage.caseStudy(locale, study.slug),
  })
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params
  const study = getCaseStudy(slug)
  if (!hasLocale(routing.locales, locale) || !study) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations("CaseStudy")
  const tTestimonials = await getTranslations("Testimonials")

  // Next project that has its own case study, wrapping around the list
  const withStudies = projects.filter((p) => p.hasCaseStudy)
  const index = withStudies.findIndex((p) => p.slug === study.slug)
  const next = withStudies[(index + 1) % withStudies.length]

  const tMeta = await getTranslations("Metadata")
  const tHeader = await getTranslations("Header")
  const project = getProject(study.slug)

  return (
    <>
      <JsonLd
        data={breadcrumbs(locale, [
          { name: tMeta("home"), href: "/" },
          { name: tHeader("work"), href: "/work" },
          {
            name: project.name,
            href: { pathname: "/work/[slug]", params: { slug: study.slug } },
          },
        ])}
      />
      <div className="bg-foreground text-on-dark">
        <Header tone="dark" />
        <section className={cn(container, "flex flex-col gap-7 pt-[72px]")}>
          <Link
            href="/work"
            className="self-start text-[15px] text-on-dark-subtle transition-colors hover:text-on-dark"
          >
            <span aria-hidden="true">←</span> {t("allCaseStudies")}
          </Link>
          <span className="font-mono text-[13px] tracking-[0.04em] text-on-dark-accent uppercase">
            {study.eyebrow[locale]}
          </span>
          <h1 className="max-w-[12em] text-[clamp(44px,6vw,84px)] leading-none font-bold tracking-[-0.035em]">
            {study.title[locale]}
          </h1>
          <p className="max-w-[40em] text-[19px] leading-[1.55] text-on-dark-muted">
            {study.lead[locale]}
          </p>
          <div
            className={cn(
              "relative mt-8 h-[clamp(280px,40vw,560px)] overflow-hidden rounded-t-[28px] bg-dark-raised",
              // A finished composition is shown whole from tablet up, cropped only on phones
              study.hero.fit === "whole" &&
                "md:aspect-(--hero-ratio) md:h-auto",
              study.hero.fit === "always-whole" &&
                "aspect-(--hero-ratio) h-auto"
            )}
            style={
              {
                "--hero-ratio": `${study.hero.src.width} / ${study.hero.src.height}`,
              } as React.CSSProperties
            }
          >
            <Image
              src={study.hero.src}
              alt={study.hero.alt[locale]}
              fill
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1240px) 1176px, 100vw"
              className="object-cover"
              style={{ objectPosition: study.hero.position ?? "50% 0%" }}
            />
          </div>
        </section>
      </div>

      <main>
        {/* Project facts */}
        <section
          aria-label={t("factsLabel")}
          className={cn(
            container,
            "grid gap-8 border-b py-14 sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {factKeys.map((key) => {
            const value = study.facts[key]
            if (!value) return null
            return (
              <div key={key} className="flex flex-col gap-1.5">
                <span className="font-mono text-xs tracking-[0.05em] text-muted-foreground uppercase">
                  {t(`facts.${key}`)}
                </span>
                <span className="text-lg font-semibold">{value[locale]}</span>
              </div>
            )
          })}
        </section>

        {/* The challenge */}
        <section
          className={cn(
            container,
            "grid gap-x-16 gap-y-6 pt-24 pb-10 lg:grid-cols-2"
          )}
        >
          <h2 className="text-[40px] leading-[1.05] font-bold tracking-[-0.03em]">
            {t("challenge")}
          </h2>
          <div className="flex flex-col gap-[18px] text-lg leading-[1.65] text-foreground-soft">
            {study.challenge[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* What we did */}
        <section
          className={cn(
            container,
            "grid gap-x-16 gap-y-6 pt-16 pb-10 lg:grid-cols-2"
          )}
        >
          <h2 className="text-[40px] leading-[1.05] font-bold tracking-[-0.03em]">
            {t("whatWeDid")}
          </h2>
          <ol>
            {study.steps.map((step, i) => (
              <li
                key={step.title.en}
                className="grid grid-cols-[48px_1fr] gap-3 border-t border-input py-5 last:border-b"
              >
                <span className="pt-1 font-mono text-[13px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[21px] font-semibold">
                    {step.title[locale]}
                  </h3>
                  <p className="text-base leading-[1.55] text-muted-foreground">
                    {step.body[locale]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <CaseStudyScreens
          study={study}
          locale={locale}
          label={t("screensLabel")}
        />

        {/* Results */}
        <section className={cn(container, "pt-16 pb-10")}>
          <div className="flex flex-col gap-8 rounded-[32px] border bg-card p-[clamp(32px,5vw,64px)]">
            <h2 className="text-[40px] leading-[1.05] font-bold tracking-[-0.03em]">
              {t("results")}
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {study.results.map((result) => (
                <div key={result.label.en} className="flex flex-col gap-2">
                  <span className="font-heading text-[56px] leading-none font-bold tracking-[-0.03em] text-primary">
                    {result.value[locale]}
                  </span>
                  <span className="text-base text-muted-foreground">
                    {result.label[locale]}
                  </span>
                </div>
              ))}
            </div>
            {study.testimonial && (
              <figure className="flex flex-col gap-3.5 border-t pt-7">
                <blockquote className="font-heading text-xl leading-[1.35] font-medium sm:text-2xl">
                  {tTestimonials(`${study.testimonial}.quote`)}
                </blockquote>
                <figcaption className="text-[15px] text-muted-foreground">
                  {tTestimonials(`${study.testimonial}.author`)}
                </figcaption>
              </figure>
            )}
            <div className="flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <Badge key={item} variant="tag">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Next case study */}
        <section className={cn(container, "pt-16 pb-[120px]")}>
          <Link
            href={projectHref(next)}
            style={projectColors(next)}
            className="group flex flex-wrap items-center justify-between gap-6 rounded-[32px] bg-(--project-bg) p-[clamp(32px,5vw,56px)] text-(--project-text) transition-[translate,box-shadow] duration-350 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgba(27,25,54,0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[13px] text-(--project-label)">
                {t("next")}
              </span>
              <span className="font-heading text-[clamp(32px,4vw,52px)] leading-none font-bold tracking-[-0.03em]">
                {next.name}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="text-[40px] transition-transform group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </section>
      </main>
    </>
  )
}
