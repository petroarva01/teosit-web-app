import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "sr"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/services": { en: "/services", sr: "/usluge" },
    "/work": { en: "/work", sr: "/projekti" },
    "/work/[slug]": { en: "/work/[slug]", sr: "/projekti/[slug]" },
    "/about": { en: "/about", sr: "/o-nama" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/contact": { en: "/contact", sr: "/kontakt" },
    "/privacy": { en: "/privacy", sr: "/privatnost" },
    "/terms": { en: "/terms", sr: "/uslovi" },
  },
})

export type Locale = (typeof routing.locales)[number]
