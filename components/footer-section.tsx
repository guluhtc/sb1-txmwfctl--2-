"use client"

import { motion } from "framer-motion"
import { Sparkles, Instagram, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function FooterSection() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span className="font-bold text-lg sm:text-xl gradient-text">Techigem</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered Instagram management platform helping creators and businesses grow their presence with smart automation and analytics.
            </p>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="font-semibold text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="font-semibold text-base sm:text-lg">Support</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="font-semibold text-base sm:text-lg">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates, tips, and exclusive offers.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full h-9 sm:h-10 text-sm"
              />
              <Button className="w-full h-9 sm:h-10 text-sm">Subscribe Now</Button>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Techigem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}