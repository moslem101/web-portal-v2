// components/pages/homepage/SearchFilter/AirportFilter.tsx
'use client'

import { AirportIcon } from '@/components/icons/airport'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSearchFilter } from '@/contexts/pages/homepage/search-filter-context'
import { capitalizeText } from '@/lib/utils'
import React, { Fragment, useMemo } from 'react'
import AirportList from './AirportList'

const AirportFilter: React.FC = () => {
  const {
    departureAirport,
    setDepartureAirport,
    arrivalAirport,
    setArrivalAirport,
    isDisabled,
  } = useSearchFilter()

  // Function to display airport details
  const getDisplayText = useMemo(() => {
    if (departureAirport && arrivalAirport) {
      return (
        <p className="text-s-regular text-neutral-900">
          {capitalizeText(departureAirport.cityName)} ({departureAirport.code})
          - {capitalizeText(arrivalAirport.cityName)} ({arrivalAirport.code})
        </p>
      )
    } else if (departureAirport) {
      return (
        <p className="text-s-regular text-neutral-900">
          {capitalizeText(departureAirport.cityName)} ({departureAirport.code})
        </p>
      )
    } else {
      return (
        <Fragment>
          <p className="text-s-regular text-neutral-900">Bandara</p>
          <p className="text-s-regular text-neutral-300">Pilih bandara</p>
        </Fragment>
      )
    }
  }, [arrivalAirport, departureAirport])

  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none" asChild>
        <div
          className={`flex w-full items-center gap-2 ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`}
          onClick={isDisabled ? (e) => e.preventDefault() : undefined}
        >
          <AirportIcon size={32} />
          <div className="flex flex-1 flex-col">{getDisplayText}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-[620px]">
        <AirportList
          onSelectDepartureAirport={setDepartureAirport}
          onSelectArrivalAirport={setArrivalAirport}
          selectedDepartureAirport={departureAirport}
          selectedArrivalAirport={arrivalAirport}
        />
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(AirportFilter)
