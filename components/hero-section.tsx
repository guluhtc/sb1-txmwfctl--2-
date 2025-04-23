"use client"

import { motion } from "framer-motion"
import { Instagram, MapPin, Sparkles, Languages, Clock, Users, Star, Rocket, Zap, TrendingUp, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/signup-form"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center text-center space-y-3 sm:space-y-6 pt-12 sm:pt-20 pb-6 sm:pb-12 px-4 sm:px-6 overflow-hidden"
    >
      {/* Enhanced background gradients */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-0 right-1/4 w-24 sm:w-[500px] h-24 sm:h-[500px] bg-[#FF9933]/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-24 sm:w-[500px] h-24 sm:h-[500px] bg-primary/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-[500px] h-24 sm:h-[500px] bg-[#138808]/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse" />
      </motion.div>

      {/* Top badges with enhanced design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 flex-wrap justify-center w-full max-w-3xl mx-auto px-2"
      >
        <div className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/95 backdrop-blur-sm rounded-full border shadow-sm w-full sm:w-auto">
          <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF9933] flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">भारत का #1 Instagram ग्रोथ प्लेटफॉर्म</span>
          <span className="text-base sm:text-lg">🚀</span>
        </div>
        <div className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/95 backdrop-blur-sm rounded-full border shadow-sm w-full sm:w-auto">
          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#138808] flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">2,00,000+ क्रिएटर्स की पसंद</span>
          <span className="text-base sm:text-lg">🏆</span>
        </div>
      </motion.div>

      {/* Main content with enhanced typography and messaging */}
      <div className="max-w-4xl space-y-2 sm:space-y-4 mt-2 sm:mt-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] sm:leading-[1.2] text-gray-900">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="gradient-text block py-1 sm:py-2"
          >
            Instagram पर बनें सुपरस्टार
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="block text-xl sm:text-2xl md:text-3xl text-gray-700 mt-1 sm:mt-3"
          >
            AI-Powered Growth के साथ 🎯
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed mt-1 sm:mt-3 px-2"
        >
          अपनी भाषा में बनाएं विश्वस्तरीय कंटेंट, करें स्मार्ट शेड्यूलिंग, और पाएं 10X ज़्यादा एंगेजमेंट। 
          हमारी AI टेक्नोलॉजी आपकी Instagram ग्रोथ को नई ऊंचाइयों तक ले जाएगी! ✨
        </motion.p>
      </div>

      {/* Enhanced CTA section with social proof */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center w-full max-w-xl mx-auto mt-3 sm:mt-6"
      >
        <Link href="/signup" className="w-full sm:w-auto">
          <Button
            className="w-full h-11 sm:h-12 relative overflow-hidden group bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:from-[#F77737] hover:via-[#FD1D1D] hover:to-[#833AB4] transition-all duration-500 rounded-full"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-sm sm:text-base font-medium">Start Free Trial</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
            </div>
          </Button>
        </Link>
        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
          <div className="flex -space-x-1 sm:-space-x-2">
            {[
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            ].map((src, i) => (
              <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden">
                <Image 
                  src={src} 
                  alt={`Creator ${i + 1}`}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span>2,00,000+ क्रिएटर्स जुड़ चुके हैं</span>
        </div>
      </motion.div>

      {/* Enhanced feature cards with modern design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 w-full max-w-5xl mx-auto mt-6 sm:mt-10">
        {[
          {
            icon: Languages,
            color: "#FF9933",
            title: "15+ भारतीय भाषाएं",
            subtitle: "अपनी भाषा में करें कंटेंट क्रिएशन",
            highlight: "सबसे ज़्यादा भाषाएं"
          },
          {
            icon: Zap,
            color: "primary",
            title: "स्मार्ट AI टूल्स",
            subtitle: "विश्वस्तरीय कंटेंट बनाएं मिनटों में",
            highlight: "सबसे तेज़ AI"
          },
          {
            icon: Users,
            color: "#138808",
            title: "24x7 एक्सपर्ट सपोर्ट",
            subtitle: "WhatsApp और कॉल पर तुरंत मदद",
            highlight: "सबसे अच्छा सपोर्ट"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="group relative flex items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-6 rounded-xl bg-white/95 backdrop-blur-sm border shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br from-${feature.color}/10 to-${feature.color}/20 group-hover:from-${feature.color}/20 group-hover:to-${feature.color}/30 transition-colors duration-300`}>
              <feature.icon className={`h-5 w-5 sm:h-6 sm:w-6 text-[${feature.color}]`} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-semibold text-gray-900">{feature.title}</span>
              <span className="text-xs sm:text-sm text-gray-700">{feature.subtitle}</span>
              <span className="text-[10px] sm:text-xs text-primary mt-0.5 sm:mt-1 font-medium">{feature.highlight}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced trust badges with city highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="pt-16 md:pt-24 text-center w-full"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full border shadow-sm">
              <Star className="h-4 w-4 text-[#FF9933]" />
              <p className="text-base font-medium text-gray-800">
                भारत के टॉप क्रिएटर्स की पसंद
              </p>
              <span className="text-lg">🏆</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "राहुल शर्मा",
                role: "फैशन इन्फ्लुएंसर",
                city: "मुंबई",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
                quote: "टेकीजेम ने मेरी इंस्टाग्राम ग्रोथ को 3X बढ़ा दिया है!",
                followers: "1.2M+"
              },
              {
                name: "प्रिया पटेल",
                role: "फूड ब्लॉगर",
                city: "दिल्ली",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
                quote: "AI कैप्शन जनरेटर ने मेरा काम बहुत आसान कर दिया है।",
                followers: "850K+"
              },
              {
                name: "अर्जुन मेहता",
                role: "ट्रैवल क्रिएटर",
                city: "बैंगलोर",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
                quote: "हिंदी में कंटेंट बनाना अब बहुत आसान हो गया है।",
                followers: "650K+"
              }
            ].map((creator, index) => (
              <motion.div
                key={creator.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="group relative flex flex-col items-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border hover:border-primary hover:bg-white/95 transition-all duration-300"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <Image 
                      src={creator.image} 
                      alt={creator.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                    {creator.followers}
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{creator.name}</h4>
                    <p className="text-sm text-gray-600">{creator.role}</p>
                    <p className="text-xs text-primary">{creator.city}</p>
                  </div>
                  <p className="text-sm text-gray-700 italic">"{creator.quote}"</p>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}