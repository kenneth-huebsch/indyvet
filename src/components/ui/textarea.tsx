import { forwardRef } from 'react'

import { cn } from '@/lib/utils'
import type { FieldControlProps } from '@/components/ui/input'

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldControlProps
>(function Textarea({ className, error = false, 'aria-invalid': ariaInvalid, ...props }, ref) {
  const normalizedAriaInvalid =
    error && (ariaInvalid === undefined || ariaInvalid === false || ariaInvalid === 'false')
      ? true
      : ariaInvalid

  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      aria-invalid={normalizedAriaInvalid}
      className={cn(
        'peer min-h-28 w-full resize-y rounded-md border border-input bg-card px-4 py-3 text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive',
        className,
      )}
      {...props}
    />
  )
})
