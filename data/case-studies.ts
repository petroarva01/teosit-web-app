import type { StaticImageData } from "next/image"

import amplitudeHero from "@/assets/projects/amplitude-hero.png"
import amplitudeExpense from "@/assets/projects/amplitude-screen-expense.jpg"
import amplitudeIncome from "@/assets/projects/amplitude-screen-income.jpg"
import amplitudeLifestyle from "@/assets/projects/amplitude-screen-lifestyle.jpg"
import amplitudeSpending from "@/assets/projects/amplitude-screen-spending.jpg"
import bukirajBookingFlow from "@/assets/projects/bukiraj-booking-flow.png"
import hortiumFeature from "@/assets/projects/hortium-feature.png"
import bukirajService from "@/assets/projects/bukiraj-screen-service.png"
import bukirajTeam from "@/assets/projects/bukiraj-screen-team.png"
import bukirajTime from "@/assets/projects/bukiraj-screen-time.png"
import hortiumCalendar from "@/assets/projects/hortium-screen-calendar.png"
import hortiumGarden from "@/assets/projects/hortium-screen-garden.png"
import hortiumPlanner from "@/assets/projects/hortium-screen-planner.png"
import hortiumToday from "@/assets/projects/hortium-screen-today.png"
import kellionHeader from "@/assets/projects/kellion-header.png"
import kellionCalendar from "@/assets/projects/kellion-screen-calendar.png"
import kellionMap from "@/assets/projects/kellion-screen-map.png"
import kellionPrayer from "@/assets/projects/kellion-screen-prayer.png"
import kellionToday from "@/assets/projects/kellion-screen-today.png"
import type { Locale } from "@/i18n/routing"
import type messages from "@/messages/en.json"

import type { ProjectSlug } from "./projects"

type Localized<T = string> = Record<Locale, T>

type LocalizedImage = { src: StaticImageData; alt: Localized }

type HeroImage = LocalizedImage & {
  /** CSS object-position for the crop; defaults to the top edge */
  position?: string
  /**
   * "whole": finished composition, shown uncropped from tablet up
   * "always-whole": also uncropped on phones (when no clean crop exists)
   */
  fit?: "cover" | "whole" | "always-whole"
}

