"use client"

import { motion } from "framer-motion"
import { Loader2, Mail, Lock, Instagram, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InstagramBusinessAuth } from "@/lib/instagram/auth"
import { supabase } from "@/lib/supabase"


function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isInstagramLoading, setIsInstagramLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams?.get('error')
    const reason = searchParams?.get('reason')
    const description = searchParams?.get('description')

    if (error) {
      let errorMessage = 'Authentication failed'
      
      if (error === 'access_denied' && reason === 'user_denied') {
        errorMessage = 'Instagram login was cancelled'
      } else if (error === 'no_session') {
        errorMessage = 'Please sign in to continue'
      } else if (description) {
        errorMessage = decodeURIComponent(description).replace(/\+/g, ' ')
      } else if (error === 'Invalid API key') {
        errorMessage = 'Authentication service is temporarily unavailable'
      }

      toast.error(errorMessage)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (!formData.password) {
      toast.error("Please enter your password")
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (error) throw error

      if (data.user) {
        toast.success("Logged in successfully!")
        const returnTo = searchParams?.get('returnTo') || '/dashboard'
        router.push(returnTo)
        router.refresh()
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error.message || "Failed to log in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInstagramLogin = async () => {
    setIsInstagramLoading(true)
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        toast.error('Please sign in to continue')
        return
      }

      const authUrl = InstagramBusinessAuth.getAuthUrl()
      window.location.href = authUrl
    } catch (error) {
      console.error('Instagram login error:', error)
      toast.error('Failed to initiate Instagram login')
    } finally {
      setIsInstagramLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5 py-4 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6 sm:space-y-8"
      >
        <div className="text-center space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-[#8B5CF6] bg-clip-text text-transparent">
              InstaGrowth
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Grow your Instagram presence with AI
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-3 sm:p-4 flex items-center justify-center">
              <Instagram className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
          </motion.div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-1 sm:mt-2 text-sm text-gray-600 max-w-xs mx-auto">
              Sign in to access your dashboard and start growing your Instagram presence
            </p>
          </div>
        </div>

        <Card className="p-6 sm:p-8 space-y-5 sm:space-y-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <Button
            variant="outline"
            className="w-full h-11 sm:h-12 relative hover:bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:text-white group transition-all duration-300"
            onClick={handleInstagramLogin}
            disabled={isInstagramLoading}
          >
            {isInstagramLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm sm:text-base">Connecting to Instagram...</span>
              </>
            ) : (
              <>
                <Instagram className="absolute left-4 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Continue with Instagram</span>
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-11 sm:h-12 border-muted-foreground/20 focus:border-primary text-sm sm:text-base"
                  required
                />
                <Mail className="absolute left-3 top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>

              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 h-11 sm:h-12 border-muted-foreground/20 focus:border-primary text-sm sm:text-base"
                  required
                />
                <Lock className="absolute left-3 top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-600">
                  Remember me
                </label>
              </div>

              <Link href="/forgot-password" className="font-medium text-primary hover:text-primary/80">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-primary to-[#8B5CF6] hover:from-primary/90 hover:to-[#8B5CF6]/90 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="text-sm sm:text-base">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="text-sm sm:text-base">Sign in</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        <div className="text-center text-xs text-gray-500 px-4">
          By signing in, you agree to our{" "}
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}