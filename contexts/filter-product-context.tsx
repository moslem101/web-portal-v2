'use client'

import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { FilterState } from '@/constant/types/FilterProps'
import { getAirline, getAirports } from '@/services/general-service'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { DateRange } from 'react-day-picker'
import { toast } from 'sonner'

// Initial filter state
const initialFilterState: FilterState = {
  hotelStars: 0,
  dateRange: undefined,
  selectedAirport: null,
  departureAirport: null,
  arrivalAirport: null,
  airline: null,
  // Add new attributes if there's a new state for filter
}

interface FilterProductContextType {
  // Combined filter state
  filters: FilterState
  setFilters: (filter: FilterState) => void

  // Filter state setters
  setHotelStars: (stars: number) => void
  setDateRange: (range: DateRange | undefined) => void
  setSelectedAirport: (airport: Airport) => void
  setDepartureAirport: (airport: Airport) => void
  setArrivalAirport: (airport: Airport) => void
  setAirline: (airline: Airline) => void

  // Form submission
  isDisabled: boolean
  setIsDisabled: (disabled: boolean) => void
  isLoading: boolean
  isLoadingSkeleton: boolean
  handleSubmit: () => void
  searchResults: any | null
}

const FilterProductContext = createContext<
  FilterProductContextType | undefined
>(undefined)

