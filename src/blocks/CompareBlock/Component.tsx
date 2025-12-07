'use client'

import React from 'react'

import type { CompareBlock as CompareBlockProps } from '@/payload-types'

import { Separator } from '@/components/ui/separator'

const CompareBlock: React.FC<CompareBlockProps> = ({
  leftColumnTitle,
  leftColumnItems,
  rightColumnTitle,
  rightColumnItems,
}) => {
  if (
    !leftColumnItems ||
    leftColumnItems.length === 0 ||
    !rightColumnItems ||
    rightColumnItems.length === 0
  ) {
    return null
  }

  return (
    <section className="pb-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          <div className="rounded-3xl border border-y p-6 lg:rounded-r-none lg:border-r-0 lg:p-12">
            {leftColumnTitle && <h3 className="text-3xl font-medium">{leftColumnTitle}</h3>}
            <ul className="mt-9 space-y-3">
              {leftColumnItems.map((item, idx) => (
                <React.Fragment key={item.id || idx}>
                  <li className="flex items-center gap-2 text-base">{item.text}</li>
                  {idx !== leftColumnItems.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className="bg-primary text-primary-foreground rounded-3xl p-6 lg:rounded-l-none lg:p-12">
            {rightColumnTitle && <h3 className="text-3xl font-medium">{rightColumnTitle}</h3>}
            <ul className="mt-9 space-y-3">
              {rightColumnItems.map((item, idx) => (
                <React.Fragment key={item.id || idx}>
                  <li className="text-base">{item.text}</li>
                  {idx !== rightColumnItems.length - 1 && <Separator className="bg-white/30" />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export { CompareBlock }
