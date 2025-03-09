// components/AirportSkeleton.tsx
import React from 'react'

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

export default AirportSkeleton
