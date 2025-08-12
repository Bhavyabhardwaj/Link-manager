"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Home, Users, Link2, BarChart3, QrCode, Settings, ExternalLink } from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, shortcut: "⌘+1" },
    { name: "Bio Links", href: "/dashboard/bio-links", icon: Users, shortcut: "⌘+2" },
    { name: "Short Links", href: "/dashboard/short-links", icon: Link2, shortcut: "⌘+3" },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, shortcut: "⌘+4" },
    { name: "QR Codes", href: "/dashboard/qr-codes", icon: QrCode, shortcut: "⌘+5" },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, shortcut: "⌘+6" },
  ]

  const actions = [
    { name: "Create Bio Link", action: "create-bio", icon: Users, shortcut: "⌘+B" },
    { name: "Create Short Link", action: "create-short", icon: Link2, shortcut: "⌘+L" },
    { name: "Generate QR Code", action: "create-qr", icon: QrCode, shortcut: "⌘+Q" },
    { name: "View Analytics", action: "analytics", icon: BarChart3, shortcut: "⌘+A" },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      // Navigation shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key >= "1" && e.key <= "6") {
        e.preventDefault()
        const index = Number.parseInt(e.key) - 1
        if (navigation[index]) {
          router.push(navigation[index].href)
          onOpenChange(false)
        }
      }

      // Action shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault()
            // Trigger create bio link
            onOpenChange(false)
            break
          case "l":
            e.preventDefault()
            // Trigger create short link
            onOpenChange(false)
            break
          case "q":
            e.preventDefault()
            // Trigger create QR code
            onOpenChange(false)
            break
          case "a":
            e.preventDefault()
            router.push("/dashboard/analytics")
            onOpenChange(false)
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, router, onOpenChange])

  const handleSelect = (value: string) => {
    if (value.startsWith("/")) {
      router.push(value)
    } else {
      // Handle actions
      console.log("Action:", value)
    }
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search for pages, actions, or links..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigation.map((item) => (
            <CommandItem key={item.href} value={item.href} onSelect={handleSelect} className="flex items-center gap-2">
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{item.shortcut}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {actions.map((action) => (
            <CommandItem
              key={action.action}
              value={action.action}
              onSelect={handleSelect}
              className="flex items-center gap-2"
            >
              <action.icon className="w-4 h-4" />
              <span>{action.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{action.shortcut}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent Links">
          <CommandItem className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            <span>My Portfolio</span>
            <span className="ml-auto text-xs text-muted-foreground">Bio Link</span>
          </CommandItem>
          <CommandItem className="flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            <span>Product Launch</span>
            <span className="ml-auto text-xs text-muted-foreground">Short Link</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
