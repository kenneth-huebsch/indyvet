import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Heart } from 'lucide-react'

import { Badge } from './badge'
import { Button, buttonVariants } from './button'
import { Card } from './card'
import { Icon } from './icon'

describe('shared UI primitives', () => {
  it.each([
    { variant: 'primary' as const, expected: 'bg-primary' },
    { variant: 'secondary' as const, expected: 'bg-secondary' },
    { variant: 'outline' as const, expected: 'border-border' },
    { variant: 'ghost' as const, expected: 'hover:bg-muted' },
    { variant: 'link' as const, expected: 'underline' },
  ])('renders the $variant Button variant', ({ variant, expected }) => {
    const markup = renderToStaticMarkup(<Button variant={variant}>Action</Button>)

    expect(markup).toContain('<button')
    expect(markup).toContain(expected)
    expect(markup).toContain('min-h-button')
    expect(markup).toContain('focus-visible:ring-2')
  })

  it('defaults Button to a non-submitting primary action and exposes disabled state', () => {
    const markup = renderToStaticMarkup(<Button disabled>Disabled action</Button>)

    expect(markup).toContain('type="button"')
    expect(markup).toContain('disabled=""')
    expect(markup).toContain('disabled:opacity-50')
  })

  it('exposes Button interaction states and forwards native and class attributes', () => {
    const markup = renderToStaticMarkup(
      <Button id="save-action" aria-label="Save" className="custom-button">
        Save
      </Button>,
    )

    expect(markup).toContain('hover:bg-primary/90')
    expect(markup).toContain('active:scale-[0.98]')
    expect(markup).toContain('id="save-action"')
    expect(markup).toContain('aria-label="Save"')
    expect(markup).toContain('custom-button')
  })

  it('renders Button as an anchor CTA without forcing type="button"', () => {
    const markup = renderToStaticMarkup(
      <Button as="a" href="/contact" variant="primary">
        Contact us
      </Button>,
    )

    expect(markup).toContain('<a')
    expect(markup).toContain('href="/contact"')
    expect(markup).toContain('bg-primary')
    expect(markup).toContain('data-slot="button"')
    expect(markup).not.toContain('type="button"')
  })

  it('exports buttonVariants for composition with custom link components', () => {
    expect(buttonVariants({ variant: 'outline' })).toContain('border-border')
    expect(buttonVariants({ variant: 'primary' })).toContain('bg-primary')
  })

  it('renders a token-backed Card surface and forwards attributes', () => {
    const markup = renderToStaticMarkup(
      <Card id="details-card" className="custom-card">
        Details
      </Card>,
    )

    expect(markup).toContain('<div')
    expect(markup).toContain('data-slot="card"')
    expect(markup).toContain('id="details-card"')
    expect(markup).toContain('rounded-lg')
    expect(markup).toContain('border-border')
    expect(markup).toContain('bg-card')
    expect(markup).toContain('custom-card')
  })

  it('renders Badge variants as compact semantic labels', () => {
    const markup = renderToStaticMarkup(<Badge variant="accent">Featured</Badge>)

    expect(markup).toContain('<span')
    expect(markup).toContain('data-slot="badge"')
    expect(markup).toContain('rounded-full')
    expect(markup).toContain('bg-accent')
    expect(markup).toContain('text-accent-foreground')
    expect(markup).toContain('Featured')
  })

  it.each([
    {
      variant: 'default' as const,
      expected: ['bg-primary', 'text-primary-foreground'],
    },
    {
      variant: 'secondary' as const,
      expected: ['bg-secondary', 'text-secondary-foreground'],
    },
    {
      variant: 'accent' as const,
      expected: ['bg-accent', 'text-accent-foreground'],
    },
    {
      variant: 'outline' as const,
      expected: ['border-border', 'text-foreground'],
    },
    {
      variant: 'success' as const,
      expected: ['bg-success', 'text-success-foreground'],
    },
    {
      variant: 'warning' as const,
      expected: ['bg-warning', 'text-warning-foreground'],
    },
    {
      variant: 'destructive' as const,
      expected: ['bg-destructive', 'text-destructive-foreground'],
    },
  ])('renders the $variant Badge variant', ({ variant, expected }) => {
    const markup = renderToStaticMarkup(<Badge variant={variant}>{variant}</Badge>)

    for (const className of expected) {
      expect(markup).toContain(className)
    }
  })

  it('defaults Badge to the default variant and forwards className', () => {
    const markup = renderToStaticMarkup(<Badge className="custom-badge">Default</Badge>)

    expect(markup).toContain('bg-primary')
    expect(markup).toContain('text-primary-foreground')
    expect(markup).toContain('custom-badge')
  })

  it.each([
    { size: 'sm' as const, expected: ['h-4', 'w-4'] },
    { size: 'md' as const, expected: ['h-5', 'w-5'] },
    { size: 'lg' as const, expected: ['h-6', 'w-6'] },
    { size: 'xl' as const, expected: ['h-8', 'w-8'] },
  ])('renders the $size Icon size', ({ size, expected }) => {
    const markup = renderToStaticMarkup(<Icon icon={Heart} size={size} className="custom-icon" />)

    for (const className of expected) {
      expect(markup).toContain(className)
    }
    expect(markup).toContain('custom-icon')
  })

  it('marks decorative icons as hidden and labels meaningful icons', () => {
    const decorativeMarkup = renderToStaticMarkup(<Icon icon={Heart} />)
    const labeledMarkup = renderToStaticMarkup(
      <Icon icon={Heart} aria-label="Favorite" size="lg" />,
    )

    expect(decorativeMarkup).toContain('aria-hidden="true"')
    expect(labeledMarkup).toContain('aria-label="Favorite"')
    expect(labeledMarkup).toContain('h-6')
    expect(labeledMarkup).not.toContain('aria-hidden="true"')
  })

  it('enforces computed icon accessibility attributes over caller values', () => {
    const decorativeMarkup = renderToStaticMarkup(<Icon icon={Heart} aria-hidden={false} />)
    const labeledMarkup = renderToStaticMarkup(
      <Icon icon={Heart} aria-label="Favorite" aria-hidden="true" />,
    )

    expect(decorativeMarkup).toContain('aria-hidden="true"')
    expect(decorativeMarkup).not.toContain('aria-hidden="false"')
    expect(labeledMarkup).toContain('aria-label="Favorite"')
    expect(labeledMarkup).not.toContain('aria-hidden')
  })
})
