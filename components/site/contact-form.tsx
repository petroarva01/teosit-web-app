"use client"

import * as React from "react"
import { useLocale, useTranslations } from "next-intl"

import { sendContactMessage } from "@/app/[locale]/(site)/contact/actions"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  budgetOptions,
  serviceOptions,
  type ContactField,
  type ContactState,
} from "@/data/contact"
import { site } from "@/data/site"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const panel =
  "rounded-[32px] border border-border bg-card p-[clamp(24px,4vw,48px)]"

const fieldClass =
  "min-h-[52px] w-full rounded-[14px] border border-input bg-card px-4 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/25 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"

const labelClass = "text-[15px] font-semibold"

/** Contact form with an inline "sent" panel; "send another" starts fresh. */
function ContactForm() {
  const [attempt, setAttempt] = React.useState(0)
  return (
    <ContactFormInner key={attempt} onReset={() => setAttempt((n) => n + 1)} />
  )
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const t = useTranslations("Contact")
  const locale = useLocale()
  const [state, formAction, pending] = React.useActionState<
    ContactState,
    FormData
  >(sendContactMessage.bind(null, locale), { status: "idle" })
  const [services, setServices] = React.useState<string[]>(["mobile"])
  const sentRef = React.useRef<HTMLDivElement>(null)

  // The sent panel is shorter than the form, so bring it into view
  React.useEffect(() => {
    if (state.status === "sent") sentRef.current?.focus()
  }, [state.status])

  if (state.status === "sent") {
    return (
      <div
        ref={sentRef}
        role="status"
        tabIndex={-1}
        className={cn(
          panel,
          "flex scroll-mt-28 flex-col items-start gap-4 outline-none sm:p-14"
        )}
      >
        <svg
          width="44"
          height="38"
          viewBox="0 0 14 12"
          aria-hidden="true"
          className="fill-primary"
        >
          <path d="M7 1L13 11H1Z" />
        </svg>
        <h2 className="text-[clamp(32px,3.6vw,40px)] leading-[1.05] font-bold tracking-[-0.03em]">
          {t("sent.title")}
        </h2>
        <p className="text-lg leading-[1.6] text-muted-foreground">
          {t("sent.body")}
        </p>
        <Button
          variant="outline"
          size="pill"
          className="mt-2 border-input bg-transparent"
          onClick={onReset}
        >
          {t("sent.again")}
        </Button>
      </div>
    )
  }

  const invalid = (field: ContactField) =>
    state.status === "invalid" && state.fields.includes(field)

  const errorFor = (field: "name" | "email" | "message") =>
    invalid(field) && (
      <p id={`c-${field}-error`} className="text-sm text-destructive">
        {t(`form.errors.${field}`)}
      </p>
    )

  const fieldProps = (field: "name" | "email" | "message") => ({
    id: `c-${field}`,
    name: field,
    "aria-invalid": invalid(field) || undefined,
    "aria-describedby": invalid(field) ? `c-${field}-error` : undefined,
  })

  return (
    <form
      // Submit through a transition instead of `action` so React doesn't
      // clear the fields when sending fails
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        React.startTransition(() => formAction(formData))
      }}
      className={cn(panel, "flex flex-col gap-7")}
    >
      <fieldset className="flex flex-col gap-3">
        <legend className={cn(labelClass, "pb-3")}>{t("form.services")}</legend>
        <ToggleGroup
          multiple
          value={services}
          onValueChange={setServices}
          className="w-auto flex-wrap gap-2"
        >
          {serviceOptions.map((option) => (
            <ToggleGroupItem
              key={option}
              value={option}
              className="h-auto min-h-11 rounded-full border border-input bg-card px-4 text-[15px] font-medium text-foreground hover:border-primary hover:bg-card aria-pressed:border-primary aria-pressed:bg-accent aria-pressed:text-accent-foreground"
            >
              {t(`form.serviceOptions.${option}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {services.map((option) => (
          <input key={option} type="hidden" name="services" value={option} />
        ))}
      </fieldset>

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-name" className={labelClass}>
            {t("form.name")}
          </label>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            className={fieldClass}
          />
          {errorFor("name")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className={labelClass}>
            {t("form.email")}
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            className={fieldClass}
          />
          {errorFor("email")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-company" className={labelClass}>
            {t("form.company")}{" "}
            <span className="font-normal text-muted-foreground">
              {t("form.optional")}
            </span>
          </label>
          <input
            id="c-company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={160}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-budget" className={labelClass}>
            {t("form.budget")}
          </label>
          <select id="c-budget" name="budget" className={fieldClass}>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {t(`form.budgetOptions.${option}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-message" className={labelClass}>
          {t("form.message")}
        </label>
        <textarea
          {...fieldProps("message")}
          rows={6}
          required
          minLength={10}
          maxLength={5000}
          placeholder={t("form.messagePlaceholder")}
          className={cn(fieldClass, "resize-y py-3.5")}
        />
        {errorFor("message")}
      </div>

      {/* Honeypot for bots; hidden from people and screen readers */}
      <div aria-hidden="true" className="hidden">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-[15px] text-destructive">
          {t("form.errors.send", { email: site.email })}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {t.rich("form.consent", {
            link: (chunks) => (
              <Link
                href="/privacy"
                className="text-primary underline underline-offset-2"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
        <Button
          type="submit"
          size="pill-lg"
          disabled={pending}
          className="min-h-[54px] px-[30px]"
        >
          {pending ? t("form.sending") : t("form.submit")}
        </Button>
      </div>
    </form>
  )
}

export { ContactForm }
