"use server"

import { getTranslations } from "next-intl/server"
import { Resend } from "resend"

import {
  contactSchema,
  type ContactField,
  type ContactState,
} from "@/data/contact"
import { site } from "@/data/site"
import { ContactInquiry } from "@/emails/contact-inquiry"
import type { Locale } from "@/i18n/routing"

const languageNames: Record<Locale, string> = { en: "English", sr: "Serbian" }

export async function sendContactMessage(
  locale: Locale,
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: hidden from people, filled in by bots. Pretend it worked.
  if (formData.get("website")) return { status: "sent" }

  const parsed = contactSchema.safeParse({
    services: formData.getAll("services"),
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    budget: formData.get("budget") ?? "",
    message: formData.get("message") ?? "",
  })
  if (!parsed.success) {
    const fields = new Set(
      parsed.error.issues.map((issue) => issue.path[0] as ContactField)
    )
    return { status: "invalid", fields: [...fields] }
  }

  // The inbox reads English labels, whichever language the form was sent in
  const t = await getTranslations({ locale: "en", namespace: "Contact.form" })
  const inquiry = {
    ...parsed.data,
    services: parsed.data.services.map((s) => t(`serviceOptions.${s}`)),
    budget: t(`budgetOptions.${parsed.data.budget}`),
    language: languageNames[locale] ?? locale,
  }
  const { name, email, company } = inquiry
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Budget: ${inquiry.budget}`,
    `Needs: ${inquiry.services.join(", ") || "—"}`,
    `Language: ${inquiry.language}`,
    "",
    inquiry.message,
  ].join("\n")

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !from) {
    // Without email settings, log the message locally instead of losing it
    if (process.env.NODE_ENV === "development") {
      console.info(`[contact] RESEND_API_KEY not set, message:\n${text}`)
      return { status: "sent" }
    }
    console.error("[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL is not set")
    return { status: "error" }
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: email,
    subject: `${name} wants to work with TEOS IT`,
    react: <ContactInquiry {...inquiry} />,
    text,
  })
  if (error) {
    console.error("[contact] Resend failed", error)
    return { status: "error" }
  }
  return { status: "sent" }
}
