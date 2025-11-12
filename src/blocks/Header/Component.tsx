import { Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'

interface HeaderBlockProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="container">
        {/* Background pattern with dots */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--primary)_1px,transparent_1px)] opacity-25 [background-size:20px_20px]"></div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Badge variant="outline" className="bg-background mb-6 px-4 py-1.5 text-sm">
              Launching Soon <Sparkles className="ml-1 size-3.5" />
            </Badge>

            <h1 className=" text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">{title}</h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-xl">{description}</p>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Button size="lg" className="w-full sm:w-auto">
                <CMSLink url={buttonLink}>{buttonText}</CMSLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeaderBlock }
