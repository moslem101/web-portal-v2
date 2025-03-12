'use client'

import { TravelLogoSkeleton } from '@/components/pages/homepage/3-Travels/SkeletonTravels'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { GenericResponse } from '@/types/GeneralProps'
import { Travel } from '@/types/TravelProps'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useState } from 'react'

export function CarouselTravel({
  dataTravel,
}: {
  dataTravel: GenericResponse<Travel>
}) {
  // State to track image loading
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  // Handler for image load
  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <section>
      <Separator className="mt-[60px]" />
      <Carousel
        opts={{
          align: 'end',
          loop: true,
          inViewThreshold: 1,
          watchDrag: false,
        }}
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
        className="my-7 w-full"
      >
        <CarouselContent className="-ml-10">
          {dataTravel?.results.map((item, index) => (
            <CarouselItem
              key={`logo-travel-${item.organizationInstance?.tagline}-${index}`}
              className="items-center overflow-hidden pl-10 md:basis-1/2 lg:basis-1/5"
            >
              <div className="relative flex justify-center">
                {/* Show skeleton until image is loaded */}
                {!imagesLoaded[index] && <TravelLogoSkeleton />}

                <Image
                  src={item.organizationInstance?.thumbnail}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={`logo-travel-${item.organizationInstance?.tagline}`}
                  className={`m-auto h-[80px] w-auto transition-opacity duration-300 ${
                    imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Separator />
    </section>
  )
}
