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
