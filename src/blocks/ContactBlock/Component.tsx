'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useTranslations } from 'next-intl'

interface ContactBlockProps {
  title?: string
  description?: string
  phone?: string
  email?: string
}

type ContactFormFields = {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

const ContactBlock = ({
  title,
  description,
  phone = '(123) 34567890',
  email = 'email@example.com',
}: ContactBlockProps) => {
  const t = useTranslations('ContactBlock')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormFields>()
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )

  const onSubmit = async (data: ContactFormFields) => {
    try {
      setSubmissionState('loading')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmissionState('success')
      reset()
    } catch (error) {
      console.error('Failed to submit contact form', error)
      setSubmissionState('error')
    }
  }

  const resolvedTitle = title || t('titleDefault')
  const resolvedDescription = description || t('descriptionDefault')

  return (
    <section className="py-32 bg-section-bg">
      <div className="container px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">{resolvedTitle}</h1>
              <p className="text-muted-foreground">{resolvedDescription}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                {t('contactDetailsHeading')}
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">{t('labels.phone')}: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">{t('labels.email')}: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:mr-32 flex max-w-3xl flex-col gap-6 rounded-lg md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="firstname">{t('labels.firstName')}</Label>
                  <Input
                    type="text"
                    id="firstname"
                    placeholder={t('placeholders.firstName')}
                    className={`rounded-lg border-2 ${
                      errors.firstName ? 'border-destructive' : 'border-border'
                    }`}
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    {...register('firstName', {
                      required: t('validation.fieldRequired'),
                    })}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.firstName.message as string}
                    </p>
                  )}
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastname">{t('labels.lastName')}</Label>
                  <Input
                    type="text"
                    id="lastname"
                    placeholder={t('placeholders.lastName')}
                    className={`rounded-lg border-2 ${
                      errors.lastName ? 'border-destructive' : 'border-border'
                    }`}
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                    {...register('lastName', {
                      required: t('validation.fieldRequired'),
                    })}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.lastName.message as string}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">{t('labels.email')}</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder={t('placeholders.email')}
                  className={`rounded-lg border-2 ${
                    errors.email ? 'border-destructive' : 'border-border'
                  }`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  {...register('email', {
                    required: t('validation.fieldRequired'),
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: t('validation.emailInvalid'),
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message as string}</p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="subject">{t('labels.subject')}</Label>
                <Input
                  type="text"
                  id="subject"
                  placeholder={t('placeholders.subject')}
                  className={`rounded-lg border-2 ${
                    errors.subject ? 'border-destructive' : 'border-border'
                  }`}
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  {...register('subject', {
                    required: t('validation.fieldRequired'),
                  })}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.subject.message as string}
                  </p>
                )}
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">{t('labels.message')}</Label>
                <Textarea
                  placeholder={t('placeholders.message')}
                  id="message"
                  className={`rounded-lg border-2 ${
                    errors.message ? 'border-destructive' : 'border-border'
                  }`}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  {...register('message', {
                    required: t('validation.fieldRequired'),
                  })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.message.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={submissionState === 'loading'}
                  className="h-10 w-full hover:scale-105 transition-all duration-200 disabled:opacity-70"
                >
                  {submissionState === 'loading' ? '...' : t('submit')}
                </Button>
                <div aria-live="polite">
                  {submissionState === 'success' && (
                    <p className="text-sm text-emerald-500">{t('successMessage')}</p>
                  )}
                  {submissionState === 'error' && (
                    <p className="text-sm text-destructive">{t('errorMessage')}</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ContactBlock }
