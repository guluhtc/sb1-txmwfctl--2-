"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"

import { BioForm } from "@/components/bios/bio-form"
import { BioList } from "@/components/bios/bio-list"
import { FeatureCards } from "@/components/bios/feature-cards"
import { FooterSection } from "@/components/footer-section"
import { Navbar } from "@/components/navbar"

export default function BiosPage() {
  const [generatedBios, setGeneratedBios] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  const handleGenerate = (bios: string[]) => {
    setGeneratedBios(bios)
  }

  const handleCopy = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Bio copied to clipboard!")
    } catch (error) {
      console.error("Failed to copy bio:", error)
      toast.error("Failed to copy bio")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Instagram Bios
          </h1>
          <p className="text-xl text-gray-600">
            Create unique and engaging bios for your Instagram profile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BioForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          <BioList bios={generatedBios} onCopy={handleCopy} />
        </div>

        <FeatureCards />
      </div>
      <FooterSection />
    </div>
  )
}