import { ArrowIcon } from '@/components/icons/arrow'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { memo } from 'react'

interface HeaderPackageProps {
  title: string
  desc: string
  type: string
}

export const HeaderPackageList = memo(function HeaderPackageList({
  title,
  desc,
  type,
}: HeaderPackageProps) {
  return (
    <div className="mb flex justify-between">
      <div className="flex flex-col gap-2">
        <p className="heading-2-bold">{title}</p>
        <p className="text-m-regular">{desc}</p>
      </div>
      <Link href={`/packages?section=${type}`} id={`link-see-all-${type}`}>
        <Button className="items-center gap-1 px-3 py-2" size="xs">
          <p className="text-m-regular text-neutral-900">Lihat Paket Lainnya</p>
          <ArrowIcon size={24} className="-rotate-45" />
        </Button>
      </Link>
    </div>
  )
})
