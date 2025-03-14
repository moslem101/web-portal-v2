export type GenericResponse<T> = {
  results: T[]
  total: number
}

export type GetListQuery = {
  page: number
  size: number
} & Record<string, any>

export type OtherProps = {
  colorIcon?: string
  className?: string
  whatPage: string // this is for where's page is used
}
