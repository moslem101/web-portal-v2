export type Airline = {
  id: number
  code: string
  name: string
  countryId: number
  countryName: string
  logo?: string
}

export interface GetAirlinesParams {
  page?: number
  size?: number
  search?: string
}
