/* import { Button } from '@/components/ui/button'

const CTABlock = () => {
  return (
    <section className="py-32 bg-[#f5f8ff]">
      <div className="border-border relative max-w-full overflow-hidden bg-gradient-to-br from-[#f4f7ff] via-[#f8fbff] to-[#eef3ff] pt-10 md:pt-16 lg:pt-20">
        <div className="container relative flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 lg:shrink-0">
            <h3 className="mb-3 max-w-xl text-4xl font-semibold md:mb-4 md:text-5xl lg:mb-6">
              Pripravený spustiť svoj web?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg lg:text-lg">
              Už vieš, ako bude vyzerať a koľko stojí. Stačí potvrdiť objednávku a ideme na to.
            </p>
            <Button className="bg-black text-[#99f6e4] hover:bg-black/90">
              Dokončiť objednávku
            </Button>
          </div>
          <div className="relative h-full w-full md:w-1/2">
            <div className="absolute inset-y-0 right-[-18%] hidden h-full w-[140%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(125,158,255,0.18),_transparent_65%)] blur-3xl md:block"></div>
            <div className="relative mx-auto flex h-[18rem] w-[18rem] max-w-sm items-center justify-center">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[#e3eafc] shadow-[0_20px_60px_rgba(59,100,245,0.18)]" />
              <div className="absolute right-[18%] top-[-14%] h-[13rem] w-[13rem] -translate-x-1/2 rotate-[-17deg] rounded-[2.2rem] bg-[#eef3ff] shadow-[0_18px_40px_rgba(59,100,245,0.16)]" />
              <div className="absolute right-[-4%] top-[12%] h-[11.5rem] w-[11.5rem] rotate-[7deg] rounded-[2rem] bg-[#f4f8ff] shadow-[0_12px_32px_rgba(59,100,245,0.12)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { CTABlock }
 */

'use client'

interface CTABlockProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import React from 'react'

const CTABlock: React.FC<CTABlockProps> = ({ title, description, buttonText, buttonLink }) => {
  const isAnchorLink = buttonLink.startsWith('#')

  const handleAnchorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAnchorLink) return

    e.preventDefault()
    const elementId = buttonLink.slice(1)
    if (!elementId) return

    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section>
      <div className="border-border bg-primary text-primary-foreground max-w-full overflow-hidden border-y pt-10 md:pt-16 lg:pt-20">
        <div className="container px-16 relative flex flex-col md:flex-row md:space-x-12">
          <div className="mb-[18rem] md:mb-28 md:w-2/3 lg:shrink-0 xl:mb-20 xl:w-1/2">
            <h3 className="mb-3 text-4xl font-semibold md:mb-4 md:text-5xl lg:mb-6">{title}</h3>
            <p className="text-primary-foreground/80 mb-8 lg:text-lg">{description}</p>
            {isAnchorLink ? (
              <Button
                variant="secondary"
                className="h-10 bg-background text-primary hover:bg-background/90 hover:scale-105 transition-all duration-200"
                onClick={handleAnchorClick}
              >
                {buttonText}
              </Button>
            ) : (
              <Button
                asChild
                variant="secondary"
                className="h-10 bg-background text-primary hover:bg-background/90 hover:scale-105 transition-all duration-200"
              >
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
            )}
          </div>
          <div className="absolute bottom-0 right-1/2 mr-6 h-min w-[110%] max-w-md translate-x-1/2 md:-right-36 md:mr-0 md:w-3/4 md:max-w-xl md:translate-x-0 lg:mt-auto xl:relative xl:right-0 xl:h-full xl:w-full xl:max-w-full">
            <div className="aspect-[8/5] relative h-full min-h-[16rem] w-full">
              <div className="aspect-[3/5] bg-background shadow-foreground/20 absolute right-0 top-0 z-40 flex w-3/5 -translate-x-[24%] translate-y-[24%] -rotate-[30deg] items-center justify-center overflow-hidden rounded-3xl p-4 shadow-lg md:max-xl:-translate-x-[8%] md:max-xl:translate-y-[16%]">
                <div className="absolute top-4 right-4 z-50">
                  <span
                    className="size-3 rounded-full bg-primary animate-pulse"
                    style={{
                      animationDuration: '2s',
                      boxShadow: '0 0 12px rgba(30, 157, 241, 1), 0 0 20px rgba(30, 157, 241, 0.6)',
                      backgroundColor: '#1e9df1',
                    }}
                  ></span>
                </div>
                <img
                  src="/images/cta-data-work.svg"
                  alt="Data at work"
                  className="h-[130%] w-[130%] translate-x-[5%] translate-y-[-15%] object-contain"
                />
              </div>
              <div className="aspect-[3/5] bg-background shadow-foreground/20 absolute right-0 top-0 z-40 flex w-3/5 -translate-x-[16%] translate-y-[8%] -rotate-[15deg] items-center justify-center overflow-hidden rounded-3xl p-6 shadow-xl md:max-xl:-translate-x-[6%] md:max-xl:translate-y-[6%]">
                <img
                  src="/images/cta-ideas-flow.svg"
                  alt="Ideas flow"
                  className="h-[110%] w-[110%] translate-y-[-10%] object-contain"
                />
              </div>
              <div className="aspect-[3/5] bg-background shadow-foreground/20 absolute right-0 top-0 z-40 flex w-3/5 items-center justify-center overflow-hidden rounded-3xl p-6 shadow-2xl">
                <img
                  src="/images/cta-landing-page.svg"
                  alt="Landing page"
                  className="h-[90%] w-[90%] translate-y-[-15%] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { CTABlock }
