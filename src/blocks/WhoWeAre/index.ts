import type { Block } from 'payload'

export const WhoWeAre: Block = {
  slug: 'whoWeAre',
  interfaceName: 'WhoWeAre',
  fields: [
    {
      name: 'enable',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Section',
      admin: {
        condition: (data) => {
          // Only show enable field if not using default value
          return data.enable !== true
        }
      }
    },
    {
      name: 'backgroundImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'Background Image',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Who We Are',
      label: 'Section Title',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      defaultValue: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'PE Live is the pioneering "Black American"-style Gospel band which is reinventing Gospel music in a modern and dynamic way in Belgium. PE LIVE presents Gospel music with an attitude!',
                }
              ]
            }
          ]
        }
      }
    },
  ],
}
