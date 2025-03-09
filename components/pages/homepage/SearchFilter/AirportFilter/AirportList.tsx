// components/AirportSearch.tsx
import { SearchIcon } from '@/components/icons/search'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import { dissolve } from '@/lib/animation-setup'
import { capitalizeText } from '@/lib/utils'
import { getAirports } from '@/services/airport-service'
import { Airport } from '@/types/AirportProps'
import React, { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { AirportSkeletonList } from './AirportSkeleton'

interface AirportSearchProps {
  onSelectDepartureAirport: (airport: Airport) => void
  onSelectArrivalAirport: (airport: Airport) => void
  selectedDepartureAirport?: Airport | null
  selectedArrivalAirport?: Airport | null
}

const AirportSearch: React.FC<AirportSearchProps> = ({
  onSelectDepartureAirport,
  onSelectArrivalAirport,
  selectedDepartureAirport,
  selectedArrivalAirport,
}) => {
  // State for departure airports
  const [departureSearchQuery, setDepartureSearchQuery] = useState('')
  const [departureAirports, setDepartureAirports] = useState<Airport[]>([])
  const [departureLoading, setDepartureLoading] = useState(false)
  const [departureHasMore, setDepartureHasMore] = useState(true)
  const [departurePage, setDeparturePage] = useState(1)

  // State for arrival airports
  const [arrivalSearchQuery, setArrivalSearchQuery] = useState('')
  const [arrivalAirports, setArrivalAirports] = useState<Airport[]>([])
  const [arrivalLoading, setArrivalLoading] = useState(false)
  const [arrivalHasMore, setArrivalHasMore] = useState(true)
  const [arrivalPage, setArrivalPage] = useState(1)

  // Shared states
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const PAGE_SIZE = 15

  // Function to fetch airports - can be reused for both departure and arrival
  const fetchAirports = useCallback(
    async (pageNum: number, query: string = '') => {
      try {
        const response = await getAirports({
          page: pageNum,
          size: PAGE_SIZE,
          search: query,
        })
        return response
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch airports')
        )
        return { results: [], total: 0 }
      }
    },
    []
  )

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setInitialLoading(true)

      // Fetch departure airports
      const departureData = await fetchAirports(1, departureSearchQuery)
      setDepartureAirports(departureData.results)
      setDepartureHasMore(departureData.results.length < departureData.total)
      setDeparturePage(1)

      // Fetch arrival airports
      const arrivalData = await fetchAirports(1, arrivalSearchQuery)
      setArrivalAirports(arrivalData.results)
      setArrivalHasMore(arrivalData.results.length < arrivalData.total)
      setArrivalPage(1)

      setInitialLoading(false)
    }

    loadInitialData()
  }, [departureSearchQuery, arrivalSearchQuery, fetchAirports])

  // Load more departure airports
  const loadMoreDepartureAirports = useCallback(async () => {
    if (departureLoading) return

    setDepartureLoading(true)
    const nextPage = departurePage + 1
    const data = await fetchAirports(nextPage, departureSearchQuery)

    if (data.results.length > 0) {
      setDepartureAirports((prev) => [...prev, ...data.results])
      setDeparturePage(nextPage)
    }

    setDepartureHasMore(
      departureAirports.length + data.results.length < data.total
    )
    setDepartureLoading(false)
  }, [
    fetchAirports,
    departureLoading,
    departurePage,
    departureSearchQuery,
    departureAirports.length,
  ])

  // Load more arrival airports
  const loadMoreArrivalAirports = useCallback(async () => {
    if (arrivalLoading) return

    setArrivalLoading(true)
    const nextPage = arrivalPage + 1
    const data = await fetchAirports(nextPage, arrivalSearchQuery)

    if (data.results.length > 0) {
      setArrivalAirports((prev) => [...prev, ...data.results])
      setArrivalPage(nextPage)
    }

    setArrivalHasMore(arrivalAirports.length + data.results.length < data.total)
    setArrivalLoading(false)
  }, [
    fetchAirports,
    arrivalLoading,
    arrivalPage,
    arrivalSearchQuery,
    arrivalAirports.length,
  ])

  // Search handlers with debounce
  const handleDepartureSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDepartureSearchQuery(e.target.value)
    },
    300
  )

  const handleArrivalSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setArrivalSearchQuery(e.target.value)
    },
    300
  )

  // Render skeleton if initial loading
  if (initialLoading) {
    return (
      <div className="w-full px-4 pt-4">
        <div className="flex flex-row">
          <div className="w-full flex-1">
            <p className="text-l-semibold text-neutral-900">
              Bandara Keberangkatan
            </p>
            <div className="relative my-3">
              <Input
                className="py-2"
                placeholder="Cari Bandara"
                disabled
                endIcon={<SearchIcon size={18} className="text-neutral-900" />}
              />
            </div>
            <div className="scrollbar-hide max-h-60 overflow-y-auto">
              <AirportSkeletonList count={5} />
            </div>
          </div>
          <div className="mx-6 border border-[#E8E8E8]" />
          <div className="w-full flex-1">
            <p className="text-l-semibold text-neutral-900">
              Bandara Kedatangan
            </p>
            <div className="relative my-3">
              <Input
                className="py-2"
                placeholder="Cari Bandara"
                disabled
                endIcon={<SearchIcon size={18} className="text-neutral-900" />}
              />
            </div>
            <div className="scrollbar-hide max-h-60 overflow-y-auto">
              <AirportSkeletonList count={5} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 pt-4">
      <div className="flex flex-row">
        {/* Bandara Keberangkatan List */}
        <div className="flex-1">
          <p className="text-l-semibold text-neutral-900">
            Bandara Keberangkatan
          </p>
          {/* Search input */}
          <div className="relative my-3">
            <Input
              className="py-2"
              placeholder="Cari Bandara"
              endIcon={<SearchIcon size={18} className="text-neutral-900" />}
              onChange={handleDepartureSearchChange}
            />
          </div>

          {/* Results container */}
          <div className="scrollbar-hide max-h-60 overflow-y-auto">
            {/* Error message */}
            {error && (
              <div className="grid h-60 place-content-center p-3 text-center text-red-500">
                Gagal memuat data bandara. Silakan coba lagi.
              </div>
            )}

            {/* Airport list with infinite scroll */}
            {departureAirports.length > 0 ? (
              <InfiniteScroll
                isLoading={departureLoading}
                hasMore={departureHasMore}
                next={loadMoreDepartureAirports}
                threshold={0.8}
              >
                {departureAirports.map((airport) => (
                  <div
                    key={`departure-airport-${airport.id}`}
                    className={`flex cursor-pointer items-center border-b border-neutral-100 px-3 py-2.5 hover:bg-neutral-100 ${dissolve} ${
                      selectedDepartureAirport?.id === airport.id
                        ? 'bg-primary-50'
                        : ''
                    }`}
                    onClick={() => onSelectDepartureAirport(airport)}
                  >
                    <div className="flex flex-col">
                      <p className="text-m-regular text-neutral-900">
                        {airport.name} ({airport.code})
                      </p>
                      <p className="text-s-regular text-neutral-500">
                        {capitalizeText(airport.cityName)}
                      </p>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            ) : (
              <div className="grid h-60 place-content-center p-3 text-center text-neutral-500">
                {departureSearchQuery
                  ? 'Tidak ada bandara yang ditemukan'
                  : 'Masukkan nama bandara atau kota'}
              </div>
            )}

            {/* Loading more indicator */}
            {departureLoading && departureHasMore && (
              <AirportSkeletonList count={3} />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 border border-[#E8E8E8]" />

        {/* Bandara Kedatangan List */}
        <div className="flex-1">
          <p className="text-l-semibold text-neutral-900">Bandara Kedatangan</p>
          {/* Search input */}
          <div className="relative my-3">
            <Input
              className="py-2"
              placeholder="Cari Bandara"
              endIcon={<SearchIcon size={18} className="text-neutral-900" />}
              onChange={handleArrivalSearchChange}
            />
          </div>

          {/* Results container */}
          <div className="scrollbar-hide max-h-60 overflow-y-auto">
            {/* Error message */}
            {error && (
              <div className="grid h-60 place-content-center p-3 text-center text-red-500">
                Gagal memuat data bandara. Silakan coba lagi.
              </div>
            )}

            {/* Airport list with infinite scroll */}
            {arrivalAirports.length > 0 ? (
              <InfiniteScroll
                isLoading={arrivalLoading}
                hasMore={arrivalHasMore}
                next={loadMoreArrivalAirports}
                threshold={0.8}
              >
                {arrivalAirports.map((airport) => (
                  <div
                    key={`arrival-airport-${airport.id}`}
                    className={`flex cursor-pointer items-center border-b border-neutral-100 px-3 py-2.5 hover:bg-neutral-100 ${dissolve} ${
                      selectedArrivalAirport?.id === airport.id
                        ? 'bg-primary-50'
                        : ''
                    }`}
                    onClick={() => onSelectArrivalAirport(airport)}
                  >
                    <div className="flex flex-col">
                      <p className="text-m-regular text-neutral-900">
                        {airport.name} ({airport.code})
                      </p>
                      <p className="text-s-regular text-neutral-500">
                        {capitalizeText(airport.cityName)}
                      </p>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            ) : (
              <div className="grid h-60 place-content-center p-3 text-center text-neutral-500">
                {arrivalSearchQuery
                  ? 'Tidak ada bandara yang ditemukan'
                  : 'Masukkan nama bandara atau kota'}
              </div>
            )}

            {/* Loading more indicator */}
            {arrivalLoading && arrivalHasMore && (
              <AirportSkeletonList count={3} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirportSearch
