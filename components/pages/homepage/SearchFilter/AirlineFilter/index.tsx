// components/pages/homepage/SearchFilter/AirlineFilter.tsx
'use client'

import { AirlineIcon } from '@/components/icons/airline'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSearchFilter } from '@/contexts/pages/homepage/search-filter-context'
import React from 'react'

const AirlineFilter: React.FC = () => {
  const { airline } = useSearchFilter()

  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none" asChild>
        <div className="flex w-full cursor-pointer items-center gap-2">
          <AirlineIcon size={32} />
          <div className="flex flex-col">
            <p className="text-s-regular text-neutral-900">
              Maskapai Penerbangan
            </p>
            <p className="text-s-regular text-neutral-300">
              {airline ? getAirlineName(airline) : 'Pilih maskapai penerbangan'}
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start">test</PopoverContent>
    </Popover>
  )
}

// Helper function to get airline full name
const getAirlineName = (code: string) => {
  const airlines: Record<string, string> = {
    GA: 'Garuda Indonesia',
    SV: 'Saudia Airlines',
    EK: 'Emirates',
    QR: 'Qatar Airways',
    TK: 'Turkish Airlines',
  }
  return airlines[code] || code
}

export default React.memo(AirlineFilter)
