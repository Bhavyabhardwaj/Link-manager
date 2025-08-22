"use client";

import { useRef } from "react";
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
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

function MarqueeBar() {
  const items = [
    "TechCrunch",
    "GitHub",
    "Figma",
    "Stripe",
    "AWS",
    "Netlify",
    "Vercel",
    "Notion",
    "Linear",
  ];
  return (
    <div className="overflow-hidden whitespace-nowrap py-1 bg-zinc-900/30 rounded-md select-none mt-12">
      <motion.div
        className="inline-flex text-sm font-semibold text-white gap-x-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} className="px-2 select-none cursor-default">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Dock() {
  const navItems = ["Platform", "Solutions", "Developers", "Enterprise"];
  return (
    <nav aria-label="Primary navigation" className="hidden md:flex space-x-8 text-zinc-400 text-sm">
      {navItems.map((item) => (
        <Link
          href={`/${item.toLowerCase()}`}
          key={item}
          className="relative group px-2 py-1 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
        >
          {item}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-600 transition-all group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}

function AvatarCircles() {
  const avatars = [
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/31.jpg",
    "https://randomuser.me/api/portraits/women/13.jpg",
    "https://randomuser.me/api/portraits/men/45.jpg",
    "https://randomuser.me/api/portraits/women/22.jpg",
  ];

  return (
    <ul role="list" className="flex -space-x-4" aria-label="User avatars">
      {avatars.map((src, idx) => (
        <li key={idx}>
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white dark:ring-black select-none"
          />
        </li>
      ))}
    </ul>
  );
}

function RippleButton({ href, children, variant = "primary" }) {
  return (
    <Link href={href} className="relative inline-block rounded-md overflow-hidden">
      <span
        aria-hidden="true"
        className={`absolute inset-0 ${
          variant === "primary" ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-700"
        } transition-transform origin-center scale-100 animate-ping-slow rounded-md`}
        style={{ animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      />
      <span
        className={`relative z-10 inline-flex items-center justify-center rounded-md px-6 py-3 ${
          variant === "primary" ? "text-white" : "text-gray-200"
        } font-semibold`}
      >
        {children}
      </span>
    </Link>
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
