"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/signup-form"
import { X, Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function FloatingTrialBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !isDismissed) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (!isVisible || isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-4 left-4 right-4 z-50"
      >
        <div className="container px-4">
          <motion.div 
            className="relative rounded-full bg-white/90 backdrop-blur-lg shadow-lg border p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-4"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Mobile Layout */}
            {isMobile ? (
              <>
                <div className="flex items-center gap-3 flex-1">
                  <motion.div 
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex-shrink-0 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] opacity-20 animate-pulse" />
                    <Sparkles className="h-4 w-4 text-white relative z-10" />
                  </motion.div>
                  <div className="space-y-0.5">
                    <p className="font-medium text-sm">
                      Start Free Trial
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      No credit card required
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="h-8 px-3 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:from-[#F77737] hover:via-[#FD1D1D] hover:to-[#833AB4] transition-all duration-500"
                    onClick={() => router.push('/signup')}
                  >
                    <motion.span
                      whileHover={{ x: 2 }}
                      whileTap={{ x: -2 }}
                    >
                      <ArrowRight className="h-4 w-4 text-white" />
                    </motion.span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full flex-shrink-0 hover:bg-gray-100"
                    onClick={() => setIsDismissed(true)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              /* Desktop Layout */
              <>
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] opacity-20 animate-pulse" />
                    <Sparkles className="h-5 w-5 text-white relative z-10" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-medium">
                      Start growing your Instagram presence today!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      30-day free trial • No credit card required
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="h-10 px-6 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:from-[#F77737] hover:via-[#FD1D1D] hover:to-[#833AB4] transition-all duration-500 text-white"
                    onClick={() => router.push('/signup')}
                  >
                    <span className="font-medium">Start Free Trial</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full flex-shrink-0 hover:bg-gray-100"
                    onClick={() => setIsDismissed(true)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}