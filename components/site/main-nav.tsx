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

import { navItems } from "./nav-items"

function MainNav({ className }: { className?: string }) {
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
              active={
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              }
              render={<Link href={item.href} />}
              className="rounded-none p-0 text-[15px] font-medium text-foreground hover:bg-transparent hover:text-primary focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent"
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
