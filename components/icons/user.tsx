import { cn } from '@/lib/utils'
import { IconProps } from '@/types/IconProps'
import React from 'react'

export const UserIcon: React.FC<IconProps> = ({
  className = '',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-current', className)}
      {...props}
    >
      <path d="M4.38505 10.3211C3.44187 10.8827 0.96891 12.0294 2.47511 13.4644C3.21087 14.1654 4.03033 14.6667 5.06058 14.6667L10.9394 14.6667C11.9697 14.6667 12.7891 14.1654 13.5249 13.4644C15.0311 12.0294 12.5581 10.8827 11.6149 10.3211C9.40321 9.0041 6.59679 9.0041 4.38505 10.3211Z" />
      <path d="M11 4.33334C11 5.9902 9.65685 7.33334 8 7.33334C6.34315 7.33334 5 5.9902 5 4.33334C5 2.67649 6.34315 1.33334 8 1.33334C9.65685 1.33334 11 2.67649 11 4.33334Z" />
    </svg>
  )
}
