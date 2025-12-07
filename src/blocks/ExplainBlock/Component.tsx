'use client'

import React from 'react'

import type { ExplainBlock as ExplainBlockProps } from '@/payload-types'

const ExplainBlock: React.FC<ExplainBlockProps> = ({ badge, title, description, items }) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className="bg-zinc-900 text-white mb-16 lg:mb-24">
      <div className="container m-x-auto flex flex-col gap-20 pt-16 pb-32 lg:flex-row">
        <div className="w-full max-w-[500px] rounded-3xl px-6 pb-6 lg:px-12 lg:pb-12">
          {title && (
            <div className=" text-white mb-8 rounded-3xl p-6">
              <h2 className="text-5xl font-semibold">{title}</h2>
            </div>
          )}
          {badge && <span className="text-zinc-300 text-sm uppercase">{badge}</span>}
          {description && <p className="text-zinc-300 text-xl">{description}</p>}
        </div>
        <div className="flex flex-col gap-14 lg:gap-20">
          {items.map((item, index) => (
            <div className="relative pl-4" key={item.id || index}>
              <div className="bg-linear-to-b absolute left-0 top-0 h-full w-1 from-blue-500 to-purple-500" />
              {item.title && <p className="mb-1 text-xl font-medium">{item.title}</p>}
              {item.description && <p className="text-base text-zinc-200">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ExplainBlock }
