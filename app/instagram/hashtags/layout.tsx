import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Instagram Hashtag Generator - Find Trending Hashtags",
  description: 'Generate relevant and trending Instagram hashtags with our AI-powered tool. No credit card required.',
}

export const dynamic = 'force-dynamic'

export default function HashtagsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}