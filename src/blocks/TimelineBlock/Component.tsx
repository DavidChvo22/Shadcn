'use client'

import {
  Cloud,
  Sparkles,
  Users,
  XCircle,
  Zap,
  Check,
  Star,
  Heart,
  Settings,
  Rocket,
} from 'lucide-react'
import React from 'react'

import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'

const iconMap = {
  cloud: Cloud,
  xcircle: XCircle,
  users: Users,
  sparkles: Sparkles,
  zap: Zap,
  check: Check,
  star: Star,
  heart: Heart,
  settings: Settings,
  rocket: Rocket,
}

const TimelineBlock: React.FC<TimelineBlockProps> = ({
  title,
  highlightedText,
  titleBeforeHighlight,
  description,
  items,
}) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className="bg-white text-zinc-900 py-32">
      <div className="container">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Fixed Content */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                {titleBeforeHighlight && `${titleBeforeHighlight} `}
                {highlightedText && (
                  <span className="relative inline-block">
                    <span className="text-zinc-800">{highlightedText}</span>
                    <Sparkles className="absolute -right-4 -top-2 size-5 fill-yellow-500 stroke-none" />
                  </span>
                )}
                {title && (
                  <>
                    <br />
                    {title}
                  </>
                )}
              </h2>
              {description && <p className="text-zinc-600 mt-12 text-base">{description}</p>}
            </div>
          </div>

          {/* Right Column - Scrollable Cards */}
          <div className="-mt-8 sm:-mt-12">
            {items.map((item, index) => {
              const IconComponent = item.icon ? iconMap[item.icon as keyof typeof iconMap] : Cloud

              return (
                <div
                  key={item.id || index}
                  className="bg-zinc-700 text-white relative my-12 overflow-hidden rounded-2xl px-8 py-16 shadow-none sm:px-12 sm:py-24 lg:px-16 lg:py-32"
                >
                  <div className="gap-4 sm:gap-6">
                    <div className="block shrink-0">
                      {IconComponent && (
                        <IconComponent strokeWidth={1.5} className="size-12 text-primary" />
                      )}
                    </div>
                    <div className="absolute right-12 top-12 font-mono text-5xl text-white">
                      0{index + 1}
                    </div>
                    <div className="mt-6">
                      {item.title && (
                        <h4 className="mb-2 text-2xl font-semibold text-white">{item.title}</h4>
                      )}
                      {item.description && (
                        <p className="mt-6 text-xs text-zinc-100 sm:text-base">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { TimelineBlock }
