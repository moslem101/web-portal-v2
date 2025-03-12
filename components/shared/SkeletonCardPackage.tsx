import { cn } from '@/lib/utils'
import React from 'react'

interface CardPackageSkeletonProps {
  className?: string
  isLoading?: boolean // New prop to control the transition
}

export const CardPackageSkeleton: React.FC<CardPackageSkeletonProps> = ({
  className,
  isLoading = true, // Default to loading state
}) => {
  return (
    <div
      className={cn(
        'transition-opacity duration-500 ease-in-out',
        isLoading ? 'animate-pulse opacity-100' : 'opacity-0',
        className
      )}
    >
      {/* Image Container with Skeleton */}
      <div className="relative w-full">
        {/* Main Image Skeleton */}
        <div className="aspect-square w-full rounded-[20px] bg-neutral-200"></div>

        {/* Organization badge skeleton at bottom */}
        <div className="absolute bottom-[-4%] left-1/2 inline-flex w-[95%] -translate-x-1/2 -translate-y-1/2 items-center justify-start gap-2 rounded-2xl bg-white/60 px-3 py-1.5 backdrop-blur-[5.20px]">
          <div className="h-5 w-5 rounded-full bg-neutral-300"></div>
          <div className="flex w-full flex-col gap-0.5">
            <div className="h-4 w-24 rounded bg-neutral-300"></div>
            <div className="h-3 w-16 rounded bg-neutral-300"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mt-3 flex flex-col gap-1">
        {/* Title Skeleton */}
        <div className="h-5 w-full rounded bg-neutral-200"></div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-neutral-300"></div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={`star-skeleton-${i}`}
                className="h-3 w-3 rounded bg-neutral-300"
              ></div>
            ))}
          </div>
        </div>

        {/* Date Range and Duration Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="h-4 w-4 rounded bg-neutral-300"></div>
            <div className="h-3 w-32 rounded bg-neutral-300"></div>
          </div>
          <div className="h-6 w-16 rounded-[100px] bg-neutral-300"></div>
        </div>

        {/* Price Skeleton */}
        <div className="mt-1 flex flex-row items-center gap-1">
          <div className="h-5 w-20 rounded bg-neutral-200"></div>
        </div>
      </div>
    </div>
  )
}
