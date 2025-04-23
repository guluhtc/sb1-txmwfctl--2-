"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Instagram, Loader2, Mail, Lock } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { InstagramBusinessAuth } from "@/lib/instagram/auth"
import Link from "next/link"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`
        }
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              role: 'user'
            }
          ])

        if (profileError) {
          throw profileError
        }

        toast.success("Account created successfully! Please check your email to verify your account.")
        setFormData({ email: "", password: "", confirmPassword: "" })
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      toast.error(error.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInstagramLogin = async () => {
    try {
      const authUrl = InstagramBusinessAuth.getAuthUrl()
      window.location.href = authUrl
    } catch (error) {
      console.error('Instagram login error:', error)
      toast.error('Failed to initiate Instagram login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <Card className="p-6 sm:p-8 space-y-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <div className="space-y-2 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-3 sm:p-4 flex items-center justify-center">
                <Instagram className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Create Account
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Join our community of creators
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full h-11 sm:h-12 relative bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90 group transition-all duration-300"
            onClick={handleInstagramLogin}
            disabled={isLoading}
          >
            <Instagram className="absolute left-4 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Continue with Instagram</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  className="pl-10 h-11 sm:h-12 border-muted-foreground/20 focus:border-primary text-sm sm:text-base"
                  required
                />
                <Mail className="absolute left-3 top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                  className="pl-10 h-11 sm:h-12 border-muted-foreground/20 focus:border-primary text-sm sm:text-base"
                  required
                />
                <Lock className="absolute left-3 top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleFormChange("confirmPassword", e.target.value)}
                  className="pl-10 h-11 sm:h-12 border-muted-foreground/20 focus:border-primary text-sm sm:text-base"
                  required
                />
                <Lock className="absolute left-3 top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 relative overflow-hidden group bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#6366F1] transition-all duration-500 rounded-lg"
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-base font-medium">Starting trial...</span>
                  </>
                ) : (
                  <>
                    <span className="text-base font-medium">Start Free Trial</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </div>
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Log in
            </Link>
          </div>
        </Card>

        <div className="text-center text-xs text-gray-500 px-4">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </div>
  )
} 