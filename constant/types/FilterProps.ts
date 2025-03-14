import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { DateRange } from 'react-day-picker'

// Define the filter state interface
export interface FilterState {
  hotelStars: number
  dateRange: DateRange | undefined
  selectedAirport: Airport | null
  departureAirport: Airport | null
  arrivalAirport: Airport | null
  airline: Airline | null
}
