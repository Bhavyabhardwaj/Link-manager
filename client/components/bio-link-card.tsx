'use client'

import { memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, BarChart3 } from "lucide-react"

interface BioLinkCardProps {
  link: {
    id: string
    title: string
    url: string
    description?: string
    clicks: number
    icon?: string
    active: boolean
  }
  onEdit: (link: any) => void
  onDelete: (id: string) => void
}

// Memoized component to prevent unnecessary re-renders
export const BioLinkCard = memo(function BioLinkCard({ link, onEdit, onDelete }: BioLinkCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{link.icon || '🔗'}</span>
            <CardTitle className="text-base font-medium">{link.title}</CardTitle>
          </div>
          <Badge variant={link.active ? "default" : "secondary"}>
            {link.active ? "Active" : "Inactive"}
          </Badge>
        </div>
        {link.description && (
          <CardDescription className="text-sm text-muted-foreground">
            {link.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              {link.clicks.toLocaleString()} clicks
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              Visit
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

export default BioLinkCard
