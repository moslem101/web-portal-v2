// components/pages/homepage/SearchFilter/index.tsx
'use client'

import { SearchIcon } from '@/components/icons/search'
import { Button } from '@/components/ui/button'
import { useSearchFilter } from '@/contexts/pages/homepage/search-filter-context'
import React from 'react'
import AirlineFilter from './AirlineFilter'
import AirportFilter from './AirportFilter'
import DateFilter from './DateFilter'
import RatingFilter from './RatingFilter'

const SearchFilters: React.FC = () => {
  const { isDisabled, isLoading, handleSubmit } = useSearchFilter()

  return (
    <div className="flex w-full items-center justify-between">
      {/* Hotel Stars Filter */}
      <RatingFilter />
      <div className="mx-6 h-10 w-px bg-[#D2D2D1]" />

      {/* Departure Date Filter */}
      <DateFilter />
      <div className="mx-6 h-10 w-px bg-[#D2D2D1]" />

      {/* Airport Filter */}
      <AirportFilter />
      <div className="mx-6 h-10 w-px bg-[#D2D2D1]" />

      {/* Airline Filter */}
      <AirlineFilter />

      {/* Search Button */}
      <div className="flex items-center justify-end">
        <Button
          size="xs"
          className="w-[100px] gap-1 py-2 pr-[22px] pl-4"
          disabled={isDisabled}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          <SearchIcon size={24} />
          Cari
        </Button>
      </div>
    </div>
  )
}

export default React.memo(SearchFilters)
