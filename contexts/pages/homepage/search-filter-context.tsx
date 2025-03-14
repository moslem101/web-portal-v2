'use client'

import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
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

interface SearchFilterContextType {
  // Filter states

  // Rating state
  hotelStars: number
  setHotelStars: (stars: number) => void

  // Date states
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
  airline: Airline | null
  setAirline: (airline: Airline) => void

  // Form submission
  isDisabled: boolean
  setIsDisabled: (disabled: boolean) => void
  isLoading: boolean
  isLoadingSkeleton: boolean
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
  const [airline, setAirline] = useState<Airline | null>(null)

  // Form states
  const [isDisabled, setIsDisabled] = useState<boolean>(initialDisabled)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState<boolean>(true)
  const [searchResults, setSearchResults] = useState<any | null>(null)

  // Set default value states filter from search params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)

      // Set hotel stars if exists
      const starsParam = params.get('hotelStars')
      if (starsParam) {
        setHotelStars(parseInt(starsParam, 10))
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
        setDateRange(range)
      }

      // Set airport jika ada di params
      const airportParam = params.get('airport')
      if (airportParam) {
        fetchAirportByCode(airportParam).then((airport) => {
          if (airport) {
            setSelectedAirport(airport)
          }
        })
      }

      // Set departure airport
      const departureAirportParam = params.get('departureAirport')
      if (departureAirportParam) {
        fetchAirportByCode(departureAirportParam).then((airport) => {
          if (airport) {
            setDepartureAirport(airport)
          }
        })
      }

      // Set arrival airport
      const arrivalAirportParam = params.get('arrivalAirport')
      if (arrivalAirportParam) {
        fetchAirportByCode(arrivalAirportParam).then((airport) => {
          if (airport) {
            setArrivalAirport(airport)
          }
        })
      }

      // Set airline
      const airlineParam = params.get('maskapai')
      if (airlineParam) {
        fetchAirlineByName(airlineParam).then((airline) => {
          if (airline) {
            setAirline(airline)
          }
        })
      }
      setTimeout(() => {
        setIsLoadingSkeleton(false)
      }, 1000)
    }
  }, [])

  const fetchAirportByCode = async (code: string): Promise<Airport | null> => {
    try {
      const data = await getAirports({
        page: 1,
        size: 1,
        search: code,
      })
      return data.results[0]
    } catch (error) {
      console.error('Error fetching airport:', error)
      return null
    }
  }

  const fetchAirlineByName = async (name: string): Promise<Airline | null> => {
    // Implementasi sebenarnya untuk mengambil data airline berdasarkan nama
    // Contoh placeholder:
    try {
      const data = await getAirline({
        page: 1,
        size: 1,
        search: name,
      })
      return data.results[0]
    } catch (error) {
      console.error('Error fetching airline:', error)
      return null
    }
  }

  // Submit handler
  const handleSubmit = useCallback(() => {
    try {
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
    isLoadingSkeleton,
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
