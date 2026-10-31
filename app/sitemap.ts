import type { MetadataRoute } from "next"

import { posts } from "@/data/blog"
import { caseStudies } from "@/data/case-studies"
import { routing } from "@/i18n/routing"
import { absoluteUrl, languageAlternates, type Href } from "@/lib/seo"

type Entry = {
  href: Href
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  lastModified?: string
}

const pages: Entry[] = [
  { href: "/", priority: 1, changeFrequency: "monthly" },
  { href: "/services", priority: 0.9, changeFrequency: "monthly" },
  { href: "/work", priority: 0.8, changeFrequency: "monthly" },
  { href: "/about", priority: 0.7, changeFrequency: "yearly" },
  { href: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { href: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { href: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { href: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ...caseStudies.map(({ slug }): Entry => ({
    href: { pathname: "/work/[slug]", params: { slug } },
    priority: 0.7,
    changeFrequency: "yearly",
  })),
  ...posts.map(({ slug, date }): Entry => ({
    href: { pathname: "/blog/[slug]", params: { slug } },
    priority: 0.6,
    changeFrequency: "yearly",
    lastModified: date,
  })),
]

/** Every page in every language, each listing its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ href, priority, changeFrequency, lastModified }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(href) },
    }))
  )
}
