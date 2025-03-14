import { dissolve } from '@/lib/animation-setup'
import React from 'react'

export const AirlineFilterSkeleton: React.FC = () => {
  return (
    <div className={`flex w-full items-center gap-2 ${dissolve}`}>
      {/* Icon skeleton */}
      <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-200"></div>
      <div className="flex flex-col">
        {/* Label skeleton */}
        <div className="h-4 w-36 animate-pulse rounded bg-neutral-200"></div>
        {/* Value skeleton */}
        <div className="mt-1 h-3 w-28 animate-pulse rounded bg-neutral-100"></div>
      </div>
    </div>
  )
}

const AirlineSkeleton: React.FC = () => {
  return (
    <div className="flex w-full animate-pulse items-center justify-between gap-2.5 border-b border-neutral-100 px-3 py-2.5">
      <div className="h-8 w-8 rounded-full bg-neutral-200"></div>
      <div className="flex flex-2 flex-col gap-1">
        <div className="h-3 w-3/4 rounded bg-neutral-200"></div>
        <div className="h-2 w-1/2 rounded bg-neutral-100"></div>
      </div>
      <div className="h-5 w-5 bg-neutral-200"></div>
    </div>
  )
}

export const AirlineSkeletonList: React.FC<{ count?: number }> = ({
  count = 5,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <AirlineSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  )
}
