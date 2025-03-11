import { api } from '@/services/common/http'
import { GenericResponse } from '@/types/GeneralProps'
import { GetTravelParams, Travel } from '@/types/TravelProps'

export async function getTravels({
  page = 1,
  size = 20,
}: GetTravelParams): Promise<GenericResponse<Travel>> {
  try {
    const response = await api.get(
      `/public/identity/v1/organization-instance-selected/published`,
      {
        params: {
          page,
          size,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching travel:', error)
    throw error
  }
}
