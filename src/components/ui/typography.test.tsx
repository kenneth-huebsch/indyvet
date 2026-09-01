import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import type { TypographyVariant } from './typography'
import { Typography } from './typography'

describe('Typography', () => {
  it('renders heading variants with their semantic element and type styles', () => {
    const markup = renderToStaticMarkup(
      <Typography as="h1" variant="h1">
        Heading
      </Typography>,
    )

    expect(markup).toContain('<h1')
    expect(markup).toContain('text-5xl')
    expect(markup).toContain('font-normal')
  })

  it('renders link variants with an at-rest visual distinction', () => {
    const markup = renderToStaticMarkup(
      <Typography as="a" href="/services" variant="link">
        Services
      </Typography>,
    )

    expect(markup).toContain('<a')
    expect(markup).toContain('underline')
    expect(markup).toContain('underline-offset-4')
  })

  it.each([
    {
      variant: 'display' as TypographyVariant,
      tag: 'h1',
      classes: ['text-5xl', 'font-normal', 'leading-[1.05]'],
    },
    {
      variant: 'h1' as TypographyVariant,
      tag: 'h1',
      classes: ['text-5xl', 'font-normal'],
    },
    {
      variant: 'h2' as TypographyVariant,
      tag: 'h2',
      classes: ['text-[2.25rem]', 'font-normal', 'lg:text-[2.625rem]'],
    },
    {
      variant: 'h3' as TypographyVariant,
      tag: 'h3',
      classes: ['text-2xl', 'font-normal'],
    },
    {
      variant: 'h4' as TypographyVariant,
      tag: 'h4',
      classes: ['text-xl', 'font-normal'],
    },
    {
      variant: 'body-large' as TypographyVariant,
      tag: 'p',
      classes: ['text-lg', 'leading-relaxed'],
    },
    {
      variant: 'body' as TypographyVariant,
      tag: 'p',
      classes: ['text-base', 'leading-normal'],
    },
    {
      variant: 'small' as TypographyVariant,
      tag: 'p',
      classes: ['text-sm'],
    },
    {
      variant: 'caption' as TypographyVariant,
      tag: 'span',
      classes: ['text-xs', 'text-muted-foreground'],
    },
    {
      variant: 'label' as TypographyVariant,
      tag: 'label',
      classes: ['text-[11px]', 'font-extrabold'],
    },
    {
      variant: 'link' as TypographyVariant,
      tag: 'a',
      classes: ['text-base', 'underline', 'underline-offset-4'],
    },
  ])(
    'renders $variant with default semantic element and public type classes',
    ({ variant, tag, classes }) => {
      const markup = renderToStaticMarkup(<Typography variant={variant}>Content</Typography>)

      expect(markup).toContain(`<${tag}`)
      for (const className of classes) {
        expect(markup).toContain(className)
      }
    },
  )
})
