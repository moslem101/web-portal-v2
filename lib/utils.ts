import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  if (typeof value === 'object' && Object.keys(value as object).length === 0)
    return true
  return false
}

/**
 * Converts a string to proper capitalization (first letter of each word capitalized)
 * @param text - The text to capitalize
 * @returns The capitalized text
 */
export function capitalizeText(text: string): string {
  if (!text) return ''

  // Split the text by spaces and capitalize the first letter of each word
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatCurrency(value?: string | number): string {
  if (!value) return '-'
  let numericValue: number

  if (typeof value === 'number') {
    numericValue = value
  } else {
    numericValue = parseFloat(value?.replace(/[^0-9.-]+/g, '')) // Parse numeric part from string
  }

  if (isNaN(numericValue)) {
    return 'Rp.0' // Return a default value if parsing fails
  }

  const result = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(numericValue * (numericValue < 0 ? -1 : 1))
    .replace(/\s/g, '')

  return numericValue < 0 ? `-${result}` : result
}

export const formatNumberCurrency = (value: string) => {
  const numericValue = parseInt(value.replace(/\D/g, ''), 10)
  return isNaN(numericValue)
    ? ''
    : new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        maximumFractionDigits: 0,
      }).format(numericValue)
}

export const getMinimumNonZeroPrice = (
  ...prices: (string | number | undefined)[]
): number => {
  return Math.min(...prices.map(Number).filter((price) => price > 0)) || 0
}
