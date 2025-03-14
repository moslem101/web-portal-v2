'use client'

import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { formatNumberCurrency } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { DateRange } from 'react-day-picker'

interface SearchFilterContextType {
  // Rating state
  hotelStars: number
  setHotelStars: (stars: number) => void

  // Date states
  price: number
  setDateRange: (range: DateRange | undefined) => void

  // Airport states - original single airport
  selectedAirport: Airport | null
  setSelectedAirport: (airport: Airport) => void

  // New airport states for departure and arrival
  departureAirport: Airport | null
  setDepartureAirport: (airport: Airport) => void
  arrivalAirport: Airport | null
  setArrivalAirport: (airport: Airport) => void

  // Airline state
  airline: Airline | null
  setAirline: (airline: Airline) => void

  // Form submission
  isDisabled: boolean
  setIsDisabled: (disabled: boolean) => void
  isLoading: boolean
  handleSubmit: () => void
  searchResults: any | null
}

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(
  undefined
)

export const SearchFilterProvider: React.FC<{
  children: React.ReactNode
  initialDisabled?: boolean
}> = ({ children, initialDisabled = false }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    hargaMin: searchParams?.get('hargaMin') || '',
    hargaMax: searchParams?.get('hargaMax') || '',
    // lokasi: searchParams?.get('lokasi') || '',
    // medinaHotel: searchParams?.get('medinaHotel') || '',
    // meccaHotel: searchParams?.get('meccaHotel') || '',
    // maskapai: searchParams?.get('maskapai') || '',
    // airport: searchParams?.get('airport') || '',
    // month: searchParams?.get('month') || '',
    // year: searchParams?.get('year') || '',
  })

  // Form states
  const [isDisabled, setIsDisabled] = useState<boolean>(initialDisabled)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<any | null>(null)

  // Update query parameters
  const updateQueryParams = useCallback(
    (key: string, value: string | number) => {
      const parsedUrl = queryString.parseUrl(window.location.href)
      const query: any = parsedUrl.query
      if (value) {
        query[key] = value.toString()
      } else {
        delete query[key]
      }
      query.page = 1
      router.push(`${pathname}?${queryString.stringify(query)}`, {
        scroll: false,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, router, searchParams]
  )

  const handleInputChange = (key: string, value: string) => {
    const formattedValue =
      key === 'hargaMin' || key === 'hargaMax'
        ? formatNumberCurrency(value)?.replace(/\D/g, '')
        : value

    setFilters((prev) => ({ ...prev, [key]: formattedValue }))
    if (!isMobile) {
      updateQueryParams(key, formattedValue)
    }
  }

  const value = {
    // Filter states
    hotelStars,
    setHotelStars,
    dateRange,
    setDateRange,

    // Legacy airport state
    selectedAirport,
    setSelectedAirport,

    // New departure and arrival airport states
    departureAirport,
    setDepartureAirport,
    arrivalAirport,
    setArrivalAirport,

    // Airline state
    airline,
    setAirline,

    // Form states
    isDisabled,
    setIsDisabled,
    isLoading,
    updateQueryParams,
    searchResults,
  }

  return (
    <SearchFilterContext.Provider value={value}>
      {children}
    </SearchFilterContext.Provider>
  )
}

// Custom hook to use the context
export const useSearchFilter = () => {
  const context = useContext(SearchFilterContext)
  if (context === undefined) {
    throw new Error(
      'useSearchFilter must be used within a SearchFilterProvider'
    )
  }
  return context
}
