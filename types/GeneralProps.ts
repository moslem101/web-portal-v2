export type GenericResponse<T> = {
  results: T[]
  total: number
}

export type GetListQuery = {
  page: number
  size: number
} & Record<string, any>
