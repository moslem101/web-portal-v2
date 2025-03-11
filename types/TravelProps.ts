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

export interface GetTravelParams {
  page?: number
  size?: number
}
