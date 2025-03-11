import { api } from '@/services/common/http'
import { Banner, GetBannerParams } from '@/types/BannnerProps'
import { GenericResponse } from '@/types/GeneralProps'

export async function getBanner({
  page = 1,
  size = 10,
}: GetBannerParams): Promise<GenericResponse<Banner>> {
  try {
    const response = await api.get(`/public/umrah/v1/banner`, {
      params: {
        page,
        size,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching banner:', error)
    throw error
  }
}
