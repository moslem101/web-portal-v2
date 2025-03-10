import { api } from '@/services/common/http'
import { Airline, GetAirlinesParams } from '@/types/AirlineProps'

import { Airport, GetAirportsParams } from '@/types/AirportProps'
import { GenericResponse } from '@/types/GeneralProps'

export async function getAirports({
  page = 1,
  size = 10,
  search,
}: GetAirportsParams): Promise<GenericResponse<Airport>> {
  try {
    const response = await api.get(`/public/general/v1/airport`, {
      params: {
        page,
        size,
        [`cityName|code|name:likeLower`]: search ? `%${search}%` : undefined,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching airports:', error)
    throw error
  }
}

export async function getAirline({
  page = 1,
  size = 10,
  search,
}: GetAirlinesParams): Promise<GenericResponse<Airline>> {
  try {
    const response = await api.get(`/public/general/v1/airline`, {
      params: {
        page,
        size,
        [`code|countryName|name:likeLower`]: search ? `%${search}%` : undefined,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching airline:', error)
    throw error
  }
}
