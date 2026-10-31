import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { CookieSettingsButton } from "@/components/site/consent"
import { Button } from "@/components/ui/button"
import { site } from "@/data/site"
import { Link } from "@/i18n/navigation"

const serviceKeys = [
  "mobile",
  "web",
  "backend",
  "ai",
  "design",
  "outsourcing",
] as const

const companyLinks = [
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const

const linkClass = "text-on-dark-subtle transition-colors hover:text-on-dark"

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2.5 text-[15px]">
      <span className="font-mono text-xs tracking-[0.05em] text-on-dark-label uppercase">
        {title}
      </span>
      {children}
    </div>
  )
}

async function Footer() {
  const t = await getTranslations("Footer")

  return (
    <footer className="mt-auto bg-foreground text-on-dark">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14 px-4 pt-[72px] pb-9 sm:px-8">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="flex max-w-[340px] flex-[1_1_260px] flex-col items-start gap-5">
            <Image
              src="/images/logo-dark.svg"
              alt="TEOS IT"
              width={856}
              height={191}
              unoptimized
              className="h-[30px] w-auto"
            />
            <p className="text-[15px] leading-[1.55] text-on-dark-subtle">
              {t("tagline")}
            </p>
            <Button
              nativeButton={false}
              size="pill"
              render={<Link href="/contact" />}
            >
              {t("bookCall")}
            </Button>
          </div>
          <div className="grid flex-[2_1_480px] grid-cols-1 gap-8 sm:grid-cols-3">
            <FooterColumn title={t("servicesTitle")}>
              {serviceKeys.map((key) => (
                <Link
                  key={key}
                  href={{ pathname: "/services", hash: key }}
                  className={linkClass}
                >
                  {t(`services.${key}`)}
                </Link>
              ))}
            </FooterColumn>
            <FooterColumn title={t("companyTitle")}>
              {companyLinks.map((item) => (
                <Link key={item.key} href={item.href} className={linkClass}>
                  {t(`company.${item.key}`)}
                </Link>
              ))}
            </FooterColumn>
            <FooterColumn title={t("contactTitle")}>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                LinkedIn ↗
              </a>
              <span className="text-on-dark-subtle">{t("location")}</span>
            </FooterColumn>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-dark-border pt-6 text-sm text-on-dark-label">
          <span>
            {t("legal", {
              year: new Date().getFullYear(),
              pib: site.pib,
              mb: site.mb,
            })}
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className={linkClass}>
              {t("privacy")}
            </Link>
            <Link href="/terms" className={linkClass}>
              {t("terms")}
            </Link>
            <CookieSettingsButton className={linkClass}>
              {t("cookieSettings")}
            </CookieSettingsButton>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
