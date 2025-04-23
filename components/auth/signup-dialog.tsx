"use client"

import { motion, AnimatePresence } from "framer-motion"

import { SignupFormFields } from "./signup-form-fields"
import { SocialButtons } from "./social-buttons"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


interface SignupFormData {
  email: string
  password: string
}

interface SignupDialogProps {
  isOpen: boolean
  isLoading: boolean
  formData: SignupFormData
  onOpenChange: (open: boolean) => void
  onInstagramLogin: () => void
  onFormChange: (field: keyof SignupFormData, value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function SignupDialog({
  isOpen,
  isLoading,
  formData,
  onOpenChange,
  onInstagramLogin,
  onFormChange,
  onSubmit
}: SignupDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => onOpenChange(false)}
            />
            <DialogContent className="sm:max-w-[400px] bg-white border shadow-lg p-0 z-50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <DialogHeader className="p-6 space-y-2">
                  <DialogTitle className="text-2xl font-bold gradient-text text-center">Get Started Free</DialogTitle>
                  <DialogDescription className="text-center">
                    No credit card required • Free 30-day trial
                  </DialogDescription>
                </DialogHeader>

                <div className="px-6 pb-6 space-y-4">
                  <SocialButtons 
                    isLoading={isLoading}
                    onInstagramLogin={onInstagramLogin}
                  />

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  <SignupFormFields
                    formData={formData}
                    isLoading={isLoading}
                    onChange={onFormChange}
                    onSubmit={onSubmit}
                  />
                </div>
              </motion.div>
            </DialogContent>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  )
}