// components/pages/homepage/SearchFilter/AirlineFilter.tsx
'use client'

import { AirlineIcon } from '@/components/icons/airline'
import AirlineList from '@/components/pages/homepage/1-Banner/SearchFilter/AirlineFilter/AirlineList'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSearchFilter } from '@/contexts/pages/homepage/search-filter-context'
import { capitalizeText } from '@/lib/utils'
import React, { Fragment } from 'react'

const IS_TRANSIT = ['QR', 'TK', 'MH', 'EY', 'EK', '6E', 'SQ', 'MS']

const AirlineFilter: React.FC = () => {
  const { airline, setAirline, isDisabled } = useSearchFilter()

  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none" asChild>
        <div
          className={`flex w-full cursor-pointer items-center gap-2 ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`}
          onClick={isDisabled ? (e) => e.preventDefault() : undefined}
        >
          <AirlineIcon size={32} />
          <div className="flex flex-1 flex-col">
            {airline ? (
              <Fragment>
                <p className="text-s-regular text-neutral-900">
                  {capitalizeText(airline.name)}
                </p>
                {IS_TRANSIT.includes(airline.code) && (
                  <p className="text-s-regular text-neutral-500">
                    Memerlukan 1x transit
                  </p>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <p className="text-s-regular text-neutral-900">
                  Maskapai Penerbangan
                </p>
                <p className="text-s-regular text-neutral-300">
                  Pilih maskapai penerbangan
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start">
        <AirlineList
          selectedAirline={airline}
          onSelectAirline={setAirline}
          isTransit={IS_TRANSIT}
        />
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(AirlineFilter)
