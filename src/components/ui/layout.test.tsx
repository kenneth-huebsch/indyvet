import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import type { SectionSpacing } from './section'
import { Container } from './container'
import { Divider } from './divider'
import { Section } from './section'

describe('layout primitives', () => {
  it('keeps content inside the reference container width with responsive gutters', () => {
    const markup = renderToStaticMarkup(<Container size="content">Content</Container>)

    expect(markup).toContain('max-w-content')
    expect(markup).toContain('mx-auto')
    expect(markup).toContain('px-4')
    expect(markup).toContain('lg:px-gutter')
  })

  it('supports the narrower medium container token', () => {
    const markup = renderToStaticMarkup(<Container size="medium">Content</Container>)

    expect(markup).toContain('max-w-medium')
  })

  it('renders semantic sections with tokenized vertical spacing', () => {
    const markup = renderToStaticMarkup(<Section spacing="lg">Section content</Section>)

    expect(markup).toContain('<section')
    expect(markup).toContain('py-section-lg')
  })

  it('renders a theme-backed horizontal divider', () => {
    const markup = renderToStaticMarkup(<Divider />)

    expect(markup).toContain('<hr')
    expect(markup).toContain('border-border')
  })

  it('uses content width by default for Container', () => {
    const markup = renderToStaticMarkup(<Container>Content</Container>)

    expect(markup).toContain('max-w-content')
    expect(markup).not.toContain('max-w-medium')
  })

  it('applies the full responsive gutter scale on Container', () => {
    const markup = renderToStaticMarkup(<Container>Content</Container>)

    expect(markup).toContain('px-4')
    expect(markup).toContain('sm:px-6')
    expect(markup).toContain('lg:px-gutter')
  })

  it('uses medium section spacing by default', () => {
    const markup = renderToStaticMarkup(<Section>Section content</Section>)

    expect(markup).toContain('<section')
    expect(markup).toContain('py-section-md')
  })

  it.each([
    { spacing: 'none' as SectionSpacing, expectedClass: null },
    { spacing: 'sm' as SectionSpacing, expectedClass: 'py-section-sm' },
    { spacing: 'md' as SectionSpacing, expectedClass: 'py-section-md' },
    { spacing: 'lg' as SectionSpacing, expectedClass: 'py-section-lg' },
  ])(
    'maps Section spacing "$spacing" to the public spacing contract',
    ({ spacing, expectedClass }) => {
      const markup = renderToStaticMarkup(<Section spacing={spacing}>Section content</Section>)

      expect(markup).toContain('<section')

      if (expectedClass) {
        expect(markup).toContain(expectedClass)
      } else {
        expect(markup).not.toMatch(/py-section-/)
      }
    },
  )

  it('forwards native HTML attributes and merges className on Container', () => {
    const markup = renderToStaticMarkup(
      <Container id="page-container" data-testid="layout-container" className="custom-container">
        Content
      </Container>,
    )

    expect(markup).toContain('<div')
    expect(markup).toContain('id="page-container"')
    expect(markup).toContain('data-testid="layout-container"')
    expect(markup).toContain('custom-container')
    expect(markup).toContain('max-w-content')
  })

  it('forwards native HTML attributes and merges className on Section', () => {
    const markup = renderToStaticMarkup(
      <Section id="page-section" aria-label="Featured content" className="custom-section">
        Section content
      </Section>,
    )

    expect(markup).toContain('<section')
    expect(markup).toContain('id="page-section"')
    expect(markup).toContain('aria-label="Featured content"')
    expect(markup).toContain('custom-section')
    expect(markup).toContain('py-section-md')
  })

  it('forwards native HTML attributes and merges className on Divider', () => {
    const markup = renderToStaticMarkup(<Divider id="section-divider" className="custom-divider" />)

    expect(markup).toContain('<hr')
    expect(markup).toContain('id="section-divider"')
    expect(markup).toContain('custom-divider')
    expect(markup).toContain('border-border')
    expect(markup).toContain('border-t')
    expect(markup).toContain('w-full')
  })
})
