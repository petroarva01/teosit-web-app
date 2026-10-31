import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { BlogFilter } from "@/components/site/blog-filter"
import { FeaturedPostCard, PostCard } from "@/components/site/post-card"
import { CtaBand, Eyebrow } from "@/components/site/section"
import { formatPostDate, postCategories, posts } from "@/data/blog"
import { routing } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const t = await getTranslations({ locale, namespace: "Blog" })
  return { title: t("metaTitle"), description: t("lead") }
}

export default async function BlogPage({
  params,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations("Blog")

  return (
    <>
      <BlogFilter
        intro={
          <div className="flex max-w-[720px] flex-col gap-5">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="text-[clamp(44px,6vw,80px)] leading-[1.02] font-bold tracking-[-0.035em]">
              {t("title")}
            </h1>
            <p className="text-[19px] leading-[1.55] text-muted-foreground">
              {t("lead")}
            </p>
          </div>
        }
        label={t("filterLabel")}
        labels={{
          all: t("categories.all"),
          reactNative: t("categories.reactNative"),
          founders: t("categories.founders"),
          ai: t("categories.ai"),
        }}
        categories={postCategories.filter((category) =>
          posts.some((post) => post.category === category)
        )}
        items={posts.map((post) => {
          const category = t(`categories.${post.category}`)
          return {
            key: post.slug,
            category: post.category,
            featured: (
              <FeaturedPostCard
                post={post}
                title={post.title[locale]}
                excerpt={post.excerpt[locale]}
                meta={[
                  category,
                  formatPostDate(post, locale, "medium"),
                  t("readingTime", { minutes: post.readingMinutes }),
                ].join(" · ")}
              />
            ),
            card: (
              <PostCard
                post={post}
                title={post.title[locale]}
                meta={`${category} · ${formatPostDate(post, locale, "medium")}`}
              />
            ),
          }
        })}
      />
      <CtaBand title={t("cta.title")} button={t("cta.button")} />
    </>
  )
}
