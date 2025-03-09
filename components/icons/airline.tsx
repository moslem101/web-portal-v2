import { IconProps } from '@/types/IconProps'
import React from 'react'

export const AirlineIcon: React.FC<IconProps> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2403_21506)">
        <path
          d="M19.6106 18.9091H28.5803C28.5803 18.9091 31.3924 18.5697 31.7318 16.8242C32.0712 15.0788 29.2591 14.8848 29.2591 14.8848L28.6288 14.4C27.7075 13.6727 26.5439 13.3333 25.3803 13.3818L2.8833 14.206L2.98027 16.4848L10.156 18.5212C11.3197 18.7636 12.5318 18.9091 13.7439 18.9091"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.88352 14.2061L2.15625 9.40607H4.48352L7.29564 14.0606"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.3437 16.7273L10.1559 23.7091C10.0104 23.903 10.0589 24.1454 10.2528 24.2909C10.3013 24.3394 10.3983 24.3879 10.4953 24.3879H12.871C12.968 24.3879 13.065 24.3394 13.1134 24.2909L22.3256 16.6788M14.2771 13.8182L10.1559 8.33937C10.0104 8.14543 10.0589 7.90301 10.2528 7.75755C10.3013 7.70907 10.3983 7.66058 10.4953 7.66058H12.871C12.968 7.66058 13.065 7.70907 13.1134 7.75755L20.1437 13.5757"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2403_21506">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.75)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
