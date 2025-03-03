'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { useState } from 'react'

export function CheckboxDemo() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-2xl font-bold">Checkbox Component</h1>

      <section className="mb-12">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
          Checkbox Options
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Checkbox
              label="Standard Checkbox"
              description="This is the standard checkbox"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked as boolean)}
            />

            <Checkbox label="Pre-checked Checkbox" defaultChecked />

            <Checkbox
              label="Required Checkbox"
              description="This field is required"
              required
            />

            <Checkbox label="Disabled Checkbox" disabled />

            <Checkbox
              label="Disabled Checked Checkbox"
              disabled
              defaultChecked
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">Different Sizes</h3>
              <div className="space-y-4">
                <Checkbox
                  label="Small Checkbox"
                  description="Compact size for dense UIs"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Custom Check Icon</h3>
              <Checkbox
                label="Custom Icon Checkbox"
                description="Using Lucide Check icon instead of SVG"
                defaultChecked
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Usage Example</h2>
        <div className="rounded-md border bg-neutral-50 p-6">
          <h3 className="mb-4 text-lg font-medium">Newsletter Subscription</h3>
          <form className="space-y-3">
            <Checkbox
              id="weekly"
              label="Weekly updates"
              description="Receive our weekly newsletter with product updates"
              defaultChecked
            />

            <Checkbox
              id="promo"
              label="Promotional emails"
              description="Receive promotional offers and discounts"
            />

            <Checkbox
              id="terms"
              label="Terms and conditions"
              description="I agree to the terms of service and privacy policy"
              required
            />

            <div className="pt-4">
              <Button>Subscribe</Button>
            </div>
          </form>
        </div>
      </section>

      <section>
        <RadioGroup>
          <RadioGroupItem
            label="Halo"
            description="Rafi"
            defaultChecked
            value={'a'}
          />
          <RadioGroupItem
            label="Halo"
            description="Rafi"
            defaultChecked
            value={'b'}
          />
        </RadioGroup>
      </section>
    </div>
  )
}
