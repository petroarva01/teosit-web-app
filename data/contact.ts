import { z } from "zod"

export const serviceOptions = [
  "mobile",
  "web",
  "backend",
  "ai",
  "design",
  "team",
] as const

export const budgetOptions = [
  "unsure",
  "under10",
  "10to30",
  "30to60",
  "over60",
  "monthly",
] as const

/** Shared by the form (field names) and the server action (validation). */
export const contactSchema = z.object({
  services: z.array(z.enum(serviceOptions)),
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  company: z.string().trim().max(160),
  budget: z.enum(budgetOptions),
  message: z.string().trim().min(10).max(5000),
})

export type ContactField = keyof z.infer<typeof contactSchema>

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; fields: ContactField[] }
  | { status: "error" }
