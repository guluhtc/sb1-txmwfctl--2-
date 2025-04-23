"use client"

import { motion } from "framer-motion"
import { Wand2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface BioFormProps {
  onGenerate: (bios: string[]) => void
}

export function BioForm({ onGenerate }: BioFormProps) {
  const [topic, setTopic] = useState("")
  const [category, setCategory] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Sample generated bios
      const generatedBios = [
        `✨ ${topic} enthusiast | Creating content that inspires | Follow for daily ${category} tips`,
        `📱 ${topic} creator | Sharing my ${category} journey | DM for collaborations`,
        `🌟 ${topic} expert | Helping others grow in ${category} | Let's connect!`
      ]

      onGenerate(generatedBios)
    } catch (error) {
      console.error("Error generating bios:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="p-6 h-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="topic" className="text-sm font-medium">
            Topic/Expertise
          </label>
          <Input
            id="topic"
            placeholder="What's your main focus? (e.g., Digital Marketing)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business">Business & Entrepreneurship</SelectItem>
              <SelectItem value="creator">Content Creator</SelectItem>
              <SelectItem value="influencer">Influencer</SelectItem>
              <SelectItem value="personal">Personal Brand</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="fashion">Fashion & Beauty</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="food">Food & Cooking</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="art">Art & Design</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="nonprofit">Non-Profit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isGenerating || !topic || !category}
        >
          {isGenerating ? (
            <>
              <Wand2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Bios
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}