import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { Fragment } from 'react'

interface FlowBlockProps {
  steps: [
    step1: { title: string; subtitle: string; description: string },
    step2: { title: string; subtitle: string; description: string },
    step3: { title: string; subtitle: string; description: string },
  ]
  locale?: string
}

const FlowBlock = async ({ steps, locale }: FlowBlockProps) => {
  const t = await getTranslations({ locale: locale as string, namespace: 'FlowBlock' })

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
          <div className="flex h-fit items-center gap-2.5 whitespace-nowrap text-lg">
            <span
              className="size-3 shrink-0 rounded-full bg-background animate-pulse"
              style={{ animationDuration: '1.5s' }}
            ></span>
            {t('badge')}
          </div>
          <div>
            <h2 className="mb-11 text-3xl lg:text-5xl">
              <div className="flex flex-wrap items-center gap-4">
                {steps.map((step, index) => (
                  <Fragment key={step.title}>
                    <span className="rounded-full bg-background/10 px-5 py-2 text-2xl font-medium lg:text-4xl">
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <ArrowRight
                        className="size-10 text-primary-foreground/70"
                        strokeWidth={2.2}
                      />
                    )}
                  </Fragment>
                ))}
              </div>
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col gap-1 border-l border-background/30 pl-4 pr-4 md:pl-8">
                <span className="font-mono text-4xl lg:text-6xl">1</span>
                <h3 className="mt-2 text-xl font-medium">{steps[0].subtitle}</h3>
                <p className="text-primary-foreground/80  text-base mt-2 opactity-80 ">
                  {steps[0].description}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-l border-background/30 pl-4 pr-4 md:pl-8">
                <span className="font-mono text-4xl lg:text-6xl">2</span>
                <h3 className="mt-2 text-xl font-medium">{steps[1].subtitle}</h3>
                <p className="text-primary-foreground/80 text-base mt-2 opactity-80 ">
                  {steps[1].description}
                </p>
              </div>
              <div className="flex flex-col gap-1 border-l border-background/30 pl-4 pr-4 md:pl-8">
                <span className="font-mono text-4xl lg:text-6xl">3</span>
                <h3 className="mt-2 text-xl font-medium">{steps[2].subtitle}</h3>
                <p className="text-primary-foreground/80 text-base mt-2 opactity-80 ">
                  {steps[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FlowBlock }
