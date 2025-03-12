import { Hotel } from '@/types/HotelProps'
import { AdditionalCountry } from '@/types/LocationProps'
import { OrganizationInstance, TravelRoute } from '@/types/TravelProps'

export interface PackageVariant {
  id: number
  priceQuad: number
  priceDouble: number
  priceTriple: number
  discountType: string
  discountAmount: number
  departureDate: string
  arrivalDate: string
  isLastCall: boolean
  releasedAt: string
  originalPriceQuad: number
  originalPriceDouble: number
  originalPriceTriple: number
}

export interface CardData {
  id: number
  src: string
  discount: string | number
  discountType: string
  title: string
  location: string
  district: string
  organizationName: string
  originalPrice: string
  price: string
  rating: string | number
  slugOrganization: string
  slugPackage: string
  isLastCall: boolean
  isPlus: boolean
  departureDate: string
  arrivalDate: string
  codeCountry?: AdditionalCountry[]
  releasedAt: string
}

export interface Package {
  id: number
  organizationId: string
  organizationInstanceId: number
  organizationInstanceName: string
  organizationInstance: OrganizationInstance
  packageType: string
  thumbnail: string
  title: string
  slug: string
  description: string
  termsCondition: string
  facility: string
  currency: string
  medinaHotel: Hotel
  meccaHotel: Hotel
  departure: TravelRoute
  arrival: TravelRoute
  published: boolean
  dpType: string
  dpAmount: number
  feeType: string
  feeAmount: number
  deleted: boolean
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string
  isPlus: boolean
  packageVariant: PackageVariant
  tagPackage: null | any
  additionalCountry?: AdditionalCountry[]
}
