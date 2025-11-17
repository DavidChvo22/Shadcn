interface FlowBlockProps {
  steps: [
    step1: { title: string; subtitle: string; description: string },
    step2: { title: string; subtitle: string; description: string },
    step3: { title: string; subtitle: string; description: string },
  ]
}

const FlowBlock: React.FC<FlowBlockProps> = ({ steps }) => {
  return (
    <section className="py-32 bg-section-bg">
      <div className="container px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
          <div className="flex h-fit items-center gap-2.5 whitespace-nowrap text-lg">
            <span className="size-3 shrink-0 rounded-full bg-primary"></span>
            Začnite Dnes
          </div>
          <div>
            <h2 className="mb-11 text-3xl lg:text-5xl">
              {steps[0].title} -&gt; {steps[1].title} -&gt; {steps[2].title}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col gap-1 border-l pl-4 pr-4 md:pl-8">
                <span className="font-mono text-4xl lg:text-6xl">1</span>
                <h3 className="mt-2 text-xl font-medium">{steps[0].subtitle}</h3>
                <p className="text-muted-foreground text-sm">{steps[0].description}</p>
              </div>
              <div className="flex flex-col gap-1 border-l pl-4 pr-4 md:pl-8">
                <span className="font-mono text-4xl lg:text-6xl">2</span>
                <h3 className="mt-2 text-xl font-medium">{steps[1].subtitle}</h3>
                <p className="text-muted-foreground text-sm">{steps[1].description}</p>
              </div>
              <div className="flex flex-col gap-1 border-l pl-4 pr-4 md:pl-8">
                <span className="font-mono text-4xl lg:text-6xl">3</span>
                <h3 className="mt-2 text-xl font-medium">{steps[2].subtitle}</h3>
                <p className="text-muted-foreground text-sm">{steps[2].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FlowBlock }
