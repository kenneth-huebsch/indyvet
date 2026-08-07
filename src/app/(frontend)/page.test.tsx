import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import HomePage from './page'

function openingTag(markup: string, tag: string, attribute: string): string {
  const match = markup.match(new RegExp(`<${tag}\\b[^>]*${attribute}[^>]*(?:>|/>)`))

  expect(match, `Expected <${tag}> with ${attribute}`).not.toBeNull()
  return match?.[0] ?? ''
}

function openingTagForText(markup: string, tag: string, text: string): string {
  const match = markup.match(new RegExp(`(<${tag}\\b[^>]*>)${text}</${tag}>`))

  expect(match, `Expected <${tag}> containing "${text}"`).not.toBeNull()
  return match?.[1] ?? ''
}

describe('Phase 1 component showcase', () => {
  it('renders the design-system showcase instead of a marketing page', () => {
    const markup = renderToStaticMarkup(<HomePage />)

    expect(markup).toContain('data-slot="phase1-showcase"')
    expect(markup).toContain('Typography')
    expect(markup).toContain('Buttons')
    expect(markup).toContain('Forms')
    expect(markup).toContain('Motion')
    expect(markup).toContain('data-slot="button"')
    expect(markup).toContain('data-slot="card"')
    expect(markup).toContain('data-slot="badge"')
    expect(markup).toContain('data-slot="input"')
    expect(markup).toContain('data-slot="select"')
    expect(markup).toContain('data-slot="checkbox"')
    expect(markup).toContain('motion-reduce:animate-none')
    expect(markup).not.toContain('Your reliable partner for pet wellness')
  })

  it('shows the complete typography role set and responsive layout primitives', () => {
    const markup = renderToStaticMarkup(<HomePage />)

    for (const role of [
      'Display',
      'H1',
      'H2',
      'H3',
      'H4',
      'Body Large',
      'Body',
      'Small Text',
      'Caption',
      'Label',
      'Link',
    ]) {
      expect(markup).toContain(role)
    }

    expect(markup).toContain('max-w-content')
    expect(markup).toContain('py-section-md')
    expect(markup).toContain('data-slot="divider"')
  })

  it('shows every button and badge variant with its intended state', () => {
    const markup = renderToStaticMarkup(<HomePage />)

    const buttonClasses = {
      Primary: ['bg-primary'],
      Secondary: ['bg-secondary'],
      Outline: ['border-border', 'bg-transparent'],
      Ghost: ['bg-transparent', 'hover:bg-muted'],
      Link: ['underline', 'underline-offset-4'],
      Disabled: ['disabled:opacity-50'],
    }

    for (const [text, classes] of Object.entries(buttonClasses)) {
      const tag = openingTagForText(markup, 'button', text)

      expect(tag).toContain('data-slot="button"')
      for (const className of classes) {
        expect(tag).toContain(className)
      }
    }

    expect(openingTagForText(markup, 'button', 'Disabled')).toContain('disabled=""')

    const badgeClasses = {
      Default: 'bg-primary',
      Secondary: 'bg-secondary',
      Accent: 'bg-accent',
      Outline: 'border-border',
      Success: 'bg-success',
      Warning: 'bg-warning',
      Destructive: 'bg-destructive',
    }

    for (const [text, className] of Object.entries(badgeClasses)) {
      const tag = openingTagForText(markup, 'span', text)

      expect(tag).toContain('data-slot="badge"')
      expect(tag).toContain(className)
    }
  })

  it('applies all motion helpers and their reduced-motion behavior', () => {
    const markup = renderToStaticMarkup(<HomePage />)
      .replaceAll('&amp;', '&')
      .replaceAll('&gt;', '>')

    const motionSamples = {
      'Fade in': ['animate-in', 'fade-in', 'motion-reduce:animate-none'],
      'Slide up': ['slide-in-from-bottom-4', 'motion-reduce:animate-none'],
      'Slide left': ['slide-in-from-right-4', 'motion-reduce:animate-none'],
      'Slide right': ['slide-in-from-left-4', 'motion-reduce:animate-none'],
      'Scale on hover': [
        'hover:scale-95',
        'motion-reduce:transition-none',
        'motion-reduce:hover:scale-100',
      ],
    }

    for (const [text, classes] of Object.entries(motionSamples)) {
      const tag = openingTagForText(markup, 'div', text)

      for (const className of classes) {
        expect(tag).toContain(className)
      }
    }

    expect(markup).toContain('[&>*]:animate-in')
    expect(markup).toContain('[&>*]:fade-in')
    expect(markup).toContain('[&>*:nth-child(2)]:delay-100')
    expect(markup).toContain('[&>*:nth-child(3)]:delay-200')
    expect(markup).toContain('motion-reduce:[&>*]:animate-none')
    expect(openingTagForText(markup, 'div', 'Stagger one')).toContain('bg-card')
    expect(openingTagForText(markup, 'div', 'Stagger two')).toContain('bg-card')
    expect(openingTagForText(markup, 'div', 'Stagger three')).toContain('bg-card')
  })

  it('renders decorative and labeled icons through the icon wrapper', () => {
    const markup = renderToStaticMarkup(<HomePage />)
    const smallIcon = openingTag(markup, 'svg', 'class="lucide lucide-shapes')
    const labeledIcon = openingTag(markup, 'svg', 'aria-label="Information"')
    const largeDecorativeIcon = openingTag(markup, 'svg', 'class="[^"]*h-8 w-8')

    expect(smallIcon).toContain('data-slot="icon"')
    expect(smallIcon).toContain('h-4 w-4')
    expect(smallIcon).toContain('aria-hidden="true"')
    expect(labeledIcon).toContain('data-slot="icon"')
    expect(labeledIcon).toContain('h-6 w-6')
    expect(labeledIcon).not.toContain('aria-hidden')
    expect(largeDecorativeIcon).toContain('data-slot="icon"')
    expect(largeDecorativeIcon).toContain('h-8 w-8')
    expect(largeDecorativeIcon).toContain('aria-hidden="true"')
  })

  it('renders associated native form controls and visual states', () => {
    const markup = renderToStaticMarkup(<HomePage />)

    expect(openingTag(markup, 'label', 'for="sample-input"')).toContain('data-slot="label"')
    expect(openingTag(markup, 'input', 'id="sample-input"')).toContain('data-slot="input"')
    expect(openingTag(markup, 'textarea', 'id="sample-textarea"')).toContain('data-slot="textarea"')
    expect(openingTag(markup, 'select', 'id="sample-select"')).toContain('data-slot="select"')

    const disabledInput = openingTag(markup, 'input', 'id="sample-disabled"')
    expect(disabledInput).toContain('disabled=""')

    const errorInput = openingTag(markup, 'input', 'id="sample-error"')
    expect(errorInput).toContain('border-destructive')
    expect(errorInput).toContain('aria-invalid="true"')
    expect(errorInput).toContain('aria-describedby="sample-error-message"')

    expect(openingTag(markup, 'label', 'for="sample-checkbox"')).toContain('data-slot="label"')
    const checkbox = openingTag(markup, 'input', 'id="sample-checkbox"')
    expect(checkbox).toContain('data-slot="checkbox"')
    expect(checkbox).toContain('type="checkbox"')
    expect(checkbox).toContain('checked=""')
  })

  it('uses semantic links and the expected layout wrappers', () => {
    const markup = renderToStaticMarkup(<HomePage />)
    const showcaseRoot = openingTag(markup, 'div', 'data-slot="phase1-showcase"')
    const link = openingTagForText(markup, 'a', 'Link')

    expect(markup).not.toContain('<main')
    expect(showcaseRoot).toContain('min-h-screen')
    expect(showcaseRoot).toContain('bg-background')
    expect(link).toContain('href="#components"')
    expect(markup).toContain('data-slot="container"')
    expect(markup).toContain('data-slot="section"')
    expect(markup).toContain('data-slot="divider"')
    expect(markup).toContain('md:grid-cols-2')
    expect(markup).toContain('lg:grid-cols-3')
  })
})
