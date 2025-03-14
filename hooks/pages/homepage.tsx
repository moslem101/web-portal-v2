import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { getAirline, getAirports } from '@/services/general-service'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface UseSearchParams {
  initialQuery?: string
  pageSize?: number
}

interface UseSearchResult<T> {
  data: T[]
  loading: boolean
  initialLoading: boolean
  hasMore: boolean
  error: Error | null
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  loadMore: () => Promise<void>
}

export function useAirportSearch({
  initialQuery = '',
  pageSize = 15,
}: UseSearchParams = {}): UseSearchResult<Airport> {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [airports, setAirports] = useState<Airport[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState(1)

  // Function to fetch airports
  const fetchAirports = useCallback(
    async (pageNum: number, query: string = '') => {
      try {
        const response = await getAirports({
          page: pageNum,
          size: pageSize,
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
    [pageSize]
  )

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setInitialLoading(true)

      const data = await fetchAirports(1, searchQuery)
      setAirports(data.results)
      setHasMore(data.results.length < data.total)
      setPage(1)

      setTimeout(() => setInitialLoading(false), 500)
    }

    loadInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  // Load more airports
  const loadMoreAirports = useCallback(async () => {
    if (loading) return

    setLoading(true)
    const nextPage = page + 1
    const data = await fetchAirports(nextPage, searchQuery)

    if (data.results.length > 0) {
      setAirports((prev) => [...prev, ...data.results])
      setPage(nextPage)
    }

    setHasMore(airports.length + data.results.length < data.total)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // Debounced search handler
  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    },
    300
  )

  return {
    data: airports,
    loading,
    initialLoading,
    hasMore,
    error,
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    loadMore: loadMoreAirports,
  }
}

export function useAirlineSearch({
  initialQuery = '',
  pageSize = 15,
}: UseSearchParams = {}): UseSearchResult<Airline> {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [airlines, setAirlines] = useState<Airline[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState(1)

  // Function to fetch airlines
  const fetchAirlines = useCallback(
    async (pageNum: number, query: string = '') => {
      try {
        const response = await getAirline({
          page: pageNum,
          size: pageSize,
          search: query,
        })
        return response
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch airlines')
        )
        return { results: [], total: 0 }
      }
    },
    [pageSize]
  )

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setInitialLoading(true)

      const data = await fetchAirlines(1, searchQuery)
      setAirlines(data.results)
      setHasMore(data.results.length < data.total)
      setPage(1)

      setTimeout(() => setInitialLoading(false), 500)
    }

    loadInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load more airlines
  const loadMoreAirlines = useCallback(async () => {
    if (loading) return

    setLoading(true)
    const nextPage = page + 1
    const data = await fetchAirlines(nextPage, searchQuery)

    if (data.results.length > 0) {
      setAirlines((prev) => [...prev, ...data.results])
      setPage(nextPage)
    }

    setHasMore(airlines.length + data.results.length < data.total)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // Debounced search handler
  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    },
    300
  )

  return {
    data: airlines,
    loading,
    initialLoading,
    hasMore,
    error,
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    loadMore: loadMoreAirlines,
  }
}
