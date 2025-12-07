import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { FlowBlock } from '@/blocks/FlowBlock/Component'
import { FaqBlock } from '@/blocks/FaqBlock/Component'
import { ContactBlock } from '@/blocks/ContactBlock/Component'
import { OptionsBlock } from './OptionsBlock/Component'
import { CTABlock } from '@/blocks/CTABlock/Component'
import { ReferenceBlock } from '@/blocks/ReferenceBlock/Component'
import { ConfiguratorBlock } from '@/blocks/ConfiguratorBlock/Component'
import { StepsGrid } from '@/blocks/StepsGrid/Component'
import { ExplainBlock } from '@/blocks/ExplainBlock/Component'
import { CompareBlock } from '@/blocks/CompareBlock/Component'
import { TimelineBlock } from '@/blocks/TimelineBlock/Component'
import { GalleryBlock } from '@/blocks/GalleryBlock/Component'
import { FeatureCardsBlock } from '@/blocks/FeatureCardsBlock/Component'
import { ProcessBlock } from '@/blocks/ProcessBlock/Component'
import { Gallery25Block } from '@/blocks/Gallery25Block/Component'
import { Gallery26Block } from '@/blocks/Gallery26Block/Component'

const blockComponents = {
  /* archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  exampleBlock: ExampleBlock,
  headerBlock: HeaderBlock, */
  postupBlock: FlowBlock,
  faqBlock: FaqBlock,
  contactBlock: ContactBlock,
  optionsBlock: OptionsBlock,
  ctaBlock: CTABlock,
  referenceBlock: ReferenceBlock,
  configuratorBlock: ConfiguratorBlock,
  stepsGrid: StepsGrid,
  explainBlock: ExplainBlock,
  compareBlock: CompareBlock,
  timelineBlock: TimelineBlock,
  galleryBlock: GalleryBlock,
  featureCardsBlock: FeatureCardsBlock,
  processBlock: ProcessBlock,
  gallery25Block: Gallery25Block,
  gallery26Block: Gallery26Block,
} as const

type BlockType = keyof typeof blockComponents

// Helper function to create readable slug from text
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, multiple dashes with single dash
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
}

// Helper function to convert blockType to readable format
const blockTypeToReadable = (blockType: string): string => {
  const typeMap: Record<string, string> = {
    postupBlock: 'postup',
    faqBlock: 'faq',
    contactBlock: 'kontakt',
    optionsBlock: 'možnosti',
    ctaBlock: 'cta',
    referenceBlock: 'referencie',
    configuratorBlock: 'konfigurator',
    stepsGrid: 'kroky',
    explainBlock: 'vysvetlenie',
    compareBlock: 'porovnanie',
    timelineBlock: 'timeline',
    galleryBlock: 'galeria',
    featureCardsBlock: 'feature-karty',
    processBlock: 'proces',
    gallery25Block: 'galeria-25',
    gallery26Block: 'galeria-26',
  }
  return (
    typeMap[blockType] ||
    blockType
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '')
  )
}

// Generate readable block ID
const generateBlockId = (block: any, blockType: string, index: number): string => {
  // Priority 1: Custom blockId from CMS
  if (block?.blockId) {
    return createSlug(block.blockId)
  }

  // Priority 2: blockName from CMS
  if (block?.blockName) {
    return createSlug(block.blockName)
  }

  // Priority 3: Generate from blockType (readable format)
  const readableType = blockTypeToReadable(blockType)
  return `${readableType}-${index + 1}`
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale?: string
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as BlockType]

            if (Block) {
              // Generate readable block ID
              const blockId = generateBlockId(block, blockType, index)

              // Handle blocks that accept props (postupBlock, faqBlock, contactBlock)
              // Add AOS animations - alternate between fade-up and fade-in for variety
              // Skip animations for ctaBlock, faqBlock, and contactBlock
              const shouldAnimate =
                blockType !== 'ctaBlock' && blockType !== 'faqBlock' && blockType !== 'contactBlock'
              const animationType = index % 2 === 0 ? 'fade-up' : 'fade-in'

              return (
                <div
                  key={index}
                  id={blockId}
                  className="scroll-mt-20"
                  {...(shouldAnimate && {
                    'data-aos': animationType,
                    'data-aos-delay': index * 50,
                  })}
                >
                  <Block {...(block as any)} locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
