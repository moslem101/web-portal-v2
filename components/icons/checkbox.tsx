import { cn } from '@/lib/utils'
import { IconProps } from '@/types/IconProps'
import React from 'react'

export const CheckboxIcon: React.FC<IconProps> = ({
  className = '',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 6 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-current', className)}
      {...props}
    >
      <path
        d="M0.833659 3.83332L1.40008 4.25814C1.82877 4.57966 2.43471 4.50611 2.77404 4.09138L5.16699 1.16666"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  )
}
