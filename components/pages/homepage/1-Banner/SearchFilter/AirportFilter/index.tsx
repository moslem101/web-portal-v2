'use client'

import { AirportIcon } from '@/components/icons/airport'
import { ArrowIcon } from '@/components/icons/arrow'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { OtherProps } from '@/constant/types/GeneralProps'
import { useSearchFilter } from '@/contexts/pages/homepage/search-filter-context'
import { capitalizeText } from '@/lib/utils'
import React, { Fragment, useMemo } from 'react'
import AirportList from './AirportList'
import { AirportFilterSkeleton } from './AirportSkeleton'

const AirportFilter: React.FC<OtherProps> = ({ colorIcon, whatPage }) => {
  const {
    departureAirport,
    setDepartureAirport,
    arrivalAirport,
    setArrivalAirport,
    isDisabled,
    isLoadingSkeleton,
  } = useSearchFilter()

  // Function to display airport details
  const getDisplayText = useMemo(() => {
    if (departureAirport && arrivalAirport) {
      return (
        <p className="text-s-regular text-neutral-900">
          {capitalizeText(departureAirport.cityName)} ({departureAirport.code})
          <ArrowIcon size={18} className="inline-flex" />{' '}
          {capitalizeText(arrivalAirport.cityName)} ({arrivalAirport.code})
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

  if (whatPage === 'filter_search' && isLoadingSkeleton) {
    return <AirportFilterSkeleton />
  }

  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none" asChild>
        <div
          className={`flex w-full items-center gap-2 ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`}
          onClick={isDisabled ? (e) => e.preventDefault() : undefined}
        >
          <AirportIcon size={32} color={colorIcon} />
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
