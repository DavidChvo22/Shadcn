import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { FlowBlock } from '@/blocks/FlowBlock/Component'
import { FaqBlock } from '@/blocks/FaqBlock/Component'
import { ContactBlock } from '@/blocks/ContactBlock/Component'
import { OptionsBlock } from './OptionsBlock/Component'
import { CTABlock } from '@/blocks/CTABlock/Component'
import { ReferenceBlock } from '@/blocks/ReferenceBlock/Component'

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
} as const

type BlockType = keyof typeof blockComponents

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as BlockType]

            if (Block) {
              // Handle blocks that accept props (postupBlock, faqBlock, contactBlock)
              return (
                <div key={index}>
                  <Block {...(block as any)} />
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
