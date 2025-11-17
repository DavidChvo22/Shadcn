import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

import type { Page } from '@/payload-types'

type RichTextField = NonNullable<Page['hero']['title']>

type CustomHeroProps = Page['hero']

const isRichTextField = (value: unknown): value is RichTextField => {
  return Boolean(value && typeof value === 'object' && 'root' in (value as Record<string, unknown>))
}

const richTextHasContent = (value: RichTextField | undefined) => {
  return Boolean(value?.root?.children?.length)
}

const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0
}

const CustomHero: React.FC<CustomHeroProps> = ({ title, description, buttonText, buttonLink }) => {
  const titleField = isRichTextField(title) ? title : undefined
  const hasTitle = richTextHasContent(titleField)

  const descriptionString = isNonEmptyString(description) ? description : undefined
  const descriptionField = isRichTextField(description) ? description : undefined
  const hasDescription = Boolean(descriptionString) || richTextHasContent(descriptionField)

  const buttonLabel = isNonEmptyString(buttonText) ? buttonText.trim() : undefined
  const buttonHref = isNonEmptyString(buttonLink) ? buttonLink.trim() : undefined
  const hasButton = Boolean(buttonLabel && buttonHref)

  if (!hasTitle && !hasDescription && !hasButton) return null

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-32 custom-hero-gradient">
      <div className="container relative px-16">
        {/* Background pattern with dots */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--primary)_1px,transparent_1px)] opacity-25 [background-size:20px_20px]"></div>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-4xl">
            {hasTitle && titleField ? (
              <RichText
                className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-foreground md:text-4xl lg:text-7xl"
                data={titleField}
                enableGutter={false}
              />
            ) : null}
            {hasButton && buttonLabel && buttonHref && (
              <div className="mt-20 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button size="lg" className="w-full sm:w-auto rounded-xl">
                  <CMSLink url={buttonHref}>{buttonLabel}</CMSLink>
                </Button>
                <CMSLink url={buttonHref} className="text-foreground">
                  Explore benefits -&gt;
                </CMSLink>
              </div>
            )}

            {hasDescription ? (
              descriptionString ? (
                <p className="text-muted-foreground mt-12 max-w-3xl text-xl lg:mt-40">
                  {descriptionString}
                </p>
              ) : (
                descriptionField && (
                  <RichText
                    className="text-muted-foreground mt-6 max-w-xl text-xl"
                    data={descriptionField}
                    enableGutter={false}
                  />
                )
              )
            ) : null}
          </div>
          <div className="bg-primary text-primary-foreground mt-12 flex items-center gap-2 rounded-xl p-3 shadow-lg md:absolute md:bottom-12 md:right-16 md:mt-0">
            <span className="size-3 shrink-0 p-2 rounded-full bg-accent"></span>
            <span className="text-lg font-semibold">Dodanie už do 7 dní</span>
          </div>
        </div>
      </div>
    </section>
  )
}
export { CustomHero }
