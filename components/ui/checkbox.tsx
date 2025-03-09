'use client'

import { CheckboxIcon } from '@/components/icons/checkbox'
import { dissolve } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const checkboxVariants = cva(
  'peer data-[state=checked]:bg-primary-500 data-[state=checked]:text-neutral-0 aria-invalid:border-error-500 disabled:bg-primary-200 h-[16px] w-[16px] shrink-0 cursor-pointer rounded-[4px] border-[0.5px] border-neutral-300 outline-none disabled:cursor-not-allowed disabled:border-0 data-[state=checked]:border-transparent'
)

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    Omit<VariantProps<typeof checkboxVariants>, 'variant'> {
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, ...props }, ref) => {
  const id = React.useId()

  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        id={props.id || id}
        data-slot="checkbox"
        ref={ref}
        className={cn(checkboxVariants({ className }), dissolve)}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className={cn(
            'flex items-center justify-center text-current data-[state=checked]:scale-100 data-[state=unchecked]:scale-0',
            dissolve
          )}
        >
          <CheckboxIcon size={8} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {(label || description) && (
        <div className="grid gap-1">
          {label && (
            <label
              htmlFor={props.id || id}
              className="cursor-pointer text-sm font-medium text-neutral-900"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-neutral-600">{description}</p>
          )}
        </div>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export { Checkbox }
