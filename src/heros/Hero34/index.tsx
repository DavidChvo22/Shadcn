'use client'

import { ArrowRight } from 'lucide-react'
import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const Hero34: React.FC<Page['hero']> = ({
  badge,
  hero34Title,
  hero34Description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  media,
}) => {
  return (
    <section className="bg-white text-zinc-900 relative pb-[60px] md:pb-20 lg:pb-[100px]">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            {badge && <p className="text-sm font-medium text-primary">{badge}</p>}
            {hero34Title && (
              <h1 className="my-6 text-pretty text-4xl font-bold text-zinc-900 lg:text-6xl">
                {hero34Title}
              </h1>
            )}
            {hero34Description && (
              <p className="text-zinc-600 mb-8 max-w-xl lg:text-xl">{hero34Description}</p>
            )}
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {primaryButtonText && primaryButtonLink && (
                <CMSLink url={primaryButtonLink} appearance="default" className="h-10">
                  {primaryButtonText}
                  <ArrowRight className="size-4" />
                </CMSLink>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <CMSLink
                  url={secondaryButtonLink}
                  appearance="outline"
                  className="h-10 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white"
                >
                  {secondaryButtonText}
                </CMSLink>
              )}
            </div>
          </div>
          {media && typeof media === 'object' && (
            <div className="flex items-center justify-center p-8">
              <div className="max-w-md w-full overflow-hidden rounded-3xl">
                <Media resource={media} imgClassName="w-full h-auto object-contain" />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Diagonal divider at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none h-[60px] md:h-20 lg:h-[100px]"
        style={{
          background: 'linear-gradient(135deg, #5B9FE3 0%, #4A8FD3 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
          boxShadow: '0 10px 40px rgba(91, 159, 227, 0.3)',
        }}
      />
    </section>
  )
}
