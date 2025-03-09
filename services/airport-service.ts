import { api } from '@/services/common/http'

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
        [`name:likeLower`]: search ? `%${search}%` : undefined,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching airports:', error)
    throw error
  }
}
