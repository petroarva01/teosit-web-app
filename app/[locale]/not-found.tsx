import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

import { Header } from "@/components/site/header"
import { container, Eyebrow, TriangleIcon } from "@/components/site/section"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const popularLinks = [
  { key: "services", href: "/services" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
] as const

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound")
  return { title: t("metaTitle") }
}

/** Localized 404 for notFound() calls and unknown paths under a locale. */
export default function NotFound() {
  const t = useTranslations("NotFound")

  return (
    <>
      <Header />
      <main
        className={cn(
          container,
          "flex flex-wrap-reverse items-center gap-x-16 gap-y-10 pt-16 pb-[120px] sm:pt-24"
        )}
      >
        <div className="flex flex-[1_1_420px] flex-col items-start gap-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="max-w-[12em] text-[clamp(44px,5.4vw,72px)] leading-[1.02] font-bold tracking-[-0.035em]">
            {t("title")}
          </h1>
          <p className="max-w-[34em] text-[19px] leading-[1.55] text-muted-foreground">
            {t("lead")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              size="pill-lg"
              render={<Link href="/" />}
            >
              {t("home")}
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              size="pill-lg"
              className="border-input bg-transparent"
              render={<Link href="/contact" />}
            >
              {t("contact")}
            </Button>
          </div>
          <nav
            aria-label={t("linksTitle")}
            className="mt-6 flex flex-col gap-3"
          >
            <span className="font-mono text-xs tracking-[0.05em] text-muted-foreground uppercase">
              {t("linksTitle")}
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-semibold">
              {popularLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {t(`links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* "4△4": the logomark triangle stands in for the zero */}
        <div
          aria-hidden="true"
          className="flex flex-[1_1_320px] items-center justify-center gap-[0.08em] font-heading text-[clamp(120px,18vw,240px)] leading-none font-bold tracking-[-0.04em] text-foreground select-none"
        >
          <span>4</span>
          <TriangleIcon className="h-[0.72em] w-[0.84em] [&_path]:stroke-[1.1]" />
          <span>4</span>
        </div>
      </main>
    </>
  )
}
