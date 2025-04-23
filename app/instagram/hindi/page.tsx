"use client"

import { motion } from "framer-motion"

import { FooterSection } from "@/components/footer-section"
import { CTASection } from "@/components/instagram/hindi/cta-section"
import { FeaturesSection } from "@/components/instagram/hindi/features-section"
import { GeneratorCards } from "@/components/instagram/hindi/generator-cards"
import { HeroSection } from "@/components/instagram/hindi/hero-section"
import { HindiToolsToggle } from "@/components/instagram/hindi/tools-toggle"
import { Navbar } from "@/components/navbar"

export default function HindiInstagramPage() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-16"
          >
            <HeroSection />
            <HindiToolsToggle />
            <GeneratorCards />
            <FeaturesSection />
            <CTASection />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}