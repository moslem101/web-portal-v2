import { api } from '@/services/common/http'
import { Banner } from '@/constant/types/BannerProps'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import { Package } from '@/constant/types/PackageProps'
import qs from 'query-string'

export async function getBanner(
  query: GetListQuery
): Promise<GenericResponse<Banner>> {
  try {
    const response = await api.get(
      `/public/umrah/v1/banner?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching banner:', error)
    throw error
  }
}

export async function getPackageList(
  query: GetListQuery
): Promise<GenericResponse<Package>> {
  try {
    const response = await api.get(
      `/public/umrah/v2/package?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching package data list:', error)
    throw error
  }
}
