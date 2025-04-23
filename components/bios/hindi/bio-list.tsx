"use client"

import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BioListProps {
  bios: string[]
  onCopy: (text: string) => void
}

export function BioList({ bios, onCopy }: BioListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    onCopy(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  if (bios.length === 0) {
    return (
      <Card className="p-6 h-full flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            Generate some bios to see them here
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-full">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Generated Bios</h2>
        <div className="space-y-4">
          {bios.map((bio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 relative group">
                <p className="text-sm text-muted-foreground mb-4">{bio}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleCopy(bio, index)}
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
} 