import { getTranslations } from "next-intl/server"

import { posts } from "@/data/blog"
import { caseStudies } from "@/data/case-studies"
import { getProject } from "@/data/projects"
import { site } from "@/data/site"
import { absoluteUrl } from "@/lib/seo"

export const dynamic = "force-static"

/** Plain-text site summary for AI assistants and search agents (llmstxt.org). */
export async function GET() {
  const t = await getTranslations({ locale: "en", namespace: "Metadata" })
  const page = (href: Parameters<typeof absoluteUrl>[1]) =>
    absoluteUrl("en", href)

  const text = `# TEOS IT

> ${t("description")}

TEOS IT (${site.legalName}) is a software development company in Novi Sad, Serbia, founded by ${site.founder.name}. We design, build and launch mobile apps (React Native, Expo, iOS, Android), web platforms (Next.js), backends and APIs, and AI features, and provide dedicated developers to existing teams. Clients are startups and companies across Europe, mainly Germany, Switzerland and Serbia. We work in English and Serbian.

Contact: ${site.email} · Free 30-minute intro call: ${site.bookingUrl}

## Pages

- [Services](${page("/services")}): mobile apps, web development, backend & APIs, AI development, UI/UX design, outsourcing
- [Case studies](${page("/work")}): apps we designed, built and shipped
- [About](${page("/about")}): the team and how we work
- [Contact](${page("/contact")}): contact form and booking link
- [Blog](${page("/blog")}): articles on app development, React Native, MVP costs and AI

## Case studies

${caseStudies
  .map(
    (c) =>
      `- [${getProject(c.slug).name}](${page({ pathname: "/work/[slug]", params: { slug: c.slug } })}): ${c.lead.en}`
  )
  .join("\n")}

## Blog

${posts
  .map(
    (p) =>
      `- [${p.title.en}](${page({ pathname: "/blog/[slug]", params: { slug: p.slug } })}): ${p.excerpt.en}`
  )
  .join("\n")}

## Optional

- Serbian version of the site: ${absoluteUrl("sr", "/")}
- [Privacy Policy](${page("/privacy")})
- [Terms of Use](${page("/terms")})
`

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
