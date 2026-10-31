import type { StaticImageData } from "next/image"

import amplitudeImage from "@/assets/projects/amplitude.png"
import bukirajImage from "@/assets/projects/bukiraj.png"
import checkSolarImage from "@/assets/projects/checksolar.png"
import hortiumImage from "@/assets/projects/hortium.png"
import kellionImage from "@/assets/projects/kellion.png"
import type { Locale } from "@/i18n/routing"

type Localized<T = string> = Record<Locale, T>

export type ProjectSlug =
  "amplitude" | "check-solar" | "bukiraj" | "kellion" | "hortium"

export type Project = {
  slug: ProjectSlug
  name: string
  /** Heading on the Work page */
  title: Localized
  /** Work page label, e.g. "Client · Germany · iOS" */
  meta: Localized
  /** Work page description */
  body: Localized
  tags: Localized<string[]>
  categories: ("mobile" | "web")[]
  /** Store / website links shown on the Work page, in display order */
  links: { label: string; url: Localized }[]
  hasCaseStudy: boolean
  /** 1600×1000 composite, already on the project's tint color */
  image: {
    src: StaticImageData
    alt: Localized
    /** Phone screenshots are anchored to the top when cropped */
    position: "top" | "center"
  }
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
    title: {
      en: "Amplitude — Finance & Lifestyle",
      sr: "Amplitude — Finance & Lifestyle",
    },
    meta: {
      en: "Client · Germany · iOS & Android",
      sr: "Klijent · Nemačka · iOS i Android",
    },
    body: {
      en: "A personal finance and lifestyle app for the German market. We lead the React Native team: architecture, onboarding, code review and store releases.",
      sr: "Aplikacija za lične finansije i lifestyle za nemačko tržište. Vodimo React Native tim: arhitektura, onboarding, code review i objave na prodavnicama.",
    },
    tags: {
      en: ["React Native", "iOS", "Android", "Fintech", "Team lead"],
      sr: ["React Native", "iOS", "Android", "Fintech", "Vođenje tima"],
    },
    categories: ["mobile"],
    links: [
      {
        label: "App Store",
        url: {
          en: "https://apps.apple.com/de/app/amplitude-finance-lifestyle/id6762627478",
          sr: "https://apps.apple.com/de/app/amplitude-finance-lifestyle/id6762627478",
        },
      },
      {
        label: "Google Play",
        url: {
          en: "https://play.google.com/store/apps/details?id=com.amplitude.app.mobile",
          sr: "https://play.google.com/store/apps/details?id=com.amplitude.app.mobile",
        },
      },
    ],
    hasCaseStudy: true,
    image: {
      src: amplitudeImage,
      alt: { en: "Amplitude app dashboard", sr: "Amplitude aplikacija" },
      position: "top",
    },
    heroMeta: {
      en: "Mobile · Fintech · Germany",
      sr: "Mobile · Fintech · Nemačka",
    },
    home: {
      label: {
        en: "React Native · iOS & Android · Fintech",
        sr: "React Native · iOS i Android · Fintech",
      },
      title: {
        en: "Amplitude — finance & lifestyle app for Germany",
        sr: "Amplitude — aplikacija za finansije za nemačko tržište",
      },
      body: {
        en: "We lead the mobile team behind a personal finance app live on the App Store and Google Play — from onboarding to release.",
        sr: "Vodimo mobilni tim aplikacije za lične finansije koja je živa na App Store-u i Google Play-u — od onboardinga do objave.",
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
    title: { en: "Check Solar", sr: "Check Solar" },
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
    links: [
      {
        label: "check-solar.com",
        url: {
          en: "https://check-solar.com/en",
          sr: "https://check-solar.com/en",
        },
      },
    ],
    hasCaseStudy: false,
    image: {
      src: checkSolarImage,
      alt: { en: "Check Solar website", sr: "Check Solar sajt" },
      position: "center",
    },
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
    title: { en: "Bukiraj", sr: "Bukiraj" },
    meta: {
      en: "Beauty & wellness · SaaS · Serbia",
      sr: "Lepota i wellness · SaaS · Srbija",
    },
    body: {
      en: "Online booking for hair, beauty and wellness salons. Clients book 24/7 through a link or QR code; owners manage the calendar, team, services, gallery and automatic email reminders. Live, with Basic, Pro and Business plans.",
      sr: "Online zakazivanje za frizerske, kozmetičke i wellness salone. Klijenti zakazuju 24/7 preko linka ili QR koda, a vlasnici vode kalendar, tim, usluge, galeriju i automatske email podsetnike. Živo, sa Basic, Pro i Business paketima.",
    },
    tags: {
      en: ["Supabase", "SaaS", "Subscriptions", "SR · EN"],
      sr: ["Supabase", "SaaS", "Pretplate", "SR · EN"],
    },
    categories: ["web"],
    links: [
      {
        label: "bukiraj.app",
        url: {
          en: "https://www.bukiraj.app/en",
          sr: "https://www.bukiraj.app",
        },
      },
    ],
    hasCaseStudy: true,
    image: {
      src: bukirajImage,
      alt: { en: "Bukiraj booking calendar", sr: "Bukiraj kalendar termina" },
      position: "center",
    },
    heroMeta: {
      en: "Web SaaS · Beauty & wellness",
      sr: "Web SaaS · Lepota i wellness",
    },
    home: {
      label: {
        en: "Web · SaaS · Beauty & wellness",
        sr: "Web · SaaS · Lepota i wellness",
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
    title: {
      en: "Kellion: Orthodox Calendar",
      sr: "Kellion: pravoslavni kalendar",
    },
    meta: {
      en: "Faith & spirituality · Android",
      sr: "Vera i duhovnost · Android",
    },
    body: {
      en: "A free, ad-free Orthodox calendar and prayer book. Old and new calendar, offline prayers, fasting rules, a map of nearby churches, reminders and home-screen widgets — in 6 languages.",
      sr: "Besplatan pravoslavni kalendar i molitvenik bez reklama. Stari i novi kalendar, molitve bez interneta, pravila posta, mapa obližnjih crkava, podsetnici i widget-i — na 6 jezika.",
    },
    tags: {
      en: ["React Native", "Expo", "Offline-first", "6 languages"],
      sr: ["React Native", "Expo", "Offline-first", "6 jezika"],
    },
    categories: ["mobile"],
    links: [
      {
        label: "Google Play",
        url: {
          en: "https://play.google.com/store/apps/details?id=com.teosit.agiorit",
          sr: "https://play.google.com/store/apps/details?id=com.teosit.agiorit",
        },
      },
    ],
    hasCaseStudy: true,
    image: {
      src: kellionImage,
      alt: {
        en: "Kellion app screens: calendar, prayer, reminders",
        sr: "Kellion: kalendar, molitva, podsetnici",
      },
      position: "top",
    },
    home: {
      label: {
        en: "React Native · Android · Faith & spirituality",
        sr: "React Native · Android · Vera i duhovnost",
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
    title: { en: "Hortium: Garden Planner", sr: "Hortium: planer bašte" },
    meta: {
      en: "Gardening · Android",
      sr: "Baštovanstvo · Android",
    },
    body: {
      en: "A garden companion for beds and balcony pots. Monthly sowing calendar tuned to local frost dates, a square-by-square bed planner and watering reminders that skip rainy days. No account, works offline.",
      sr: "Pomoćnik za leje i saksije. Mesečni kalendar setve prilagođen lokalnim mrazevima, planer leja kvadrat po kvadrat i podsetnici za zalivanje koji preskaču kišne dane. Bez naloga, radi bez interneta.",
    },
    tags: {
      en: ["React Native", "Expo", "Weather API", "7 languages"],
      sr: ["React Native", "Expo", "Vremenska prognoza", "7 jezika"],
    },
    categories: ["mobile"],
    links: [
      {
        label: "Google Play",
        url: {
          en: "https://play.google.com/store/apps/details?id=com.teosit.hortium",
          sr: "https://play.google.com/store/apps/details?id=com.teosit.hortium",
        },
      },
    ],
    hasCaseStudy: true,
    image: {
      src: hortiumImage,
      alt: {
        en: "Hortium app screens: today, my garden, planner",
        sr: "Hortium: danas, moja bašta, planer",
      },
      position: "top",
    },
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
