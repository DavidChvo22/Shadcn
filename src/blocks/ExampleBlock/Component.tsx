import { Block } from 'payload'
import React from 'react'

interface ExampleBlockProps {
  exampleText: string
}

export const ExampleBlock: React.FC<ExampleBlockProps> = (props) => {
  const { exampleText } = props
  return (
    <div className="container my-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Block</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{exampleText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
