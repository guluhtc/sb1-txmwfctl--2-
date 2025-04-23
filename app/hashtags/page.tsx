"use client"

import { motion } from "framer-motion"
import { Crown } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { FooterSection } from "@/components/footer-section"
import { FeatureCards } from "@/components/hashtags/feature-cards"
import { HashtagForm } from "@/components/hashtags/hashtag-form"
import { HashtagList } from "@/components/hashtags/hashtag-list"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { Navbar } from "@/components/navbar"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function HashtagsGeneratorPage({ searchParams }: Props) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)
  const [savedHashtags, setSavedHashtags] = useState<string[]>([])

  const handleGenerate = async (topic: string, category: string, options: any) => {
    setIsGenerating(true)
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const dummyHashtags = [
        "#DigitalMarketing #MarketingStrategy #BusinessGrowth #OnlineMarketing #MarketingTips #SocialMediaMarketing #ContentCreator #DigitalIndia #MarketingExpert #GrowthHacking",
        "#BusinessTips #Entrepreneurship #StartupIndia #SmallBusiness #DigitalTransformation #BusinessCoach #BusinessGrowth #IndianBusiness #SuccessMindset #BusinessStrategy",
        "#MarketingAgency #BrandStrategy #DigitalMarketer #SocialMediaTips #ContentStrategy #MarketingConsultant #BusinessMarketing #MarketingAgency #GrowthStrategy #ROI"
      ]
      
      setGeneratedHashtags(dummyHashtags)
      toast.success("Hashtags generated successfully!")
    } catch (error) {
      toast.error("Failed to generate hashtags")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Hashtags copied to clipboard!")
  }

  const handleSave = (hashtags: string) => {
    setSavedHashtags(prev => [...prev, hashtags])
    toast.success("Hashtags saved to library!")
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
              <h1 className="text-4xl font-bold gradient-text">AI Hashtag Generator</h1>
              <p className="text-xl text-muted-foreground">
                Generate trending hashtags to increase your reach
              </p>
            </div>

            <ToolsToggle />

            <HashtagForm 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {isPremiumPreview && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Crown className="h-4 w-4" />
                <span>Premium features free for 30 days</span>
              </div>
            )}

            <HashtagList 
              hashtags={generatedHashtags}
              onCopy={handleCopy}
              onSave={handleSave}
            />

            <FeatureCards />
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}