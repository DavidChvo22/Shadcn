import React from 'react'

interface ExampleBlockProps {
  exampleText: string
}

export const ExampleBlock: React.FC<ExampleBlockProps> = (props) => {
  const { exampleText } = props
  return (
    <div className="container my-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-section-bg-light border border-border rounded-lg p-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Example Block</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-text-muted-dark leading-relaxed">{exampleText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
