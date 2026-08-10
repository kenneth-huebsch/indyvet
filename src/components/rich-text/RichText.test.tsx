import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { RichText } from './RichText'

const lexicalDoc = {
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
            text: 'Compassionate veterinary care for every pet.',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        textStyle: '',
        textFormat: 0,
      },
    ],
    direction: 'ltr' as const,
  },
}

describe('RichText', () => {
  it('renders paragraph text from Lexical JSON', () => {
    const markup = renderToStaticMarkup(<RichText data={lexicalDoc} />)

    expect(markup).toContain('Compassionate veterinary care for every pet.')
  })

  it('returns nothing when data is missing', () => {
    expect(renderToStaticMarkup(<RichText data={null} />)).toBe('')
  })
})
