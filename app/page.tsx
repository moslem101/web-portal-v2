import { ButtonShowcase } from '@/components/button-showcase'
import { CheckboxDemo } from '@/components/checkbox-showcase'
import { ColorShowcase } from '@/components/color-showcase'
import InputDemo from '@/components/input-showcase'
import Banner from '@/components/pages/homepage/Banner'
import Topbar from '@/components/shared/Topbar'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <Topbar />
      <Banner />
      <main className="container mx-auto">
        <ColorShowcase />
        <ButtonShowcase />
        <CheckboxDemo />
        <InputDemo />
      </main>
    </Fragment>
  )
}
