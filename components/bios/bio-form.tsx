"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Wand2, RefreshCw, Sliders } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { generateContent } from "@/lib/openai"

interface BioFormProps {
  onGenerate: (bios: string[]) => void
  isGenerating: boolean
}

interface BioOptions {
  tone: string
  length: string
  includeEmojis: boolean
  includeCallToAction: boolean
}

export function BioForm({ onGenerate, isGenerating }: BioFormProps) {
  const [topic, setTopic] = useState("")
  const [category, setCategory] = useState("personal")
  const [options, setOptions] = useState<BioOptions>({
    tone: "friendly",
    length: "medium",
    includeEmojis: true,
    includeCallToAction: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) {
      toast.error("Please enter a topic")
      return
    }

    try {
      const prompt = `Generate 5 creative Instagram bios for a ${category} account about "${topic}". Each bio should be:
1. Unique and engaging
2. Tone: ${options.tone}
3. Length: ${options.length}
4. ${options.includeEmojis ? 'Include relevant emojis' : 'No emojis'}
5. ${options.includeCallToAction ? 'Include a call to action' : 'No call to action'}
6. Format the response as a numbered list`

      const response = await generateContent(prompt, 800)
      if (!response) {
        throw new Error("No response received from the AI model")
      }
      
      const bios = response.split('\n').filter(line => line.trim().length > 0)
      onGenerate(bios)
      toast.success("Bios generated successfully!")
    } catch (error) {
      console.error("Error generating bios:", error)
      toast.error("Failed to generate bios. Please try again.")
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Topic</Label>
            <Input
              placeholder="What's your account about?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="influencer">Influencer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Advanced Options</Label>
            <Sliders className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={options.tone} onValueChange={(value) => setOptions({ ...options, tone: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Length</Label>
              <Select value={options.length} onValueChange={(value) => setOptions({ ...options, length: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="long">Long</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label>Include Emojis</Label>
              <Switch
                checked={options.includeEmojis}
                onCheckedChange={(checked) => setOptions({ ...options, includeEmojis: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Include Call to Action</Label>
              <Switch
                checked={options.includeCallToAction}
                onCheckedChange={(checked) => setOptions({ ...options, includeCallToAction: checked })}
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isGenerating}
          onClick={handleSubmit}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Bios
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}