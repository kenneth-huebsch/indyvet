import { forwardRef } from 'react'

import type { FieldControlProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const Checkbox = forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & FieldControlProps
>(function Checkbox({ className, error = false, 'aria-invalid': ariaInvalid, ...props }, ref) {
  const normalizedAriaInvalid =
    error && (ariaInvalid === undefined || ariaInvalid === false || ariaInvalid === 'false')
      ? true
      : ariaInvalid

  return (
    <input
      {...props}
      ref={ref}
      type="checkbox"
      data-slot="checkbox"
      aria-invalid={normalizedAriaInvalid}
      className={cn(
        'peer size-5 shrink-0 cursor-pointer rounded-sm border border-input accent-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive',
        className,
      )}
    />
  )
})
