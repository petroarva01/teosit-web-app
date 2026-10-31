import { site } from "@/data/site"
import type { Locale } from "@/i18n/routing"
import { absoluteUrl, type Href } from "@/lib/seo"

type Thing = Record<string, unknown>

/** Structured data for search engines; "<" is escaped so text can't close the tag. */
function JsonLd({ data }: { data: Thing | Thing[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export const organizationId = `${site.url}/#organization`
const websiteId = `${site.url}/#website`
export const founderId = `${site.url}/#founder`

/** The studio as a local business, the site and its founder: on every page. */
function siteGraph(locale: Locale, description: string): Thing {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": organizationId,
        name: "TEOS IT",
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/email/logo.png`,
        image: `${site.url}/email/logo.png`,
        description,
        email: site.email,
        taxID: site.pib,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Novi Sad",
          addressRegion: "Vojvodina",
          addressCountry: "RS",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 45.2671,
          longitude: 19.8335,
        },
        areaServed: [
          { "@type": "Country", name: "Serbia" },
          { "@type": "Place", name: "Europe" },
        ],
        knowsLanguage: ["en", "sr"],
        knowsAbout: [
          "Software development",
          "Mobile app development",
          "React Native",
          "Expo",
          "iOS app development",
          "Android app development",
          "Web development",
          "Next.js",
          "Backend development",
          "AI development",
          "UI/UX design",
          "IT outsourcing",
        ],
        founder: { "@id": founderId },
        sameAs: [site.linkedin],
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: site.founder.name,
        jobTitle: "Founder & Software Engineer",
        worksFor: { "@id": organizationId },
        sameAs: [site.founder.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: "TEOS IT",
        inLanguage: locale,
        publisher: { "@id": organizationId },
      },
    ],
  }
}

/** Home → … → current page, shown by Google instead of the raw URL. */
function breadcrumbs(
  locale: Locale,
  items: { name: string; href: Href }[]
): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.href),
    })),
  }
}

export { breadcrumbs, JsonLd, siteGraph }
