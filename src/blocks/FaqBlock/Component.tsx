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
    <section className="py-32 bg-[#e2e8f0]">
      <div className="container px-16">
        <h2 className="mb-12 mt-2 text-xl md:text-4xl">Frequently Asked Questions</h2>
        <Accordion type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-muted mb-2 rounded-md border-b-0"
            >
              <AccordionTrigger className="text-left bg-[#e2e8f0] md:text-lg hover:no-underline mb-0 pb-0">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm bg-[#e2e8f0]">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { FaqBlock }
