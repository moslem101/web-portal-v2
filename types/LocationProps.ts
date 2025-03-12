export interface City {
  id: string
  name: string
  altName: string
  latitude: number
  longitude: number
  provinceId?: string
}

export interface Province {
  id: string
  name: string
  altName: string
  latitude: number
  longitude: number
  countryId: string
}

export interface Country {
  id: string
  name: string
  altName: string
  latitude: number
  longitude: number
  alpha2Code?: string
  alpha3Code?: string
}

export interface AdditionalCountry {
  id: number
  packageId: number
  country: Country
  index: number
  createdAt: string
  createdBy: string
}
