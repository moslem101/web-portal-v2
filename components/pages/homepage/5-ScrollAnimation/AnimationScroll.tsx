'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

// Sample image data
const images = [
  {
    url: 'https://images.unsplash.com/photo-1682687219800-bba120d709c5?q=80&w=2070&auto=format&fit=crop',
    title: 'Mountain Landscape',
    description: 'Majestic peaks and valleys in the morning light',
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
    title: 'Coastal Serenity',
    description: 'Waves crashing against the rocky shoreline',
  },
  {
    url: 'https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop',
    title: 'Desert Solitude',
    description: 'Endless sand dunes stretching to the horizon',
  },
]

export const ScrollGallery = () => {
  // Reference to the main container
  const containerRef = useRef<HTMLDivElement>(null)

  // Main scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Progress indicator values
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const progressBackground = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      'linear-gradient(90deg, #8b5cf6, #ec4899)',
      'linear-gradient(90deg, #ec4899, #f97316)',
      'linear-gradient(90deg, #f97316, #22c55e)',
    ]
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed progress indicator at the top */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-2"
        style={{
          width: progressWidth,
          background: progressBackground,
        }}
      />

      {/* Content container */}
      <div className="min-h-[300vh]">
        {/* Hero section */}
        <section className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-indigo-50">
          <motion.div
            className="mx-auto max-w-4xl px-4 text-center"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.2], [0, -100]),
            }}
          >
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Scroll-Driven Gallery
            </h1>
            <p className="mb-8 text-xl text-neutral-700">
              Scroll down to reveal a series of images with smooth animation
              effects tied to your scroll position.
            </p>
            <motion.div
              className="mt-16 animate-bounce"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
              }}
            >
              <svg
                className="mx-auto h-8 w-8 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>

          {/* Background pattern */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              scale: useTransform(scrollYProgress, [0, 0.3], [1, 1.5]),
              opacity: useTransform(scrollYProgress, [0, 0.3], [0.1, 0]),
            }}
          />
        </section>

        {/* Image Gallery Sections */}
        {images.map((image, index) => {
          // Calculate scroll ranges for each image section
          const startRange = 0.1 + index * 0.25
          const peakRange = startRange + 0.125
          const endRange = startRange + 0.25

          // Create scroll-based animation values
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(
            scrollYProgress,
            [startRange, peakRange, endRange],
            [0, 1, 0]
          )

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(
            scrollYProgress,
            [startRange, peakRange, endRange],
            [0.8, 1, 0.9]
          )

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const y = useTransform(
            scrollYProgress,
            [startRange, peakRange, endRange],
            [100, 0, -100]
          )

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotate = useTransform(
            scrollYProgress,
            [startRange, peakRange, endRange],
            [index % 2 === 0 ? -5 : 5, 0, index % 2 === 0 ? 5 : -5]
          )

          return (
            <section
              key={index}
              className="sticky top-0 flex h-screen items-center justify-center"
            >
              <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
                <motion.div
                  className="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
                  style={{
                    opacity,
                    y,
                  }}
                >
                  {/* Image */}
                  <motion.div
                    className={`overflow-hidden rounded-xl shadow-2xl ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
                    style={{
                      scale,
                      rotate,
                    }}
                  >
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={image.url}
                      alt={image.title}
                      className="aspect-[4/3] h-auto w-full object-cover"
                    />
                  </motion.div>

                  {/* Text content */}
                  <div
                    className={`px-4 text-left ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
                  >
                    <motion.h2
                      className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl"
                      style={{
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        x: useTransform(
                          scrollYProgress,
                          [startRange, peakRange, endRange],
                          [
                            index % 2 === 0 ? -50 : 50,
                            0,
                            index % 2 === 0 ? 50 : -50,
                          ]
                        ),
                      }}
                    >
                      {image.title}
                    </motion.h2>
                    <motion.p
                      className="text-lg text-neutral-700"
                      style={{
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        x: useTransform(
                          scrollYProgress,
                          [startRange, peakRange, endRange],
                          [
                            index % 2 === 0 ? -30 : 30,
                            0,
                            index % 2 === 0 ? 30 : -30,
                          ]
                        ),
                      }}
                    >
                      {image.description}
                    </motion.p>
                  </div>
                </motion.div>
              </div>

              {/* Background color */}
              <motion.div
                className="absolute inset-0 -z-10"
                style={{
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  opacity: useTransform(
                    scrollYProgress,
                    [startRange, peakRange, endRange],
                    [0, 1, 0]
                  ),
                  background: [
                    'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
                    'linear-gradient(to bottom right, #fdf4ff, #fae8ff)',
                    'linear-gradient(to bottom right, #fff7ed, #ffedd5)',
                  ][index % 3],
                }}
              />
            </section>
          )
        })}

        {/* Final section */}
        <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 to-emerald-50 px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            style={{
              opacity: useTransform(scrollYProgress, [0.7, 0.8], [0, 1]),
              y: useTransform(scrollYProgress, [0.7, 0.8], [50, 0]),
            }}
          >
            <h2 className="mb-6 text-4xl font-bold text-emerald-800">
              Animation Complete
            </h2>
            <p className="mb-8 text-lg text-neutral-700">
              You&apos;ve experienced a scroll-driven animation sequence where
              images and content are revealed based on your exact scroll
              position.
            </p>
            <p className="text-lg text-neutral-700">
              The progress bar at the top shows how far you&apos;ve progressed
              through the content, changing colors as you move through different
              sections.
            </p>
            <div className="mt-12">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-3 font-medium text-white transition-all hover:shadow-lg"
              >
                Back to Top
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default ScrollGallery
