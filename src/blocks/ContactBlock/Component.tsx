import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ContactBlockProps {
  title?: string
  description?: string
  phone?: string
  email?: string
  web?: { label: string; url: string }
}

const ContactBlock = ({
  title = 'Contact Us',
  description = 'We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!',
  phone = '(123) 34567890',
  email = 'email@example.com',
  web = { label: 'shadcnblocks.com', url: 'https://shadcnblocks.com' },
}: ContactBlockProps) => {
  return (
    <section className="py-32 bg-[#e2e8f0]">
      <div className="container px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="underline">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mr-32 flex max-w-3xl flex-col gap-6 rounded-lg p-10">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  className="border-purple-300 rounded-lg"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  className="border-purple-300 rounded-lg"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="border-purple-300 rounded-lg"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                placeholder="Subject"
                className="border-purple-300 rounded-lg"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                className="border-purple-300 rounded-lg"
              />
            </div>
            <Button className="w-full" variant="black-cyan">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ContactBlock }
