"use client"

import { motion } from "framer-motion"

import { FooterSection } from "@/components/footer-section"
import { CTASection } from "@/components/instagram/cta-section"
import { DownloaderCards } from "@/components/instagram/downloader-cards"
import { DownloaderToggle } from "@/components/instagram/downloader-toggle"
import { FeaturesSection } from "@/components/instagram/features-section"
import { GeneratorCards } from "@/components/instagram/generator-cards"
import { HeroSection } from "@/components/instagram/hero-section"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { Navbar } from "@/components/navbar"

export default function InstagramPage() {
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
            <ToolsToggle />
            <GeneratorCards />
            <div className="pt-8 border-t">
              <DownloaderToggle />
              <div className="mt-8">
                <DownloaderCards />
              </div>
            </div>
            <FeaturesSection />
            <CTASection />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}