import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FaqBlockProps {
  faqs: {
    question: string
    answer: string
  }[]
}

const FaqBlock: React.FC<FaqBlockProps> = (props) => {
  const { faqs } = props
  return (
    <section className="py-32 bg-section-bg">
      <div className="container px-16">
        <h2 className="mb-12 mt-2 text-xl md:text-4xl">Frequently Asked Questions</h2>
        <Accordion type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-section-bg mb-2 rounded-md border-b-0"
            >
              <AccordionTrigger className="text-left bg-section-bg dark:bg-section-bg md:text-lg hover:no-underline mb-0 pb-0">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm bg-section-bg dark:bg-section-bg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { FaqBlock }
