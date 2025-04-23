import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Instagram Bio Generator | Create Perfect Bio for Instagram",
  description: "Generate unique and engaging Instagram bios in seconds. Perfect for influencers, businesses, and personal profiles.",
}

export default function BiosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}