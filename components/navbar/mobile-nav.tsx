"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"


export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="relative z-50 rounded-full hover:bg-black/5"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMenuOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 top-24 rounded-2xl bg-white/90 backdrop-blur-lg border shadow-lg z-50 md:hidden max-h-[calc(100vh-8rem)] overflow-y-auto"
            >
              <div className="p-6 space-y-4">
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="ghost"
                    className="text-lg font-medium px-4 py-3 rounded-full hover:bg-black/5 transition-colors active:scale-95"
                    onClick={() => {
                      router.push('/instagram')
                      setIsMenuOpen(false)
                    }}
                  >
                    Instagram
                  </Button>
                  <Button 
                    variant="ghost"
                    className="text-lg font-medium px-4 py-3 rounded-full hover:bg-black/5 transition-colors active:scale-95"
                    onClick={() => {
                      router.push('/features')
                      setIsMenuOpen(false)
                    }}
                  >
                    Features
                  </Button>
                  <Button 
                    variant="ghost"
                    className="text-lg font-medium px-4 py-3 rounded-full hover:bg-black/5 transition-colors active:scale-95"
                    onClick={() => {
                      router.push('/about')
                      setIsMenuOpen(false)
                    }}
                  >
                    About
                  </Button>
                  <Button 
                    variant="ghost"
                    className="text-lg font-medium px-4 py-3 rounded-full hover:bg-black/5 transition-colors active:scale-95"
                    onClick={() => {
                      router.push('/contact')
                      setIsMenuOpen(false)
                    }}
                  >
                    Contact
                  </Button>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <Button 
                    variant="ghost" 
                    className="w-full rounded-full py-3 text-lg font-medium"
                    onClick={() => {
                      router.push('/login')
                      setIsMenuOpen(false)
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    size="sm"
                    className="w-full h-10 px-4 bg-gradient-to-r from-primary via-[#8B5CF6] to-[#EC4899] hover:opacity-90 rounded-full"
                    onClick={() => {
                      router.push('/signup')
                      setIsMenuOpen(false)
                    }}
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}