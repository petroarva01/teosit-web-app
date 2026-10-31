import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PostCover } from "@/components/site/post-card"
import { container, CtaBand, Eyebrow } from "@/components/site/section"
import { formatPostDate, getPost, posts } from "@/data/blog"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

// Only slugs listed in data/blog.ts exist; everything else 404s
export const dynamicParams = false

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPost(slug)
  if (!hasLocale(routing.locales, locale) || !post) return {}
  const t = await getTranslations({ locale, namespace: "Blog" })
  return {
    title: t("postMetaTitle", { title: post.title[locale] }),
    description: post.excerpt[locale],
  }
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params
  const post = getPost(slug)
  if (!hasLocale(routing.locales, locale) || !post) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations("Blog")

  const { default: Content } = await import(
    `@/content/blog/${post.slug}/${locale}.mdx`
  )

  return (
    <>
      <article>
        <header
          className={cn(
            container,
            "flex max-w-[880px] flex-col gap-6 pt-16 pb-12 sm:pt-20"
          )}
        >
          <Link
            href="/blog"
            className="self-start text-[15px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden="true">←</span> {t("allPosts")}
          </Link>
          <Eyebrow>
            {t(`categories.${post.category}`)} ·{" "}
            <time dateTime={post.date}>
              {formatPostDate(post, locale, "long")}
            </time>{" "}
            · {t("readingTime", { minutes: post.readingMinutes })}
          </Eyebrow>
          <h1 className="text-[clamp(38px,5vw,64px)] leading-[1.04] font-bold tracking-[-0.035em]">
            {post.title[locale]}
          </h1>
          <p className="text-[19px] leading-[1.55] text-muted-foreground">
            {post.excerpt[locale]}
          </p>
        </header>
        <div className={cn(container, "max-w-[1080px]")}>
          <PostCover post={post} className="aspect-21/9 rounded-[28px]" />
        </div>
        <div
          className={cn(
            container,
            "flex max-w-[752px] flex-col gap-5 pt-14 text-lg leading-[1.7]"
          )}
        >
          <Content />
        </div>
      </article>
      <CtaBand title={t("cta.title")} button={t("cta.button")} />
    </>
  )
}
