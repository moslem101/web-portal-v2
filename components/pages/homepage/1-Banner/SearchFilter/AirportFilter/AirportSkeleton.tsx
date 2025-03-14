import { dissolve } from '@/lib/animation-setup'
import React from 'react'

export const AirportFilterSkeleton: React.FC = () => {
  return (
    <div className={`flex w-full items-center gap-2 ${dissolve}`}>
      {/* Icon skeleton */}
      <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200"></div>
      <div className="flex flex-col">
        {/* Label skeleton */}
        <div className="h-4 w-16 animate-pulse rounded bg-neutral-200"></div>
        {/* Value skeleton */}
        <div className="mt-1 h-3 w-28 animate-pulse rounded bg-neutral-100"></div>
      </div>
    </div>
  )
}

const AirportSkeleton: React.FC = () => {
  return (
    <div className="flex animate-pulse items-center border-b border-neutral-100 px-3 py-2.5">
      <div className="flex-1">
        <div className="mb-2 h-4 w-3/4 rounded bg-neutral-200"></div>
        <div className="h-3 w-1/2 rounded bg-neutral-100"></div>
      </div>
    </div>
  )
}

export const AirportSkeletonList: React.FC<{ count?: number }> = ({
  count = 5,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <AirportSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  )
}
