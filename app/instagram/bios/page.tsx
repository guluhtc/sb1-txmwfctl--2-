"use client"

import { motion } from "framer-motion"
import { Crown } from "lucide-react"
import { Metadata } from "next"
import { useState } from "react"
import { toast } from "sonner"

import { BioForm } from "@/components/bios/bio-form"
import { BioList } from "@/components/bios/bio-list"
import { FeatureCards } from "@/components/bios/feature-cards"
import { FooterSection } from "@/components/footer-section"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { Navbar } from "@/components/navbar"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function BiosGeneratorPage({ searchParams }: Props) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBios, setGeneratedBios] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)

  const handleGenerate = async (bios: string[]) => {
    setGeneratedBios(bios)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Bio copied to clipboard!")
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold gradient-text">AI Bio Generator</h1>
              <p className="text-xl text-muted-foreground">
                Create a professional Instagram bio that stands out
              </p>
            </div>

            <ToolsToggle />

            <BioForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>Premium features free for 30 days</span>
              </div>
            )}

            <BioList 
              bios={generatedBios}
              onCopy={handleCopy}
            />

            <FeatureCards />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}