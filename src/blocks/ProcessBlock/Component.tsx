'use client'

import { motion, useInView } from 'framer-motion'
import { CornerDownRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import type { Media, ProcessBlock as ProcessBlockProps } from '@/payload-types'

// Custom hook to get previous value
const usePrevious = <T,>(value: T): T | undefined => {
  const [prev, setPrev] = useState<T | undefined>(undefined)
  const ref = useRef(value)

  useEffect(() => {
    setPrev(ref.current)
    ref.current = value
  }, [value])

  return prev
}

const getMediaUrl = (image: ProcessBlockProps['steps'][number]['image']) => {
  if (!image) return undefined
  if (typeof image === 'string') return image
  if (typeof image === 'object') {
    const media = image as Media
    return (
      media.url ||
      media?.sizes?.large?.url ||
      media?.sizes?.medium?.url ||
      media?.sizes?.small?.url ||
      media?.sizes?.thumbnail?.url ||
      undefined
    )
  }
  return undefined
}

const ProcessBlock: React.FC<ProcessBlockProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  steps,
}) => {
  const [active, setActive] = useState<number>(0)
  const previousActive = usePrevious(active)

  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <section className="py-32">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-20 lg:items-start">
          <div className="lg:sticky lg:top-[20vh] lg:self-start h-fit w-fit gap-3 space-y-7 py-8">
            {title && (
              <h1 className="relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl">
                {title}
              </h1>
            )}
            {description && <p className="text-foreground/50 text-base">{description}</p>}
            {steps && steps.length > 0 && (
              <div className="h-90 relative overflow-hidden border">
                {active < steps.length &&
                  steps[active]?.image &&
                  getMediaUrl(steps[active].image) && (
                    <motion.div
                      initial={{ clipPath: 'inset(100% 100% 0% 0%)' }}
                      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                      key={active}
                      transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 20,
                      }}
                      className="h-full w-full"
                    >
                      <img
                        src={getMediaUrl(steps[active].image) || ''}
                        className="h-full w-full object-cover"
                        alt={steps[active]?.title || ''}
                      />
                    </motion.div>
                  )}
              </div>
            )}
            {buttonText && buttonLink && (
              <Button variant="ghost" className="flex items-center justify-start gap-2" asChild>
                <Link href={buttonLink}>
                  <CornerDownRight className="text-orange-500" />
                  {buttonText}
                </Link>
              </Button>
            )}
          </div>
          <ul className="lg:pl-22 relative w-full">
            {steps.map((step, index) => (
              <ProcessCard key={step.id || index} step={step} index={index} setActive={setActive} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

const ProcessCard = ({
  step,
  index,
  setActive,
}: {
  step: ProcessBlockProps['steps'][number]
  index: number
  setActive: (index: number) => void
}) => {
  const ref = useRef<HTMLLIElement>(null)

  const itemInView = useInView(ref, {
    amount: 0,
    margin: '0px 0px -60% 0px',
  })

  useEffect(() => {
    if (itemInView) {
      setActive(index)
    }
  }, [itemInView, index, setActive])

  return (
    <li ref={ref} className="relative flex flex-col justify-between gap-12 border-b py-8 lg:py-16">
      <div className="flex w-fit items-center justify-center px-4 py-1 text-9xl tracking-tighter">
        {step.step || `0${index + 1}`}
      </div>
      <div>
        {step.title && (
          <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">{step.title}</h3>
        )}
        {step.description && <p className="text-foreground/50">{step.description}</p>}
      </div>
    </li>
  )
}

export { ProcessBlock }
