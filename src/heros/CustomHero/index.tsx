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
    <section className="relative overflow-hidden py-32 custom-hero-gradient">
      <div className="container px-16">
        {/* Background pattern with dots */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--primary)_1px,transparent_1px)] opacity-25 [background-size:20px_20px]"></div>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            {hasTitle && titleField ? (
              <RichText
                className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-black dark:text-white md:text-4xl lg:text-6xl"
                data={titleField}
                enableGutter={false}
              />
            ) : null}
            {hasButton && buttonLabel && buttonHref && (
              <div className="mt-20 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button size="lg" variant="black-cyan" className="w-full sm:w-auto rounded-xl">
                  <CMSLink url={buttonHref}>{buttonLabel}</CMSLink>
                </Button>
                <CMSLink url={buttonHref} className="text-black dark:text-white">
                  Explore benefits -&gt;
                </CMSLink>
              </div>
            )}

            {hasDescription ? (
              descriptionString ? (
                <p className="text-muted-foreground mt-6 max-w-xl text-xl">{descriptionString}</p>
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
          <div className="bg-card text-card-foreground border border-border rounded-xl p-2 shadow-lg mt-48 mr-16 flex items-center gap-2">
            <span className="size-3 shrink-0 rounded-full bg-orange-500"></span>
            <p className="text-lg font-semibold">Dodanie už do 7 dní</p>
          </div>
        </div>
      </div>
    </section>
  )
}
export { CustomHero }
