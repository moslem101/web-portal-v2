'use client'

import { ChevronIcon } from '@/components/icons/chevron'
import { Muslim101Logo } from '@/components/icons/muslim101'
import { SearchIcon } from '@/components/icons/search'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { dissolve, springTransition } from '@/lib/animation-setup'
import { cn, isEmpty } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface TopbarProps {
  className?: string
  token?: string
}

// Animation variants defined outside component to prevent recreation on each render
const dotVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

// Fixed topbar animation variants
const fixedTopbarVariants = {
  hidden: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

const Topbar: React.FC<TopbarProps> = ({ className = '', token }) => {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [showFixedHeader, setShowFixedHeader] = useState(false)

  // Memoize navigation links to prevent recreating on each render
  const navLinks = useMemo(
    () => [
      { title: 'Home', href: '/' },
      { title: 'Mitra', href: '/travel/list' },
      { title: 'About Us', href: '/about-us' },
    ],
    []
  )

  // Use callback for scroll handler to prevent recreating on each render
  const updateFixedHeader = useCallback(() => {
    setShowFixedHeader(window.scrollY > 100)
  }, [])

  // Setup scroll listener
  useEffect(() => {
    window.addEventListener('scroll', updateFixedHeader)
    // Initial check
    updateFixedHeader()

    return () => {
      window.removeEventListener('scroll', updateFixedHeader)
    }
  }, [updateFixedHeader])

  // Memoized handler for hover events
  const handleMouseEnter = useCallback((href: string) => {
    setHoveredLink(href)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredLink(null)
  }, [])

  // Extract NavLink to optimize rendering
  const NavLink = ({ href, title }: { href: string; title: string }) => {
    const isActive = pathname === href
    const isHovered = hoveredLink === href

    // Only show the dot indicator if:
    // 1. The link is active but not being hovered (persistent dot)
    // 2. The link is being hovered but not active (hover dot)
    const showDot = isActive || isHovered

    return (
      <div className="flex flex-col items-center gap-1">
        <Link
          href={href}
          onMouseEnter={() => handleMouseEnter(href)}
          onMouseLeave={handleMouseLeave}
          className={`relative ${
            isActive
              ? 'text-m-medium text-neutral-900'
              : 'text-m-regular text-neutral-600'
          }`}
        >
          {title}

          {/* We only animate entrance/exit, not transitions between active and hover states */}
          <AnimatePresence>
            {isActive && (
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                key={`dot-${href}-active`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="4"
                  viewBox="0 0 4 4"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="2" r="2" fill="#FFC100" />
                </svg>
              </div>
            )}
            {showDot && (
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key={`dot-${href}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="4"
                  viewBox="0 0 4 4"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="2" r="2" fill="#FFC100" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>
    )
  }

  // Extract topbar content to its own component to prevent unnecessary rerenders
  const TopbarContent = React.memo(() => {
    return (
      <Fragment>
        {/* Logo */}
        <Link href="/">
          <Muslim101Logo />
        </Link>

        {/* Navigation Links */}
        <nav className="flex h-[18px] shrink grow basis-0 items-center gap-[60px]">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} title={link.title} />
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex cursor-pointer items-center gap-1">
                <SearchIcon size={20} className="text-neutral-500" />
                <span className="text-s-regular text-neutral-500">Cari</span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              sideOffset={25}
              sticky="always"
              className="rounded-xl p-2.5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            >
              <div className="text-m-regular flex items-center gap-2.5 p-0 hover:bg-transparent">
                <Input
                  placeholder="Cari paket, travel, hotel atau airlines"
                  endIcon={<SearchIcon className="text-primary-900" />}
                  className="w-[310px]"
                />
                <Button size="sm">Cari</Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Login and Profile */}
          {isEmpty(token) ? (
            <Fragment>
              {/* Register */}
              <Link
                href="/register"
                className="text-m-regular text-neutral-900"
              >
                Daftar
              </Link>

              {/* Divider */}
              <div className="h-5 border border-[#D2D2D1]" />

              {/* Login */}
              <Link href="/login" className="text-m-regular text-neutral-900">
                Masuk
              </Link>

              {/* Partner Button */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="bg-primary-500 flex cursor-pointer items-center gap-1 rounded-[100px] py-2 pr-3 pl-3.5 transition-colors duration-200 focus-within:outline-0">
                    <span className="text-m-regular text-neutral-900">
                      Untuk Mitra/Wukala
                    </span>
                    <ChevronIcon size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" sideOffset={8}>
                  <Link
                    href="/wukala"
                    className={`text-m-regular flex w-full cursor-pointer px-3 py-2.5 hover:bg-neutral-100 ${dissolve}`}
                  >
                    Untuk Wukala
                  </Link>
                  <div className="mx-1 h-px bg-neutral-100" />
                  <Link
                    href="/travel"
                    className={`text-m-regular flex w-full cursor-pointer px-3 py-2.5 hover:bg-neutral-100 ${dissolve}`}
                  >
                    Untuk Mitra Travel
                  </Link>
                </PopoverContent>
              </Popover>
            </Fragment>
          ) : (
            <Fragment>
              <div className="h-5 border border-[#D2D2D1]"></div>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <p className="text-m-regular">John Doe</p>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    )
  })

  // Add display name for React DevTools
  TopbarContent.displayName = 'TopbarContent'

  return (
    <Fragment>
      {/* Main header (non-fixed) */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 50 }}
        transition={springTransition}
        className={cn(
          'absolute left-1/2 z-10 flex h-[72px] w-[90%] -translate-x-1/2 items-center gap-[60px] rounded-[100px] bg-white py-7 pr-3 pl-6 backdrop-blur-[100px]',
          className
        )}
      >
        <TopbarContent />
      </motion.header>

      {/* Fixed header that appears on scroll */}
      <AnimatePresence>
        {showFixedHeader && (
          <motion.header
            variants={fixedTopbarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              'fixed top-0 left-1/2 z-50 flex h-[72px] w-screen -translate-x-1/2 items-center gap-[60px] bg-white px-20 py-7 shadow-[0px_6px_24px_0px_rgba(0,0,0,0.15)]',
              className
            )}
          >
            <TopbarContent />
          </motion.header>
        )}
      </AnimatePresence>
    </Fragment>
  )
}

export default Topbar