export const FilterProductProvider: React.FC<{
  children: React.ReactNode
  initialDisabled?: boolean
}> = ({ children, initialDisabled = false }) => {
  // Combined filter state
  const [filters, setFilters] = useState<FilterState>(initialFilterState)

  // Form states
  const [isDisabled, setIsDisabled] = useState<boolean>(initialDisabled)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState<boolean>(true)
  const [searchResults, setSearchResults] = useState<any | null>(null)

  // Filter state setters
  const setHotelStars = useCallback((stars: number) => {
    setFilters((prev) => ({ ...prev, hotelStars: stars }))
  }, [])

  const setDateRange = useCallback((range: DateRange | undefined) => {
    setFilters((prev) => ({ ...prev, dateRange: range }))
  }, [])

  const setSelectedAirport = useCallback((airport: Airport) => {
    setFilters((prev) => ({ ...prev, selectedAirport: airport }))
  }, [])

  const setDepartureAirport = useCallback((airport: Airport) => {
    setFilters((prev) => ({ ...prev, departureAirport: airport }))
  }, [])

  const setArrivalAirport = useCallback((airport: Airport) => {
    setFilters((prev) => ({ ...prev, arrivalAirport: airport }))
  }, [])

  const setAirline = useCallback((airline: Airline) => {
    setFilters((prev) => ({ ...prev, airline: airline }))
  }, [])

  // Set default value states filter from search params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const newFilters = { ...initialFilterState }
      let hasUpdates = false

      // Set hotel stars if exists
      const starsParam = params.get('hotelStars')
      if (starsParam) {
        newFilters.hotelStars = parseInt(starsParam, 10)
        hasUpdates = true
      }

      // Set date range if exists
      const departureDateParam = params.get('departureDate')
      const returnDateParam = params.get('returnDate')
      if (departureDateParam || returnDateParam) {
        const range: DateRange = {
          from: undefined,
        }
        if (departureDateParam) {
          range.from = new Date(departureDateParam)
        }
        if (returnDateParam) {
          range.to = new Date(returnDateParam)
        }
        newFilters.dateRange = range
        hasUpdates = true
      }

      // Apply non-async updates right away
      if (hasUpdates) {
        setFilters((prev) => ({ ...prev, ...newFilters }))
      }

      // Async updates for airports and airline
      const promises = []

      // Set airport if exists in params
      const airportParam = params.get('airport')
      if (airportParam) {
        promises.push(
          fetchAirportByCode(airportParam).then((airport) => {
            if (airport) {
              setFilters((prev) => ({ ...prev, selectedAirport: airport }))
            }
          })
        )
      }

      // Set departure airport
      const departureAirportParam = params.get('departureAirport')
      if (departureAirportParam) {
        promises.push(
          fetchAirportByCode(departureAirportParam).then((airport) => {
            if (airport) {
              setFilters((prev) => ({ ...prev, departureAirport: airport }))
            }
          })
        )
      }

      // Set arrival airport
      const arrivalAirportParam = params.get('arrivalAirport')
      if (arrivalAirportParam) {
        promises.push(
          fetchAirportByCode(arrivalAirportParam).then((airport) => {
            if (airport) {
              setFilters((prev) => ({ ...prev, arrivalAirport: airport }))
            }
          })
        )
      }

      // Set airline
      const airlineParam = params.get('maskapai')
      if (airlineParam) {
        promises.push(
          fetchAirlineByName(airlineParam).then((airline) => {
            if (airline) {
              setFilters((prev) => ({ ...prev, airline: airline }))
            }
          })
        )
      }

      // Wait for all promises to resolve or turn off loading after timeout
      Promise.all(promises).finally(() => {
        setTimeout(() => {
          setIsLoadingSkeleton(false)
        }, 1000)
      })
    }
  }, [])

  const fetchAirportByCode = async (code: string): Promise<Airport | null> => {
    try {
      const data = await getAirports({
        page: 1,
        size: 1,
        search: code,
      })
      return data.results[0] || null
    } catch (error) {
      console.error('Error fetching airport:', error)
      return null
    }
  }

  const fetchAirlineByName = async (name: string): Promise<Airline | null> => {
    try {
      const data = await getAirline({
        page: 1,
        size: 1,
        search: name,
      })
      return data.results[0] || null
    } catch (error) {
      console.error('Error fetching airline:', error)
      return null
    }
  }

  // Submit handler
  const handleSubmit = useCallback(() => {
    try {
      const {
        hotelStars,
        dateRange,
        selectedAirport,
        departureAirport,
        arrivalAirport,
        airline,
      } = filters

      // Collect all filter values
      const formData = {
        hotelStars: hotelStars ?? undefined,
        departureDate: dateRange?.from
          ? dateRange.from.toISOString()
          : undefined,
        returnDate: dateRange?.to ? dateRange.to.toISOString() : undefined,
        airport: selectedAirport?.code ?? undefined,
        departureAirport: departureAirport?.code ?? undefined,
        arrivalAirport: arrivalAirport?.code ?? undefined,
        airline: airline?.name ?? undefined,
      }

      // Set loading state
      setIsLoading(true)

      const currentUrlParams = new URLSearchParams(window.location.search)

      if (formData.hotelStars)
        currentUrlParams.set('hotelStars', formData.hotelStars.toString())
      if (formData.departureDate)
        currentUrlParams.set('departureDate', formData.departureDate)
      if (formData.returnDate)
        currentUrlParams.set('returnDate', formData.returnDate)
      if (formData.airport) currentUrlParams.set('airport', formData.airport)
      if (formData.departureAirport)
        currentUrlParams.set('departureAirport', formData.departureAirport)
      if (formData.arrivalAirport)
        currentUrlParams.set('arrivalAirport', formData.arrivalAirport)
      if (formData.airline) currentUrlParams.set('maskapai', formData.airline)

      // Simulate API call with setTimeout
      setTimeout(() => {
        // Update search results
        setSearchResults(formData)

        // Reset loading
        setIsLoading(false)

        // Navigate to search results page
        window.location.href = `/packages?${currentUrlParams.toString()}`
      }, 1000)
    } catch (err) {
      // Handle errors
      toast.error(
        err
          ? (err as string)
          : 'Terjadi kesalahan pada server. Mohon ulangi beberapa saat lagi.'
      )
      setIsLoading(false)
    }
  }, [filters])

  const value = {
    // Combined filter state
    filters,
    setFilters,

    // Filter state setters
    setHotelStars,
    setDateRange,
    setSelectedAirport,
    setDepartureAirport,
    setArrivalAirport,
    setAirline,

    // Form states
    isDisabled,
    setIsDisabled,
    isLoading,
    isLoadingSkeleton,
    handleSubmit,
    searchResults,
  }

  return (
    <FilterProductContext.Provider value={value}>
      {children}
    </FilterProductContext.Provider>
  )
}

// Custom hook to use the context
export const useFilterProduct = () => {
  const context = useContext(FilterProductContext)
  if (context === undefined) {
    throw new Error(
      'useFilterProduct must be used within a FilterProductProvider'
    )
  }
  return context
}
