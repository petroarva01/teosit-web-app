import Image from "next/image"

import type { CaseStudy } from "@/data/case-studies"
import type { Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

import { Reveal, RevealItem } from "./motion"
import { container } from "./section"

type Screen = NonNullable<CaseStudy["screens"]>[number]

/** Raw app screenshot inside a phone frame drawn in CSS. */
function PhoneScreen({ screen, locale }: { screen: Screen; locale: Locale }) {
  return (
    <RevealItem className="flex justify-center rounded-[28px] bg-accent px-[12%] pt-[14%] pb-[10%]">
      <div className="w-full overflow-hidden rounded-[clamp(18px,3vw,30px)] border-[clamp(4px,0.6vw,7px)] border-foreground bg-card shadow-[0_24px_40px_-24px_rgba(27,25,54,0.45)]">
        <Image
          src={screen.src}
          alt={screen.alt[locale]}
          placeholder="blur"
          quality={90}
          sizes="(min-width: 1240px) 220px, (min-width: 1024px) 18vw, 40vw"
          className="block h-auto w-full"
        />
      </div>
    </RevealItem>
  )
}

/** Store graphic that already includes its own device and headline. */
function PlainScreen({ screen, locale }: { screen: Screen; locale: Locale }) {
  return (
    <RevealItem className="overflow-hidden rounded-[28px] bg-accent">
      <Image
        src={screen.src}
        alt={screen.alt[locale]}
        placeholder="blur"
        quality={90}
        sizes="(min-width: 1240px) 280px, (min-width: 1024px) 22vw, 50vw"
        className="block h-auto w-full"
      />
    </RevealItem>
  )
}

/** Desktop web screenshot inside a minimal browser window. */
function BrowserScreen({
  screen,
  locale,
  wide,
}: {
  screen: Screen
  locale: Locale
  wide: boolean
}) {
  return (
    <RevealItem
      className={cn(
        "overflow-hidden rounded-[20px] border bg-card shadow-[0_24px_40px_-24px_rgba(27,25,54,0.35)]",
        wide && "md:col-span-2"
      )}
    >
      <div
        aria-hidden="true"
        className="flex gap-1.5 border-b bg-muted px-4 py-3"
      >
        <span className="size-2.5 rounded-full bg-input" />
        <span className="size-2.5 rounded-full bg-input" />
        <span className="size-2.5 rounded-full bg-input" />
      </div>
      <Image
        src={screen.src}
        alt={screen.alt[locale]}
        placeholder="blur"
        quality={90}
        sizes={
          wide
            ? "(min-width: 1240px) 1176px, 100vw"
            : "(min-width: 1240px) 580px, (min-width: 768px) 50vw, 100vw"
        }
        className="block h-auto w-full"
      />
    </RevealItem>
  )
}

/** The screenshot gallery between "What we did" and "Results". */
function CaseStudyScreens({
  study,
  locale,
  label,
}: {
  study: CaseStudy
  locale: Locale
  label: string
}) {
  const { screens, screenFrame = "phone" } = study
  if (!screens?.length) return null

  if (screenFrame === "browser") {
    return (
      <Reveal
        aria-label={label}
        className={cn(container, "grid gap-5 pt-16 pb-10 md:grid-cols-2")}
      >
        {screens.map((screen, i) => (
          // The first screenshot spans the full width, the rest sit side by side
          <BrowserScreen
            key={screen.alt.en}
            screen={screen}
            locale={locale}
            wide={i === 0}
          />
        ))}
      </Reveal>
    )
  }

  const Item = screenFrame === "phone" ? PhoneScreen : PlainScreen

  return (
    <Reveal
      aria-label={label}
      className={cn(
        container,
        "grid grid-cols-2 gap-5 pt-16 pb-10 lg:grid-cols-4"
      )}
    >
      {screens.map((screen) => (
        <Item key={screen.alt.en} screen={screen} locale={locale} />
      ))}
    </Reveal>
  )
}

export { CaseStudyScreens }
