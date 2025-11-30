import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

import type { Page } from '@/payload-types'
import { getTranslations } from 'next-intl/server'

type RichTextField = NonNullable<Page['hero']['title']>

type CustomHeroProps = Page['hero'] & { locale?: string }

const isRichTextField = (value: unknown): value is RichTextField => {
  return Boolean(value && typeof value === 'object' && 'root' in (value as Record<string, unknown>))
}

const richTextHasContent = (value: RichTextField | undefined) => {
  return Boolean(value?.root?.children?.length)
}

const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0
}

const CustomHero = async ({
  title,
  description,
  buttonText,
  buttonLink,
  locale,
}: CustomHeroProps) => {
  const t = await getTranslations({ locale: locale as string, namespace: 'Hero.CustomHero' })

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
    <section className="relative flex min-h-screen items-center overflow-hidden custom-hero-gradient">
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

            {hasDescription ? (
              descriptionString ? (
                <p className="text-muted-foreground mt-6 max-w-3xl text-xl lg:mt-20">
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
        </div>
      </div>
    </section>
  )
}
export { CustomHero }
