import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { contactFormTemplate } from '@/utilities/contactFormTemplate'

type ContactPayload = {
  firstName?: string
  lastName?: string
  email?: string
  subject?: string
  message?: string
}

const missingEnvVars = ['MAIL_HOST', 'MAIL_PORT', 'MAIL_USER', 'MAIL_PASSWORD', 'MAIL_FROM'].filter(
  (key) => !process.env[key],
)

const mailTransporter =
  missingEnvVars.length === 0
    ? nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT) || 587,
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        ...(process.env.MAIL_ENCRYPTION === 'tls' ? { requireTLS: true } : {}),
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000, // 10 seconds
        socketTimeout: 10000, // 10 seconds
        // Retry configuration
        pool: true,
        maxConnections: 1,
        maxMessages: 3,
      })
    : null

export async function POST(request: Request) {
  if (!mailTransporter) {
    console.error('Contact form: missing mail configuration variables', missingEnvVars)
    return NextResponse.json({ error: 'Mail configuration is missing' }, { status: 500 })
  }

  let body: ContactPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  const { firstName, lastName, email, subject, message } = body

  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.MAIL_USER || process.env.MAIL_FROM

  if (!adminEmail) {
    console.error('Contact form: ADMIN_EMAIL is not defined')
    return NextResponse.json({ error: 'Mail recipient is not configured' }, { status: 500 })
  }

  try {
    // Extract email address from MAIL_FROM if it contains name
    const fromEmail =
      process.env.MAIL_FROM?.match(/<(.+)>/)?.[1] || process.env.MAIL_FROM || process.env.MAIL_USER

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: adminEmail,
      replyTo: email,
      subject: subject ? `Kontaktný formulár: ${subject}` : 'Nová správa z kontaktného formulára',
      text: `
Nová správa z kontaktného formulára

Odosielateľ: ${firstName} ${lastName}
Email: ${email}
${subject ? `Predmet: ${subject}` : ''}

Správa:
${message}

---
Táto správa bola odoslaná cez kontaktný formulár na vašej webovej stránke.
      `.trim(),
      html: contactFormTemplate({
        firstName,
        lastName,
        email,
        subject: subject || '',
        message,
      }),
      headers: {
        'X-Mailer': 'Next.js Contact Form',
        'X-Priority': '3',
        Importance: 'normal',
        'List-Unsubscribe': `<mailto:${fromEmail}?subject=unsubscribe>`,
        'Message-ID': `<${Date.now()}-${Math.random().toString(36).substring(7)}@blume.sk>`,
      },
      priority: 'normal',
    }

    // Add timeout wrapper for sendMail
    const sendMailPromise = mailTransporter.sendMail(mailOptions)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email sending timeout after 15 seconds')), 15000)
    })

    const result = (await Promise.race([sendMailPromise, timeoutPromise])) as Awaited<
      ReturnType<typeof mailTransporter.sendMail>
    >

    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error) {
    console.error('Failed to send contact form email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = error instanceof Error ? error.stack : String(error)
    console.error('Error details:', errorDetails)

    // Check if it's a connection/timeout error
    const isConnectionError =
      errorMessage.includes('timeout') ||
      errorMessage.includes('ETIMEDOUT') ||
      errorMessage.includes('ECONNREFUSED') ||
      errorMessage.includes('ENOTFOUND')

    return NextResponse.json(
      {
        error: isConnectionError
          ? 'Unable to connect to email server. Please try again later or contact support.'
          : 'Unable to send message',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 },
    )
  }
}
