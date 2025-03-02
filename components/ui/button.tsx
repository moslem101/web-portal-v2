import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-[6px] rounded-[100px] px-[40px] transition-all transition-colors duration-300 ease-out focus-visible:outline-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-500 hover:bg-primary-700 active:bg-primary-800 disabled:bg-primary-200 text-neutral-900',
        secondary:
          'bg-secondary-500 hover:bg-secondary-700 active:bg-secondary-800 disabled:bg-secondary-200 text-neutral-900 ',
        outline: 'border bg-transparent',
        ghost:
          'bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 disabled:bg-transparent disabled:text-neutral-500',
        success:
          'bg-success-500 hover:bg-success-700 active:bg-success-800 disabled:bg-success-200 text-white ',
        error:
          'bg-error-500 hover:bg-error-700 active:bg-error-800 disabled:bg-error-200 text-white ',
        warning:
          'bg-warning-500 hover:bg-warning-700 active:bg-warning-800 disabled:bg-warning-200 text-white ',
        info: 'bg-info-500 hover:bg-info-700 active:bg-info-800 disabled:bg-info-200 text-white ',
      },
      intent: {
        primary: '',
        secondary: '',
        none: '',
      },
      size: {
        xs: 'py-[8px] text-xs',
        sm: 'py-[12px] text-xs',
        md: 'py-[16px] text-xs',
        lg: 'py-[20px] text-xs',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        intent: 'primary',
        className:
          'border-primary-500 hover:border-primary-700 active:border-primary-800 border-[2px] text-neutral-900 disabled:border-neutral-200 disabled:text-neutral-200 ',
      },
      {
        variant: 'outline',
        intent: 'secondary',
        className:
          'border-secondary-500 hover:border-secondary-700 active:border-secondary-800 border-[2px] text-neutral-900 disabled:border-neutral-200 disabled:text-neutral-200 ',
      },
      {
        variant: 'outline',
        intent: 'none',
        className:
          'border-neutral-200 text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      intent: 'none',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, intent, size, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, intent, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
