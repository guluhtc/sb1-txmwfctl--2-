"use client"

import { FaqSection } from "@/components/faq-section"
import { FeatureCards } from "@/components/feature-cards"
import { FloatingTrialBar } from "@/components/floating-trial-bar"
import { FooterSection } from "@/components/footer-section"
import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TrialSection } from "@/components/trial-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-4 md:px-6 overflow-hidden space-y-16 sm:space-y-24 py-8 sm:py-16">
        <HeroSection />
        <FeatureCards />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <TrialSection />
      </main>
      <FloatingTrialBar />
      <FooterSection />
    </div>
  )
}