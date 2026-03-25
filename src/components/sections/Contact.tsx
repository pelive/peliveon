'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

type ContactField = {
  name: string
  label: string
  type?: 'text' | 'email' | 'textarea' | null
  required?: boolean | null
  id?: string | null
}

type ContactData = {
  enable?: boolean | null
  title: string
  subtitle?: string | null
  backgroundImage?: {
    url?: string | null
  } | number | null
  email: string
  formFields?: ContactField[] | null
  submitButtonText?: string | null
}

export function Contact({ data }: { data: ContactData }) {
  if (!data?.enable) return null

  const fields = data.formFields || []
  const initialData = fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.name] = ''
    return acc
  }, {})

  const [formData, setFormData] = useState<Record<string, string>>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

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
    <section id="contact" className="relative bg-zinc-950 py-32">
      {data.backgroundImage && typeof data.backgroundImage === 'object' && data.backgroundImage.url && (
        <Image
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          src={data.backgroundImage.url}
          alt=""
          fill
          unoptimized
        />
      )}
      <div className="absolute inset-0 bg-zinc-950/80" />
      <Container>
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-50 mb-6">
              {data.title}
            </h2>
            <p className="mt-4 font-bold tracking-tight text-lg sm:text-xl text-white max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl p-12 rounded-3xl border border-zinc-800 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fields.map((field) => (
                  <div
                    key={field.id || field.name}
                    className={field.type === 'textarea' ? 'space-y-2 md:col-span-2' : 'space-y-2'}
                  >
                    <label htmlFor={field.name} className="block text-sm font-medium text-zinc-300 uppercase tracking-wide">
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
                        className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200 resize-none"
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
                        className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200"
                      />
                    )}
                    {fieldErrors[field.name] && (
                      <p id={`${field.name}-error`} className="text-rose-400 text-sm mt-1" role="alert">
                        {fieldErrors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 text-base font-medium relative"
                  aria-describedby={submitStatus !== 'idle' ? 'submit-status' : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (data.submitButtonText || 'Send Message')}
                </Button>
              </div>
            </form>

            {submitStatus !== 'idle' && (
              <div
                id="submit-status"
                className={`mt-6 p-6 rounded-xl border ${
                  submitStatus === 'success'
                    ? 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-200 border-rose-500/20'
                }`}
                role="alert"
                aria-live="polite"
              >
                {submitMessage}
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-300 text-lg">
              Prefer to email directly? Reach us at{' '}
              <a
                href={`mailto:${data.email}`}
                className="text-slate-50 hover:text-white font-medium transition-colors duration-200"
              >
                {data.email}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
