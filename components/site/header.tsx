import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

import { LocaleSwitcher } from "./locale-switcher"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import type { HeaderTone } from "./nav-items"

/**
 * Light: sticky, used on most pages.
 * Dark: static, sits on top of a dark hero (case studies).
 */
async function Header({ tone = "light" }: { tone?: HeaderTone }) {
  const t = await getTranslations("Header")
  const dark = tone === "dark"

  return (
    <header
      className={cn(
        "z-10 border-b",
        dark
          ? "border-dark-border"
          : "sticky top-0 bg-background/90 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-8 px-4 py-[18px] sm:px-8">
        <Link
          href="/"
          aria-label={t("homeLabel")}
          className="flex items-center"
        >
          <Image
            src={dark ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
            alt="TEOS IT"
            width={856}
            height={191}
            preload
            unoptimized
            className="h-[30px] w-auto"
          />
        </Link>
        <MainNav tone={tone} className="hidden lg:flex" />
        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher tone={tone} />
          <Button
            nativeButton={false}
            size="pill"
            render={<Link href="/contact" />}
          >
            {t("bookCall")}
          </Button>
        </div>
        <MobileNav tone={tone} className="lg:hidden" />
      </div>
    </header>
  )
}

export { Header }
