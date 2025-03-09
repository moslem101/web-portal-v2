export type Airport = {
  id: number
  code: string
  name: string
  cityId: string
  cityName: string
  countryId: number
  countryName: string
}

export interface GetAirportsParams {
  page?: number
  size?: number
  search?: string
}
