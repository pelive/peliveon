import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { WhoWeAreBlock } from '@/blocks/WhoWeAre/Component'
import { WhatWeDoBlock } from '@/blocks/WhatWeDo/Component'
import { UpNextBlock } from '@/blocks/UpNext/Component'
import { ContactBlock } from '@/blocks/Contact/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  whoWeAre: WhoWeAreBlock,
  whatWeDo: WhatWeDoBlock,
  upNext: UpNextBlock,
  contact: ContactBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {blockType === 'formBlock' ? (
                    // @ts-expect-error - FormBlock expects different prop structure
                    <Block {...block} disableInnerContainer />
                  ) : (
                    // @ts-expect-error - Custom blocks expect block prop
                    <Block block={block} disableInnerContainer />
                  )}
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
