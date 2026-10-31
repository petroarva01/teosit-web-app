import type { Metadata } from "next"

import { site } from "@/data/site"
import { getPathname } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"

export type Href = Parameters<typeof getPathname>[0]["href"]

/** Designed share images in public/og/<locale>/, one per main page */
export type OgPage = "home" | "services" | "work" | "about" | "blog" | "contact"

/** Case studies with a designed image in public/og/<locale>/case-study-<slug>.jpg */
export const designedCaseStudies: string[] = ["amplitude"]

export const ogImage = {
  page: (locale: Locale, page: OgPage) => `/og/${locale}/${page}.jpg`,
  caseStudy: (locale: Locale, slug: string) =>
    designedCaseStudies.includes(slug)
      ? `/og/${locale}/case-study-${slug}.jpg`
      : `/og-image/${locale}/work/${slug}.png`,
  post: (locale: Locale, slug: string) =>
    `/og-image/${locale}/blog/${slug}.png`,
}

const ogLocales: Record<Locale, string> = { en: "en_US", sr: "sr_RS" }

/** Absolute URL of a page in one locale, e.g. https://teosit.com/sr/o-nama */
export function absoluteUrl(locale: Locale, href: Href) {
  return new URL(getPathname({ locale, href }), site.url).toString()
}

/** Every language version of a page, plus x-default for everyone else. */
export function languageAlternates(href: Href) {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, absoluteUrl(locale, href)])
    ),
    "x-default": absoluteUrl(routing.defaultLocale, href),
  }
}

/**
 * Title, description, canonical URL, hreflang alternates and Open Graph
 * for one page. Every page should go through this so search engines see
 * /en/about and /sr/o-nama as translations of each other.
 */
export function pageMetadata({
  locale,
  href,
  title,
  description,
  image = ogImage.page(locale, "home"),
  openGraph,
}: {
  locale: Locale
  href: Href
  title: string
  description: string
  /** Path to a 1200×630 share image; defaults to the home image */
  image?: string
  openGraph?: Metadata["openGraph"]
}): Metadata {
  const url = absoluteUrl(locale, href)
  const images = [{ url: image, width: 1200, height: 630, alt: title }]
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(href) },
    openGraph: {
      type: "website",
      siteName: "TEOS IT",
      url,
      title,
      description,
      locale: ogLocales[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      images,
      ...openGraph,
    },
    twitter: { card: "summary_large_image", title, description, images },
  }
}
