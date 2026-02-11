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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                    className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200"
                  />
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
                    className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200"
                  />
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
                  className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200"
                />
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
                  className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200"
                />
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
                  className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-800/70 transition-all duration-200 resize-none"
                />
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 text-base font-medium"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
            
            {submitStatus !== 'idle' && (
              <div className={`mt-6 p-6 rounded-xl border ${
                submitStatus === 'success' 
                  ? 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20' 
                  : 'bg-rose-500/10 text-rose-200 border-rose-500/20'
              }`}>
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
