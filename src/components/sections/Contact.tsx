'use client'

import React, { useState, useEffect } from 'react'
import { FormBlock } from '@/blocks/Form/Component'
import type { Form } from '@payloadcms/plugin-form-builder/types'

export function ContactForm() {
  const [form, setForm] = useState<Form | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadForm = async () => {
      try {
        const response = await fetch('/api/forms/5')
        if (response.ok) {
          const formData = await response.json()
          setForm(formData)
        }
      } catch (error) {
        console.error('Error loading form:', error)
      } finally {
        setLoading(false)
      }
    }

    loadForm()
  }, [])

  if (loading) {
    return (
      <div className="container lg:max-w-[48rem]">
        <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
          <p className="text-center text-gray-600">Loading contact form...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="container lg:max-w-[48rem]">
        <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
          <p className="text-center text-gray-600">
            Contact form is currently unavailable. Please email us directly at{' '}
            <a href="mailto:info@pelive.be" className="text-blue-600 hover:underline">
              info@pelive.be
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <FormBlock
      form={form}
      enableIntro={false}
    />
  )
}

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Get in touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              Book an unforgettable performance or collaborate on your next event.
            </p>
          </div>
          
          <ContactForm />
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Or reach out directly at:{' '}
              <a 
                href="mailto:info@pelive.be" 
                className="text-blue-600 hover:underline font-medium"
              >
                info@pelive.be
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
