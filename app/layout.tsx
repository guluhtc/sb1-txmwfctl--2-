"use client"

import './globals.css';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Navbar } from '@/components/navbar'
import { Toaster } from "@/components/ui/sonner";
import { supabase } from '@/lib/supabase'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setIsAuthenticated(!!session)
      } catch (error) {
        console.error('Error checking auth status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Show header/footer on all pages except dashboard and admin pages
  const isDashboardPage = pathname?.startsWith('/dashboard')
  const isAdminPage = pathname?.startsWith('/admin')
  const showHeaderFooter = !isDashboardPage && !isAdminPage

  if (isLoading) {
    return (
      <html lang="en">
        <body className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className="font-sans">
        {showHeaderFooter && <Navbar />}
        <main className={showHeaderFooter ? "min-h-screen" : ""}>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}