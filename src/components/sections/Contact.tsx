'use client'

import Image from 'next/image'
import React, { useState } from 'react'

type ContactField = {
  name: string
  label: string
  type?: 'text' | 'email' | 'textarea' | null
  required?: boolean | null
  id?: string | null
}

type SocialLink = {
  label: string
  url: string
  id?: string | null
}

type ContactData = {
  enable?: boolean | null
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  backgroundImage?: {
    url?: string | null
  } | number | null
  email: string
  formFields?: ContactField[] | null
  submitButtonText?: string | null
}

const fieldClasses =
  'w-full box-border bg-ink-field border border-white/15 text-white text-base px-4 py-3.5 transition-colors focus:border-accent focus:outline-2 focus:outline-accent/35 focus:outline-offset-1 placeholder:text-zinc-500'

export function Contact({
  data,
  socialLinks,
}: {
  data: ContactData
  socialLinks?: SocialLink[] | null
}) {
  const fields = data?.formFields || []
  const initialData = fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.name] = ''
    return acc
  }, {})

  const [formData, setFormData] = useState<Record<string, string>>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  if (!data?.enable) return null

  const backgroundUrl =
    data.backgroundImage && typeof data.backgroundImage === 'object'
      ? data.backgroundImage.url
      : null

  const socials =
    socialLinks && socialLinks.length > 0
      ? socialLinks
      : [
          { label: 'Instagram', url: 'https://instagram.com/peliveon' },
          { label: 'Facebook', url: 'https://facebook.com/peliveon' },
          { label: 'TikTok', url: 'https://tiktok.com/@peliveon' },
          { label: 'YouTube', url: 'https://youtube.com/@pelive' },
        ]

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
        return ''
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.length < 10) return 'Message must be at least 10 characters'
        return ''
      default:
        return !value.trim() ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors: Record<string, string> = {}
    Object.keys(formData).forEach((key) => {
      const field = fields.find((f) => f.name === key)
      if (field && !field.required && !formData[key]) return
      const error = validateField(key, formData[key] || '')
      if (error) errors[key] = error
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(responseData.message)
        setFormData(initialData)
        setFieldErrors({})
      } else {
        setSubmitStatus('error')
        setSubmitMessage(responseData.error || 'Failed to send message')
      }
    } catch (_error) {
      setSubmitStatus('error')
      setSubmitMessage('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-ink py-24 lg:py-36">
      {backgroundUrl && (
        <div className="absolute inset-y-0 right-0 w-[42%]" aria-hidden="true">
          <Image
            src={backgroundUrl}
            alt=""
            fill
            sizes="42vw"
            className="object-cover object-[50%_30%] opacity-20"
          />
        </div>
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink from-45% to-ink/70"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-[90rem] grid-cols-1 items-start gap-14 px-5 sm:px-10 lg:grid-cols-[1fr_1.25fr] lg:gap-24 lg:px-16">
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-accent">
            {data.eyebrow || 'Book us'}
          </p>
          <h2 className="mb-6 font-display text-4xl font-bold leading-none tracking-[-0.03em] text-white sm:text-5xl">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="mb-10 max-w-[44ch] text-lg leading-relaxed text-zinc-400">{data.subtitle}</p>
          )}
          <div className="flex flex-col gap-5 border-t border-white/10 pt-7">
            <div>
              <p className="mb-1.5 text-[11px] uppercase tracking-[0.2em] text-zinc-500">Booking</p>
              <a
                href={`mailto:${data.email}`}
                className="font-display text-xl font-medium text-stone-100 no-underline transition-colors hover:text-accent sm:text-[1.375rem]"
              >
                {data.email}
              </a>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] uppercase tracking-[0.2em] text-zinc-500">Follow</p>
              <p className="m-0 flex flex-wrap gap-4 font-display text-sm uppercase tracking-[0.1em]">
                {socials.map((social) => (
                  <a
                    key={social.id || social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 no-underline transition-colors hover:text-accent"
                  >
                    {social.label}
                  </a>
                ))}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 border border-white/10 bg-ink-panel p-6 sm:p-11"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.id || field.name}
                className={
                  field.type === 'textarea' ? 'flex flex-col gap-2 md:col-span-2' : 'flex flex-col gap-2'
                }
              >
                <label
                  htmlFor={field.name}
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400"
                >
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required || undefined}
                    rows={6}
                    aria-required={field.required || undefined}
                    aria-describedby={fieldErrors[field.name] ? `${field.name}-error` : undefined}
                    className={`${fieldClasses} resize-y`}
                  />
                ) : (
                  <input
                    type={field.type === 'email' ? 'email' : 'text'}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required || undefined}
                    aria-required={field.required || undefined}
                    aria-describedby={fieldErrors[field.name] ? `${field.name}-error` : undefined}
                    className={fieldClasses}
                  />
                )}
                {fieldErrors[field.name] && (
                  <p id={`${field.name}-error`} className="m-0 text-sm text-rose-400" role="alert">
                    {fieldErrors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-[3.5rem] items-center justify-center self-start bg-accent px-9 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            aria-describedby={submitStatus !== 'idle' ? 'submit-status' : undefined}
          >
            {isSubmitting ? 'Sending…' : data.submitButtonText || 'Send Message'}
          </button>

          {submitStatus !== 'idle' && (
            <p
              id="submit-status"
              role="alert"
              aria-live="polite"
              className={`m-0 border px-5 py-4 text-[15px] ${
                submitStatus === 'success'
                  ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-200'
                  : 'border-accent/35 bg-accent/10 text-rose-300'
              }`}
            >
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
