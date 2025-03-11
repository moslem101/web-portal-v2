export type Banner = {
  id?: number
  title?: string
  image: string
  url?: string
}

export interface GetBannerParams {
  page?: number
  size?: number
  search?: string
}
