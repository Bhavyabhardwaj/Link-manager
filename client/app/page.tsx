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
  Check,
  Copy,
  MessageCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Hero Section with Modern Design
function HeroSection() {
  const [stats, setStats] = useState({ links: 0, clicks: 0, users: 0 });

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const increment = 50;
      const targetStats = { links: 2847, clicks: 156789, users: 1249 };
      
      let current = { links: 0, clicks: 0, users: 0 };
      const timer = setInterval(() => {
        current.links = Math.min(current.links + Math.ceil(targetStats.links / (duration / increment)), targetStats.links);
        current.clicks = Math.min(current.clicks + Math.ceil(targetStats.clicks / (duration / increment)), targetStats.clicks);
        current.users = Math.min(current.users + Math.ceil(targetStats.users / (duration / increment)), targetStats.users);
        
        setStats({ ...current });
        
        if (current.links === targetStats.links && current.clicks === targetStats.clicks && current.users === targetStats.users) {
          clearInterval(timer);
        }
      }, increment);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {/* Floating Gradients - Linear inspired */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge variant="secondary" className="mb-8 bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2 text-violet-400" />
            Trusted by 50,000+ creators
          </Badge>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            The future of
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            link management
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Transform how you share content with intelligent link optimization,
          <br className="hidden md:block" />
          real-time analytics, and beautiful bio pages that convert.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button size="lg" asChild className="bg-white text-black hover:bg-gray-100 border-0 px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
            <Link href="/auth/signup">
              Start for free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-gray-700 text-gray-300 hover:bg-white/5 hover:border-gray-600 px-8 py-6 text-lg backdrop-blur-sm">
            <Link href="#demo">
              <Play className="mr-2 w-5 h-5" />
              See it in action
            </Link>
          </Button>
        </motion.div>

        {/* Stats - Notion inspired */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
              {stats.links.toLocaleString()}+
            </div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">Links created</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              {stats.clicks.toLocaleString()}+
            </div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">Total clicks</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {stats.users.toLocaleString()}+
            </div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">Active users</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
        isScrolled ? 'backdrop-blur-xl bg-slate-950/80 border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-r from-violet-500 to-purple-500 p-2.5 rounded-xl">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            LinkWeaver
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-400 hover:text-white transition-colors font-medium">Features</Link>
          <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors font-medium">Pricing</Link>
          <Link href="/docs" className="text-gray-400 hover:text-white transition-colors font-medium">Docs</Link>
          <Link href="/changelog" className="text-gray-400 hover:text-white transition-colors font-medium">Changelog</Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-white/5">
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Button asChild className="bg-white text-black hover:bg-gray-100 border-0 font-medium">
            <Link href="/auth/signup">Get Started <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Track performance with granular insights, conversion funnels, and cohort analysis",
      stats: "99.9% accuracy",
      gradient: "from-violet-500/10 to-purple-500/10"
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "Smart QR Codes",
      description: "Dynamic QR codes that adapt to context, device, and user preferences",
      stats: "50M+ scans",
      gradient: "from-emerald-500/10 to-teal-500/10"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Bio Link Pages",
      description: "Conversion-optimized landing pages with A/B testing and personalization",
      stats: "4.2x higher CTR",
      gradient: "from-amber-500/10 to-orange-500/10"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "SOC 2 Type II compliance with advanced threat detection and prevention",
      stats: "Bank-grade security",
      gradient: "from-rose-500/10 to-pink-500/10"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Edge Network",
      description: "Sub-50ms redirects from 200+ locations worldwide with 99.99% uptime",
      stats: "<50ms latency",
      gradient: "from-cyan-500/10 to-blue-500/10"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Developer API",
      description: "GraphQL and REST APIs with webhooks, real-time events, and SDKs",
      stats: "99.99% SLA",
      gradient: "from-indigo-500/10 to-violet-500/10"
    }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-slate-950 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mb-6 bg-white/5 text-gray-300 border-white/10 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2 text-violet-400" />
            Powerful Features
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Built for the
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              modern creator
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Every feature designed to help you optimize, analyze, and scale your content distribution strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="p-8 bg-white/[0.02] border-white/10 hover:bg-white/[0.05] transition-all duration-500 group-hover:scale-[1.02] backdrop-blur-sm h-full">
                <div className={`mb-6 p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl w-fit border border-white/5`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed font-light">
                  {feature.description}
                </p>
                <Badge variant="outline" className="border-gray-700 text-gray-300 bg-gray-800/50">
                  {feature.stats}
                </Badge>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Interactive Demo Section
function InteractiveDemoSection() {
  const [activeTab, setActiveTab] = useState("shorten");
  const [inputUrl, setInputUrl] = useState("https://example.com/very-long-url");
  const [shortUrl, setShortUrl] = useState("lw.co/abc123");

  return (
    <section id="demo" className="py-32 px-6 relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/5 via-transparent to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              See it in action
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Experience the power of intelligent link management
          </p>
        </motion.div>

        <motion.div
          className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Original URL
                </label>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="Enter your long URL"
                />
              </div>
              
              <motion.div 
                className="flex items-center justify-center py-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="p-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full">
                  <ArrowRight className="w-6 h-6 text-violet-400" />
                </div>
              </motion.div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Shortened URL
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="flex-1 px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white"
                  />
                  <Button size="sm" className="bg-white text-black hover:bg-gray-100 px-4 py-4">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-violet-400" />
                  Real-time Analytics
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Clicks</span>
                    <span className="text-2xl font-bold text-white">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Today</span>
                    <span className="text-lg font-semibold text-emerald-400">+23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Conversion Rate</span>
                    <span className="text-lg font-semibold text-violet-400">4.2%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-emerald-400" />
                  Global Reach
                </h4>
                <div className="space-y-3">
                  {[
                    { country: "United States", percentage: 45, color: "violet" },
                    { country: "United Kingdom", percentage: 23, color: "emerald" },
                    { country: "Canada", percentage: 18, color: "amber" },
                    { country: "Australia", percentage: 14, color: "rose" }
                  ].map((item) => (
                    <div key={item.country} className="flex items-center space-x-3">
                      <span className="text-sm text-gray-400 flex-1">{item.country}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 h-2 rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-white w-8">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Head of Growth at TechFlow",
      avatar: "/placeholder-user.jpg",
      content: "LinkWeaver transformed our link management strategy. The analytics insights helped us optimize our conversion funnel and increase click-through rates by 340%.",
      rating: 5,
      company: "TechFlow"
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director at StartupX",
      avatar: "/placeholder-user.jpg", 
      content: "The QR code feature is incredible. We've integrated it into all our offline campaigns and can track performance in real-time. Game changer for attribution.",
      rating: 5,
      company: "StartupX"
    },
    {
      name: "Emily Watson",
      role: "Content Creator",
      avatar: "/placeholder-user.jpg",
      content: "As a creator with multiple income streams, the bio link page is perfect. Clean, customizable, and the analytics help me understand my audience better.",
      rating: 5,
      company: "Independent"
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Loved by creators worldwide
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join thousands of creators and businesses who trust LinkWeaver
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="p-8 bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-purple-500/5 to-transparent" />
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Ready to scale
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              your reach?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of creators, businesses, and enterprises who trust LinkWeaver 
            to power their content distribution strategy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="bg-white text-black hover:bg-gray-100 border-0 px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
              <Link href="/auth/signup">
                Start for free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-gray-700 text-gray-300 hover:bg-white/5 hover:border-gray-600 px-8 py-6 text-lg backdrop-blur-sm">
              <Link href="/contact">
                <MessageCircle className="mr-2 w-5 h-5" />
                Talk to sales
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "API", "Integrations", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press", "Brand"],
    Resources: ["Documentation", "Help Center", "Community", "Status", "Security"],
    Legal: ["Privacy", "Terms", "GDPR", "Compliance"]
  };

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-slate-950 to-black backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-75" />
                <div className="relative bg-gradient-to-r from-violet-500 to-purple-500 p-2.5 rounded-xl">
                  <LinkIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                LinkWeaver
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed font-light">
              The intelligent link management platform that scales with your business. 
              Transform how you share and track content across the web.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:bg-white/5 hover:text-white">
                <Globe className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-gray-700 text-gray-400 hover:bg-white/5 hover:text-white">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-white transition-colors font-light">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm font-light">
            © 2025 LinkWeaver. Crafted with care for the modern web.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LinkWeaverLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <InteractiveDemoSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
