"use client"

import * as React from "react"
import { MenuIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

import { LocaleSwitcher } from "./locale-switcher"
import { navItems } from "./nav-items"

function MobileNav({ className }: { className?: string }) {
  const t = useTranslations("Header")
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className={cn("size-11 rounded-full bg-transparent", className)}
          />
        }
      >
        <MenuIcon className="size-5" />
        <span className="sr-only">{t("openMenu")}</span>
      </SheetTrigger>
      <SheetContent side="right" className="gap-8 bg-background p-8 pt-16">
        <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
        <nav aria-label={t("mainNav")} className="flex flex-col gap-5">
          {navItems.map((item) => (
            <SheetClose
              key={item.key}
              nativeButton={false}
              render={<Link href={item.href} />}
              className="font-heading text-2xl font-semibold tracking-tight text-foreground hover:text-primary"
            >
              {t(item.key)}
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto flex flex-col items-start gap-6">
          <LocaleSwitcher />
          <Button
            nativeButton={false}
            size="pill"
            render={<Link href="/contact" onClick={() => setOpen(false)} />}
          >
            {t("bookCall")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNav }
