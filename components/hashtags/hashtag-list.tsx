"use client"

import { Copy, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface HashtagListProps {
  hashtags: string[]
  onCopy: (text: string) => void
  onSave: (hashtags: string) => void
}

export function HashtagList({ hashtags, onCopy, onSave }: HashtagListProps) {
  if (!hashtags.length) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Generated Hashtags</h2>
      <div className="grid gap-4">
        {hashtags.map((hashtag, index) => (
          <Card key={index} className="p-4">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <p className="text-sm whitespace-pre-line">{hashtag}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{hashtag.length} characters</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{(hashtag.match(/#/g) || []).length} hashtags</span>
                </div>
              </div>
              <div className="flex items-start gap-2 w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onCopy(hashtag)}
                  className="flex-1 sm:flex-none hover:bg-primary/10"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSave(hashtag)}
                  className="flex-1 sm:flex-none hover:bg-primary/10"
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}