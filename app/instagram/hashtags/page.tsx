"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Crown } from "lucide-react"
import { toast } from "sonner"
import { ToolsToggle } from "@/components/instagram/tools-toggle"
import { HashtagForm } from "@/components/hashtags/hashtag-form"
import { HashtagList } from "@/components/hashtags/hashtag-list"
import { FeatureCards } from "@/components/hashtags/feature-cards"
import { generateContent } from "@/lib/openai"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function HashtagsGeneratorPage({ searchParams }: Props) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([])
  const [isPremiumPreview, setIsPremiumPreview] = useState(true)
  const [savedHashtags, setSavedHashtags] = useState<string[]>([])

  const handleGenerate = async (prompt: string, options: any) => {
    if (!prompt) {
      toast.error("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    try {
      const hashtagPrompt = `Generate 10 relevant Instagram hashtags for "${prompt}". Each hashtag should be:
1. Related to the topic
2. Popular and trending
3. Include a mix of general and specific hashtags
4. Format each hashtag on a new line
5. Start with # symbol
6. Be between 3-20 characters long
7. Be in English
8. Be appropriate for Instagram

Example format:
#topic
#specifictopic
#trending
#popular
#niche`

      const response = await generateContent(hashtagPrompt, 500)
      if (!response) {
        throw new Error("No response received from the AI model")
      }
      
      const hashtags = response.split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.trim().startsWith('#') ? line.trim() : `#${line.trim()}`)
      
      setGeneratedHashtags([...hashtags, ...generatedHashtags])
      toast.success("Hashtags generated successfully!")
    } catch (error) {
      console.error('Error:', error)
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
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">AI Hashtag Generator</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Generate relevant hashtags for your Instagram posts
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
    </div>
  )
}