import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { getTranslations } from 'next-intl/server'
import { Fragment } from 'react'
import { cn } from '@/utilities/ui'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'

interface FaqBlockComponentProps extends FaqBlockProps {
  locale?: string
}

const FaqBlock = async (props: FaqBlockComponentProps) => {
  const { faqs, variant = 'blue', locale } = props
  const t = await getTranslations({ locale: locale as string, namespace: 'FaqBlock' })

  const isBlue = variant === 'blue'

  return (
    <section
      className={cn(
        'py-32',
        isBlue ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground',
      )}
    >
      <div className="container px-16">
        <h2 className="mb-12 mt-2 text-xl font-bold md:text-4xl">{t('title')}</h2>
        <Accordion type="multiple">
          {faqs?.map((faq, index) => (
            <Fragment key={index}>
            <AccordionItem
              value={`item-${index}`}
                className={cn(
                  'mb-2 rounded-md border-b-0',
                  isBlue ? 'bg-background/10 border-background/20' : 'bg-background border-border',
                )}
            >
                <AccordionTrigger
                  className={cn(
                    'mb-0 bg-transparent pb-0 text-left md:text-lg hover:no-underline',
                    isBlue
                      ? 'text-primary-foreground [&>svg]:text-primary-foreground'
                      : 'text-foreground [&>svg]:text-foreground',
                  )}
                >
                {faq.question}
              </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    'bg-transparent pt-4 pb-0 text-sm',
                    isBlue ? 'text-primary-foreground/80' : 'text-foreground',
                  )}
                >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
              <div className={cn('h-px w-full', isBlue ? 'bg-white/30' : 'bg-border')} />
            </Fragment>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { FaqBlock }
