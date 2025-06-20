"use client"

import { motion } from "framer-motion"
import { User, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { FooterSection } from "@/components/footer-section"
import { DownloaderToggle } from "@/components/instagram/downloader-toggle"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"



export default function ProfilePicturePage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleView = async () => {
    if (!username) {
      toast.error("Please enter an Instagram username")
      return
    }

    setIsLoading(true)
    try {
      toast.info("Profile picture viewer coming soon!")
    } catch (error) {
      toast.error("Failed to load profile picture")
    } finally {
      setIsLoading(false)
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
              <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Instagram Profile Picture Viewer</h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                View and download Instagram profile pictures in full size
              </p>
            </div>

            <DownloaderToggle />

            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="profileUrl" className="text-sm font-medium">
                    Instagram Profile URL
                  </label>
                  <Input
                    id="profileUrl"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="https://www.instagram.com/username"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleView}
                  disabled={isLoading || !username}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading Profile Picture...
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      View Profile Picture
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}