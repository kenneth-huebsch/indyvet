import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

export type FieldControlProps = {
  error?: boolean
}

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & FieldControlProps
>(function Input({ className, error = false, 'aria-invalid': ariaInvalid, ...props }, ref) {
  const normalizedAriaInvalid =
    error && (ariaInvalid === undefined || ariaInvalid === false || ariaInvalid === 'false')
      ? true
      : ariaInvalid

  return (
    <input
      ref={ref}
      data-slot="input"
      aria-invalid={normalizedAriaInvalid}
      className={cn(
        'peer h-12 w-full rounded-md border border-input bg-card px-4 py-2 text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive',
        className,
      )}
      {...props}
    />
  )
})