export type CaseStudy = {
  slug: ProjectSlug
  eyebrow: Localized
  title: Localized
  lead: Localized
  /** Wide image under the intro, cropped to fit */
  hero: HeroImage
  /** Client work shows the client, own products show the domain instead */
  facts: {
    client?: Localized
    domain?: Localized
    platform: Localized
    role: Localized
    timeline: Localized
  }
  /** One string per paragraph */
  challenge: Localized<string[]>
  steps: { title: Localized; body: Localized }[]
  screens?: LocalizedImage[]
  /**
   * phone: raw app screenshots, the page draws the phone frame (default)
   * none: store graphics that already include a device and headline
   * browser: desktop web screenshots, first one shown full width
   */
  screenFrame?: "phone" | "none" | "browser"
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
  {
    slug: "bukiraj",
    eyebrow: {
      en: "Case study · Beauty & wellness · Serbia",
      sr: "Studija slučaja · Lepota i wellness · Srbija",
    },
    title: {
      en: "Bukiraj: 24/7 online booking for salons, without the phone calls.",
      sr: "Bukiraj: online zakazivanje 24/7 za salone, bez telefonskih poziva.",
    },
    lead: {
      en: "How we designed and built a booking SaaS for hair, beauty and wellness salons in Serbia — live, with paid plans.",
      sr: "Kako smo dizajnirali i napravili SaaS za zakazivanje za frizerske, kozmetičke i wellness salone u Srbiji — živ, sa plaćenim paketima.",
    },
    hero: {
      src: bukirajBookingFlow,
      alt: {
        en: "Bukiraj booking flow: choose a service, a team member and a time",
        sr: "Bukiraj zakazivanje: izbor usluge, člana tima i termina",
      },
    },
    facts: {
      domain: { en: "Beauty & wellness", sr: "Lepota i wellness" },
      platform: { en: "Web · Next.js", sr: "Web · Next.js" },
      role: {
        en: "Product, design, development",
        sr: "Proizvod, dizajn, razvoj",
      },
      timeline: { en: "2026 — ongoing", sr: "2026 — u toku" },
    },
    challenge: {
      en: [
        "Most salons in Serbia still take bookings over the phone, Instagram messages and Viber. Owners lose hours answering, and empty slots and no-shows cost them money.",
        "The goal was a booking system simple enough for a one-person studio and strong enough for a team of fifteen — in Serbian and English, set up together in a single onboarding call.",
      ],
      sr: [
        "Većina salona u Srbiji i dalje zakazuje telefonom, preko Instagram poruka i Vibera. Vlasnici gube sate na odgovaranje, a prazni termini i nedolasci koštaju.",
        "Cilj je bio sistem za zakazivanje dovoljno jednostavan za studio sa jednom osobom i dovoljno jak za tim od petnaest ljudi — na srpskom i engleskom, podešen zajedno na jednom pozivu.",
      ],
    },
    steps: [
      {
        title: {
          en: "A booking page for every salon",
          sr: "Stranica za zakazivanje za svaki salon",
        },
        body: {
          en: "Each salon gets its own page at bukiraj.app/salon-name with its logo, colours, team, gallery and location — plus a QR code for the front desk.",
          sr: "Svaki salon dobija svoju stranicu na bukiraj.app/ime-salona sa logom, bojama, timom, galerijom i lokacijom — plus QR kod za recepciju.",
        },
      },
      {
        title: {
          en: "Three-step booking, confirmed by email",
          sr: "Zakazivanje u tri koraka, uz potvrdu emailom",
        },
        body: {
          en: "Clients pick a service, a team member and a free slot. A one-time code sent by email confirms the booking, so fake reservations never reach the calendar.",
          sr: "Klijent bira uslugu, člana tima i slobodan termin. Jednokratni kod poslat na email potvrđuje rezervaciju, pa lažne rezervacije ne stižu u kalendar.",
        },
      },
      {
        title: {
          en: "Reminders, cancellations and campaigns",
          sr: "Podsetnici, otkazivanja i kampanje",
        },
        body: {
          en: "Automatic email confirmations and reminders cut no-shows; a client cancels with one link and the slot frees up. Pro and Business add a newsletter and email campaigns.",
          sr: "Automatske potvrde i podsetnici emailom smanjuju nedolaske; klijent otkazuje jednim linkom i termin se oslobađa. Pro i Business paketi dodaju newsletter i email kampanje.",
        },
      },
      {
        title: { en: "Built to be found", sr: "Napravljeno da se pronađe" },
        body: {
          en: "Dedicated pages for hair salons, barbershops, beauty, nails, massage and spa, and a social preview image for every salon page.",
          sr: "Posebne stranice za frizerske salone, berbernice, kozmetičke salone, nokte, masažu i spa, i slika za deljenje na mrežama za svaku stranicu salona.",
        },
      },
    ],
    screens: [
      {
        src: bukirajService,
        alt: {
          en: "Bukiraj booking, step 1: pick a service",
          sr: "Bukiraj zakazivanje, korak 1: izbor usluge",
        },
      },
      {
        src: bukirajTeam,
        alt: {
          en: "Bukiraj booking, step 2: pick a team member",
          sr: "Bukiraj zakazivanje, korak 2: izbor člana tima",
        },
      },
      {
        src: bukirajTime,
        alt: {
          en: "Bukiraj booking, step 3: pick a date and time",
          sr: "Bukiraj zakazivanje, korak 3: izbor datuma i vremena",
        },
      },
    ],
    screenFrame: "browser",
    results: [
      {
        value: { en: "3", sr: "3" },
        label: {
          en: "paid plans — Basic, Pro and Business",
          sr: "plaćena paketa — Basic, Pro i Business",
        },
      },
      {
        value: { en: "6", sr: "6" },
        label: {
          en: "industry pages built for search",
          sr: "stranica po industrijama, za pretragu",
        },
      },
      {
        value: { en: "24/7", sr: "24/7" },
        label: {
          en: "online booking, no phone calls",
          sr: "online zakazivanje, bez poziva",
        },
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "shadcn/ui",
      "next-intl",
      "Sentry",
      "Vercel",
    ],
  },
  {
    slug: "kellion",
    eyebrow: {
      en: "Case study · Faith & spirituality · Android",
      sr: "Studija slučaja · Vera i duhovnost · Android",
    },
    title: {
      en: "Kellion: the Orthodox calendar, prayer book and church map in one app.",
      sr: "Kellion: pravoslavni kalendar, molitvenik i mapa crkava u jednoj aplikaciji.",
    },
    lead: {
      en: "How we built a free, ad-free Orthodox app in six languages that works without an internet connection.",
      sr: "Kako smo napravili besplatnu pravoslavnu aplikaciju bez reklama, na šest jezika, koja radi bez interneta.",
    },
    hero: {
      src: kellionHeader,
      alt: {
        en: "Kellion: Orthodox calendar, prayers and churches — calendar, today and prayer screens",
        sr: "Kellion: pravoslavni kalendar, molitve i crkve — ekrani kalendara, današnjeg dana i molitve",
      },
      // Phones sit on the right; keep them in view when narrow screens crop the sides
      position: "80% 0%",
      fit: "whole",
    },
    facts: {
      domain: { en: "Faith & spirituality", sr: "Vera i duhovnost" },
      platform: { en: "Android · React Native", sr: "Android · React Native" },
      role: {
        en: "Product, design, development",
        sr: "Proizvod, dizajn, razvoj",
      },
      timeline: { en: "2026 — ongoing", sr: "2026 — u toku" },
    },
    challenge: {
      en: [
        "Orthodox Christians use several apps and printed calendars to follow feasts, fasts and daily prayers — often full of ads, or available in one language only.",
        "Kellion brings the church calendar, prayer book, slava and reminders into one calm app: free, without ads, working offline and in the languages of the Orthodox world.",
      ],
      sr: [
        "Pravoslavni vernici koriste više aplikacija i štampanih kalendara da prate praznike, postove i molitve — često pune reklama ili samo na jednom jeziku.",
        "Kellion spaja crkveni kalendar, molitvenik, slavu i podsetnike u jednu mirnu aplikaciju: besplatnu, bez reklama, koja radi bez interneta, na jezicima pravoslavnog sveta.",
      ],
    },
    steps: [
      {
        title: {
          en: "Calendar, saints and fasts — offline",
          sr: "Kalendar, sveci i postovi — bez interneta",
        },
        body: {
          en: "630 saints, daily readings and fasting rules ship in a local database. Pascha and the fasts are calculated on the phone, for both the old and the new calendar.",
          sr: "630 svetaca, dnevna čitanja i pravila posta nalaze se u lokalnoj bazi. Vaskrs i postovi se računaju na samom telefonu, po starom i po novom kalendaru.",
        },
      },
      {
        title: {
          en: "Prayer book, slava and pomjanik",
          sr: "Molitvenik, slava i pomjanik",
        },
        body: {
          en: "50 prayers in six languages, a personal slava and pomjanik lists, with reminders for prayers, fasts and the slava.",
          sr: "50 molitvi na šest jezika, lična slava i pomjanik, uz podsetnike za molitve, postove i slavu.",
        },
      },
      {
        title: {
          en: "A map of churches and monasteries",
          sr: "Mapa crkava i manastira",
        },
        body: {
          en: "Over 26,000 churches and monasteries across 13 countries, grouped on a map, with directions. Each country downloads once and stays on the phone.",
          sr: "Više od 26.000 crkava i manastira u 13 zemalja, grupisanih na mapi, sa putanjom do njih. Podaci za svaku zemlju se preuzmu jednom i ostaju na telefonu.",
        },
      },
      {
        title: {
          en: "Widgets and Serbian in both scripts",
          sr: "Widgeti i srpski na oba pisma",
        },
        body: {
          en: "Home-screen widgets show today's saint and fast at a glance. Serbian Cyrillic is generated from the Latin text, so both scripts always match.",
          sr: "Widgeti na početnom ekranu pokazuju današnjeg sveca i post. Srpska ćirilica se generiše iz latinice, pa su oba pisma uvek usklađena.",
        },
      },
    ],
    screens: [
      {
        src: kellionToday,
        alt: {
          en: "Kellion today screen: saint of the day and fast",
          sr: "Kellion: današnji svetac i post",
        },
      },
      {
        src: kellionCalendar,
        alt: {
          en: "Kellion church calendar",
          sr: "Kellion: crkveni kalendar",
        },
      },
      {
        src: kellionPrayer,
        alt: {
          en: "Kellion prayer book",
          sr: "Kellion: molitvenik",
        },
      },
      {
        src: kellionMap,
        alt: {
          en: "Kellion map of churches and monasteries",
          sr: "Kellion: mapa crkava i manastira",
        },
      },
    ],
    screenFrame: "none",
    results: [
      {
        value: { en: "630", sr: "630" },
        label: {
          en: "saints in the offline calendar",
          sr: "svetaca u kalendaru bez interneta",
        },
      },
      {
        value: { en: "26,000+", sr: "26.000+" },
        label: {
          en: "churches and monasteries in 13 countries",
          sr: "crkava i manastira u 13 zemalja",
        },
      },
      {
        value: { en: "6", sr: "6" },
        label: {
          en: "languages, plus Serbian Cyrillic",
          sr: "jezika, plus srpska ćirilica",
        },
      },
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "SQLite",
      "Drizzle ORM",
      "Zustand",
      "MapLibre",
      "RevenueCat",
    ],
  },
  {
    slug: "hortium",
    eyebrow: {
      en: "Case study · Gardening · Android",
      sr: "Studija slučaja · Baštovanstvo · Android",
    },
    title: {
      en: "Hortium: a garden planner that knows your frost dates.",
      sr: "Hortium: planer bašte koji zna kada kod vas pada mraz.",
    },
    lead: {
      en: "How we built an offline garden companion in seven languages — sowing calendar, bed planner and reminders that check the weather first.",
      sr: "Kako smo napravili pomoćnika za baštu na sedam jezika koji radi bez interneta — kalendar setve, planer leja i podsetnici koji prvo provere vremensku prognozu.",
    },
    hero: {
      src: hortiumFeature,
      alt: {
        en: "Hortium: garden calendar, planner and reminders for your plot",
        sr: "Hortium: kalendar bašte, planer i podsetnici za vašu baštu",
      },
      fit: "always-whole",
    },
    facts: {
      domain: { en: "Gardening", sr: "Baštovanstvo" },
      platform: { en: "Android · React Native", sr: "Android · React Native" },
      role: {
        en: "Product, design, development",
        sr: "Proizvod, dizajn, razvoj",
      },
      timeline: { en: "2026 — ongoing", sr: "2026 — u toku" },
    },
    challenge: {
      en: [
        "Sowing calendars on seed packets are written for an average climate. Whether tomatoes can go in the ground in April depends on where your garden is — and most garden apps ask for an account before they tell you anything.",
        "Hortium had to give advice tuned to the user's own location and frost dates, work offline out in the garden, and keep everything on the phone: no account, no tracking.",
      ],
      sr: [
        "Kalendari setve na kesicama semena pisani su za prosečnu klimu. Da li paradajz može u zemlju u aprilu zavisi od toga gde vam je bašta — a većina aplikacija za baštu traži nalog pre nego što vam išta kaže.",
        "Hortium je trebalo da daje savete prilagođene lokaciji i datumima mraza, da radi bez interneta napolju u bašti i da sve čuva na telefonu: bez naloga i bez praćenja.",
      ],
    },
    steps: [
      {
        title: {
          en: "Sowing windows for your location",
          sr: "Rokovi setve prema vašoj lokaciji",
        },
        body: {
          en: "Pick your town from about 70,000 places, searched offline, and every sowing and harvest window shifts to your local frost dates.",
          sr: "Izaberete mesto od oko 70.000 ponuđenih, uz pretragu bez interneta, i svi rokovi setve i berbe se pomeraju prema lokalnim datumima mraza.",
        },
      },
      {
        title: { en: "Today: tasks and weather", sr: "Danas: zadaci i vreme" },
        body: {
          en: "A daily list of what to sow, water, feed and harvest. Watering is skipped when rain is expected, and frost and heat alerts arrive as notifications.",
          sr: "Dnevna lista šta treba posejati, zaliti, prihraniti i obrati. Zalivanje se preskače kada se očekuje kiša, a upozorenja na mraz i vrućinu stižu kao notifikacije.",
        },
      },
      {
        title: {
          en: "Bed planner with companion plants",
          sr: "Planer leja sa dobrim komšijama",
        },
        body: {
          en: "Plan beds square by square from 150 plants. 948 plant pairings show what grows well together and what is better kept apart.",
          sr: "Planirate leje kvadrat po kvadrat od 150 biljaka. 948 parova biljaka pokazuje šta dobro raste zajedno, a šta je bolje razdvojiti.",
        },
      },
      {
        title: {
          en: "Widgets and tested flows",
          sr: "Widgeti i testirani tokovi",
        },
        body: {
          en: "Three home-screen widgets: today, harvest and the month. Nine end-to-end test flows run through every main screen before a release.",
          sr: "Tri widgeta za početni ekran: danas, berba i mesec. Devet end-to-end testova prolazi kroz svaki glavni ekran pre objave.",
        },
      },
    ],
    screens: [
      {
        src: hortiumToday,
        alt: {
          en: "Hortium today screen: weather and garden tasks",
          sr: "Hortium: vreme i zadaci za danas",
        },
      },
      {
        src: hortiumCalendar,
        alt: {
          en: "Hortium sowing and harvest calendar",
          sr: "Hortium: kalendar setve i berbe",
        },
      },
      {
        src: hortiumGarden,
        alt: {
          en: "Hortium my garden: beds and plantings",
          sr: "Hortium: moja bašta, leje i zasadi",
        },
      },
      {
        src: hortiumPlanner,
        alt: {
          en: "Hortium bed planner",
          sr: "Hortium: planer leja",
        },
      },
    ],
    screenFrame: "none",
    results: [
      {
        value: { en: "150", sr: "150" },
        label: {
          en: "plants with sowing and harvest windows",
          sr: "biljaka sa rokovima setve i berbe",
        },
      },
      {
        value: { en: "70k", sr: "70k" },
        label: {
          en: "places for offline location search",
          sr: "mesta za pretragu lokacije bez interneta",
        },
      },
      {
        value: { en: "7", sr: "7" },
        label: { en: "languages", sr: "jezika" },
      },
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "SQLite",
      "Drizzle ORM",
      "Zustand",
      "Open-Meteo",
      "Maestro",
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
