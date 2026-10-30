import type { StaticImageData } from "next/image"

import amplitudeHero from "@/assets/projects/amplitude-hero.png"
import amplitudeExpense from "@/assets/projects/amplitude-screen-expense.jpg"
import amplitudeIncome from "@/assets/projects/amplitude-screen-income.jpg"
import amplitudeLifestyle from "@/assets/projects/amplitude-screen-lifestyle.jpg"
import amplitudeSpending from "@/assets/projects/amplitude-screen-spending.jpg"
import type { Locale } from "@/i18n/routing"
import type messages from "@/messages/en.json"

import type { ProjectSlug } from "./projects"

type Localized<T = string> = Record<Locale, T>

type LocalizedImage = { src: StaticImageData; alt: Localized }

export type CaseStudy = {
  slug: ProjectSlug
  eyebrow: Localized
  title: Localized
  lead: Localized
  /** 2400×1140, cropped from the top under the intro */
  hero: LocalizedImage
  facts: {
    client: Localized
    platform: Localized
    role: Localized
    timeline: Localized
  }
  /** One string per paragraph */
  challenge: Localized<string[]>
  steps: { title: Localized; body: Localized }[]
  /** Raw full-resolution app screenshots; the page draws the phone frame */
  screens: LocalizedImage[]
  results: { value: Localized; label: Localized }[]
  /** Key in the shared `Testimonials` messages */
  testimonial?: keyof typeof messages.Testimonials
  stack: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "amplitude",
    eyebrow: {
      en: "Case study · Fintech · Germany",
      sr: "Studija slučaja · Fintech · Nemačka",
    },
    title: {
      en: "Amplitude: a finance app that feels like a lifestyle app.",
      sr: "Amplitude: finansijska aplikacija koja izgleda kao lifestyle aplikacija.",
    },
    lead: {
      en: "How we built and lead the React Native team behind a personal finance app for the German market — live on the App Store and Google Play.",
      sr: "Kako smo napravili i vodimo React Native tim iza aplikacije za lične finansije za nemačko tržište — žive na App Store-u i Google Play-u.",
    },
    hero: {
      src: amplitudeHero,
      alt: {
        en: "Amplitude app: income, dashboard and expense screens",
        sr: "Amplitude: ekrani prihoda, pregleda stanja i troškova",
      },
    },
    facts: {
      client: { en: "Amplitude Holding GmbH", sr: "Amplitude Holding GmbH" },
      platform: {
        en: "iOS & Android · React Native",
        sr: "iOS i Android · React Native",
      },
      role: {
        en: "Mobile team lead, development",
        sr: "Vođenje mobilnog tima, razvoj",
      },
      timeline: { en: "2025 — ongoing", sr: "2025 — u toku" },
    },
    challenge: {
      en: [
        "Amplitude wanted a personal finance app for the German market that people actually enjoy opening: one that connects to their bank accounts, sorts every transaction on its own and turns the numbers into a monthly lifestyle budget.",
        "TEOS IT came in to build the mobile app from a rough concept and lead the mobile team — iOS and Android from one codebase, German and English, light and dark mode, and the security a finance app needs.",
      ],
      sr: [
        "Amplitude je želeo aplikaciju za lične finansije za nemačko tržište koju ljudi rado otvaraju: koja se povezuje sa bankovnim računima, sama razvrstava svaku transakciju i pretvara brojeve u mesečni lifestyle budžet.",
        "TEOS IT je došao da od grube ideje napravi mobilnu aplikaciju i vodi mobilni tim — iOS i Android iz jednog koda, nemački i engleski, svetla i tamna tema i bezbednost koju finansijska aplikacija zahteva.",
      ],
    },
    steps: [
      {
        title: { en: "Led the mobile team", sr: "Vodili mobilni tim" },
        body: {
          en: "Set up architecture and coding standards, reviewed every pull request, mentored developers.",
          sr: "Postavili arhitekturu i standarde koda, pregledali svaki pull request, mentorisali programere.",
        },
      },
      {
        title: {
          en: "Built a bold, smooth onboarding",
          sr: "Napravili upečatljiv, gladak onboarding",
        },
        body: {
          en: "A branded welcome screen, email sign-in with a two-factor SMS code, Face ID or fingerprint unlock, connecting the first bank account and starting the trial — a few guided steps.",
          sr: "Uvodni ekran u stilu brenda, prijava emailom uz SMS kod, otključavanje Face ID-jem ili otiskom prsta, povezivanje prvog bankovnog računa i početak probnog perioda — u nekoliko vođenih koraka.",
        },
      },
      {
        title: {
          en: "Bank sync and automatic categories",
          sr: "Sinhronizacija sa bankom i automatske kategorije",
        },
        body: {
          en: "Every transaction is sorted into income, fixed, variable and financial costs, then feeds a cash forecast and a lifestyle budget compared with the last three months.",
          sr: "Svaka transakcija se razvrstava na prihode, fiksne, varijabilne i finansijske troškove, pa puni prognozu stanja i lifestyle budžet poređen sa poslednja tri meseca.",
        },
      },
      {
        title: {
          en: "Shipped to the App Store and Google Play",
          sr: "Objavili na App Store-u i Google Play-u",
        },
        body: {
          en: "Weekly test builds for the client, then the store launch — both App Store and Google Play review passed on the first submission. Regular updates ever since.",
          sr: "Nedeljne test verzije za klijenta, pa objava — review na App Store-u i Google Play-u prošli smo iz prvog pokušaja. Od tada redovna ažuriranja.",
        },
      },
    ],
    screens: [
      {
        src: amplitudeLifestyle,
        alt: {
          en: "Amplitude lifestyle budget: monthly overview and transactions",
          sr: "Amplitude: lifestyle budžet, mesečni pregled i transakcije",
        },
      },
      {
        src: amplitudeIncome,
        alt: {
          en: "Amplitude income overview",
          sr: "Amplitude: pregled prihoda",
        },
      },
      {
        src: amplitudeExpense,
        alt: {
          en: "Amplitude expense categories",
          sr: "Amplitude: kategorije troškova",
        },
      },
      {
        src: amplitudeSpending,
        alt: {
          en: "Amplitude spending average",
          sr: "Amplitude: prosečna potrošnja",
        },
      },
    ],
    results: [
      {
        value: { en: "1st", sr: "1." },
        label: {
          en: "submission approved on both App Store and Google Play",
          sr: "pokušaj — odobreno i na App Store-u i na Google Play-u",
        },
      },
      {
        value: { en: "200+", sr: "200+" },
        label: {
          en: "pull requests reviewed and merged",
          sr: "pregledanih i spojenih pull requestova",
        },
      },
      {
        value: { en: "10+", sr: "10+" },
        label: {
          en: "releases shipped to the stores",
          sr: "verzija objavljenih na prodavnicama",
        },
      },
    ],
    testimonial: "amplitude",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Zustand",
      "AWS Amplify",
      "Reanimated",
      "Sentry",
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
