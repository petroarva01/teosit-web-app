import Image from "next/image"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Float, Reveal, RevealItem } from "@/components/site/motion"
import {
  FloatingProjectCard,
  ProjectCard,
} from "@/components/site/project-card"
import {
  ArrowLink,
  container,
  CtaBand,
  Eyebrow,
  SectionHeading,
  TriangleIcon,
} from "@/components/site/section"
import { Button } from "@/components/ui/button"
import { featuredProjects, getProject, heroProjects } from "@/data/projects"
import { site } from "@/data/site"
import { stack } from "@/data/stack"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const serviceKeys = [
  "mobile",
  "web",
  "backend",
  "ai",
  "design",
  "outsourcing",
] as const

const stepKeys = ["discovery", "design", "build", "ship"] as const

const founderPoints = ["direct", "ownership", "weekly", "fourth"] as const

const testimonialKeys = ["amplitude", "checkSolar"] as const

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations("Home")
  const tTestimonials = await getTranslations("Testimonials")
  const [heroTop, heroLeft, heroRight] = heroProjects.map(getProject)

  return (
    <>
      {/* Hero */}
      <section
        className={cn(
          container,
          "grid items-center gap-16 overflow-x-clip pt-14 pb-24 sm:pt-[88px] lg:grid-cols-2"
        )}
      >
        <div className="flex flex-col gap-7">
          <div className="flex animate-rise items-center gap-2.5 font-mono text-[13px] tracking-[0.04em] text-muted-foreground uppercase motion-reduce:animate-none">
            <TriangleIcon className="h-3 w-3.5" />
            <span>{t("hero.eyebrow")}</span>
          </div>
          <h1 className="animate-rise text-[clamp(44px,6vw,76px)] leading-[1.02] font-bold tracking-[-0.035em] [animation-delay:80ms] motion-reduce:animate-none">
            {t("hero.title")}
          </h1>
          <p className="max-w-[34em] animate-rise text-[19px] leading-[1.55] text-muted-foreground [animation-delay:160ms] motion-reduce:animate-none">
            {t("hero.lead")}
          </p>
          <div className="flex animate-rise flex-wrap items-center gap-x-6 gap-y-3 pt-1 [animation-delay:240ms] motion-reduce:animate-none">
            <Button
              nativeButton={false}
              size="pill-lg"
              render={<Link href="/contact" />}
            >
              {t("hero.primary")}
            </Button>
            <ArrowLink href="/work">{t("hero.secondary")}</ArrowLink>
          </div>
        </div>

        <div className="relative grid w-full max-w-[560px] animate-rise grid-cols-2 gap-5 justify-self-center py-4 [animation-delay:160ms] motion-reduce:animate-none">
          {/* Spins around the triangle's centroid (not the box center) and is
              sized so the full rotation stays inside the hero section */}
          <svg
            aria-hidden="true"
            viewBox="0 0 220 191"
            className="pointer-events-none absolute top-1/2 left-[2%] z-0 -mt-[55.3%] w-[96%] origin-[50%_66.3%] animate-spin-slow text-motif motion-reduce:animate-none"
          >
            <path
              d="M110 4L216 188H4Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
          <Float
            duration={6}
            className="relative z-1 col-span-2 w-[calc(50%-8px)] justify-self-center rounded-3xl shadow-[0_30px_60px_-30px_rgba(27,25,54,0.45)]"
          >
            <FloatingProjectCard project={heroTop} locale={locale} featured />
          </Float>
          <Float
            duration={7}
            delay={-2.5}
            tilt={-2}
            className="relative z-1 rounded-3xl shadow-[0_30px_60px_-30px_rgba(27,25,54,0.3)]"
          >
            <FloatingProjectCard project={heroLeft} locale={locale} />
          </Float>
          <Float
            duration={6.5}
            delay={-4}
            tilt={2}
            className="relative z-1 rounded-3xl shadow-[0_30px_60px_-30px_rgba(27,25,54,0.3)]"
          >
            <FloatingProjectCard project={heroRight} locale={locale} />
          </Float>
        </div>
      </section>

      {/* Stack marquee */}
      <section
        aria-label={t("stack.ariaLabel")}
        className="relative z-1 border-y bg-card"
      >
        <div
          className={cn(
            container,
            "flex items-center gap-9 py-[26px] font-mono text-sm text-muted-foreground"
          )}
        >
          <span className="flex-none font-medium text-foreground">
            {t("stack.label")}
          </span>
          <div className="min-w-0 flex-auto overflow-hidden mask-[linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div
              // ~4s per item keeps the design's scroll speed as the list grows
              style={
                {
                  "--marquee-duration": `${stack.length * 4}s`,
                } as React.CSSProperties
              }
              className="flex w-max animate-marquee gap-9 pr-9 whitespace-nowrap motion-reduce:animate-none"
            >
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
              {stack.map((item) => (
                <span key={`dup-${item}`} aria-hidden="true">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 01 — Services */}
      <Reveal
        id="services"
        className={cn(container, "flex flex-col gap-12 pt-[120px] pb-10")}
      >
        <SectionHeading
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          action={<ArrowLink href="/services">{t("services.link")}</ArrowLink>}
        />
        <div className="grid gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key) => (
            <RevealItem
              key={key}
              className="flex min-h-[220px] flex-col gap-3.5 bg-card p-9"
            >
              <span className="font-mono text-[13px] text-primary">
                {t(`services.items.${key}.label`)}
              </span>
              <h3 className="text-[26px] font-semibold tracking-[-0.02em]">
                {t(`services.items.${key}.title`)}
              </h3>
              <p className="text-base leading-[1.55] text-muted-foreground">
                {t(`services.items.${key}.body`)}
              </p>
            </RevealItem>
          ))}
        </div>
      </Reveal>

      {/* 02 — Selected work */}
      <Reveal
        id="work"
        className={cn(container, "flex flex-col gap-12 pt-[100px] pb-10")}
      >
        <SectionHeading
          eyebrow={t("work.eyebrow")}
          title={t("work.title")}
          action={<ArrowLink href="/work">{t("work.link")}</ArrowLink>}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map(getProject).map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} locale={locale} />
            </RevealItem>
          ))}
        </div>
      </Reveal>

      {/* 03 — How we work */}
      <Reveal
        id="process"
        className={cn(container, "flex flex-col gap-12 pt-[100px] pb-10")}
      >
        <SectionHeading
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
        />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stepKeys.map((key, i) => {
            const last = i === stepKeys.length - 1
            return (
              <li
                key={key}
                className={cn(
                  "flex flex-col gap-3 border-t-2 pt-5",
                  last ? "border-primary" : "border-foreground"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[13px]",
                    last ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t("process.step", { number: i + 1 })}
                </span>
                <h3 className="text-2xl font-semibold">
                  {t(`process.steps.${key}.title`)}
                </h3>
                <p className="text-base leading-[1.55] text-muted-foreground">
                  {t(`process.steps.${key}.body`)}
                </p>
              </li>
            )
          })}
        </ol>
      </Reveal>

      {/* 04 — Founder */}
      <Reveal id="founder" className={cn(container, "pt-[100px] pb-10")}>
        <div className="grid items-center gap-12 rounded-[32px] border bg-card p-6 sm:p-12 lg:grid-cols-2">
          <Image
            src="/images/petro.jpg"
            alt={t("founder.photoAlt")}
            width={1200}
            height={1023}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-square w-full rounded-3xl object-cover object-[center_30%]"
          />
          <div className="flex flex-col gap-[22px]">
            <Eyebrow>{t("founder.eyebrow")}</Eyebrow>
            <h2 className="text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-bold tracking-[-0.03em]">
              {t("founder.title")}
            </h2>
            <p className="text-[17px] leading-[1.6] text-muted-foreground">
              {t("founder.body")}
            </p>
            <ul className="grid gap-x-6 gap-y-3.5 text-base sm:grid-cols-2">
              {founderPoints.map((key) => (
                <li key={key} className="flex items-baseline gap-2.5">
                  <TriangleIcon filled className="h-2.5 w-3" />
                  <span>{t(`founder.points.${key}`)}</span>
                </li>
              ))}
            </ul>
            <ArrowLink href="/about" className="self-start">
              {t("founder.link")}
            </ArrowLink>
          </div>
        </div>
      </Reveal>

      {/* Testimonials */}
      <section
        aria-label={t("testimonials.ariaLabel")}
        className={cn(
          container,
          "grid gap-x-6 gap-y-14 pt-[100px] pb-10 lg:grid-cols-2"
        )}
      >
        {testimonialKeys.map((key) => (
          <figure
            key={key}
            className="flex flex-col gap-5 border-t-2 border-foreground pt-7"
          >
            <blockquote className="font-heading text-[22px] leading-[1.35] font-medium tracking-[-0.015em] sm:text-2xl">
              {tTestimonials(`${key}.quote`)}
            </blockquote>
            <figcaption className="mt-auto text-[15px] text-muted-foreground">
              {tTestimonials(`${key}.author`)}
            </figcaption>
          </figure>
        ))}
      </section>

      <CtaBand
        title={t("cta.title")}
        body={t("cta.body")}
        button={t("cta.button")}
        className="pt-[120px]"
        aside={
          <a
            href={`mailto:${site.email}`}
            className="text-base font-medium text-primary-foreground underline underline-offset-4"
          >
            {site.email}
          </a>
        }
      />
    </>
  )
}
