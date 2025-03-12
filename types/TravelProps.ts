import { Airline } from '@/types/AirlineProps'
import { AirportReference } from '@/types/AirportProps'
import { City, Country, Province } from '@/types/LocationProps'

export interface Travel {
  id: number
  organizationInstance: {
    id: number
    thumbnail: string
    name: string
    city: {
      name: string
    }
    legalInformation: {
      pihk: string
      ppiu: string
    }
    tagline: string
    directContact: false
    bdm: any
    phoneNumber: string
    slug: any
    description: string
  }
}

export interface OrganizationInstance {
  id: number
  name: string
  slug: string
  type: string
  email: string
  cityId: string
  address: string
  tagline: string
  isActive: boolean
  phoneNumber: string
  countryId: string
  provinceId: string
  thumbnail: string | null
  description: string
  organizationId: string
  directContact: boolean
  legalInformation: LegalInformation
  city: City
  province: Province
  country: Country
  agreement?: Agreement
  organization: Organization
}

export interface Agreement {
  id: number
  fileName: string
  signedAt: string
  signedBy: string
  validUntil: string
  isCanceled: boolean
  organizationInstanceId: number
}

export interface LegalInformation {
  pihk: string
  ppiu: string
}
export interface Organization {
  id: string
  name: string
  slug: string
  isActive: boolean
  thumbnail: string | null
  description: string
}

export interface TravelRoute {
  from: AirportReference
  to: AirportReference
  airline: Airline
  airlineId: number
}

export interface GetTravelParams {
  page?: number
  size?: number
}
