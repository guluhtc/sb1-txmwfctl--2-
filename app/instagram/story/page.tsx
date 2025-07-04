"use client"

import { motion } from "framer-motion"
import { Ghost, Loader2, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

import { FooterSection } from "@/components/footer-section"
import { DownloaderToggle } from "@/components/instagram/downloader-toggle"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"



export default function StoryDownloaderPage() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [storyData, setStoryData] = useState<{
    url: string;
    type: string;
  } | null>(null)

  const handleDownload = async () => {
    if (!url) {
      toast.error("Please enter an Instagram URL")
      return
    }

    // Basic URL validation
    if (!url.includes('instagram.com/')) {
      toast.error("Please enter a valid Instagram URL")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/instagram/story/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to download story')
      }

      const storyBlob = await response.blob()
      const objectUrl = URL.createObjectURL(storyBlob)

      setStoryData({
        url: objectUrl,
        type: storyBlob.type || 'video/mp4'
      })

      toast.success("Story loaded successfully!")
    } catch (error: any) {
      console.error('Download error:', error)
      toast.error(error.message || "Failed to load story")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadStory = () => {
    if (!storyData) return

    const link = document.createElement('a')
    link.href = storyData.url
    const extension = storyData.type.includes('video') ? 'mp4' : 'jpg'
    link.download = `instagram-story.${extension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Story downloaded successfully!")
  }

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (storyData?.url) {
        URL.revokeObjectURL(storyData.url)
      }
    }
  }, [storyData])

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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Instagram Story Downloader</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Download Instagram stories in high quality
              </p>
            </div>

            <DownloaderToggle />

            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram URL</label>
                  <Input
                    placeholder="Paste Instagram story URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-11"
                  />
                  <p className="text-sm text-muted-foreground">
                    Examples:<br />
                    Story: https://www.instagram.com/stories/username/1234567890/<br />
                    Highlight: https://www.instagram.com/s/highlight/1234567890/
                  </p>
                </div>

                <Button
                  className="w-full h-11"
                  onClick={handleDownload}
                  disabled={isLoading || !url}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading Story...
                    </>
                  ) : (
                    <>
                      <Ghost className="mr-2 h-4 w-4" />
                      Load Story
                    </>
                  )}
                </Button>

                {storyData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative w-full max-w-sm mx-auto">
                      <div className="aspect-[9/16] rounded-lg overflow-hidden border bg-black flex items-center justify-center">
                        {storyData.type.includes('video') ? (
                          <video
                            src={storyData.url}
                            controls
                            className="w-full h-full object-contain"
                            playsInline
                          >
                            <track
                              kind="captions"
                              srcLang="en"
                              label="English"
                              default
                            />
                          </video>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={storyData.url}
                            alt="Instagram Story"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleDownloadStory}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Story
                    </Button>
                  </motion.div>
                )}

                {!storyData && !isLoading && (
                  <div className="flex items-center justify-center h-64 rounded-lg border border-dashed">
                    <div className="text-center">
                      <Ghost className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p>Enter an Instagram URL and click Load</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="space-y-4 text-center">
              <h2 className="text-xl font-semibold">How to Download Instagram Stories</h2>
              <div className="grid gap-4 text-sm text-muted-foreground">
                <p>1. Open Instagram and go to the story you want to download</p>
                <p>2. Copy the URL from your browser&apos;s address bar</p>
                <p>3. Paste the URL above and click Load</p>
                <p>4. Click Download to save the story</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}