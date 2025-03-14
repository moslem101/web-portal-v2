'use client'

import { useEffect } from 'react'

function OverscrollTracker() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let lastY = 0
    let maxScroll = 0

    const updateMaxScroll = () => {
      const docHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      maxScroll = docHeight - windowHeight
    }

    const handleScroll = () => {
      const currentY = window.scrollY

      // Reset overscroll jika tidak di batas bawah
      if (currentY < maxScroll) {
      }

      lastY = currentY
    }

    const handleWheel = (e: any) => {
      // Deteksi apakah sudah di batas bawah
      if (window.scrollY >= maxScroll && e.deltaY > 0) {
      }
    }

    // Initial setup
    updateMaxScroll()
    window.addEventListener('resize', updateMaxScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      window.removeEventListener('resize', updateMaxScroll)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="absolute bottom-0 h-[2396px] bg-gradient-to-b from-white/0 to-white" />
  )
}

export default OverscrollTracker
