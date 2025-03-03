import { ButtonShowcase } from '@/components/button-showcase'
import { CheckboxDemo } from '@/components/checkbox-showcase'
import { ColorShowcase } from '@/components/color-showcase'
import InputDemo from '@/components/input-showcase'

export default function Home() {
  return (
    <main>
      <ColorShowcase />
      <ButtonShowcase />
      <CheckboxDemo />
      <InputDemo />
    </main>
  )
}
