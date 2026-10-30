"use client"

import type * as React from "react"
import { useParams } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

import type { HeaderTone } from "./nav-items"

type Href = React.ComponentProps<typeof Link>["href"]

/** EN / SR pill switch that keeps the visitor on the same page. */
function LocaleSwitcher({
  tone = "light",
  className,
}: {
  tone?: HeaderTone
  className?: string
}) {
  const t = useTranslations("Header")
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()

  return (
    <ToggleGroup
      value={[locale]}
      spacing={0.5}
      aria-label={t("language")}
      className={cn(
        "rounded-full border p-[3px] font-mono text-xs",
        tone === "dark" ? "border-dark-input" : "border-input",
        className
      )}
    >
      {routing.locales.map((l) => (
        <ToggleGroupItem
          key={l}
          value={l}
          nativeButton={false}
          render={
            <Link
              href={{ pathname, params } as Href}
              locale={l}
              lang={l}
              aria-current={l === locale ? "true" : undefined}
            />
          }
          className={cn(
            "h-auto min-w-0 rounded-full px-2.5 py-1.5 text-xs font-medium uppercase hover:bg-transparent",
            tone === "dark"
              ? "text-on-dark-subtle hover:text-on-dark aria-pressed:bg-on-dark aria-pressed:text-foreground data-pressed:bg-on-dark data-pressed:text-foreground"
              : "text-muted-foreground hover:text-foreground aria-pressed:bg-foreground aria-pressed:text-on-dark data-pressed:bg-foreground data-pressed:text-on-dark"
          )}
        >
          {l}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export { LocaleSwitcher }
