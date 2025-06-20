"use client"

import { motion } from "framer-motion"
import { Video, Loader2, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

import { FooterSection } from "@/components/footer-section"
import { DownloaderToggle } from "@/components/instagram/downloader-toggle"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface VideoData {
  url: string
  type: string
  topic: string
  category: string
  tone: string
  length: string
  includeMusic: boolean
  includeEffects: boolean
}

export default function VideoDownloaderPage() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [videoData, setVideoData] = useState<VideoData | null>(null)

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
      const response = await fetch('/api/instagram/video/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to download video')
      }

      const videoBlob = await response.blob()
      const objectUrl = URL.createObjectURL(videoBlob)

      setVideoData({
        url: objectUrl,
        type: videoBlob.type || 'video/mp4',
        topic: '',
        category: '',
        tone: '',
        length: '',
        includeMusic: false,
        includeEffects: false
      })

      toast.success("Video loaded successfully!")
    } catch (error: any) {
      console.error('Download error:', error)
      toast.error(error.message || "Failed to load video")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadVideo = () => {
    if (!videoData) return

    const link = document.createElement('a')
    link.href = videoData.url
    link.download = `instagram-video.${videoData.type.split('/')[1] || 'mp4'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Video downloaded successfully!")
  }

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (videoData?.url) {
        URL.revokeObjectURL(videoData.url)
      }
    }
  }, [videoData])

  const handleGenerate = async (data: VideoData) => {
    try {
      setIsGenerating(true)
      setVideoData(data)
      const response = await fetch('/api/instagram/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: data.topic,
          category: data.category,
          tone: data.tone,
          length: data.length,
          includeMusic: data.includeMusic,
          includeEffects: data.includeEffects,
        }),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setGeneratedVideo(data.video)
    } catch (error) {
      console.error('Error generating video:', error)
      toast.error('Failed to generate video')
    } finally {
      setIsGenerating(false)
    }
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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Instagram Video Downloader</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Download Instagram videos in high quality
              </p>
            </div>

            <DownloaderToggle />

            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="videoUrl" className="text-sm font-medium">
                    Instagram Video URL
                  </label>
                  <Input
                    id="videoUrl"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.instagram.com/p/..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="text-sm text-muted-foreground">
                    Examples:<br />
                    Video Post: https://www.instagram.com/p/ABC123xyz/<br />
                    Reel: https://www.instagram.com/reel/ABC123xyz/
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
                      Loading Video...
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      Load Video
                    </>
                  )}
                </Button>

                {videoData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                      <video
                        src={videoData.url}
                        controls
                        className="w-full h-full"
                      >
                        <track
                          kind="captions"
                          srcLang="en"
                          label="English"
                          default
                        />
                      </video>
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleDownloadVideo}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Video
                    </Button>
                  </motion.div>
                )}

                {!videoData && !isLoading && (
                  <div className="flex items-center justify-center h-64 rounded-lg border border-dashed">
                    <div className="text-center">
                      <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p>Enter an Instagram URL and click Load</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="space-y-4 text-center">
              <h2 className="text-xl font-semibold">How to Download Instagram Videos</h2>
              <div className="grid gap-4 text-sm text-muted-foreground">
                <p>1. Open Instagram and go to the video post or reel</p>
                <p>2. Copy the URL from your browser&apos;s address bar</p>
                <p>3. Paste the URL above and click Load</p>
                <p>4. Click Download to save the video</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}