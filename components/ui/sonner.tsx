'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium',
          success:
            'group-[.toast]:bg-success-500 group-[.toast]:text-primary-foreground font-medium',
          error:
            'group-[.toast]:bg-error-500 group-[.toast]:text-primary-foreground font-medium',
          info: 'group-[.toast]:bg-info-500 group-[.toast]:text-primary-foreground font-medium',
          warning:
            'group-[.toast]:bg-warning-500 group-[.toast]:text-primary-foreground font-medium',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
