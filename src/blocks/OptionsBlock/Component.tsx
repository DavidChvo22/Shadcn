'use client'

import React from 'react'

import type { OptionsBlock as OptionsBlockProps } from '@/payload-types'

import { Check, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const OptionsBlock: React.FC<OptionsBlockProps> = ({
  title,
  description,
  checkedItems,
  buttonText,
  buttonLink,
}) => {
  if (!checkedItems || checkedItems.length === 0) {
    return null
  }

  return (
    <section className="bg-section-bg py-32">
      <div className="container px-16">
        <div className="flex flex-col items-start gap-20 md:flex-row md:items-center">
          <div className="w-full lg:w-[50%]">
            <h2 className="mb-8 text-3xl font-bold">{title || ''}</h2>
            {description && <p className="mb-10">{description}</p>}
            <ul className="text-muted-foreground mb-8 flex flex-col gap-2">
              {checkedItems.map((checkedItem, index) => (
                <li className="flex items-center gap-2" key={checkedItem.id || `item-${index}`}>
                  <Check className="size-5" /> {checkedItem.item || ''}
                </li>
              ))}
            </ul>
            {buttonText && buttonLink && (
              <Button className="bg-transparent rounded-xl" variant="outline">
                <Link href={buttonLink}>{buttonText}</Link>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="before:bg-primary/20 relative flex h-[430px] w-full p-4 before:absolute before:inset-0 before:[mask-image:url(https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg)] before:[mask-repeat:repeat] before:[mask-size:32px_32px]">
            <div className="z-1 to-background absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent opacity-30"></div>
            <div className="relative z-10 m-auto w-[80%]">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder hero"
                className="max-h-[350px] w-full rounded-md object-cover"
              ></img>
            </div>
            <div className="z-5 bg-linear-to-r from-background/50 to-background/50 absolute inset-0 via-transparent"></div>
            <div className="z-5 bg-linear-to-t from-background/50 to-background/50 absolute inset-0 via-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { OptionsBlock }
