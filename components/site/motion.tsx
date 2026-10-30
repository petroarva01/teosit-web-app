"use client"

import * as React from "react"
import { MotionConfig, motion, type Variants } from "motion/react"

const ease = [0.2, 0.7, 0.2, 1] as const

/** Disables transform animations app-wide when the OS asks for reduced motion. */
function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, staggerChildren: 0.06 },
  },
}

/** Fades a section in once it scrolls into view; RevealItem children stagger by 60ms. */
function Reveal({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.section>) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

function RevealItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  )
}

/** Gentle infinite bob used by the hero project cards. */
function Float({
  duration,
  delay = 0,
  tilt = 0,
  className,
  children,
}: {
  duration: number
  delay?: number
  tilt?: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className={className}
      style={{ rotate: tilt }}
      animate={{ y: [0, -14, 0] }}
      // A negative delay starts the loop partway through, so the cards drift out of sync
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

export { MotionProvider, Reveal, RevealItem, Float }
