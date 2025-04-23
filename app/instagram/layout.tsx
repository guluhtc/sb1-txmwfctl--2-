import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Instagram Tools - Generate Captions, Hashtags & Bios",
  description: 'Generate engaging Instagram captions, hashtags, and bios with our AI-powered tools. No credit card required.',
}

export const dynamic = 'force-dynamic'

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}