"use client";

import { useState } from "react";
import { Container } from "@/components/Container";

export function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send form to info@pelive.be from the user's email
    const templateParams = {
      from_firstname: formData.firstname,
      from_lastname: formData.lastname,
      from_email: formData.email,
      from_number: formData.number,
      message: formData.message,
    };
    
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ firstname: "", lastname: "", email: "", number: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative w-screen bg-zinc-900 py-32"
    >
      <Container>
        <div className="md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get in{" "}
            <span className="relative whitespace-nowrap">
              touch
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Book an unforgettable performance or collaborate on your next event.
          </p>
        </div>

        <div className="mt-16 mx-auto max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-slate-300">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    autoComplete="given-name"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-slate-300">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    autoComplete="family-name"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="number" className="block text-sm font-medium text-slate-300">
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    name="number"
                    id="number"
                    autoComplete="tel"
                    value={formData.number}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Your message..."
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-red-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-300">
              Or reach out directly at:{' '}
              <a href="mailto:info@pelive.be" className="text-red-400 hover:text-red-300">
                info@pelive.be
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
