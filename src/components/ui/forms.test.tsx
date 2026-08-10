import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { Checkbox } from './checkbox'
import { Input } from './input'
import { Label } from './label'
import { Select } from './select'
import { Textarea } from './textarea'

describe('form visual primitives', () => {
  it('renders an associated accessible Label', () => {
    const markup = renderToStaticMarkup(
      <Label htmlFor="pet-name" className="custom-label">
        Pet name
      </Label>,
    )

    expect(markup).toContain('<label')
    expect(markup).toContain('for="pet-name"')
    expect(markup).toContain('text-sm')
    expect(markup).toContain('custom-label')
  })

  it('renders Input with shared focus, disabled, and error styles', () => {
    const markup = renderToStaticMarkup(
      <Input id="pet-name" placeholder="Enter a name" error disabled className="custom-input" />,
    )

    expect(markup).toContain('<input')
    expect(markup).toContain('data-slot="input"')
    expect(markup).toContain('focus-visible:ring-2')
    expect(markup).toContain('disabled:opacity-50')
    expect(markup).toContain('border-destructive')
    expect(markup).toContain('peer')
    expect(markup).toContain('aria-invalid="true"')
    expect(markup).toContain('custom-input')
  })

  it('renders Textarea with the same token-backed field states', () => {
    const markup = renderToStaticMarkup(
      <Textarea error aria-label="Notes" className="custom-textarea" />,
    )

    expect(markup).toContain('<textarea')
    expect(markup).toContain('data-slot="textarea"')
    expect(markup).toContain('min-h-28')
    expect(markup).toContain('focus-visible:ring-2')
    expect(markup).toContain('border-destructive')
    expect(markup).toContain('peer')
    expect(markup).toContain('aria-invalid="true"')
    expect(markup).toContain('custom-textarea')
  })

  it('renders a native Select with an accessible label and error state', () => {
    const markup = renderToStaticMarkup(
      <Select aria-label="Pet type" error className="custom-select">
        <option value="dog">Dog</option>
      </Select>,
    )

    expect(markup).toContain('<select')
    expect(markup).toContain('data-slot="select"')
    expect(markup).toContain('appearance-none')
    expect(markup).toContain('data-slot="icon"')
    expect(markup).toContain('aria-hidden="true"')
    expect(markup).toContain('pointer-events-none')
    expect(markup).toContain('focus-visible:ring-2')
    expect(markup).toContain('border-destructive')
    expect(markup).toContain('peer')
    expect(markup).toContain('aria-invalid="true"')
    expect(markup).toContain('custom-select')
  })

  it('renders a native Checkbox with focus, disabled, and error styling', () => {
    const markup = renderToStaticMarkup(<Checkbox error disabled aria-label="Subscribe" />)

    expect(markup).toContain('<input')
    expect(markup).toContain('type="checkbox"')
    expect(markup).toContain('data-slot="checkbox"')
    expect(markup).toContain('accent-primary')
    expect(markup).toContain('focus-visible:ring-2')
    expect(markup).toContain('disabled:opacity-50')
    expect(markup).toContain('border-destructive')
    expect(markup).toContain('peer')
    expect(markup).toContain('aria-invalid="true"')
  })

  it('normalizes contradictory aria-invalid values when error is true', () => {
    const markup = renderToStaticMarkup(
      <>
        <Input error aria-invalid={false} />
        <Textarea error aria-invalid="false" />
        <Select error aria-invalid={false} />
        <Checkbox error aria-invalid="false" />
      </>,
    )

    expect(markup.match(/aria-invalid="true"/g)).toHaveLength(4)
    expect(markup).not.toContain('aria-invalid="false"')
  })

  it('preserves an equivalent explicit invalid value', () => {
    const markup = renderToStaticMarkup(
      <Input error aria-invalid="grammar" aria-label="Pet name" />,
    )

    expect(markup).toContain('aria-invalid="grammar"')
  })

  it('supports a disabled Select followed by a disabled-state Label', () => {
    const markup = renderToStaticMarkup(
      <>
        <Select id="pet-type" disabled>
          <option value="dog">Dog</option>
        </Select>
        <Label htmlFor="pet-type">Pet type</Label>
      </>,
    )

    expect(markup).toContain('<div class="relative w-full peer"><select')
    expect(markup).toContain('peer-has-[:disabled]:cursor-not-allowed')
    expect(markup).toContain('peer-has-[:disabled]:opacity-50')
  })

  it('dims Label when it precedes a disabled native control', () => {
    const markup = renderToStaticMarkup(
      <>
        <Label htmlFor="pet-name">Pet name</Label>
        <Input id="pet-name" disabled />
      </>,
    )

    expect(markup).toContain('has-[+:disabled]:cursor-not-allowed')
    expect(markup).toContain('has-[+:disabled]:opacity-50')
  })

  it('dims Label when it precedes a disabled Select wrapper', () => {
    const markup = renderToStaticMarkup(
      <>
        <Label htmlFor="pet-type">Pet type</Label>
        <Select id="pet-type" disabled>
          <option value="dog">Dog</option>
        </Select>
      </>,
    )

    expect(markup).toContain('has-[+:has(:disabled)]:cursor-not-allowed')
    expect(markup).toContain('has-[+:has(:disabled)]:opacity-50')
  })

  it('applies Select className to the wrapper so chevron tracks width', () => {
    const markup = renderToStaticMarkup(
      <Select className="w-1/2 custom-select" aria-label="Pet type">
        <option value="dog">Dog</option>
      </Select>,
    )

    expect(markup).toMatch(/<div class="[^"]*\bw-1\/2\b[^"]*custom-select[^"]*"/)
    expect(markup).toContain('relative')
    expect(markup).toContain('peer')
    expect(markup).toContain('<select')
    expect(markup).toContain('w-full')
  })
})
