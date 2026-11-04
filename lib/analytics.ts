import { sendGAEvent } from "@next/third-parties/google"

import { site } from "@/data/site"

/**
 * Events sent to GA4. Mark `generate_lead` and `book_call_click` as key
 * events in GA4 (Admin → Data display → Events) and import `generate_lead`
 * into Google Ads as the conversion.
 */
type EventMap = {
  /** Contact form sent successfully. */
  generate_lead: { form: "contact"; services: string; budget: string }
  /** Contact form could not be sent (validation or delivery). */
  contact_form_error: { reason: "invalid" | "error"; fields?: string }
  /** Click on the Calendly intro-call link. */
  book_call_click: { cta_location: string }
  /** Click on the office email address. */
  email_click: { cta_location: string }
  /** Click on any link that leads to the contact page. */
  contact_cta_click: { cta_location: string }
  /** Click on a LinkedIn profile link. */
  social_click: { network: "linkedin"; cta_location: string }
}

declare global {
  interface Window {
    lintrk?: (action: "track", data: { conversion_id: number }) => void
  }
}

const linkedInLeadConversion = Number(
  process.env.NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID
)

/**
 * Sends an event to GA4. A no-op until the visitor allows analytics cookies,
 * since GA and its dataLayer only load after consent.
 */
export function track<E extends keyof EventMap>(event: E, params: EventMap[E]) {
  if (typeof window === "undefined") return

  if (window.dataLayer) sendGAEvent("event", event, params)

  // LinkedIn conversion for leads, loaded only after marketing consent
  if (event === "generate_lead" && linkedInLeadConversion && window.lintrk) {
    window.lintrk("track", { conversion_id: linkedInLeadConversion })
  }
}

/** Where on the page a link sits: an explicit `data-cta`, else its region. */
function locationOf(link: HTMLAnchorElement): string {
  const tagged = link.closest<HTMLElement>("[data-cta]")
  if (tagged?.dataset.cta) return tagged.dataset.cta
  if (link.closest("[role=dialog]")) return "mobile_nav"
  if (link.closest("header")) return "header"
  if (link.closest("footer")) return "footer"
  return "page"
}

/**
 * Tracks clicks on the links that matter (booking, email, LinkedIn, contact
 * page) from one document listener, so server components need no handlers.
 */
export function trackLinkClick(event: MouseEvent) {
  const target = event.target as Element | null
  const link = target?.closest?.("a[href]") as HTMLAnchorElement | null
  if (!link) return

  const href = link.getAttribute("href") ?? ""
  const cta_location = locationOf(link)

  if (href.startsWith("mailto:")) {
    track("email_click", { cta_location })
  } else if (
    href.startsWith(site.bookingUrl) ||
    href.includes("calendly.com")
  ) {
    track("book_call_click", { cta_location })
  } else if (link.hostname.endsWith("linkedin.com")) {
    track("social_click", { network: "linkedin", cta_location })
  } else if (
    link.origin === location.origin &&
    /\/contact\/?$/.test(link.pathname) &&
    !/\/contact\/?$/.test(location.pathname)
  ) {
    track("contact_cta_click", { cta_location })
  }
}
