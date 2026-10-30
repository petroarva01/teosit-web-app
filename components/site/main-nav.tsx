"use client"

import { useTranslations } from "next-intl"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

import { isActive, navItems, type HeaderTone } from "./nav-items"

function MainNav({
  tone = "light",
  className,
}: {
  tone?: HeaderTone
  className?: string
}) {
  const t = useTranslations("Header")
  const pathname = usePathname()

  return (
    <NavigationMenu
      aria-label={t("mainNav")}
      className={cn("flex-none", className)}
    >
      <NavigationMenuList className="gap-7">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.key}>
            <NavigationMenuLink
              active={isActive(pathname, item.href)}
              render={<Link href={item.href} />}
              className={cn(
                "rounded-none p-0 text-[15px] font-medium hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent",
                tone === "dark"
                  ? "text-on-dark hover:text-on-dark-accent data-active:text-on-dark-accent"
                  : "text-foreground hover:text-primary data-active:text-primary"
              )}
            >
              {t(item.key)}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { MainNav }
