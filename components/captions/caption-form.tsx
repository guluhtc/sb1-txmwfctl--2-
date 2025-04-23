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

interface CaptionFormProps {
  onGenerate: (prompt: string, options: CaptionOptions) => Promise<void>
  isGenerating: boolean
}

interface CaptionOptions {
  tone: string
  length: string
  includeEmojis: boolean
  style: string
  engagement: string
  includeQuestion: boolean
  includeQuote: boolean
}

export function CaptionForm({ onGenerate, isGenerating }: CaptionFormProps) {
  const [prompt, setPrompt] = useState("")
  const [options, setOptions] = useState<CaptionOptions>({
    tone: "friendly",
    length: "medium",
    includeEmojis: true,
    style: "casual",
    engagement: "medium",
    includeQuestion: false,
    includeQuote: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    try {
      const captionPrompt = `Generate 5 creative Instagram captions for a post about "${prompt}". Each caption should be:
1. Unique and engaging
2. Tone: ${options.tone}
3. Length: ${options.length}
4. Style: ${options.style}
5. Engagement level: ${options.engagement}
6. ${options.includeEmojis ? 'Include relevant emojis' : 'No emojis'}
7. ${options.includeQuestion ? 'Include a question to engage followers' : 'No specific question required'}
8. ${options.includeQuote ? 'Include an inspirational quote' : 'No quote required'}
9. Format the response as a numbered list`

      await onGenerate(captionPrompt, options)
    } catch (error) {
      console.error("Error generating captions:", error)
      toast.error("Failed to generate captions. Please try again.")
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label>What's your post about?</Label>
          <Input
            placeholder="Describe your post or enter keywords"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
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

            <div className="space-y-2">
              <Label>Style</Label>
              <Select value={options.style} onValueChange={(value) => setOptions({ ...options, style: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="poetic">Poetic</SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Engagement Level</Label>
              <Select value={options.engagement} onValueChange={(value) => setOptions({ ...options, engagement: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select engagement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Informative)</SelectItem>
                  <SelectItem value="medium">Medium (Conversational)</SelectItem>
                  <SelectItem value="high">High (Interactive)</SelectItem>
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
              <Label>Include Question</Label>
              <Switch
                checked={options.includeQuestion}
                onCheckedChange={(checked) => setOptions({ ...options, includeQuestion: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Include Quote</Label>
              <Switch
                checked={options.includeQuote}
                onCheckedChange={(checked) => setOptions({ ...options, includeQuote: checked })}
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
              Generate Captions
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}