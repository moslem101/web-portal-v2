'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from '@/components/ui/button'
import { dissolve } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-4', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-3',
        month: 'flex flex-col gap-4 p-4',
        caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-m-medium',
        nav: 'flex items-center gap-1',
        nav_button: cn('bg-transparent p-0'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-x-1',
        head_row: 'flex',
        head_cell:
          'text-neutral-700 w-8 h-8 text-xs-medium flex justify-center flex-col',
        row: 'flex w-full mt-0.5',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary [&:has([aria-selected].day-range-end)]:rounded-r-lg',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-lg [&:has(>.day-range-start)]:rounded-l-lg'
            : '[&:has([aria-selected])]:rounded-lg',
          dissolve
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 text-s-regular aria-selected:opacity-100 hover:bg-primary-300 rounded-lg aria-selected:hover:bg-primary focus:bg-primary active:bg-primary',
          dissolve
        ),
        day_range_start: `day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground ${dissolve}`,
        day_range_end: `day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground ${dissolve}`,
        day_selected: `bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground ${dissolve}`,
        day_today: 'bg-primary text-accent-foreground',
        day_outside:
          'day-outside text-neutral-400 aria-selected:text-neutral-400',
        day_disabled: 'text-neutral-400 opacity-50',
        day_range_middle:
          'aria-selected:bg-primaryy aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn('size-6 cursor-pointer text-neutral-900', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn('size-6 cursor-pointer text-neutral-900', className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
