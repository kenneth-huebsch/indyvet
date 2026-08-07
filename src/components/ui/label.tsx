import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

export const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  function Label({ className, ...props }, ref) {
    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn(
          'text-sm font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-has-[:disabled]:cursor-not-allowed peer-has-[:disabled]:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)
