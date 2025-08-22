"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  ArrowRight,
  Sparkles,
  BarChart3,
  Users,
  QrCode,
  Shield,
  Globe,
  Cpu,
  Star,
  Link as LinkIcon,
  Play,
  CheckCircle,
  TrendingUp,
  Target,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Modern SaaS Navigation
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl bg-black/80 border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2.5 rounded-xl">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            LinkWeaver
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-slate-300 hover:text-white transition-colors font-medium">Features</Link>
          <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors font-medium">Pricing</Link>
          <Link href="/docs" className="text-slate-300 hover:text-white transition-colors font-medium">Docs</Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" asChild className="text-slate-300 hover:text-white">
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
            <Link href="/auth/signup">Get Started <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

const FEATURES = [
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: "AI Analytics",
    description: "Deep insights powered by machine learning.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Adaptive Bio Pages",
    description: "Personalization for your audience in real-time.",
    gradient: "from-pink-500 to-red-600",
  },
  {
    icon: <QrCode className="w-7 h-7" />,
    title: "Next-Gen QR Codes",
    description: "Dynamic, trackable and interactive codes.",
    gradient: "from-green-500 to-emerald-600",
  },
];

const TESTIMONIALS = [
  {
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Sarah Chen",
    role: "Head of Growth",
    quote:
      "The AI-driven analytics helped us improve conversions by over 300%!",
    rating: 5,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    name: "Marcus Rodriguez",
    role: "Marketing Lead",
    quote: "Unmatched security and performance. Highly recommend!",
    rating: 5,
  },
];

export default function LinkWeaverLanding() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0]);

  return (
    <main className="bg-black text-white min-h-screen font-sans antialiased relative">
      {/* Navigation */}
      <nav className="fixed w-full top-0 left-0 right-0 z-50 backdrop-blur bg-black/80 border-b border-gray-900/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-2 shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent select-none">
              LinkWeaver
            </span>
          </Link>
          <Dock />
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/signin" className="px-3 py-1 rounded hover:bg-white/10 transition">
              Sign in
            </Link>
            <RippleButton href="/signup">Get Started</RippleButton>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={containerRef}
        className="min-h-screen flex flex-col items-center justify-center text-center relative px-6 pt-24"
      >
        <motion.div style={{ translateY, opacity }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 mx-auto rounded-full bg-purple-700/80 px-3 py-1 select-none shadow-lg text-sm">
            <Sparkles />
            Trusted by 250,000+ creators
          </div>
          <h1 className="text-6xl font-extrabold leading-tight select-text">
            Build your{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
              digital empire
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 font-light max-w-xl mx-auto">
            Powerful, AI-driven link management for creators and teams.
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <RippleButton href="/signup">
              Start Free Trial <ArrowRight className="ml-2" />
            </RippleButton>
            <Button variant="outline" size="md" className="flex items-center gap-2">
              <Sparkles />
              Watch Demo
            </Button>
          </div>
          <MarqueeBar />
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 py-20">
        {FEATURES.map(({ icon, title, description, gradient }) => (
          <motion.div
            key={title}
            className="rounded-xl bg-zinc-900 p-8 shadow-lg cursor-pointer transition hover:shadow-2xl"
            whileHover={{ scale: 1.05, translateY: -8 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center justify-center p-3 rounded-lg shadow-md mb-6 text-white bg-gradient-to-br ${gradient}`}
            >
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </motion.div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-zinc-800 rounded-xl">
        <h2 className="text-4xl font-semibold text-center mb-10">Hear from users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {TESTIMONIALS.map(({ avatar, name, role, quote, rating }) => (
            <motion.blockquote
              key={name}
              className="bg-zinc-900 p-6 rounded-lg shadow-md flex flex-col gap-6 cursor-pointer"
              whileHover={{ scale: 1.03, translateY: -6 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={avatar}
                  alt={`${name} avatar`}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-semibold">{name}</div>
                  <div className="text-gray-400 text-sm">{role}</div>
                </div>
              </div>
              <p className="text-gray-300">{quote}</p>
              <div className="flex gap-1" aria-label={`${rating} star rating`}>
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto py-10 px-6 flex flex-col md:flex-row justify-between items-center text-zinc-400 text-sm mt-[6rem] space-y-4 md:space-y-0">
        <div>© 2025 LinkWeaver — Crafted for the modern creator</div>
        <nav className="flex space-x-6">
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
      </footer>
    </main>
  );
}
