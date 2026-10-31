import type { Locale } from "@/i18n/routing"

type Localized<T = string> = Record<Locale, T>

export const postCategories = ["reactNative", "founders", "ai"] as const

export type PostCategory = (typeof postCategories)[number]

export type Post = {
  /** Also the folder name in content/blog, which holds en.mdx and sr.mdx */
  slug: string
  category: PostCategory
  /** ISO date, YYYY-MM-DD */
  date: string
  readingMinutes: number
  title: Localized
  excerpt: Localized
  /** Cover tint (same palette as the project cards) until posts get real images */
  cover: { bg: string; fg: string }
}

/** Newest first; the first post is featured at the top of the blog. */
export const posts: Post[] = [
  {
    slug: "react-native-or-native",
    category: "founders",
    date: "2026-10-31",
    readingMinutes: 3,
    title: {
      en: "React Native or native in 2026? What we tell our clients.",
      sr: "React Native ili native u 2026? Šta savetujemo klijentima.",
    },
    excerpt: {
      en: "For most products one React Native codebase is the faster and cheaper road to both stores. Here's how we decide — and the few cases where we'd tell you to go native.",
      sr: "Za većinu proizvoda jedan React Native kod je brži i jeftiniji put do obe prodavnice. Evo kako odlučujemo — i retki slučajevi kada bismo vam rekli da idete na native.",
    },
    cover: { bg: "#1B1936", fg: "#B9B5D3" },
  },
  {
    slug: "kellion-six-languages",
    category: "reactNative",
    date: "2026-10-31",
    readingMinutes: 5,
    title: {
      en: "Shipping one app in 6 languages: lessons from Kellion",
      sr: "Jedna aplikacija na 6 jezika: šta smo naučili na Kellionu",
    },
    excerpt: {
      en: "Translating the buttons was the easy part. Dates, two Serbian scripts, missing content and a calendar that changes with the language were not.",
      sr: "Prevod dugmića je bio lakši deo. Datumi, dva srpska pisma, sadržaj koji nedostaje i kalendar koji se menja sa jezikom — nisu.",
    },
    cover: { bg: "#F6DEDC", fg: "#6E2620" },
  },
  {
    slug: "hortium-offline-first-expo",
    category: "reactNative",
    date: "2026-10-31",
    readingMinutes: 6,
    title: {
      en: "Offline-first with Expo: how Hortium works without an account",
      sr: "Offline-first sa Expo-om: kako Hortium radi bez naloga",
    },
    excerpt: {
      en: "No sign-up, no server, no tracking — and it works in the garden with no signal. A prebuilt SQLite database, small persisted stores and a network that's optional.",
      sr: "Bez registracije, bez servera, bez praćenja — i radi u bašti bez signala. Unapred napravljena SQLite baza, mali sačuvani storeovi i mreža koja je opciona.",
    },
    cover: { bg: "#DCEFE0", fg: "#1F5A2E" },
  },
  {
    slug: "mvp-cost",
    category: "founders",
    date: "2026-10-31",
    readingMinutes: 5,
    title: {
      en: "What an MVP really costs — and where the money goes",
      sr: "Koliko zaista košta MVP — i gde odlazi novac",
    },
    excerpt: {
      en: "Not a single number, but how the price is built: the phases, the features that quietly double a budget, the costs after launch and how to get a quote you can trust.",
      sr: "Ne jedan broj, nego kako se cena gradi: faze, funkcije koje tiho udvostruče budžet, troškovi posle lansiranja i kako dobiti ponudu kojoj možete verovati.",
    },
    cover: { bg: "#EEE8FD", fg: "#4C22B8" },
  },
  {
    slug: "ai-assistant-in-existing-app",
    category: "ai",
    date: "2026-10-31",
    readingMinutes: 3,
    title: {
      en: "Adding an AI assistant to an existing app, step by step",
      sr: "AI asistent u postojećoj aplikaciji, korak po korak",
    },
    excerpt: {
      en: "You don't need to rebuild your product to add AI. Start with one narrow job, keep the model behind your own API, and measure before you expand.",
      sr: "Ne morate da pravite proizvod iz početka da biste dodali AI. Počnite od jednog uskog zadatka, držite model iza sopstvenog API-ja i merite pre nego što proširite.",
    },
    cover: { bg: "#FFE9C7", fg: "#6B4A12" },
  },
  {
    slug: "app-store-review-first-time",
    category: "founders",
    date: "2026-10-31",
    readingMinutes: 6,
    title: {
      en: "Getting through App Store review the first time",
      sr: "Kako proći App Store review iz prvog pokušaja",
    },
    excerpt: {
      en: "Most rejections come from the same short list: no demo account, privacy answers that don't match, vague permission texts, a forgotten placeholder. Here's the checklist we use.",
      sr: "Većina odbijanja dolazi sa iste kratke liste: nema demo naloga, odgovori o privatnosti se ne poklapaju, nejasni tekstovi za dozvole, zaboravljen placeholder. Evo liste koju koristimo.",
    },
    cover: { bg: "#E7E3F6", fg: "#55526E" },
  },
]

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

// Plain "sr" formats dates in Cyrillic; the site is written in Latin script
const dateLocales: Record<Locale, string> = { en: "en", sr: "sr-Latn" }

export function formatPostDate(
  post: Post,
  locale: Locale,
  style: "medium" | "long"
) {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    dateStyle: style,
  }).format(new Date(post.date))
}
