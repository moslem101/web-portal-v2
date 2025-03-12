'use client'

import { HeaderPackageList } from '@/components/pages/homepage/4-PackageList/HeaderPackageList'
import { CardPackage } from '@/components/shared/CardPackage'
import { CardPackageSkeleton } from '@/components/shared/SkeletonCardPackage'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CardData } from '@/types/PackageProps'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface PackageListEventProps {
  dataPromo: CardData[]
  dataRegular: CardData[]
  dataPlus: CardData[]
  isLoading?: boolean
}

export const PackageListEvent: React.FC<PackageListEventProps> = ({
  dataPromo,
  dataRegular,
  dataPlus,
  isLoading: externalLoading,
}) => {
  // Internal loading states
  const [isPromoLoading, setIsPromoLoading] = useState(true)
  const [isRegularLoading, setIsRegularLoading] = useState(true)
  const [isPlusLoading, setIsPlusLoading] = useState(true)

  // Use either external or internal loading state - memoize this computation
  const loading = useMemo(
    () =>
      externalLoading !== undefined
        ? externalLoading
        : isPromoLoading || isRegularLoading || isPlusLoading,
    [externalLoading, isPromoLoading, isRegularLoading, isPlusLoading]
  )

  // Create the skeleton carousel items with useCallback
  const renderSkeletonItems = useCallback(
    (count: number, isLoading: boolean) => {
      return Array.from({ length: count }).map((_, index) => (
        <CarouselItem
          key={`skeleton-${index}`}
          className="items-center pl-4.5 md:basis-1/2 lg:basis-1/4"
        >
          <CardPackageSkeleton isLoading={isLoading} />
        </CarouselItem>
      ))
    },
    []
  )

  // Memoize the package items for each section
  const promoItems = useMemo(
    () =>
      dataPromo?.map((item, index) => (
        <CarouselItem
          key={`package-items-${item.title}-${index}`}
          className="items-center pl-4.5 md:basis-1/2 lg:basis-1/4"
        >
          <CardPackage data={item} />
        </CarouselItem>
      )),
    [dataPromo]
  )

  const regularItems = useMemo(
    () =>
      dataRegular?.map((item, index) => (
        <CarouselItem
          key={`package-items-${item.title}-${index}`}
          className="items-center overflow-hidden pl-4.5 md:basis-1/2 lg:basis-1/4"
        >
          <CardPackage data={item} />
        </CarouselItem>
      )),
    [dataRegular]
  )

  const plusItems = useMemo(
    () =>
      dataPlus?.map((item, index) => (
        <CarouselItem
          key={`package-items-${item.title}-${index}`}
          className="items-center overflow-hidden pl-4.5 md:basis-1/2 lg:basis-1/4"
        >
          <CardPackage data={item} />
        </CarouselItem>
      )),
    [dataPlus]
  )

  // Simulate loading or respect the external loading state
  useEffect(() => {
    if (externalLoading !== undefined) return

    // Simulate staggered loading for different sections
    const promoTimer = setTimeout(() => setIsPromoLoading(false), 1200)
    const regularTimer = setTimeout(() => setIsRegularLoading(false), 1800)
    const plusTimer = setTimeout(() => setIsPlusLoading(false), 2400)

    return () => {
      clearTimeout(promoTimer)
      clearTimeout(regularTimer)
      clearTimeout(plusTimer)
    }
  }, [externalLoading])

  return (
    <section className="mt-[60px] flex flex-col gap-7">
      <HeaderPackageList
        title="Paket Promo"
        desc="Promo menarik Muslim101 untukmu"
        link="#"
      />
      <Carousel
        opts={{
          align: 'start',
          inViewThreshold: 1,
          watchDrag: true,
        }}
        className="my-7 w-full"
      >
        <CarouselContent className="-ml-4.5 px-2">
          {isPromoLoading || loading
            ? renderSkeletonItems(4, true)
            : promoItems}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <HeaderPackageList
        title="Umroh Reguler"
        desc="Umroh tanpa khawatir, tinggal berangkat dan ibadah dengan nyaman!"
        link="#"
      />
      <Carousel
        opts={{
          align: 'start',
          inViewThreshold: 1,
          watchDrag: true,
        }}
        className="my-7 w-full"
      >
        <CarouselContent className="-ml-4.5 px-2">
          {isPromoLoading || loading
            ? renderSkeletonItems(4, true)
            : regularItems}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <HeaderPackageList
        title="Umroh Plus"
        desc="Umroh istimewa plus jalan-jalan ke destinasi pilihan!"
        link="#"
      />
      <Carousel
        opts={{
          align: 'start',
          inViewThreshold: 1,
          watchDrag: true,
        }}
        className="my-7 w-full"
      >
        <CarouselContent className="-ml-4.5 px-2">
          {isPromoLoading || loading ? renderSkeletonItems(4, true) : plusItems}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
