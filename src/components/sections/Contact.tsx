'use client'

import React, { useState } from 'react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

export function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'firstname':
      case 'lastname':
        if (!value.trim()) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        setFormData({ firstname: "", lastname: "", email: "", number: "", message: "" });
        setFieldErrors({});
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to send message');
      }
    } catch (_error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-zinc-950 py-32">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-50 mb-6">
              Get in Touch
            </h2>
            <p className="mt-4 font-bold tracking-tight text-lg sm:text-xl text-white max-w-3xl mx-auto">
              We would be delighted to discuss how we can bring your vision to life. 
              Whether you're planning an intimate gathering or a grand celebration, 
              our team is ready to create an unforgettable experience.
            </p>
          </div>
          
          <div className="bg-zinc-900/50 backdrop-blur-xl p-12 rounded-3xl border border-zinc-800 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="firstname" className="block text-sm font-medium text-zinc-300 uppercase tracking-wide">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={fieldErrors.firstname ? "firstname-error" : undefined}
                    className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200"
                  />
                  {fieldErrors.firstname && (
                    <p id="firstname-error" className="text-rose-400 text-sm mt-1" role="alert">
                      {fieldErrors.firstname}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastname" className="block text-sm font-medium text-zinc-300 uppercase tracking-wide">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={fieldErrors.lastname ? "lastname-error" : undefined}
                    className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200"
                  />
                  {fieldErrors.lastname && (
                    <p id="lastname-error" className="text-rose-400 text-sm mt-1" role="alert">
                      {fieldErrors.lastname}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200"
                />
                {fieldErrors.email && (
                  <p id="email-error" className="text-rose-400 text-sm mt-1" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="number" className="block text-sm font-medium text-zinc-300 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  aria-describedby="number-help"
                  className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200"
                />
                <p id="number-help" className="text-zinc-500 text-sm mt-1">
                  Optional - for faster response
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 uppercase tracking-wide">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us about your vision..."
                  aria-required="true"
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200 resize-none"
                />
                {fieldErrors.message && (
                  <p id="message-error" className="text-rose-400 text-sm mt-1" role="alert">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 text-base font-medium relative"
                  aria-describedby={submitStatus !== 'idle' ? "submit-status" : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </Button>
              </div>
            </form>
            
            {submitStatus !== 'idle' && (
              <div id="submit-status" className={`mt-6 p-6 rounded-xl border ${
                submitStatus === 'success' 
                  ? 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20' 
                  : 'bg-rose-500/10 text-rose-200 border-rose-500/20'
              }`} role="alert" aria-live="polite">
                {submitMessage}
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-300 text-lg">
              Prefer to email directly? Reach us at{' '}
              <a 
                href="mailto:info@pelive.be" 
                className="text-slate-50 hover:text-white font-medium transition-colors duration-200"
              >
                info@pelive.be
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
