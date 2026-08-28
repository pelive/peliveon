'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { Contact as ContactType } from '@/payload-types'

export const ContactBlock: React.FC<{ block: ContactType }> = ({ block }) => {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const { title, subtitle, backgroundImage, email, formFields, submitButtonText } = block

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json()

      if (response.ok) {
        setStatus('success')
        setStatusMessage(responseData.message || 'Thank you for your message!')
        const resetData: Record<string, string> = {}
        formFields?.forEach(field => {
          if (field.name) resetData[field.name] = ''
        })
        setFormData(resetData)
      } else {
        setStatus('error')
        setStatusMessage(responseData.error || 'Failed to send message.')
      }
    } catch (_error) {
      setStatus('error')
      setStatusMessage('Failed to send message. Please try again later.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const renderField = (field: {
    name?: string;
    type?: string | null;
    required?: boolean | null;
    label?: string;
    placeholder?: string;
  }) => {
    if (!field.name) return null

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            id={field.name}
            required={field.required || undefined}
            value={formData[field.name] || ''}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-lg border-0 bg-slate-800 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
            placeholder={field.label}
          />
        )
      case 'email':
        return (
          <input
            type="email"
            name={field.name}
            id={field.name}
            required={field.required || undefined}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-0 bg-slate-800 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
            placeholder={field.label}
          />
        )
      default:
        return (
          <input
            type="text"
            name={field.name}
            id={field.name}
            required={field.required || undefined}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-0 bg-slate-800 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
            placeholder={field.label}
          />
        )
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative w-full bg-zinc-900 py-32"
    >
      {backgroundImage && typeof backgroundImage === 'object' && backgroundImage.url && (
        <Image
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          src={backgroundImage.url}
          alt=""
          fill
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-zinc-950/80" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-50">
            {title}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-300">
            {subtitle}
          </p>
        </div>

        <div className="mt-16 mx-auto max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields?.map((field, index) => (
              <div key={index}>
                <label htmlFor={field.name} className="block text-sm font-medium text-slate-300">
                  {field.label}
                </label>
                {renderField(field)}
              </div>
            ))}

            <div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex w-full justify-center rounded-lg bg-red-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200 disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : submitButtonText}
              </button>
            </div>

            {(status === 'success' || status === 'error') && (
              <p
                role="alert"
                aria-live="polite"
                className={status === 'success' ? 'text-emerald-400' : 'text-rose-400'}
              >
                {statusMessage}
              </p>
            )}
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-300">
              Or reach out directly at:{' '}
              <a href={`mailto:${email}`} className="text-red-400 hover:text-red-300">
                {email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
