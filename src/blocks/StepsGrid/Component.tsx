'use client'

import React from 'react'

import type { StepsGrid as StepsGridProps } from '@/payload-types'

import { Card } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

const StepsGrid: React.FC<StepsGridProps> = ({ title, subtitle, variant = 'blue', steps }) => {
  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <section className={cn('py-16 md:py-24', variant === 'blue' && 'bg-[#0095ff] text-white')}>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">{title}</h2>
        {subtitle && <p className="mb-10 max-w-2xl text-base opacity-80 md:text-lg">{subtitle}</p>}
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <Card
              key={step.id || i}
              className={cn(
                'border-none bg-transparent p-0 shadow-none',
                variant === 'blue' && 'bg-transparent text-white',
              )}
            >
              <div className="mb-3 text-3xl font-semibold">{step.number ?? i + 1}</div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              {step.description && (
                <p className="text-sm leading-relaxed opacity-90">{step.description}</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export { StepsGrid }
