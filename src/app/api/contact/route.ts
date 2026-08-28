import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const MAX_FIELD_LENGTH = 5000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>

    const fields: Record<string, string> = {}
    for (const [key, value] of Object.entries(body)) {
      if (typeof value !== 'string') continue
      fields[key] = value.trim().slice(0, MAX_FIELD_LENGTH)
    }

    const { email, message } = fields

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a message of at least 10 characters.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    const fieldRows = Object.entries(fields)
      .map(([key, value]) => `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value).replace(/\n/g, '<br/>')}</p>`)
      .join('')

    await payload.sendEmail({
      to: process.env.CONTACT_EMAIL || 'info@pelive.be',
      replyTo: email,
      subject: `New contact form message from ${fields.name || email}`,
      html: `<h2>New contact form submission</h2>${fieldRows}`,
    })

    return NextResponse.json({ message: 'Thank you for your message! We will get back to you soon.' })
  } catch (error) {
    console.error('Error sending contact message:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 },
    )
  }
}
