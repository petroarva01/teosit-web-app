import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

import { LocaleSwitcher } from "./locale-switcher"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"

async function Header() {
  const t = await getTranslations("Header")

  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-8 px-4 py-[18px] sm:px-8">
        <Link
          href="/"
          aria-label={t("homeLabel")}
          className="flex items-center"
        >
          <Image
            src="/images/logo-light.svg"
            alt="TEOS IT"
            width={856}
            height={191}
            preload
            unoptimized
            className="h-[30px] w-auto"
          />
        </Link>
        <MainNav className="hidden lg:flex" />
        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <Button
            nativeButton={false}
            size="pill"
            render={<Link href="/contact" />}
          >
            {t("bookCall")}
          </Button>
        </div>
        <MobileNav className="lg:hidden" />
      </div>
    </header>
  )
}

export { Header }
