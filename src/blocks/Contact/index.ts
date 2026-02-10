import type { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact',
  interfaceName: 'Contact',
  fields: [
    {
      name: 'enable',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Section',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Get In Touch',
      label: 'Section Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'Ready to bring the power and passion of PE LIVE to your event? We\'d love to hear from you!',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'info@pelive.be',
      label: 'Contact Email',
      required: true,
    },
    {
      name: 'formFields',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Field Name',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Field Label',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { value: 'text', label: 'Text Input' },
            { value: 'email', label: 'Email Input' },
            { value: 'textarea', label: 'Text Area' },
          ],
          defaultValue: 'text',
          label: 'Field Type',
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: true,
          label: 'Required Field',
        },
      ],
      label: 'Form Fields',
    },
    {
      name: 'submitButtonText',
      type: 'text',
      defaultValue: 'Send Message',
      label: 'Submit Button Text',
    },
  ],
}
