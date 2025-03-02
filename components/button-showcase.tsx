import { Button } from './ui/button'

export function ButtonShowcase() {
  return (
    <div className="mx-auto mt-8 max-w-6xl p-8">
      <h2 className="mb-6 text-2xl font-bold">Button Components</h2>

      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-xl font-semibold">Button Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline" intent="primary">
              Outline Primary
            </Button>
            <Button variant="outline" intent="secondary">
              Outline Secondary
            </Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="success">Success</Button>
            <Button variant="error">Error</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="info">Info</Button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xs">Tiny</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">Combined Variants</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Button variant="success" size="sm">
              Small Success
            </Button>
            <Button variant="error" size="md">
              Medium Error
            </Button>
            <Button variant="warning" size="lg">
              Large Warning
            </Button>
            <Button variant="info" size="sm">
              Small Info
            </Button>
            <Button variant="outline" size="md">
              Medium Outline
            </Button>
            <Button variant="ghost" size="lg">
              Large Ghost
            </Button>
            <Button variant="secondary" size="sm">
              Small Secondary
            </Button>
            <Button variant="default" size="lg">
              Large Default
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">Disabled State</h3>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Default Disabled</Button>
            <Button variant="secondary" disabled>
              Secondary Disabled
            </Button>
            <Button variant="outline" intent="primary" disabled>
              Outline Primary Disabled
            </Button>
            <Button variant="ghost" disabled>
              Ghost Disabled
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
