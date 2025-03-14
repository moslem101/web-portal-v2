'use client'

import { dissolve } from '@/lib/animation-setup'
import React from 'react'

export const DateSkeleton: React.FC = () => {
  return (
    <div className={`flex w-full items-center gap-2 ${dissolve}`}>
      {/* Icon skeleton */}
      <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200"></div>
      <div className="flex flex-col">
        {/* Label skeleton */}
        <div className="h-4 w-36 animate-pulse rounded bg-neutral-200"></div>
        {/* Value skeleton */}
        <div className="mt-1 h-3 w-48 animate-pulse rounded bg-neutral-100"></div>
      </div>
    </div>
  )
}
