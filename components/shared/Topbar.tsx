'use client'

import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { Muslim101Logo } from '@/components/icons/muslim101'
import { SearchIcon } from '@/components/icons/search'
import { springTransition } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

interface TopbarProps {
  className?: string
}

const Topbar: React.FC<TopbarProps> = ({ className = '' }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 50 }}
      transition={springTransition}
      className={cn(
        'absolute left-1/2 z-99 flex h-[72px] w-[90%] -translate-x-1/2 items-center gap-[60px] rounded-[100px] bg-white py-7 pr-3 pl-6 backdrop-blur-[100px]',
        className
      )}
    >
      {/* Logo */}
      <Link href="/">
        <Muslim101Logo />
      </Link>

      {/* Navigation Links */}
      <nav className="flex h-[18px] shrink grow basis-0 items-center gap-[60px]">
        <div className="flex flex-col items-center gap-1">
          <Link
            href="/"
            className="font-bevietnam text-sm font-medium text-neutral-900"
          >
            Home
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <Link
            href="/mitra"
            className="font-bevietnam text-sm font-normal text-neutral-600"
          >
            Mitra
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <Link
            href="/about-us"
            className="font-bevietnam text-sm font-normal text-neutral-600"
          >
            About Us
          </Link>
        </div>
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-1">
          <SearchIcon size={20} />
          <span className="font-bevietnam text-xs leading-none font-normal text-neutral-500">
            Cari
          </span>
        </div>

        {/* Register */}
        <Link
          href="/register"
          className="font-bevietnam text-sm font-normal text-neutral-900"
        >
          Daftar
        </Link>

        {/* Divider */}
        <div className="h-0 w-5 rotate-90 border border-neutral-200"></div>

        {/* Login */}
        <Link
          href="/login"
          className="font-bevietnam text-sm font-normal text-neutral-900"
        >
          Masuk
        </Link>

        {/* Partner Button */}
        <div className="bg-primary-500 flex items-center gap-1 rounded-[100px] py-2 pr-3 pl-3.5">
          <span className="font-bevietnam text-sm font-normal text-neutral-900">
            Untuk Mitra/Wukala
          </span>
          <ChevronDownIcon size={16} />
        </div>
      </div>
    </motion.header>
  )
}

export default Topbar
