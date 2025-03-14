'use client'

import { DateIcon } from '@/components/icons/date'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { OtherProps } from '@/constant/types/GeneralProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import React, { useMemo } from 'react'
import { DateSkeleton } from './DateSkeleton'

const DateFilter: React.FC<OtherProps> = ({ colorIcon, whatPage }) => {
  const { filters, setDateRange, isDisabled, isLoadingSkeleton } =
    useFilterProduct()

  const dateRange = filters.dateRange
  // Memoized date display text
  const dateDisplayText = useMemo(() => {
    if (dateRange?.from) {
      if (dateRange.to) {
        return (
          <>
            {format(dateRange.from, 'dd LLL y', { locale: id })} -{' '}
            {format(dateRange.to, 'dd LLL y', { locale: id })}
          </>
        )
      }
      return format(dateRange.from, 'dd LLL y', { locale: id })
    }
    return null
  }, [dateRange])

  if (whatPage === 'filter_search' && isLoadingSkeleton) {
    return <DateSkeleton />
  }

  return (
    <Popover>
      <PopoverTrigger className="focus:outline-none" asChild>
        <div
          className={`flex w-full items-center gap-2 ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`}
          onClick={isDisabled ? (e) => e.preventDefault() : undefined}
        >
          <DateIcon size={32} color={colorIcon} />
          <div className="flex flex-col">
            {dateDisplayText ? (
              <p className="text-s-regular text-neutral-900">
                {dateDisplayText}
              </p>
            ) : (
              <>
                <p className="text-s-regular text-neutral-900">
                  Tanggal Keberangkatan
                </p>
                <p className="text-s-regular text-neutral-300">
                  Pilih tanggal keberangkatan
                </p>
              </>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto" align="center">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          locale={id}
        />
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(DateFilter)
