import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

import { Icon } from '@/components/ui/icon'
import type { FieldControlProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & FieldControlProps
>(function Select({ className, error = false, 'aria-invalid': ariaInvalid, ...props }, ref) {
  const normalizedAriaInvalid =
    error && (ariaInvalid === undefined || ariaInvalid === false || ariaInvalid === 'false')
      ? true
      : ariaInvalid

  return (
    <div className="relative w-full peer">
      <select
        ref={ref}
        data-slot="select"
        aria-invalid={normalizedAriaInvalid}
        className={cn(
          'h-12 w-full appearance-none rounded-md border border-input bg-card px-4 py-2 pr-10 text-foreground shadow-sm transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive',
          className,
        )}
        {...props}
      />
      <Icon
        icon={ChevronDown}
        size="sm"
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
})
