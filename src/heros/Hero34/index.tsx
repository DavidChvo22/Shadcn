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
    <section className="bg-zinc-950 text-white">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            {badge && <p className="text-white">{badge}</p>}
            {hero34Title && (
              <h1 className="my-6 text-pretty text-4xl font-bold text-white lg:text-6xl">
                {hero34Title}
              </h1>
            )}
            {hero34Description && (
              <p className="text-zinc-300 mb-8 max-w-xl lg:text-xl">{hero34Description}</p>
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
                  className="h-10 border-white text-white hover:bg-white hover:text-zinc-950"
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
    </section>
  )
}
