'use client'

import { Airport } from '@/types/AirportProps'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { DateRange } from 'react-day-picker'

interface SearchFilterContextType {
  // Filter states
  hotelStars: number
  setHotelStars: (stars: number) => void
  dateRange: DateRange | undefined
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
  airline: string
  setAirline: (airline: string) => void

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
  // Filter states
  const [hotelStars, setHotelStars] = useState<number>(0)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  // Original airport state - keep for backward compatibility
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null)

  // New separate states for departure and arrival airports
  const [departureAirport, setDepartureAirport] = useState<Airport | null>(null)
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null)

  // Airline state
  const [airline, setAirline] = useState<string>('')

  // Form states
  const [isDisabled, setIsDisabled] = useState<boolean>(initialDisabled)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<any | null>(null)

  // Submit handler
  const handleSubmit = useCallback(() => {
    // Collect all filter values
    const formData = {
      hotelStars,
      departureDate: dateRange?.from ? dateRange.from.toISOString() : null,
      returnDate: dateRange?.to ? dateRange.to.toISOString() : null,
      airport: selectedAirport?.code, // Legacy support
      departureAirport: departureAirport?.code,
      arrivalAirport: arrivalAirport?.code,
      airline,
    }

    // Mock API call/form submission
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      console.log('Submitting form data:', formData)
      setSearchResults(formData)
      setIsLoading(false)
    }, 1000)
  }, [
    hotelStars,
    dateRange,
    selectedAirport,
    departureAirport,
    arrivalAirport,
    airline,
  ])

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
    handleSubmit,
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
