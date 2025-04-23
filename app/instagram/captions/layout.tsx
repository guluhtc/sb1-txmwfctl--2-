import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Instagram Caption Generator - Create Engaging Captions",
  description: 'Generate engaging Instagram captions with our AI-powered tool. No credit card required.',
}

export const dynamic = 'force-dynamic'

export default function CaptionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}