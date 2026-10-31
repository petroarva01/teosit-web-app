import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

import { site } from "@/data/site"

// Email clients ignore CSS variables and web fonts, so the site's tokens are
// inlined here as plain values
const colors = {
  background: "#F6F5FA",
  foreground: "#1B1936",
  muted: "#55526E",
  border: "#E2E0EC",
  primary: "#6D3FE0",
  accent: "#EEE8FD",
  accentForeground: "#4C22B8",
}
const sans =
  "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
const mono = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace"

export type ContactInquiryProps = {
  name: string
  email: string
  company: string
  budget: string
  services: string[]
  message: string
  /** The page the form was sent from, e.g. "Serbian" */
  language: string
}

/** Notification sent to the studio inbox when someone uses the contact form. */
export function ContactInquiry({
  name,
  email,
  company,
  budget,
  services,
  message,
  language,
}: ContactInquiryProps) {
  const firstName = name.split(" ")[0]
  const details = [
    {
      label: "Email",
      value: (
        <Link href={`mailto:${email}`} style={link}>
          {email}
        </Link>
      ),
    },
    { label: "Company", value: company || "—" },
    { label: "Budget", value: budget },
    { label: "Language", value: language },
  ]

  return (
    <Html lang="en">
      <Head />
      <Preview>
        {`${name}${company ? ` (${company})` : ""}: ${message.slice(0, 120)}`}
      </Preview>
      <Body
        style={{
          margin: 0,
          backgroundColor: colors.background,
          fontFamily: sans,
        }}
      >
        <Container style={{ maxWidth: 600, padding: "40px 16px" }}>
          <Img
            src={`${site.url}/email/logo.png`}
            alt="TEOS IT"
            width={135}
            height={30}
            style={{ marginBottom: 28 }}
          />
          <Section
            style={{
              backgroundColor: "#FFFFFF",
              border: `1px solid ${colors.border}`,
              borderRadius: 24,
              padding: 40,
            }}
          >
            <Text style={eyebrow}>New inquiry</Text>
            <Text
              style={{
                margin: "0 0 20px",
                color: colors.foreground,
                fontSize: 30,
                lineHeight: "1.1",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              {name} wants to work with TEOS IT
            </Text>

            {services.length > 0 && (
              <Text style={{ margin: "0 0 24px", lineHeight: "2.4" }}>
                {services.map((service) => (
                  <span
                    key={service}
                    style={{
                      display: "inline-block",
                      marginRight: 6,
                      padding: "0 14px",
                      border: `1px solid ${colors.primary}`,
                      borderRadius: 999,
                      backgroundColor: colors.accent,
                      color: colors.accentForeground,
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    {service}
                  </span>
                ))}
              </Text>
            )}

            {details.map((detail) => (
              <Section
                key={detail.label}
                style={{
                  borderTop: `1px solid ${colors.border}`,
                  padding: "12px 0",
                }}
              >
                <Text style={{ ...label, margin: "0 0 2px" }}>
                  {detail.label}
                </Text>
                <Text
                  style={{
                    margin: 0,
                    color: colors.foreground,
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {detail.value}
                </Text>
              </Section>
            ))}

            <Text style={{ ...label, margin: "24px 0 8px" }}>
              About the project
            </Text>
            <Text
              style={{
                margin: "0 0 32px",
                padding: "16px 20px",
                borderRadius: 14,
                backgroundColor: colors.background,
                color: colors.foreground,
                fontSize: 16,
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </Text>

            <Button
              href={`mailto:${email}?subject=${encodeURIComponent("Re: your project")}`}
              style={{
                padding: "16px 28px",
                borderRadius: 999,
                backgroundColor: colors.primary,
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Reply to {firstName}
            </Button>
          </Section>
          <Text
            style={{
              margin: "20px 0 0",
              color: colors.muted,
              fontSize: 13,
              lineHeight: "1.5",
            }}
          >
            Sent from the contact form on{" "}
            <Link href={site.url} style={{ color: colors.muted }}>
              teosit.com
            </Link>
            . Replying to this email goes straight to {name}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const eyebrow = {
  margin: "0 0 12px",
  color: colors.primary,
  fontFamily: mono,
  fontSize: 13,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
}

const label = {
  color: colors.muted,
  fontFamily: mono,
  fontSize: 12,
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
}

const link = { color: colors.primary, textDecoration: "underline" }

// Sample data for previewing the template
ContactInquiry.PreviewProps = {
  name: "Ana Petrović",
  email: "ana@example.com",
  company: "Bašta d.o.o.",
  budget: "€10k – €30k",
  services: ["Mobile app", "Backend"],
  message:
    "We'd like an app for our garden centre customers: a plant catalogue, care reminders and loyalty points.\n\nWe'd love to launch before spring.",
  language: "Serbian",
} satisfies ContactInquiryProps

export default ContactInquiry
