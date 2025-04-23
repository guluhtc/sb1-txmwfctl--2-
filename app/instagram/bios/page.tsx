"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { BioForm } from "@/components/bios/bio-form"
import { BioList } from "@/components/bios/bio-list"
import { FeatureCards } from "@/components/bios/feature-cards"
import { Metadata } from "next"
import { BioGenerator } from "@/components/bios/bio-generator"
import { BioExamples } from "@/components/bios/bio-examples"
import { BioFeatures } from "@/components/bios/bio-features"
import { BioTestimonials } from "@/components/bios/bio-testimonials"
import { BioFaq } from "@/components/bios/bio-faq"
import { BioCta } from "@/components/bios/bio-cta"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function BioPage({ searchParams }: Props) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBios, setGeneratedBios] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)
  const [savedBios, setSavedBios] = useState<string[]>([])

  const handleGenerate = (bios: string[]) => {
    setGeneratedBios(prev => [...bios, ...prev])
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Bio copied to clipboard!")
  }

  const handleSave = (bio: string) => {
    setSavedBios(prev => [...prev, bio])
    toast.success("Bio saved to library!")
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">AI Bio Generator</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Create unique and engaging Instagram bios in seconds with AI
              </p>
            </div>

            <ToolsToggle />

            <BioForm onGenerate={handleGenerate} />

            {isPremiumPreview && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>Premium features free for 30 days</span>
              </div>
            )}

            {generatedBios.length > 0 && (
              <BioList 
                bios={generatedBios}
                onCopy={handleCopy}
                onSave={handleSave}
              />
            )}

            <FeatureCards />
          </motion.div>
        </div>
      </main>
    </div>
  )
}