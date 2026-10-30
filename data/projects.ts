import type { Locale } from "@/i18n/routing"

type Localized<T = string> = Record<Locale, T>

export type ProjectSlug =
  "amplitude" | "check-solar" | "bukiraj" | "kellion" | "hortium"

export type Project = {
  slug: ProjectSlug
  name: string
  /** Work page label, e.g. "Client · Germany · iOS" */
  meta: Localized
  /** Work page description */
  body: Localized
  tags: Localized<string[]>
  categories: ("mobile" | "web" | "own")[]
  url: Localized
  urlLabel: string
  hasCaseStudy: boolean
  /** Short label on the floating hero card */
  heroMeta?: Localized
  /** Copy for the compact card in "Selected work" on Home */
  home?: {
    label: Localized
    title: Localized
    body: Localized
  }
  colors: {
    bg: string
    inner: string
    label: string
    body: string
    text: string
  }
}

export const projects: Project[] = [
  {
    slug: "amplitude",
    name: "Amplitude",
    meta: {
      en: "Client · Germany · iOS",
      sr: "Klijent · Nemačka · iOS",
    },
    body: {
      en: "A personal finance and lifestyle app for the German market. We lead the React Native team: architecture, onboarding, code review and App Store releases.",
      sr: "Aplikacija za lične finansije i lifestyle za nemačko tržište. Vodimo React Native tim: arhitektura, onboarding, code review i objave na App Store-u.",
    },
    tags: {
      en: ["React Native", "iOS", "Fintech", "Team lead"],
      sr: ["React Native", "iOS", "Fintech", "Vođenje tima"],
    },
    categories: ["mobile"],
    url: {
      en: "https://apps.apple.com/de/app/amplitude-finance-lifestyle/id6762627478",
      sr: "https://apps.apple.com/de/app/amplitude-finance-lifestyle/id6762627478",
    },
    urlLabel: "App Store",
    hasCaseStudy: true,
    heroMeta: {
      en: "iOS · Fintech · Germany",
      sr: "iOS · Fintech · Nemačka",
    },
    home: {
      label: {
        en: "React Native · iOS · Fintech",
        sr: "React Native · iOS · Fintech",
      },
      title: {
        en: "Amplitude — finance & lifestyle app for Germany",
        sr: "Amplitude — aplikacija za finansije za nemačko tržište",
      },
      body: {
        en: "We lead the mobile team behind a personal finance app live on the App Store — from onboarding to release.",
        sr: "Vodimo mobilni tim aplikacije za lične finansije koja je živa na App Store-u — od onboardinga do objave.",
      },
    },
    colors: {
      bg: "#1B1936",
      inner: "#2A2750",
      label: "#B9B5D3",
      body: "#D9D6EC",
      text: "#FFF0FB",
    },
  },
  {
    slug: "check-solar",
    name: "Check Solar",
    meta: {
      en: "Client · Germany · Web platform",
      sr: "Klijent · Nemačka · Web platforma",
    },
    body: {
      en: "A free comparison service for German homeowners. Enter a postcode and consumption, get offers from vetted local solar installers side by side — no personal data shared up front.",
      sr: "Besplatno poređenje solarnih ponuda za vlasnike kuća u Nemačkoj. Unesete poštanski broj i potrošnju i dobijete ponude proverenih lokalnih instalatera jednu pored druge — bez deljenja ličnih podataka unapred.",
    },
    tags: {
      en: ["Next.js", "Web", "Comparison", "EN · DE"],
      sr: ["Next.js", "Web", "Poređenje", "EN · DE"],
    },
    categories: ["web"],
    url: {
      en: "https://check-solar.com/en",
      sr: "https://check-solar.com/en",
    },
    urlLabel: "check-solar.com",
    hasCaseStudy: false,
    heroMeta: {
      en: "Web · Energy · Germany",
      sr: "Web · Energetika · Nemačka",
    },
    home: {
      label: {
        en: "Next.js · Web platform · Energy",
        sr: "Next.js · Web platforma · Energetika",
      },
      title: {
        en: "Check Solar — compare solar offers in minutes",
        sr: "Check Solar — poređenje solarnih ponuda za par minuta",
      },
      body: {
        en: "A comparison platform where German homeowners get offers from vetted local installers, side by side.",
        sr: "Platforma na kojoj vlasnici kuća u Nemačkoj porede ponude proverenih lokalnih instalatera, jednu pored druge.",
      },
    },
    colors: {
      bg: "#FFE9C7",
      inner: "#FBD99F",
      label: "#6B4A12",
      body: "#4A3A1F",
      text: "#1B1936",
    },
  },
  {
    slug: "bukiraj",
    name: "Bukiraj",
    meta: {
      en: "Our product · SaaS · Serbia",
      sr: "Naš proizvod · SaaS · Srbija",
    },
    body: {
      en: "Online booking for hair, beauty and wellness salons. Clients book 24/7 through a link or QR code; owners manage the calendar, team, services, gallery and automatic email reminders. Live, with Basic, Pro and Business plans.",
      sr: "Online zakazivanje za frizerske, kozmetičke i wellness salone. Klijenti zakazuju 24/7 preko linka ili QR koda, a vlasnici vode kalendar, tim, usluge, galeriju i automatske email podsetnike. Živo, sa Basic, Pro i Business paketima.",
    },
    tags: {
      en: ["Supabase", "SaaS", "Subscriptions", "SR · EN"],
      sr: ["Supabase", "SaaS", "Pretplate", "SR · EN"],
    },
    categories: ["web", "own"],
    url: {
      en: "https://www.bukiraj.app/en",
      sr: "https://www.bukiraj.app",
    },
    urlLabel: "bukiraj.app",
    hasCaseStudy: false,
    heroMeta: {
      en: "Web SaaS · Own product",
      sr: "Web SaaS · Naš proizvod",
    },
    home: {
      label: {
        en: "Web · SaaS · Own product",
        sr: "Web · SaaS · Naš proizvod",
      },
      title: {
        en: "Bukiraj — online booking for salons",
        sr: "Bukiraj — online zakazivanje za salone",
      },
      body: {
        en: "Clients book 24/7 through a link or QR code; salons run their calendar, team and reminders in one place. Live, with paid plans.",
        sr: "Klijenti zakazuju 24/7 preko linka ili QR koda, a salon na jednom mestu vodi kalendar, tim i podsetnike. Živo, sa plaćenim paketima.",
      },
    },
    colors: {
      bg: "#DCE8FB",
      inner: "#BCD3F5",
      label: "#1E4A86",
      body: "#1C3557",
      text: "#1B1936",
    },
  },
  {
    slug: "kellion",
    name: "Kellion",
    meta: {
      en: "Our product · Android",
      sr: "Naš proizvod · Android",
    },
    body: {
      en: "A free, ad-free Orthodox calendar and prayer book. Old and new calendar, offline prayers, fasting rules, a map of nearby churches, reminders and home-screen widgets — in 6 languages.",
      sr: "Besplatan pravoslavni kalendar i molitvenik bez reklama. Stari i novi kalendar, molitve bez interneta, pravila posta, mapa obližnjih crkava, podsetnici i widget-i — na 6 jezika.",
    },
    tags: {
      en: ["React Native", "Expo", "Offline-first", "6 languages"],
      sr: ["React Native", "Expo", "Offline-first", "6 jezika"],
    },
    categories: ["mobile", "own"],
    url: {
      en: "https://play.google.com/store/apps/details?id=com.teosit.agiorit",
      sr: "https://play.google.com/store/apps/details?id=com.teosit.agiorit",
    },
    urlLabel: "Google Play",
    hasCaseStudy: false,
    home: {
      label: {
        en: "React Native · Android · Own product",
        sr: "React Native · Android · Naš proizvod",
      },
      title: {
        en: "Kellion — Orthodox calendar in 6 languages",
        sr: "Kellion — pravoslavni kalendar na 6 jezika",
      },
      body: {
        en: "Calendar, offline prayers, fasting rules and a map of nearby churches, with home-screen widgets.",
        sr: "Kalendar, molitve bez interneta, pravila posta i mapa obližnjih crkava, uz widget-e na početnom ekranu.",
      },
    },
    colors: {
      bg: "#F6DEDC",
      inner: "#EDC3BF",
      label: "#6E2620",
      body: "#4A2420",
      text: "#1B1936",
    },
  },
  {
    slug: "hortium",
    name: "Hortium",
    meta: {
      en: "Our product · Android",
      sr: "Naš proizvod · Android",
    },
    body: {
      en: "A garden companion for beds and balcony pots. Monthly sowing calendar tuned to local frost dates, a square-by-square bed planner and watering reminders that skip rainy days. No account, works offline.",
      sr: "Pomoćnik za leje i saksije. Mesečni kalendar setve prilagođen lokalnim mrazevima, planer leja kvadrat po kvadrat i podsetnici za zalivanje koji preskaču kišne dane. Bez naloga, radi bez interneta.",
    },
    tags: {
      en: ["React Native", "Expo", "Weather API", "7 languages"],
      sr: ["React Native", "Expo", "Vremenska prognoza", "7 jezika"],
    },
    categories: ["mobile", "own"],
    url: {
      en: "https://play.google.com/store/apps/details?id=com.teosit.hortium",
      sr: "https://play.google.com/store/apps/details?id=com.teosit.hortium",
    },
    urlLabel: "Google Play",
    hasCaseStudy: false,
    colors: {
      bg: "#DCEFE0",
      inner: "#BFE2C7",
      label: "#1F5A2E",
      body: "#1F3A26",
      text: "#1B1936",
    },
  },
]

export function getProject(slug: ProjectSlug) {
  const project = projects.find((p) => p.slug === slug)
  if (!project) throw new Error(`Unknown project: ${slug}`)
  return project
}

export const heroProjects: ProjectSlug[] = [
  "amplitude",
  "check-solar",
  "bukiraj",
]

export const featuredProjects: ProjectSlug[] = [
  "amplitude",
  "check-solar",
  "kellion",
  "bukiraj",
]
