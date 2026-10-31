import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { WorkProjectCard } from "@/components/site/project-card"
import { CtaBand, PageIntro } from "@/components/site/section"
import { WorkFilter } from "@/components/site/work-filter"
import { projects } from "@/data/projects"
import { routing } from "@/i18n/routing"
import { ogImage, pageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: "Work" })
  return pageMetadata({
    locale,
    href: "/work",
    title: t("metaTitle"),
    description: t("metaDescription"),
    image: ogImage.page(locale, "work"),
  })
}

export default async function WorkPage({
  params,
}: PageProps<"/[locale]/work">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations("Work")

  return (
    <>
      <PageIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        titleClassName="max-w-[13em]"
        className="pb-0"
      />
      <WorkFilter
        label={t("filterLabel")}
        labels={{
          all: t("filters.all"),
          mobile: t("filters.mobile"),
          web: t("filters.web"),
        }}
        items={projects.map((project) => ({
          key: project.slug,
          categories: project.categories,
          card: (
            <WorkProjectCard
              project={project}
              locale={locale}
              readCaseStudy={t("readCaseStudy")}
            />
          ),
        }))}
      />
      <CtaBand
        title={t("cta.title")}
        button={t("cta.button")}
        className="pt-20"
      />
    </>
  )
}
