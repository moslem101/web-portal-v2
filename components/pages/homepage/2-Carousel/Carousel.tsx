'use client'

import { BannerSkeleton } from '@/components/pages/homepage/2-Carousel/SkeletonCarousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { dissolve } from '@/lib/animation-setup'
import { Banner } from '@/types/BannerProps'
import { GenericResponse } from '@/types/GeneralProps'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function CarouselBanner({
  dataBanner,
}: {
  dataBanner: GenericResponse<Banner>
}) {
  // State to track image loading
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  // Handler for image load
  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <section>
      <p className="heading-2-bold mt-16 mb-0.5 text-neutral-900">
        Program Muslim101
      </p>
      <p className="text-l-regular mb-7 text-neutral-900">
        Jangan lewatkan program menarik dari Muslim 101
      </p>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-5">
          {dataBanner?.results.map((banner, index) => (
            <CarouselItem
              key={index}
              className="cursor-pointer overflow-hidden pl-5 md:basis-1/2 lg:basis-1/3"
            >
              <Link href={banner.url ?? ''} key={`image-banner-${index}`}>
                <div className="relative">
                  {/* Show skeleton until image is loaded */}
                  {!imagesLoaded[index] && <BannerSkeleton />}

                  <Image
                    src={banner.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={`image-banner-${banner.title}`}
                    className={`aspect-2/1 h-auto w-full rounded-xl ${dissolve} ${
                      imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
