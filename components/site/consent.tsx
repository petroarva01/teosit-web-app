"use client"

import * as React from "react"
import Script from "next/script"
import { GoogleAnalytics } from "@next/third-parties/google"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Link } from "@/i18n/navigation"
import { consentStorageKey as storageKey } from "@/lib/consent-script"
import { cn } from "@/lib/utils"

type Category = "analytics" | "marketing"
type Consent = Record<Category, boolean>

const categories: Category[] = ["analytics", "marketing"]
const changeEvent = "teosit:consent-change"
const openEvent = "teosit:consent-open"
const gaId = process.env.NEXT_PUBLIC_GA_ID
const linkedInId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID

/** First-party cookies each category may leave behind. */
const cookiePrefixes: Record<Category, string[]> = {
  analytics: ["_ga"],
  marketing: ["li_", "_gcl"],
}

function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw)
    return { analytics: !!value.analytics, marketing: !!value.marketing }
  } catch {
    // Older single "granted"/"denied" values: ask again
    return null
  }
}

/** The raw stored string, so the snapshot stays referentially stable. */
function readRaw(): string | null {
  try {
    return localStorage.getItem(storageKey)
  } catch {
    // Storage can be blocked (private mode, strict settings): ask every visit
    return null
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(changeEvent, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(changeEvent, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/** "pending" on the server and before hydration, so nothing flashes. */
function useConsent(): Consent | null | "pending" {
  const raw = React.useSyncExternalStore(subscribe, readRaw, () => "pending")
  return React.useMemo(
    () => (raw === "pending" ? "pending" : parseConsent(raw)),
    [raw]
  )
}

function clearCookies(prefixes: string[]) {
  const domain = location.hostname.split(".").slice(-2).join(".")
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim()
    if (!prefixes.some((prefix) => name.startsWith(prefix))) continue
    for (const d of ["", `; domain=.${domain}`]) {
      document.cookie = `${name}=; max-age=0; path=/${d}`
    }
  }
}

function saveConsent(next: Consent, previous: Consent | null) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(next))
  } catch {}

  // Loaded tags can't be unloaded, so withdrawing consent clears their
  // cookies and reloads the page without them
  const revoked = categories.filter((c) => previous?.[c] && !next[c])
  if (revoked.length > 0) {
    clearCookies(revoked.flatMap((c) => cookiePrefixes[c]))
    location.reload()
    return
  }
  window.dispatchEvent(new Event(changeEvent))
}

/** Loads each tag only after its category is allowed. */
function Analytics() {
  const consent = useConsent()
  if (consent === "pending" || consent === null) return null

  return (
    <>
      {gaId && consent.analytics && <GoogleAnalytics gaId={gaId} />}
      {linkedInId && consent.marketing && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push("${linkedInId}");
(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");
b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b,s)})(window.lintrk);`}
        </Script>
      )}
    </>
  )
}

/** Bottom banner shown until the visitor chooses; reopened from the footer. */
function CookieBanner() {
  const t = useTranslations("Consent")
  const consent = useConsent()
  const [reopened, setReopened] = React.useState(false)
  const [customizing, setCustomizing] = React.useState(false)
  const [draft, setDraft] = React.useState<Consent>({
    analytics: false,
    marketing: false,
  })

  React.useEffect(() => {
    const open = () => {
      const saved = parseConsent(readRaw())
      if (saved) setDraft(saved)
      setReopened(true)
      setCustomizing(true)
    }
    window.addEventListener(openEvent, open)
    return () => window.removeEventListener(openEvent, open)
  }, [])

  // Rendered on the server too ("pending"), so it paints with the page;
  // the inline head script hides it for visitors who already chose
  const decided = consent !== null && consent !== "pending"
  if (decided && !reopened) return null
  const saved = decided ? consent : null

  const choose = (next: Consent) => {
    setReopened(false)
    setCustomizing(false)
    saveConsent(next, saved)
  }

  // Start the switches from the saved choice
  const openCustomize = () => {
    if (saved) setDraft(saved)
    setCustomizing(true)
  }

  return (
    <section
      aria-label={t("label")}
      data-cookie-banner={consent === "pending" ? "pending" : "open"}
      className={cn(
        "fixed inset-x-4 bottom-4 z-50 mx-auto flex max-h-[calc(100dvh-2rem)] max-w-[880px] flex-col gap-5 overflow-y-auto rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-[0_24px_60px_-20px_rgb(27_25_54/0.35)] sm:bottom-6 md:px-8",
        // Slide only, no fade: a banner that starts transparent paints late
        // and becomes the page's Largest Contentful Paint
        "animate-in duration-500 slide-in-from-bottom-4 motion-reduce:animate-none"
      )}
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em]">
          {t("title")}
        </h2>
        {/* System font: it's ready at first paint, so the text doesn't
            re-wrap when the web font arrives and shift the bottom-anchored
            banner (counted as layout shift) */}
        <p className="font-system text-[15px] leading-[1.55] text-muted-foreground">
          {t.rich("body", {
            link: (chunks) => (
              <Link
                href="/privacy"
                className="text-primary underline underline-offset-2"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>

      {customizing && (
        <ul className="flex flex-col">
          <CategoryRow
            id="necessary"
            title={t("categories.necessary.title")}
            body={t("categories.necessary.body")}
          >
            <span className="font-mono text-xs tracking-[0.04em] whitespace-nowrap text-muted-foreground uppercase">
              {t("alwaysOn")}
            </span>
          </CategoryRow>
          {categories.map((category) => (
            <CategoryRow
              key={category}
              id={category}
              title={t(`categories.${category}.title`)}
              body={t(`categories.${category}.body`)}
            >
              <Switch
                aria-labelledby={`consent-${category}`}
                checked={draft[category]}
                onCheckedChange={(checked) =>
                  setDraft((d) => ({ ...d, [category]: checked }))
                }
              />
            </CategoryRow>
          ))}
        </ul>
      )}

      {/* Equal weight for accepting and declining */}
      <div className="flex flex-wrap gap-2.5">
        <Button
          size="pill"
          onClick={() => choose({ analytics: true, marketing: true })}
        >
          {t("acceptAll")}
        </Button>
        <Button
          size="pill"
          variant="outline"
          className="border-input bg-transparent"
          onClick={() => choose({ analytics: false, marketing: false })}
        >
          {t("necessaryOnly")}
        </Button>
        {customizing ? (
          <Button
            size="pill"
            variant="outline"
            className="border-input bg-transparent"
            onClick={() => choose(draft)}
          >
            {t("save")}
          </Button>
        ) : (
          <Button
            size="pill"
            variant="ghost"
            className="text-foreground underline-offset-4 hover:bg-transparent hover:underline"
            onClick={openCustomize}
          >
            {t("customize")}
          </Button>
        )}
      </div>
    </section>
  )
}

function CategoryRow({
  id,
  title,
  body,
  children,
}: {
  id: string
  title: string
  body: string
  children: React.ReactNode
}) {
  return (
    <li className="flex items-center justify-between gap-6 border-t border-border py-3.5">
      <div className="flex flex-col gap-0.5">
        <span id={`consent-${id}`} className="font-semibold">
          {title}
        </span>
        <span className="text-sm leading-[1.5] text-muted-foreground">
          {body}
        </span>
      </div>
      {children}
    </li>
  )
}

/** Footer link that lets visitors change their earlier choice. */
function CookieSettingsButton({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      className={cn("cursor-pointer", className)}
      onClick={() => window.dispatchEvent(new Event(openEvent))}
    >
      {children}
    </button>
  )
}

export { Analytics, CookieBanner, CookieSettingsButton }
